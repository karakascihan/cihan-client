import {
  FieldDefinition,
  FieldOption,
  GenericForm,
} from "@/components/GenericForm";
import { SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { PersonelGetNamesService } from "@/services";
import {
  addOvertime,
  deleteOvertime,
  fetchOvertimes,
} from "@/store/slices/overtimeSlice";
import {
  AppDispatch,
  productsSlice,
  projectsSlice,
  RootState,
} from "@/store/store";
import { Overtime, Products, Projects } from "@/types/commonType";
import { PersonelNames } from "@/types/personel";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fromIsoDateString, toIsoDateString } from "./StaffLeaveList";
import { setNotification } from "@/store/slices/notificationSlice";
export const departmanlar = [
  {
    label: "AR-GE",
    value: "AR-GE",
  },
  {
    label: "ELEKTRONİK ÜRETİM",
    value: "ELEKTRONİK ÜRETİM",
  },
  {
    label: "MEKANİK ÜRETİM",
    value: "MEKANİK ÜRETİM",
  },
  {
    label: "SATINALMA",
    value: "SATINALMA",
  },
  {
    label: "KALİTE",
    value: "KALİTE",
  },
  {
    label: "İDARİ",
    value: "İDARİ",
  },
  {
    label: "YÖNETİM",
    value: "YÖNETİM",
  },
];
export const Turler: FieldOption[] = [
  { label: "MEKANİK TASARIM", value: "MEKANİK TASARIM" },
  { label: "MEKANİK TASARIM REV", value: "MEKANİK TASARIM REV" },
  { label: "ELEKTRONİK TASARIM", value: "ELEKTRONİK TASARIM" },
  { label: "ELEKTRONİK TASARIM REV", value: "ELEKTRONİK TASARIM REV" },
  { label: "YAZILIM", value: "YAZILIM" },
  { label: "MEKANİK İMALAT", value: "MEKANİK İMALAT" },
  { label: "ELEKTRONİK İMALAT", value: "ELEKTRONİK İMALAT" },
  { label: "REWORK", value: "REWORK" },
  { label: "TEST KALİBRASYON", value: "TEST KALİBRASYON" },
  { label: "MEKANİK SATINALMA", value: "MEKANİK SATINALMA" },
  { label: "ELEKTRONİK SATINALMA", value: "ELEKTRONİK SATINALMA" },
  { label: "MEKANİK MONTAJ", value: "MEKANİK MONTAJ" },
  { label: "ELEKTRONİK MONTAJ", value: "ELEKTRONİK MONTAJ" },
  { label: "MONTAJ", value: "MONTAJ" },
  { label: "DEMONTAJ", value: "DEMONTAJ" },
  { label: "DEMONTAJ-MONTAJ", value: "DEMONTAJ-MONTAJ" },
  { label: "MARKALAMA,ETİKETLEME", value: "MARKALAMA,ETİKETLEME" },
  { label: "DOKÜMAN HAZIRLAMA", value: "DOKÜMAN HAZIRLAMA" },
  { label: "MALZEME  ARAŞTIRMA", value: "MALZEME  ARAŞTIRMA" },
  { label: "TEKNİK RESİM OLUŞTURMA", value: "TEKNİK RESİM OLUŞTURMA" },
  { label: "BAKIM ONARIM", value: "BAKIM ONARIM" },
  { label: "YAPISAL ANALİZ", value: "YAPISAL ANALİZ" },
  { label: "NUMUNE TEMİNİ", value: "NUMUNE TEMİNİ" },
  { label: "DOKÜMAN HAZIRLAMA", value: "DOKÜMAN HAZIRLAMA" },
];
export const Tezgahlar: FieldOption[] = [
  { label: "DMU75", value: "DMU75" },
  { label: "DMF360", value: "DMF360" },
  { label: "DMU125", value: "DMU125" },
  { label: "ECOMILL", value: "ECOMILL" },
  { label: "SPINNER", value: "SPINNER" },
  { label: "MAZAK", value: "MAZAK" },
  { label: "NTX2000", value: "NTX2000" },
  { label: "NLX1500", value: "NLX1500" },
  { label: "NLX2500", value: "NLX2500" },
  { label: "CUT 300 SP", value: "CUT 300 SP" },
  { label: "DMU 50-1", value: "DMU 50-1" },
  { label: "DMU 50-2", value: "DMU 50-2" },
  { label: "CAM", value: "CAM" },
  { label: "CP300", value: "CP300" },
  { label: "CMM", value: "CMM" },
  { label: "TESVİYE", value: "TESVİYE" },
  { label: "MANUEL ÖLÇÜM", value: "MANUEL ÖLÇÜM" },
  { label: "UNIVERSAL TORNA", value: "UNIVERSAL TORNA" },
  { label: "CAM", value: "CAM" },
];

export const OvertimeList = () => {
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.overtime
  );
  const dispatch = useDispatch<AppDispatch>();
  const products_ = useSelector((state: RootState) => state.products.items);
  const projects_ = useSelector((state: RootState) => state.projects.items);
  useEffect(() => {
    dispatch(fetchOvertimes());
  }, [dispatch]);
  useEffect(() => {
    PersonelGetNamesService(true).then((data) => {
      setPersonels(data.result);
    });
  }, []);
  const OpenModal_ = (record: any, data: any, data1: any) => {
    openModal({
      title:
        "Fazla Mesai Talep Formu " +
        (record?.id ? "Düzenleme" : "Giriş") +
        " Ekranı",
      content(close) {
        return (
          <GenericForm
            fields={[
              {
                type: "text",
                name: "id",
                label: "id",
                hidden: true,
                defaultValue:record? record.id:0,
              },
              {
                onChangeEffect: (value) => {
                  if (value) {
                    let changeProject = (data as Projects[]).filter(
                      (x) => x.projeAdi == value
                    );
                    if (changeProject && changeProject.length > 0) {
                      return { projeKodu: changeProject[0].projeNo ?? "" };
                    }
                  }
                  return {};
                },
                defaultValue: record?.projeAdi,
                type: "select",
                name: "projeAdi",
                label: "Proje Adı",
                required: true,
                options: (data as Projects[])?.map<FieldOption>((x) => ({
                  label: x.projeAdi ?? "",
                  value: x.projeAdi ?? "",
                })),
              },
              {
                defaultValue: record?.projeKodu,
                type: "text",
                name: "projeKodu",
                label: "Proje No",
                disabled: true,
              },
              {
                defaultValue: record?.parcaAdi,
                type: "text",
                name: "parcaAdi",
                label: "Malzeme/Parça Adı",
                disabled: true,
                onThreeDotsClick:[(setValue)=> {
                  openModal({
                    title: "Parça Seçimi",
                    content(close) {
                      return (
                        <SmartTable
                          pageSize={10}
                          enablePagination={true}
                          data={data1}
                          columns={[
                            { header: "#", accessor: "__index" },
                            { header: "#", accessor: "__select" },
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
                          ]}
                          rowIdAccessor={"id"}
                          onDoubleClick={(item) => {
                            // Modal kapat
                            close(item);
                            // Form değerini güncelle
                            setValue("parcaKodu", item.productCode);
                            setValue("parcaAdi", item.productName);
                          }}
                        />
                      );
                    },
                  });
                }],
              },
              {
                defaultValue: record?.parcaKodu,
                type: "text",
                name: "parcaKodu",
                label: "Parça Kodu",
              },
              {
                defaultValue: record?.revizyon,
                type: "text",
                name: "revizyon",
                label: "Revizyon No",
              },
              {
                defaultValue: record?.seriNo,
                type: "text",
                name: "seriNo",
                label: "Seri No",
              },

              {
                defaultValue: record?.aciklama,
                type: "textarea",
                name: "aciklama",
                label: "Mesai Nedeni",
              },
              {
                defaultValue: toIsoDateString(record?.tarih),
                type: "date",
                name: "tarih",
                label: "Tarih",
              },

              {
                defaultValue: record?.baslamaSaati,
                type: "time",
                name: "baslamaSaati",
                label: "Başlangıç Saati",
              },
              {
                defaultValue: record?.bitisSaati,
                type: "time",
                name: "bitisSaati",
                label: "Bitiş Saati",
              },
              {
                defaultValue: record?.turu,
                type: "select",
                name: "turu",
                label: "Tür",
                options: Turler,
              },
              {
                defaultValue: record?.departman,
                type: "select",
                name: "departman",
                label: "Birimi",
                options: departmanlar,
              },
              {
                defaultValue: record?.tezgah_isIstasyon,
                type: "select",
                name: "tezgah_isIstasyon",
                label: "Tezgah Seçim",
                options: Tezgahlar,
              },
              {
                defaultValue: record?.personel,
                type: "select",
                name: "personel",
                label: "Personel",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
              },
              {
                defaultValue: record?.gorevVeren,
                type: "select",
                name: "gorevVeren",
                label: "Görev Veren",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
              },

              {
                defaultValue: record?.yonetimOnay,
                type: "select",
                name: "yonetimOnay",
                label: "Yönetim Onay",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
              },
            ]}
            onSubmit={function (data: Overtime): void {
              if (
                record?.durumu == "BEKLEMEDE" ||
                record?.durumu == undefined
              ) {
                data.tarih=fromIsoDateString(data.tarih);
                dispatch(addOvertime(data));
                close(null);
              } else {
                dispatch(
                  setNotification({
                    title: "UYARI",
                    message:
                      "Durumu  BEKLEMEDE  olmayan formu değiştiremezsiniz.",
                    type: "warning",
                    duration: 5000,
                  })
                );
              }
            }}
          />
        );
      },
    });
  };
  const { setLoading } = useLoading();
  setLoading(loading);
  const { openModal } = useModal();
  const NewRecordHandler = async (record?: Overtime) => {
    if (
      (projects_.length == 0 || projects_ == null) &&
      (products_.length == 0 || products_ == null)
    ) {
      dispatch(await projectsSlice.actions.fetchAll())
        .unwrap()
        .then(async (data) => {
          dispatch(await productsSlice.actions.fetchAll())
            .unwrap()
            .then((data1) => {
              OpenModal_(record, data, data1);
            });
        });
    } else {
     OpenModal_(record, projects_, products_);
    }
  };
  const confirm = useConfirm();
  const actionBodyTemplate = (rowData: Overtime) => (
    <div className="flex flex-row">
      <button
        onClick={() => {
          NewRecordHandler(rowData);
        }}
        className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-yellow-500 hover:bg-yellow-600 
                    text-white 
                    rounded 
                    mr-2
                  "
      >
        <FaPencilAlt title="Düzenle" />
      </button>
      <button
        onClick={async () => {
          const isConfirmed = await confirm({
            title: "Silme işlemi",
            message: "Formu silmek istediğinize emin misiniz?",
            confirmText: "Evet",
            cancelText: "Vazgeç",
          });
          if (isConfirmed) {
            if  (
                            rowData?.durumu !== "BEKLEMEDE"               
                          ) {
                            dispatch(
                              setNotification({
                                title: "UYARI",
                                message:
                                  "Durumu  BEKLEMEDE  olmayan formu silemezsiniz.",
                                type: "warning",
                                duration: 5000,
                              })
                            );
                          } 
                          else 
            dispatch(deleteOvertime(rowData.id));
          }
        }}
        className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-red-600 hover:bg-red-700 
                    text-white 
                    rounded
                     mr-2
                  "
      >
        <FaTrash title="Formu Sil" />
      </button>
      {/* <input type="file" ref={inputRef} onChange={(e) => UploadDocument(e, rowData.id ?? -1,rowData.contentType)} style={{ display: "none" }} /> */}
    </div>
  );
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">
        Personel Fazla Mesai Talep Listesi
      </h2>
      <SmartTable
        data={data}
        enablePagination={false}
           frozenColumns={[{name:"id",right:true}]}
        scrollHeight="calc(100vh - 200px)"
        newRecordVoid={NewRecordHandler}
        columns={[
          {
            accessor: "__index",
            header: "#",
          },
          {
            accessor: "durumu",
            header: "Durumu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "personel",
            header: "Personel",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "departman",
            header: "Birimi",
            filterable: true,
            sortable: true,
            filterType: "select",
            filterOptions: departmanlar,
          },
          {
            accessor: "tarih",
            header: "Tarih",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "projeKodu",
            header: "Proje Kodu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "projeAdi",
            header: "Proje Adı",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "parcaKodu",
            header: "Parça Kodu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "parcaAdi",
            header: "Parça Adı",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "aciklama",
            header: "Mesai Nedeni",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "id",
            header: "İşlemler",
            body: (e) => actionBodyTemplate(e),
          },
        ]}
        rowIdAccessor={"id"}
      />
    </div>
  );
};
