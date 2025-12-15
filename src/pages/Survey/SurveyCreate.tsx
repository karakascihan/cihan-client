import React, { useEffect, useState } from "react";
import type { Question, QuestionGroup, Survey, Option } from "../../types/survey";
import {  SurveyCreateService } from "../../services";
import { ApiResponseClient } from "@/types/apiResponse";
import { SURVEY_CREATE, SURVEY_GET } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "@/context/ConfirmContext";
import { apiRequest } from "@/services/apiRequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setNotification } from "@/store/slices/notificationSlice";
import { SurveyType } from "@/api/apiDtos";



const emptyQuestion: Question = { text: "", type: 1 };
const emptyOption: Option = { text: "", puan: null };
const emptyGroup: QuestionGroup = {
  name: "",
  surveyOption: [],
  surveyQuestion: [],
  inverseParentGroup: [],
};
const initialSurvey: Survey = {
  id: 0,
  title: "",
  description: "",
  surveyQuestionGroup: [],
  surveyType: SurveyType.Egitim
};
export default function SurveyCreate() {
  const [survey, setSurvey] = useState<Survey>(initialSurvey);
  const { id } = useParams<{ id?: string }>();
const confirm_=useConfirm();
const dispatch=useDispatch();
const navigate=useNavigate();
 const token=useSelector<RootState>(x=>x.login.accessToken);
  useEffect(() => {
    if (id) {
      apiRequest<ApiResponseClient<Survey>>("GET", SURVEY_GET + "/" + id,{Authorization:"Bearer "+token}).then(result => {
        if (result) {
          setSurvey(result.result);
        }
        else setSurvey(initialSurvey);
      });

    } else setSurvey(initialSurvey);
  }, [id])

  const handleSurveyChange = (field: keyof Survey, value: string) => {
    setSurvey({ ...survey, [field]: value });
  };

  const addGroup = () => {
    setSurvey({
      ...survey,
      surveyQuestionGroup: [...(survey.surveyQuestionGroup || []), { ...emptyGroup }],
    });
  };

  const updateGroup = (index: number, updatedGroup: QuestionGroup) => {
    const groups = survey.surveyQuestionGroup ? [...survey.surveyQuestionGroup] : [];
    groups[index] = updatedGroup;
    setSurvey({ ...survey, surveyQuestionGroup: groups });
  };

  const removeGroup = (index: number) => {
    const groups = survey.surveyQuestionGroup ? [...survey.surveyQuestionGroup] : [];
    groups.splice(index, 1);
    setSurvey({ ...survey, surveyQuestionGroup: groups });
  };
  const handleSubmit = async () => {
    try {
      // const res2 = await client.post("/survey/create", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json", "Authorization": Token },
      //     body: JSON.stringify({ title, description, questionGroups: groups }),
      // });
      const res = await  apiRequest<ApiResponseClient<Survey>>("POST", SURVEY_CREATE,{Authorization:"Bearer "+token},survey)
      // const res = await SurveyCreateService(survey);
      if (res.statusCode !== 200) throw new Error("Sunucu hatası");
      dispatch(setNotification({
        type: "success", title: "Anket başarıyla kaydedildi!",
        message: " "
      }))
      navigate("/formlar/"+survey.surveyType);
      //    setSurvey({});
      // setGroups([JSON.parse(JSON.stringify(emptyGroup))]);
    } catch (e) {
      dispatch(setNotification({
        type: "error", title: "Anket Kaydedilirken Hata Oluştu",
        message: e.message
      }))
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow rounded-md">
      <h1 className="text-3xl text-center font-bold mb-6">Dinamik Form Oluşturma Ekranı</h1>

      {/* Survey Info */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Form Başlığı</label>
        <input
          type="text"
          value={survey.title}
          onChange={(e) => handleSurveyChange("title", e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Başlık giriniz"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Form Açıklaması</label>
        <textarea
          value={survey.description}
          onChange={(e) => handleSurveyChange("description", e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Açıklama giriniz"
          rows={4}
        />
      </div>
          <div className="mb-6">
        <label className="block font-medium mb-1">Puan Durumu</label>
        <select
          value={survey.puanIsShow??false}
          onChange={(e) =>
            handleSurveyChange("puanIsShow", e.target.value)
          }
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="true">Görünsün</option>
          <option value="false">Görünmesin</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1">Form Tipi</label>
        <select
          value={survey.surveyType}
          onChange={(e) =>
            handleSurveyChange("surveyType", e.target.value)
          }
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="0">Eğitim Değerlendirme Formu</option>
          <option value="1">Tedarikçi Değerlendirme Formu</option>
          <option value="2">Yetkinlik/Beceri Matris Formu</option>
          <option value="4">PersonelDeğerlendirme Formu</option>
          <option value="3">Diğer</option>
        </select>
      </div>
    
      {/* Question Groups */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Soru Grupları</h2>
        {survey.surveyQuestionGroup?.map((group, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded p-4 mb-6 bg-gray-50"
          >
            <QuestionGroupForm
              group={group}
              onUpdate={(updated) => updateGroup(index, updated)}
              onRemove={() => { confirm_({
          title: "Silme işlemi",
          message: "Grubu silmek istediğinize emin misiniz?",
          confirmText: "Evet",
          cancelText: "Vazgeç",
        }).then(isConfirmed=>{if (isConfirmed) {
             removeGroup(index)
        } }); 
       }}
            />
          </div>
        ))}
        <button
          onClick={addGroup}
          className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700"
        >
          Yeni Grup Ekle
        </button>
      </div>

      <button onClick={handleSubmit} className="bg-indigo-700 text-white px-2 py-2 rounded hover:bg-indigo-800">
        Formu Kaydet
      </button>
    </div>
  );
}

interface QuestionGroupFormProps {
  group: QuestionGroup;
  onUpdate: (group: QuestionGroup) => void;
  onRemove: () => void;
}
const QuestionGroupForm: React.FC<QuestionGroupFormProps> = ({
  group,
  onUpdate,
  onRemove,
}) => {
  const updateField = (field: keyof QuestionGroup, value: any) => {
       
              onUpdate({ ...group, [field]: value });

        
  }
  const addQuestion = () => {
    updateField("surveyQuestion", [...group.surveyQuestion, { ...emptyQuestion }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...group.surveyQuestion];
    updated[index] = { ...updated[index], [field]: value };
    updateField("surveyQuestion", updated);
  };

  const removeQuestion = (index: number) => {
    const updated = group.surveyQuestion.filter((_, i) => i !== index);
    updateField("surveyQuestion", updated);
  };

  const addOption = () => {
    updateField("surveyOption", [...group.surveyOption, { ...emptyOption }]);
  };

  const updateOption = (index: number, field: keyof Option, value: any) => {
    const updated = [...group.surveyOption];
    updated[index] = { ...updated[index], [field]: value };
    updateField("surveyOption", updated);
  };

  const removeOption = (index: number) => {
    const updated = group.surveyOption.filter((_, i) => i !== index);
    updateField("surveyOption", updated);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Grup Adı</label>
        <input
          type="text"
          value={group.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Grup Adı"
        />
      </div>

      {/* Questions */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Sorular</h3>
        {group.surveyQuestion.map((q, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
          >
            <div>
              <label className="block text-sm mb-1"> Başlık</label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestion(i, "text", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tip</label>
              <select
                value={q.type}
                onChange={(e) =>
                  updateQuestion(i, "type", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="1">Çoktan Seçmeli</option>
                <option value="0">Metin</option>
              </select>
            </div>
            <button
              onClick={() => removeQuestion(i)}
              className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
        >
          Ekle
        </button>
      </div>

      {/* Options */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Seçenekler</h3>
        {group.surveyOption.map((opt, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
          >
            <div>
              <label className="block text-sm mb-1">Başlık</label>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => updateOption(i, "text", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Puan</label>
              <input
                type="number"
                value={opt.puan}
                onChange={(e) =>
                  updateOption(i, "puan", Number(e.target.value))
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              onClick={() => removeOption(i)}
              className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700"
        >
          Seçenek Ekle
        </button>
      </div>

      <button
        onClick={onRemove}
        className="bg-red-700 text-white px-2 py-2 rounded hover:bg-red-800"
      >
        Grubu Sil
      </button>
    </div>
  );
};
