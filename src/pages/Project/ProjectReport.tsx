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
  AppDispatch,
  productsSlice,
  projectReportSlice,
  projectsSlice,
  RootState,
} from "@/store/store";
import { Products, ProjectReport, Projects } from "@/types/commonType";
import { PersonelNames } from "@/types/personel";
import React, { ReactNode, useEffect, useState } from "react";
import {
  FaFileAlt,
  FaPencilAlt,
  FaShower,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { fromIsoDateString, toIsoDateString } from "../person/StaffLeaveList";
import { getMimeType } from "@/utils/commonUtils";

 const ProjectReportList = () => {
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const data = useSelector((state: RootState) => state.projectReport.items);
  const loading = useSelector(
    (state: RootState) => state.projectReport.loading
  );
  const dispatch = useDispatch<AppDispatch>();
  const products_ = useSelector((state: RootState) => state.products.items);
  const projects_ = useSelector((state: RootState) => state.projects.items);
  useEffect(() => {
    dispatch(projectReportSlice.actions.fetchAll());
  }, [dispatch]);
  useEffect(() => {
    PersonelGetNamesService(true).then((data) => {
      setPersonels(data.result);
    });
  }, []);
  const openReportModal = (record?: ProjectReport) => {
    openModal({
      maximizable: true,
      title:
        "Proje Takip Raporu " +
        (record?.id ? "Düzenleme" : "Giriş") +
        " Ekranı",
      content(close) {
        return (
          <ProjectReportForm
            record={record}
            projects={projects_}
            products={products_}
            personels={personels}
            onClose={close}
          />
        );
      },
    });
  };
  const { setLoading } = useLoading();
  setLoading(loading);
  const { openModal } = useModal();
  const NewRecordHandler = async (record?: ProjectReport) => {
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
  const actionBodyTemplate = (rowData: ProjectReport) => (
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
            dispatch(projectReportSlice.actions.deleteItem(rowData.id));
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
        Proje Takip Raporu Listesi
      </h2>
      <SmartTable
        data={data}
        enablePagination={false}
          frozenColumns={[{name:"id",right:true}]}
        scrollHeight="calc(100vh - 200px)"
        newRecordVoid={NewRecordHandler}
        // tableClassName="min-w-max"
        columns={[
          {
            accessor: "__index",
            header: "#",
          },
          {
            accessor: "raporNo",
            header: "Rapor No",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "tarih",
            header: "Tarih",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "projeNo",
            header: "Proje No",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "parcaKodu",
            header: "Parca Kodu",
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
            accessor: "revizyon",
            header: "Revizyon",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "hazirlayan",
            header: "Hazırlayan",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "onaylayan",
            header: "Onaylayan",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "aciklama",
            header: "Açıklama",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "durumu",
            header: "Durumu",
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
            accessor: "isActive",
            header: "Aktif",
            filterable: true,
            sortable: true,
            body: (e) => (e.isActive ? "Aktif" : "Pasif"),
          },
          {
            accessor: "dosyalar",
            header: "Dosya Durumu",

            body: (e) => (e.dosyalar?.length > 0 ? "Var" : "Yok"),
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
export default ProjectReportList;
