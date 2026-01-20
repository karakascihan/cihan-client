import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  PriceOfferDto,
  PriceOfferLineDto,
  PriceOfferState,
  Products,
} from "@/api/apiDtos";
import { PriceOfferStateDescriptions } from "@/api/extra-enums";
import { SmartTable } from "@/components/SmartTable";
import { useModal } from "@/context/ModalContext";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchpersonels } from "@/store/slices/personalSlice";
import {
  addPriceOffer,
  updatePriceOffer,
} from "@/store/slices/priceOfferSlice";
import { clearSelectedRows } from "@/store/slices/selectedRowsSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { AppDispatch, productsSlice, RootState } from "@/store/store";

// Yardımcı fonksiyonlar
export const calcLineTotal = (line: PriceOfferLineDto): number => {
  if (!line?.birimFiyat) return 0;

  const miktar = line.miktar || 0;
  const fiyat = line.birimFiyat || 0;
  const indirim = line.indirimOraniYuzde || 0;

  return miktar * fiyat * (1 - indirim / 100);
};

export const calcLineTotalKdv = (line: PriceOfferLineDto): number => {
  if (!line?.birimFiyat) return 0;

  const indirimliTutar = calcLineTotal(line);
  const kdvOrani = line.kdvOraniYuzde || 0;

  return indirimliTutar * (kdvOrani / 100);
};

export const paraBirimleri = ["TRY", "USD", "EUR"];

interface PriceOfferAddPageProps {
  offer: PriceOfferDto;
}

 const PriceOfferAddPage: React.FC<PriceOfferAddPageProps> = ({
  offer,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { opportunityId } = useParams();
  const isFirstLoad = useRef(true);
  const { openModal } = useModal();
const [manualTotal, setManualTotal] = React.useState(offer?true:false);

  // Redux selectors
  const products = useSelector((state: RootState) => state.products);
  const users = useSelector((state: RootState) => state.user as UserState);
  const personels = useSelector((state: RootState) => state.personel);
  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );

  // Form setup
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
      priceOfferLine: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceOfferLine",
  });

  // Veri yükleme useEffect'leri
  useEffect(() => {
    if (products.items.length === 0) {
      dispatch(productsSlice.actions.fetchAll());
    }
  }, [dispatch, products.items.length]);

  useEffect(() => {
    if (users.data.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.data.length]);

  useEffect(() => {
    if (personels.items?.length === 0) {
      dispatch(fetchpersonels({ onlyNames: true, isActive: true }));
    }
  }, [dispatch, personels.items?.length]);

  useEffect(() => {
    if (customerState.data?.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customerState.data?.length]);

  // Hesaplamalar
  const allLines = watch("priceOfferLine") || [];
  const productLines = allLines.filter((x) => x.opsiyonMu !== true);
  const belgeIndirim = watch("belgeIndirimOraniYuzde") || 0;

  const subtotal = productLines.reduce(
    (acc, line) => acc + calcLineTotal(line)+calcLineTotalKdv(line),
    0
  );
  const belgeIndirimTutari = subtotal * (belgeIndirim / 100);
  let tax = productLines.reduce((acc, line) => acc + calcLineTotalKdv(line), 0);
  tax = tax * (1 - belgeIndirim / 100);

  let total = subtotal - belgeIndirimTutari + tax;

  // useEffect(() => {
  //   if (isFirstLoad.current) {
  //     isFirstLoad.current = false;
  //   }
  // }, [total]);

  // if (isFirstLoad.current && offer) {
  //   total = offer.toplamTutar;
  // }

 useEffect(() => {
  if (!manualTotal) {
    setValue("toplamTutar", total);
  }
}, [total, manualTotal, setValue]);



  // Modal açma fonksiyonu
  const openProductModal = async (index: number, isOption: boolean = false) => {
    let selectedProducts: Products[] = [];
    dispatch(clearSelectedRows({ tableId: "my-table-id" }));

    const result = await openModal({
      title: "Ürün Seçimi",
      content(close) {
        return (
          <div className="flex flex-col gap-2">
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
                { header: "Birimi", filterable: true, accessor: "olcuBirimi" },
                {
                  header: "Birim Fiyatı",
                  accessor: "birimFiyat",
                  body: (row) => row.birimFiyat?.toLocaleString(),
                },
                { header: "Para Birimi", accessor: "paraBirimi" },
              ]}
              onSelectedRowChange={(item) => {
                if (item && !selectedProducts.find((p) => p.id === item.id)) {
                  selectedProducts.push(item);
                } else {
                  selectedProducts = selectedProducts.filter(
                    (p) => p.id !== item.id
                  );
                }
              }}
              rowIdAccessor="id"
              onDoubleClick={() => {}}
            />
            <button
              onClick={() => close(true)}
              className="inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              <FaCheck className="mr-2" />
              Kaydet
            </button>
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
          birimFiyat: product.birimFiyat || 0,
          paraBirimi: product.paraBirimi || "TRY",
          opsiyonMu: isOption,
          kdvOraniYuzde: 0,
          indirimOraniYuzde: 0,
        });
      });
    }
  };

  // Form submit
  const onSubmit = async (data: PriceOfferDto, isRevision = false) => {
    data = { ...data, opportunityId: Number(opportunityId) };
    data.priceOfferLine.forEach((line) => {
      line.toplamFiyat = calcLineTotal(line);
    });

    if (offer) {
      if (isRevision) {
        await dispatch(addPriceOffer({ newLeave: data, isRevision: true }));
      } else {
        await dispatch(updatePriceOffer({ id: offer.id, changes: data }));
      }
    } else {
      await dispatch(addPriceOffer({ newLeave: data, isRevision: false }));
    }

    if (opportunityId && opportunityId !== "undefined") {
      navigate(`/firsatdetay/${opportunityId}`);
    } else {
      navigate("/teklifler");
    }
  };

  // Teslim süresi değişikliği
  const handleDeliveryDaysChange = (days: number) => {
    const teklifTarihiStr = getValues("teklifTarihi");
    if (!teklifTarihiStr) return;

    const date = new Date(teklifTarihiStr);
    date.setDate(date.getDate() + days);
    setValue("teslimTarihi", date.toISOString().split("T")[0]);
  };

  // Satır render fonksiyonu
  const renderProductLine = (
    field: any,
    idx: number,
    isOption: boolean = false
  ) => {
    const line = allLines[idx];

    return (
      <tr key={field.id}>
        <td className="border p-2">
          <input
            type="text"
            className="w-full border rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register(`priceOfferLine.${idx}.malzemeKodu`)}
          />
        </td>
        <td className="border p-2">
          <input
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.malzemeAdi`)}
          />
        </td>
        <td className="border p-2">
          <input
            type="number"
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.miktar`, {
              valueAsNumber: true,
            })}
          />
        </td>
        <td className="border p-2">
          <input
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.birimi`)}
          />
        </td>
        <td className="border p-2">
          <input
            type="number"
            step="0.01"
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.birimFiyat`, {
              valueAsNumber: true,
            })}
          />
        </td>
        <td className="border p-2">
          <input
            type="number"
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.indirimOraniYuzde`, {
              valueAsNumber: true,
              setValueAs: (v) => v ?? 0,
            })}
          />
        </td>
        <td className="border p-2">
          <input
            type="number"
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.kdvOraniYuzde`, {
              valueAsNumber: true,
              setValueAs: (v) => v ?? 0,
            })}
          />
        </td>
        <td className="border p-2">
          <select
            className="border p-1 rounded w-full"
            {...register(`priceOfferLine.${idx}.paraBirimi`)}
          >
            {paraBirimleri.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </td>
        {!isOption && (
          <td className="border p-2 text-right">
            {(calcLineTotal(line)+calcLineTotalKdv(line)).toLocaleString()}
          </td>
        )}
        <td className="border p-2 text-center">
          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sil
          </button>
        </td>
      </tr>
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, false))}
      className="max-w-8xl mx-auto p-6 bg-white shadow rounded"
    >
      {/* Başlık */}
      <div className="flex justify-center bg-gray-300 mb-3 text-gray-600">
        <h1 className="text-2xl font-bold mb-2 p-1">
          {offer ? "Teklif Düzenle" : "Yeni Teklif"}
        </h1>
      </div>

      {/* Form Alanları */}
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

          <div>
            <label className="block text-sm font-medium">Müşteri</label>
            <select
              {...register("firma_Id")}
              className="border p-1 rounded w-full"
            >
              <option value="">Seçiniz</option>
              {customerState.data.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firma}
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
              className="border p-1 rounded w-full"
            >
              <option value="">Personel Seçiniz</option>
              {personels.items?.map((person) => (
                <option key={person.id} value={person.id}>
                  {`${person.personelAdi} ${person.personelSoyadi}`}
                </option>
              ))}
            </select>
            {errors.teklifOnay && (
              <span className="text-red-600">{errors.teklifOnay.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Teslim Süresi (Gün)
            </label>
            <input
              type="number"
              className="border p-1 rounded w-full"
              {...register("teslimSuresiGun", {
                valueAsNumber: true,
                onChange: (e) =>
                  handleDeliveryDaysChange(Number(e.target.value) || 0),
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Garanti Süresi (Gün)
            </label>
            <input
              type="number"
              className="border p-1 rounded w-full"
              {...register("garantiSuresiGun", { valueAsNumber: true })}
            />
          </div>

          {offer && (
            <div>
              <label className="block text-sm font-medium">Teklif Durumu</label>
              <select
                {...register("durumu")}
                className="border p-1 rounded w-full"
              >
                {Object.keys(PriceOfferState)
                  .filter((k) => isNaN(Number(k)))
                  .map((key) => (
                    <option
                      key={key}
                      value={
                        PriceOfferState[key as keyof typeof PriceOfferState]
                      }
                    >
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

      {/* Ürünler Tablosu */}
      <div className="flex justify-center flex-col mb-3">
        <h1 className="text-2xl mb-2 p-1 text-center">Ürünler</h1>
        <table className="w-full border-collapse border table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-r-1 w-[100px] p-2">Ürün Kodu</th>
              <th className="border-r-1 w-[200px] p-2">Ürün Adı</th>
              <th className="border-r-1 w-[70px] p-2">Miktar</th>
              <th className="border-r-1 w-[70px] p-2">Birim</th>
              <th className="border-r-1 w-[100px] p-2">Birim Fiyat</th>
              <th className="border-r-1 w-[70px] p-2">İndirim (%)</th>
              <th className="border-r-1 w-[70px] p-2">KDV (%)</th>
              <th className="border-r-1 w-[75px] p-2">Para Birimi</th>
              <th className="border-r-1 w-[100px] p-2">Toplam</th>
              <th className="border-r-1 w-[70px] p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => {
              if (field.opsiyonMu === true) return null;
              return renderProductLine(field, idx, false);
            })}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                Ara Toplam:
              </td>
              <td className="p-2 border font-semibold text-right">
                {subtotal.toLocaleString()}
              </td>
              <td className="border"></td>
            </tr>
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                <div className="flex flex-row justify-end items-center">
                  <span>Toplam İndirim</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="ml-3 border p-1 rounded w-[50px]"
                    {...register("belgeIndirimOraniYuzde", {
                      valueAsNumber: true,
                    })}
                  />
                  <span className="ml-1">%</span>
                </div>
              </td>
              <td className="p-2 border font-semibold text-right">
                {belgeIndirimTutari?.toLocaleString()}
              </td>
              <td className="border"></td>
            </tr>
            <tr>
              <td colSpan={8} className="p-2 text-right font-semibold border">
                KDV:
              </td>
              <td className="p-2 border font-semibold text-right">
                {tax.toLocaleString()}
              </td>
              <td className="border"></td>
            </tr>
            <tr>
              <td colSpan={7} className="p-2 text-right font-bold border">
                Genel Toplam:
              </td>
              <td className="p-2 border font-bold text-red-700 text-right">
               
<input
    type="number"
    step="0.01"
    className={`w-full text-right border rounded p-1 font-bold ${
      manualTotal ? "text-red-700" : "text-gray-800 bg-gray-100"
    }`}
    readOnly={!manualTotal}
    {...register("toplamTutar", {
      valueAsNumber: true,
    })}
  />
 
</td>
<td> <button
  type="button"
  onClick={() => setManualTotal((prev) => !prev)}
  className="ml-2 px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100"
>
  {manualTotal ? "Otomatik Hesapla" : " Manuel Gir"}
</button></td>

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
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Kalem Ekle
        </button>
        <button
          type="button"
          onClick={() => openProductModal(fields.length, false)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ürünlerden Ekle
        </button>
      </div>

      {/* Opsiyonlar Tablosu */}
      <div className="flex justify-center flex-col mb-3 mt-6">
        <h1 className="text-2xl mb-2 p-1 text-center">Opsiyonlar</h1>
        <table className="w-full border-collapse border table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-r-1 w-[100px] p-2">Ürün Kodu</th>
              <th className="border-r-1 w-[200px] p-2">Ürün Adı</th>
              <th className="border-r-1 w-[70px] p-2">Miktar</th>
              <th className="border-r-1 w-[70px] p-2">Birim</th>
              <th className="border-r-1 w-[100px] p-2">Birim Fiyat</th>
              <th className="border-r-1 w-[70px] p-2">İndirim (%)</th>
              <th className="border-r-1 w-[70px] p-2">KDV (%)</th>
              <th className="border-r-1 w-[75px] p-2">Para Birimi</th>
              <th className="border-r-1 w-[70px] p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => {
              if (field.opsiyonMu !== true) return null;
              return renderProductLine(field, idx, true);
            })}
          </tbody>
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
              kdvOraniYuzde: 0,
              opsiyonMu: true,
              birimi: "",
            })
          }
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Kalem Ekle
        </button>
        <button
          type="button"
          onClick={() => openProductModal(fields.length, true)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ürünlerden Ekle
        </button>
      </div>

      {/* Kaydet Butonları */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Teklifi Kaydet
        </button>
        {offer && (
          <button
            onClick={handleSubmit((data) => onSubmit(data, true))}
            type="button"
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Teklifi Revize Et
          </button>
        )}
      </div>
    </form>
  );
};
export default PriceOfferAddPage;
