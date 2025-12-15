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
import { setNotification } from "@/store/slices/notificationSlice";
import {
  addStaffLeave,
  deleteStaffLeave,
  fetchStaffLeaves,
} from "@/store/slices/staffLeaveSlice";
import { AppDispatch, RootState } from "@/store/store";
import { StaffLeave } from "@/types/commonType";
import { PersonelNames } from "@/types/personel";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export function toIsoDateString(str: any) {
  if (!str) return "";
  const [day, month, year] = str.split(".");
  return `${year}-${month}-${day.padStart(2, "0")}`;
}
export function fromIsoDateString(str: any) {
  if (!str) return "";
  const [year, month, day] = str.split("-");
  return `${day.padStart(2, "0")}.${month}.${year}`;
}
export const StaffLeaveList = () => {
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.staffLeave
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStaffLeaves());
  }, [dispatch]);
  useEffect(() => {
    PersonelGetNamesService(true).then((data) => {
      setPersonels(data.result);
    });
  }, []);

  const { setLoading } = useLoading();
  setLoading(loading);
  const departmanlar = [
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

  const { openModal } = useModal();
  const NewRecordHandler = (record?: StaffLeave) => {
    openModal({
      title:
        "Personel İzin Formu " +
        (record?.id ? "Düzenleme" : "Kaydetme") +
        " Ekranı",
      content(close) {
        return (
          <GenericForm
            fields={[
              {
                type: "text",
                name: "id",
                label: "Personel",
                hidden: true,
                defaultValue: record?.id,
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
                defaultValue: record?.birimi,
                type: "select",
                name: "birimi",
                label: "Birimi",
                options: departmanlar,
                required: true,
              },
              {
                defaultValue: record?.izinTuru,
                type: "select",
                name: "izinTuru",
                label: "İzin Türü",
                options: izinTurleri,
                required: true,
              },
              {
                defaultValue: record?.izinNedeni,
                type: "text",
                name: "izinNedeni",
                label: "İzin Nedeni",
              },
              {
                defaultValue:
                  record?.baslangicTarih &&
                  toIsoDateString(record?.baslangicTarih) +
                    "T" +
                    record?.baslaSaat,
                type: "datetime-local",
                name: "baslangicTarih",
                label: "Başlangıç Tarihi",
                required: true,
              },
              {
                defaultValue:
                  record?.bitisTarih &&
                  toIsoDateString(record?.bitisTarih) + "T" + record?.bitisSaat,
                type: "datetime-local",
                name: "bitisTarih",
                label: "Bitiş Tarihi",
                required: true,
              },
              {
                defaultValue:
                  record?.gorevBaslaTarihi &&
                  toIsoDateString(record?.gorevBaslaTarihi) +
                    "T" +
                    record?.gorevBaslaSaati,
                type: "datetime-local",
                name: "gorevBaslaTarihi",
                label: "Göreve Başlama Tarihi",
              },
              {
                defaultValue: record?.adres,
                type: "textarea",
                name: "adres",
                label: "Adres",
              },
              {
                defaultValue: record?.bolumSorumlusu,
                type: "select",
                name: "bolumSorumlusu",
                label: "Bölüm Sorumlusu",

                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
                required: true,
              },
              {
                defaultValue: record?.yerineBakacakKisi,
                type: "select",
                name: "yerineBakacakKisi",
                label: "Yerine Bakacak Kişi",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
                required: true,
              },
              {
                defaultValue: record?.iK_Onay,
                type: "select",
                name: "iK_Onay",
                label: "İk Onay",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
              },
              {
                defaultValue: record?.yonetim_Onay,
                type: "select",
                name: "yonetim_Onay",
                label: "Yönetim Onay",
                options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
                  label: x.personelAdi + " " + x.personelSoyadi,
                  value: x.personelAdi + " " + x.personelSoyadi,
                })),
              },
            ]}
            onSubmit={function (data: StaffLeave): void {
              if (record?.durumu !== "BEKLEMEDE" && record?.durumu) {
                dispatch(
                  setNotification({
                    title: "UYARI",
                    message:
                      "Durumu  BEKLEMEDE  olmayan formu değiştiremezsiniz.",
                    type: "warning",
                    duration: 5000,
                  })
                );
              } else {
                if (data.personelId) {
                  let person = personels.filter(
                    (x) =>
                      x.personelAdi + " " + x.personelSoyadi == data.personel
                  );
                  if (person && person.length > 0) {
                    data.personelId = person[0].id;
                  }
                }
                const date = new Date(data.baslangicTarih);
                data.baslaSaat =
                  date.getHours().toString().padStart(2, "0") +
                  ":" +
                  date.getMinutes().toString().padStart(2, "0");
                data.baslangicTarih =
                  date.getDate() +
                  "." +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "." +
                  date.getFullYear();
                const date1 = new Date(data.bitisTarih);
                data.bitisTarih =
                  date1.getDate() +
                  "." +
                  (date1.getMonth() + 1).toString().padStart(2, "0") +
                  "." +
                  date1.getFullYear();
                data.bitisSaat =
                  date1.getHours().toString().padStart(2, "0") +
                  ":" +
                  date1.getMinutes().toString().padStart(2, "0");
                const date3 = new Date(data.gorevBaslaTarihi);
                data.gorevBaslaSaati =
                  date3.getHours().toString().padStart(2, "0") +
                  ":" +
                  date3.getMinutes().toString().padStart(2, "0");
                data.gorevBaslaTarihi =
                  date3.getDate() +
                  "." +
                  (date3.getMonth() + 1).toString().padStart(2, "0") +
                  "." +
                  date3.getFullYear();
                dispatch(addStaffLeave(data));
                close(null);
              }
            }}
          />
        );
      },
    });
  };
  const confirm = useConfirm();
  const izinTurleri = [
    {
      label: "YILLIK İZİN",
      value: "YILLIK İZİN",
    },
    {
      label: "İDARİ İZİN",
      value: "İDARİ İZİN",
    },
    {
      label: "ÜCRETSİZ İZİN",
      value: "ÜCRETSİZ İZİN",
    },
    {
      label: "BABALIK İZNİ",
      value: "BABALIK İZNİ",
    },
    {
      label: "EVLİLİK İZNİ",
      value: "EVLİLİK İZNİ",
    },
    {
      label: "DOĞUM  İZNİ",
      value: "DOĞUM İZNİ",
    },
    {
      label: "ÖLÜM İZNİ",
      value: "ÖLÜM İZNİ",
    },
  ];
  const actionBodyTemplate = (rowData: StaffLeave) => (
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
            if (rowData?.durumu !== "BEKLEMEDE") {
              dispatch(
                setNotification({
                  title: "UYARI",
                  message: "Durumu  BEKLEMEDE  olmayan formu silemezsiniz.",
                  type: "warning",
                  duration: 5000,
                })
              );
            } else dispatch(deleteStaffLeave(rowData.id));
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
        Personel İzin Talep Listesi
      </h2>
      <SmartTable
        data={data}
        enablePagination={false}
        scrollHeight="calc(100vh - 200px)"
          frozenColumns={[{name:"id",right:true}]}
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
            accessor: "birimi",
            header: "Birimi",
            filterable: true,
            sortable: true,
            filterType: "select",
            filterOptions: departmanlar,
          },
          {
            accessor: "izinNedeni",
            header: "İzin Nedeni",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "izinTuru",
            header: "İzin Türü",
            filterable: true,
            sortable: true,
            filterType: "select",
            filterOptions: izinTurleri,
          },
          {
            accessor: "baslangicTarih",
            header: "Başlangıç Tarihi",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "bitisTarih",
            header: "Bitiş Tarihi",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "adres",
            header: "Adres",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "yerineBakacakKisi",
            header: "Yerine Bakacak Kişi",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "gorevBaslaTarihi",
            header: "Göreve Başlama Tarihi",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "bolumSorumlusu",
            header: "Bölüm Sorumlusu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "iK_Onay",
            header: "İk Onay",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "yonetim_Onay",
            header: "Yönetim Onay",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "durumAciklama",
            header: "Durum Açıklama",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "kullanici",
            header: "Kullanıcı",
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
