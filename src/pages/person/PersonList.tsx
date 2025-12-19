import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import type { Personel } from "../../types/person";
import { departmanlar } from "./OvertimeList";
import { apiRequest } from "@/services/apiRequestService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { PERSONEL_GETALLNAMES } from "@/api";
import { SmartTable } from "@/components/SmartTable";
import { createPersonel, deletePersonel, fetchpersonels, updatePersonel } from "@/store/slices/personalSlice";
import { useModal } from "@/context/ModalContext";
import { GenericForm } from "@/components/GenericForm";
import { PersonelDto, PersonelDtoForInsertion } from "@/api/apiDtos";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useConfirm } from "@/context/ConfirmContext";

export default function PersonList({
  isModal = false,
  isActive = true,
}: {
  isModal: boolean;
  isActive: boolean;
}) {
  const [personels, setPersonels] = useState<Personel[]>([]);
  const token = useSelector<RootState>((x) => x.login.accessToken);
  const personelState= useSelector<RootState>((x) => x.personel);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
const confirm=useConfirm();
  // useEffect(() => {
  //   apiRequest(
  //     "GET",
  //     PERSONEL_GETALLNAMES +
  //       "?onlyNames=false&isActive=" +
  //       (isActive == true ? "true" : "false"),
  //     { Authorization: "Bearer " + token }
  //   )
  //     .then((data) => {
  //       setPersonels(data.result);
  //     })
  //     .catch((error) =>
  //       console.error("Personel verisi alınırken hata:", error)
  //     );
  // }, [isActive, isModal]);
  useEffect(() => {
   if(personelState.items.length==0)
   {
    dispatch(fetchpersonels({
      onlyNames: false,
      isActive: true
    }))
   }
  }, [])
  
  const getColumns = () => {
    let sendData = [
      { accessor: "__index", header: "#" },

      {
        accessor: "personelAdi",
        header: "Ad",
        summaryType: "count",
        filterable: true,
        sortable: true,
      },
      {
        accessor: "personelSoyadi",
        header: "Soyad",
        filterable: true,
        sortable: true,
      },
      //  {accessor:"isActive",header:"Aktif/Pasif",sortable:true,filterable:true,filterType: "checkbox",
      //   body: (rowData) => (
      //     <input
      //       type="checkbox"
      //       checked={rowData?.isActive ?? false}
      //       className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      //     />
      //   ),},
      {
        accessor: "personelDepartman",
        header: "Departman",
        filterable: true,
        sortable: true,
        filterType: "select",
        filterOptions: departmanlar,
      },
      {
        accessor: "personelGorevi",
        header: "Görev",
        filterable: true,
        sortable: true,
      },
      {
        accessor: "telefonNo",
        header: "Telefon",
        filterable: true,
        sortable: true,
      },
      {
        accessor: "ePosta",
        header: "E-Posta",
        filterable: true,
        sortable: true,
      },
      {
        accessor: "iseGirisTarihi",
        header: "İşe Giriş Tarihi",
        filterable: true,
        sortable: true,
      },
        {
            header: "İşlemler",
            accessor: "id",
            body: (row: PersonelDto) => (
              <div className="flex flex-row">
                 <button
                            onClick={() => {
                              PersonelDuzenle(row);
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
                      message: "Dosyayı silmek istediğinize emin misiniz?",
                      confirmText: "Evet",
                      cancelText: "Vazgeç",
                    });
                    if (isConfirmed) {
                      dispatch(deletePersonel(row.id!));
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
                >
                  <FaTrash title="Sil" />
                </button>
              </div>
            ),
          },
    ];
    if (isModal) {
      sendData.unshift({ accessor: "__select", header: "" });
    }
    return sendData;
  };
  const PersonelDuzenle = (row: PersonelDto) => {
    openModal({
      title: "Personel Kayıt Ekranı",
      content: (close)=> {
        return (
        <GenericForm
          fields={[
            {
              name: "personelAdi",
              label: "Personel Adı",
              type: "text",
              required:true,
              defaultValue: row.personelAdi
            },
            {
              name: "personelSoyadi",
              label: "Personel Soyadı",
              type: "text",
              required:true,
              defaultValue: row.personelSoyadi
            },
            {
              name: "personelDepartman",
              label: "Departman",
              type: "select",
              options: departmanlar,
              required:true,
              defaultValue: row.personelDepartman

            },
            {
              name: "personelGorevi",
              label: "Görevi",
              type: "text",
              required:true,
              defaultValue: row.personelGorevi
            },
            {
              name: "telefonNo",
              label: "Telefon",
              type: "text",
              defaultValue: row.telefonNo
            },
            {
              name: "ePosta",
              label: "E-Posta",
              type: "text",
              defaultValue: row.ePosta
            },
            {
              name: "iseGirisTarihi",
              label: "İşe Giriş Tarihi",
              type: "date",
              defaultValue: row.iseGirisTarihi
            }
          ]}
          onSubmit={function (data: PersonelDto): void {
            if(row)
            {
             dispatch(
              updatePersonel({id:row.id!,data})
            );
            }
            else
            dispatch(
              createPersonel(data)
            );
        close(null);

          }}
        />);
      },
    });
  };
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Personel Listesi</h2>
      <SmartTable
        data={personelState.items}
        enablePagination={false}
        newRecordVoid={(row) => PersonelDuzenle(row)}
        scrollHeight={`${
          isModal ? "calc(100vh - 320px)" : "calc(100vh - 200px)"
        }`}
        columns={getColumns()}
        rowIdAccessor={"id"}
      />
    </div>
  );
}
