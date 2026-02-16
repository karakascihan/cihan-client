import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SurveyGetAllService } from "../../services";
import { Link } from "react-router-dom";
import { SmartTable } from "@/components/SmartTable";
import { FaPlus, FaTrash } from "react-icons/fa";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponseClient } from "@/types/apiResponse";
import { SURVEY_DELETE, SURVEY_GETALL } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setNotification } from "@/store/slices/notificationSlice";
import { useConfirm } from "@/context/ConfirmContext";
import SurveyFill from "./SurveyFill";
import { useTabs } from "@/context/TabsContext";
import SurveyCreate from "./SurveyCreate";

interface Survey {
  id: number;
  title: string;
}

const SurveyList: React.FC = ({ type }: { type?: string }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  // const { type } = useParams<{ type: string }>();
  const [status, setStatus] = useState(false);
  const token = useSelector<RootState>(x => x.login.accessToken);
  useEffect(() => {
    apiRequest<ApiResponseClient<Survey>>("GET", SURVEY_GETALL + "?type=" + type, { Authorization: "Bearer " + token })
      //  SurveyGetAllService(type)
      .then(x => { console.log(x); setSurveys(x.result) }).catch(console.error)
  }, [type, status]);


  const confirm = useConfirm();
  const dispatch = useDispatch();
  const Delete = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Silme işlemi",
      message: "Formu silmek istediğinize emin misiniz?",
      confirmText: "Evet",
      cancelText: "Vazgeç",
    });
    if (isConfirmed) {
      const result = await apiRequest<ApiResponseClient<Survey>>("DELETE", SURVEY_DELETE + "/" + id, { Authorization: "Bearer " + token })
      if (result.statusCode === 0) {
        dispatch(
          setNotification({
            title: result.message,
            message: result.result
          }));
        setStatus(prev => !prev);
      }
      else {
        dispatch(
          setNotification({
            title: result.message,
            message: result.result,
            type: "error"
          }));
      }
    }
  }
  const { openTab } = useTabs();
  const GetCommits = (id: Survey) => {
    return (
      <div className="flex justify-end">  <Link
        to={`/form/doldur/${id.id}`}
        onClick={() => {
          openTab({
            id: `/form/doldur/${id.id}`,
            title: "Form Doldur",
            component: <SurveyFill id={id.id} />,
          });
        }}
        className="
           inline-flex items-center 
           px-2 py-1
           bg-blue-600 hover:bg-blue-700 
           text-white 
           rounded
           mr-2
         "
      >
        Form Doldur
      </Link>
        <Link
          to={`/form/olustur/${id.id}`}
          onClick={() => {
            openTab({
              id: `/form/olustur/${id.id}`,
              title: "Form Oluştur",
              component: <SurveyCreate id={id.id} />,
            });
          }}
          className="
           inline-flex items-center 
             px-2 py-1
           bg-green-600 hover:bg-green-700 
           text-white 
           rounded
           mr-2
         "
        >
          Form Oluştur
        </Link>
        <button
          title="Sil"
          onClick={() => Delete(id.id)}
          className="
                 inline-flex items-center 
                 px-4 py-2 
                 bg-red-600 hover:bg-red-700 
                 text-white 
                 rounded
                  mr-2
               "
        >  <FaTrash /></button>
      </div>
    )
  }
  return (
    <div className="card">
      <h2 className="text-xl text-center font-semibold mb-4">{type === "0" ? "Eğitim Değerlendirme Formları" : type === "1" ? "Tedarikçi Değerlendirme Formları" : "Diğer Formlar"}</h2>
      <SmartTable
        enablePagination={false}
        data={surveys}

        columns={[
          { header: "#", accessor: "__index" },
          { header: "Form Adı", accessor: "title", sortable: true, filterable: true },
          { header: "İşlemler", accessor: "id", body: (T) => GetCommits(T) },
        ]} rowIdAccessor={"title"} />
    </div>

  );
};

export default SurveyList;
