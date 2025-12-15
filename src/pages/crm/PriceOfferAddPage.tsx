import {
  PriceOfferDto,
  PriceOfferLineDto,
  PriceOfferState,
  Products,
} from "@/api/apiDtos";
import { PriceOfferStateDescriptions } from "@/api/extra-enums";
import { SmartTable } from "@/components/SmartTable";
import { useModal } from "@/context/ModalContext";
import { GenericState } from "@/store/genericSliceFactory";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchpersonels } from "@/store/slices/personalSlice";
import {
  addPriceOffer,
  updatePriceOffer,
} from "@/store/slices/priceOfferSlice";
import { clearSelectedRows } from "@/store/slices/selectedRowsSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { AppDispatch, productsSlice, RootState } from "@/store/store";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { formatDateForInput } from "@/utils/commonUtils";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate, useParams } from "react-router-dom";

// Satır toplamlarını hesapla
export const calcLineTotal = (line: PriceOfferLineDto) => {
  if (!line || !line.birimFiyat) return 0;
  const miktar = line.miktar || 0;
  const fiyat = line.birimFiyat || 0;
  const indirim = line.indirimOraniYuzde || 0;
  const indirimliTutar = miktar * fiyat * (1 - indirim / 100);
  return indirimliTutar;
};
export const calcLineTotalKdv = (line: PriceOfferLineDto) => {
  if (!line || !line.birimFiyat) return 0;

  const miktar = line.miktar || 0;
  const fiyat = line.birimFiyat || 0;
  const indirim = line.indirimOraniYuzde || 0;
  const indirimliTutar = miktar * fiyat * (1 - indirim / 100);
  return indirimliTutar * ((line.kdvOraniYuzde || 0) / 100);
};
export const paraBirimleri = ["TRY", "USD", "EUR"];
export const PriceOfferAddPage = ({ offer }: { offer: PriceOfferDto }) => {
  const dispacth = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { opportunityId } = useParams();

  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const teklifTarihiStr = getValues("teklifTarihi");
    const teslimTarihiStr = getValues("teslimTarihi");

    if (!teklifTarihiStr || !teslimTarihiStr) return;

    const t1 = new Date(teklifTarihiStr);
    const t2 = new Date(teslimTarihiStr);

    const diffDays = Math.ceil(
      (t2.getTime() - t1.getTime()) / (1000 * 60 * 60 * 24)
    );
    setValue("teslimSuresiGun", diffDays > 0 ? diffDays : 0);
  }, []);
  useEffect(() => {
    if (products.items.length === 0) {
      dispacth(productsSlice.actions.fetchAll());
    }
  }, []);
  const users = useSelector((state: RootState) => state.user as UserState);
  useEffect(() => {
    if (users.data.length === 0) {
      dispacth(fetchUsers());
    }
  }, []);

  const personels = useSelector((state: RootState) => state.personel);
  useEffect(() => {
    if (personels.items?.length === 0) {
      dispacth(fetchpersonels({ onlyNames: true, isActive: true }));
    }
  }, []);

  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );
  // Customers sadece boşsa yüklenir
  useEffect(() => {
    if (customerState.data?.length === 0) {
      dispacth(fetchCustomers());
    }
  }, []);

  const {
    register,
    control,
    watch,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PriceOfferDto>({
    defaultValues: offer || {
      priceOfferLine: [
        // {
        //   malzemeKodu: "",
        //   malzemeAdi: "",
        //   miktar: 1,
        //   birimFiyat: 0,
        //   indirimOraniYuzde: 0,
        //   paraBirimi: "TRY",
        //   kdvOraniYuzde: 20,
        // },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceOfferLine",
  });

  let lines = watch("priceOfferLine") || [];
  lines = lines.filter((x) => x.opsiyonMu !== true);
  // Ara toplam ve KDV
  const belgeIndirim = watch("belgeIndirimOraniYuzde") || 0;

  const subtotal = lines.reduce((acc, line) => acc + calcLineTotal(line), 0);
  const belgeIndirimTutari = subtotal * (belgeIndirim / 100);

  let tax = lines.reduce((acc, line) => acc + calcLineTotalKdv(line), 0);
  tax = tax * (1 - belgeIndirim / 100);

  const total = subtotal - belgeIndirimTutari + tax;

  const onSubmit = async (data: PriceOfferDto, isRevision = false) => {
    data = { ...data, opportunityId: Number(opportunityId) };
    if (offer) {
      if (isRevision) {
        await dispacth(
          addPriceOffer({ newLeave: data, isRevision: isRevision })
        );
      } else
        await dispacth(
          updatePriceOffer({
            id: offer.id,
            changes: data,
          })
        );
    } else
      await dispacth(addPriceOffer({ newLeave: data, isRevision: isRevision }));
    if (opportunityId) navigate("/firsatdetay/" + opportunityId);
    else navigate("/teklifler");
  };
  const _OpenModal = async (index: number, isOption: boolean = false) => {
    let selectedProducts: Products[] = [];
    dispacth(clearSelectedRows({ tableId: "my-table-id" }));
    const result = await openModal({
      title: "Ürün Seçimi",
      content(close) {
        return (
          <div>
            <div className="flex  flex-col gap-2 ">
              <SmartTable
                pageSize={10}
                enablePagination={true}
                data={products.items ?? []}
                columns={[
                  { header: "#", accessor: "__select", filterable: false },

                  { header: "#", accessor: "__index" },
                  {
                    header: "Ürün Kodu",
                    filterable: true,
                    accessor: "productCode",
                  },
                  {
                    header: "Ürün Adı",
                    filterable: true,
                    accessor: "productName",
                  },
                  {
                    header: "Birimi",
                    filterable: true,
                    accessor: "olcuBirimi",
                  },
                { header: "Birim Fiyatı", accessor:"b", body:(row)=> row.birimFiyat?.toLocaleString() },

                ]}
                onSelectedRowChange={(item) => {
                  if (item && !selectedProducts.find((p) => p.id == item.id)) {
                    selectedProducts.push(item);
                  } else {
                    selectedProducts = selectedProducts.filter(
                      (p) => p.id != item.id
                    );
                  }
                }}
                rowIdAccessor={"id"}
                onDoubleClick={(item) => {
                  return;
                  // Modal kapat
                  close(item);
                  // Form değerini güncelle
                  setValue(
                    `priceOfferLine.${index}.malzemeKodu`,
                    item.productCode
                  );
                  setValue(
                    `priceOfferLine.${index}.malzemeAdi`,
                    item.productName
                  );
                  setValue(`priceOfferLine.${index}.birimi`, item.olcuBirimi);
                    setValue(
                    `priceOfferLine.${index}.opsiyonMu`,
                   isOption
                  );
                }}
              />
              <button
                onClick={(e) => close(true)}
                className="
                    inline-flex justify-center items-center 
                    px-4 py-2 
                    bg-blue-600 hover:bg-blue-700 
                    text-white 
                    rounded
                  "
              >
                <FaCheck className="mr-2" />
                Kaydet
              </button>
            </div>
          </div>
        );
      },
    });
    if (result) {
      selectedProducts.forEach((product) => {
        append({
          malzemeKodu: product.productCode,
          malzemeAdi: product.productName,
          miktar: 1,
          birimi: product.olcuBirimi,
          birimFiyat: 0,
          paraBirimi: "TRY",
          opsiyonMu: isOption,
          kdvOraniYuzde:0,
          birimFiyat: product.birimFiyat || 0,
          indirimOraniYuzde: 0,
          
        });
      });
    }
  };
  const { openModal } = useModal();
  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e, false))}
      className="max-w-8xl mx-auto p-6 bg-white shadow rounded"
    >
      <div className="flex justify-center  bg-gray-300  mb-3  text-gray-600">
        <h1 className="text-2xl font-bold mb-2 p-1">
          {offer ? "Teklif Düzenle" : " Yeni Teklif"}
        </h1>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Teklif Belge No</label>
            <input
              {...register("teklifBelgeNo")}
              required
              className="w-full border p-2 rounded-md bg-gray-200"
              readOnly
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Referans No</label>
            <input
              {...register("referansNo")}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Teklif Tarihi</label>
            <input
              type="date"
              required
              defaultValue={offer?.teklifTarihi.split("T")[0]}
              {...register("teklifTarihi")}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Geçerlilik Tarihi
            </label>
            <input
              type="date"
              required
              {...register("teklifGecerlilikTarihi")}
              className="w-full border p-2 rounded-md"
            />
          </div>
          {/* <div >
            <label className="block text-sm font-medium">Teslim Tarihi</label>
            <input
              type="date"
              required
              {...register("teslimTarihi")}
              className="w-full border p-2 rounded-md"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium">Müşteri</label>
            <select
              {...register("firma_Id")}
              className="border p-1 rounded w-full"
            >
              <option value={""}>Seçiniz</option>
              {customerState.data.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firma}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Teklif Veren</label>
            <select
              {...register("teklifOnay", {
                required: "Lütfen bir kullanıcı seçiniz.",
              })}
              className={`border p-1 rounded w-full `}
            >
              <option value="">Personel Seçiniz</option>
              {personels.items?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.personelAdi + " " + p.personelSoyadi}
                </option>
              ))}
            </select>
            <span className="text-red-600">{errors.teklifOnay?.message}</span>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Teslim Süresi (Gün)
            </label>
            <input
              type="number"
              {...register("teslimSuresiGun", {
                valueAsNumber: true,
                onChange: (e) => {
                  const gun = Number(e.target.value) || 0;
                  const teklifTarihiStr = getValues("teklifTarihi"); // Teklif tarihi
                  if (!teklifTarihiStr) return;

                  const date = new Date(teklifTarihiStr);
                  date.setDate(date.getDate() + gun);

                  const teslimTarihiStr = date.toISOString().split("T")[0];

                  setValue("teslimTarihi", teslimTarihiStr); // Teslim tarihini güncelle
                },
              })}
              className="border p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Garanti Süresi (Gün)
            </label>
            <input
              type="number"
              {...register("garantiSuresiGun" as const, {
                valueAsNumber: true,
              })}
              className="border p-1 rounded w-full"
            />
          </div>
          {offer && (
            <div>
              <label className="block text-sm font-medium">Teklif Durumu</label>
              <select
                {...register(`durumu` as const)}
                className="border p-1 rounded w-full"
              >
                {Object.keys(PriceOfferState)
                  .filter((k) => isNaN(Number(k)))
                  .map((key) => (
                    <option
                      value={
                        PriceOfferState[key as keyof typeof PriceOfferState]
                      }
                    >
                      {" "}
                      {
                        PriceOfferStateDescriptions[
                          PriceOfferState[key as keyof typeof PriceOfferState]
                        ]
                      }
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Açıklama</label>
          <textarea
            {...register("teklifAciklama")}
            className="w-full border p-2 rounded-md"
            rows={3}
          />
        </div>
      </div>
      <div className="flex justify-center flex-col  mb-3">
        <h1 className="text-2xl  mb-2 p-1 text-center">Ürünler</h1>
        <table className="w-full border-collapse border table-fixed ">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-r-1 w-[100px] p-2">Ürün Kodu</th>
              <th className="border-r-1 w-[200px] p-2">Ürün Adı</th>
              <th className="border-r-1 w-[70px] p-2">Miktar</th>
              <th className="border-r-1 w-[70px] p-2">Birim</th>
              <th className="border-r-1 w-[100px] p-2">Birim Fiyat</th>
              <th className="border-r-1 w-[70px] p-2">İndirim (%)</th>
              <th className="border-r-1 w-[70px] p-2">Kdv (%)</th>
              <th className="border-r-1 w-[75px] p-2">Para Birimi</th>
              <th className="border-r-1 w-[100px] p-2">Toplam</th>
              {/* <th className="border-r-1 w-[150px] p-2">Teslim Tarihi</th> */}
              <th className="border-r-1 w-[70px] p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => {
              if (field.opsiyonMu == true) return null;
              const line = lines[idx];
              return (
                <tr key={field.id}>
                  <td className="border p-2">
                    <div className="relative w-full max-w-sm">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full border rounded p-1  pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register(
                          `priceOfferLine.${idx}.malzemeKodu` as const
                        )}
                      />
                      {/* <Search
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                        onClick={() => _OpenModal(idx)}
                      /> */}
                    </div>

                    {/* <input
                    onFocus={() => _OpenModal(idx)}
                    {...register(`priceOfferLine.${idx}.malzemeKodu` as const)}
                    className="border p-1 rounded w-full"
                  /> */}
                  </td>
                  <td className="border p-2">
                    <input
                      className="border p-1 rounded w-full"
                      {...register(`priceOfferLine.${idx}.malzemeAdi` as const)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(`priceOfferLine.${idx}.miktar` as const, {
                        valueAsNumber: true,
                      })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      {...register(`priceOfferLine.${idx}.birimi` as const)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step={"0.01"}
                      {...register(
                        `priceOfferLine.${idx}.birimFiyat` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(
                        `priceOfferLine.${idx}.indirimOraniYuzde` as const,
                        {
                          valueAsNumber: true,
                          setValueAs: (v) => v ?? 0, // null olursa 0 yap
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(
                        `priceOfferLine.${idx}.kdvOraniYuzde` as const,
                        {
                          valueAsNumber: true,
                          setValueAs: (v) => v ?? 0, // null olursa 0 yap
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      {...register(`priceOfferLine.${idx}.paraBirimi` as const)}
                      className="border p-1 rounded w-full"
                    >
                      {paraBirimleri.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 text-right">
                    {calcLineTotal(line).toLocaleString()}
                  </td>
                  {/* <td className="border p-2">
                    <input
                      type="date"
                      {...register(
                        `priceOfferLine.${idx}.teslimTarih` as const
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td> */}
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                Ara Toplam:
              </td>
              <td className="p-2 border font-semiboldv text-right">
                {subtotal.toLocaleString()}
              </td>
              <td className="border"></td>
            </tr>
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                <div className="flex flex-row justify-end items-center">
                  <span> Toplam İndirim </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    {...register("belgeIndirimOraniYuzde" as const, {
                      valueAsNumber: true,
                    })}
                    className="ml-3 border p-1 rounded w-[50px]"
                  />
                  <span className="ml-1"> % </span>
                </div>
              </td>
              <td className="p-2 border font-semibold text-right">
                {belgeIndirimTutari?.toLocaleString()}
              </td>
              <td className="border"> </td>
            </tr>
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                KDV (%):
              </td>
              <td className="p-2 border font-semibold text-right">
                {tax.toLocaleString()}{" "}
              </td>
              <td className="border"></td>
            </tr>
            <tr>
              <td colSpan={8} className="p-2 text-right font-bold border">
                Genel Toplam:
              </td>
              <td className="p-2 border font-bold  text-red-700  text-right">
                {total.toLocaleString()}{" "}
              </td>
              <td className="border"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() =>
            append({
              malzemeKodu: "",
              malzemeAdi: "",
              miktar: 1,
              birimFiyat: 0,
              indirimOraniYuzde: 0,
              paraBirimi: "TRY",
              kdvOraniYuzde: 20,
            })
          }
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Kalem Ekle
        </button>
        <button
          type="button"
          onClick={() => _OpenModal(fields.length, false)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Ürünlerden Ekle
        </button>
      </div>
      <div className="flex justify-center flex-col  mb-3">
        <h1 className="text-2xl  mb-2 p-1 text-center">Opsiyonlar</h1>
        <table className="w-full border-collapse border table-fixed ">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-r-1 w-[100px] p-2">Ürün Kodu</th>
              <th className="border-r-1 w-[200px] p-2">Ürün Adı</th>
              <th className="border-r-1 w-[70px] p-2">Miktar</th>

              <th className="border-r-1 w-[70px] p-2">Birim</th>
              <th className="border-r-1 w-[100px] p-2">Birim Fiyat</th>
              <th className="border-r-1 w-[70px] p-2">İndirim (%)</th>
              <th className="border-r-1 w-[70px] p-2">Kdv (%)</th>
              <th className="border-r-1 w-[75px] p-2">Para Birimi</th>

              <th className="border-r-1 w-[70px] p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => {
              if (field.opsiyonMu !== true) return null;
              const line = lines[idx];
              return (
                <tr key={field.id}>
                  <td className="border p-2">
                    <div className="relative w-full max-w-sm">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full border rounded p-1  pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register(
                          `priceOfferLine.${idx}.malzemeKodu` as const
                        )}
                      />
                      {/* <Search
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                        onClick={() => _OpenModal(idx)}
                      /> */}
                    </div>

                    {/* <input
                    onFocus={() => _OpenModal(idx)}
                    {...register(`priceOfferLine.${idx}.malzemeKodu` as const)}
                    className="border p-1 rounded w-full"
                  /> */}
                  </td>
                  <td className="border p-2">
                    <input
                      className="border p-1 rounded w-full"
                      {...register(`priceOfferLine.${idx}.malzemeAdi` as const)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(`priceOfferLine.${idx}.miktar` as const, {
                        valueAsNumber: true,
                      })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      {...register(`priceOfferLine.${idx}.birimi` as const)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step={"0.01"}
                      {...register(
                        `priceOfferLine.${idx}.birimFiyat` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(
                        `priceOfferLine.${idx}.indirimOraniYuzde` as const,
                        {
                          valueAsNumber: true,
                          setValueAs: (v) => v ?? 0, // null olursa 0 yap
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      {...register(
                        `priceOfferLine.${idx}.kdvOraniYuzde` as const,
                        {
                          valueAsNumber: true,
                          setValueAs: (v) => v ?? 0, // null olursa 0 yap
                        }
                      )}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      {...register(`priceOfferLine.${idx}.paraBirimi` as const)}
                      className="border p-1 rounded w-full"
                    >
                      {paraBirimleri.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex  gap-2">
        <button
          type="button"
          onClick={() =>
            append({
              malzemeKodu: "",
              malzemeAdi: "",
              miktar: 1,
              birimFiyat: 0,
              indirimOraniYuzde: 0,
              paraBirimi: "TRY",
              kdvOraniYuzde: 0,
              opsiyonMu: true,
              birimi: "",
              toplamFiyat: 0,
            })
          }
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Kalem Ekle
        </button>
       
        <button
          type="button"
          onClick={() => _OpenModal(fields.length, true)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Ürünlerden Ekle
        </button>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Teklifi Kaydet
        </button>
        {offer && (
          <button
            onClick={handleSubmit((data) => onSubmit(data, true))} // isRevision = true
            type="button"
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Teklifi Revize Et
          </button>
        )}
      </div>
    </form>
  );
};
