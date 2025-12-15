import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { apiRequest, PersonelGetNamesService, SurveyFillService, SurveyGetService } from "../../services";
import { type PersonelNames } from "../../types/personel";
import { Question, type Survey } from "../../types/survey";
import { type Answer } from "../../types/survey";
import { ConfirmPopup } from "primereact/confirmpopup";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { EducationPlan } from "@/types/education";
import { EDUCATION_PLAN_GET, EDUCATION_PLAN_GETALL, SURVEY_FILL, SURVEY_GET } from "@/api";
import { ApiResponse, ApiResponseClient } from "@/types/apiResponse";
import { parseToJsDate } from "@/utils/commonUtils";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useLoading } from "@/context/LoadingContext";
import { RootState } from "@/store/store";
import { SurveyType } from "@/api/apiDtos";

export default function SurveyFill() {
  const { id, educationId } = useParams<{ id: string, educationId?: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [educationPlan, setEducationPlan] = useState<EducationPlan | null>(null);
  const [personelId, setPersonelId] = useState<number | undefined>(undefined);
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
   const user= useSelector<RootState>(x=>x.login)
  const navigate = useNavigate();
const {setLoading}=useLoading();
  useEffect(() => {
    setLoading(true);
    if (!id) return;
    (async function () {
      const result = await apiRequest<ApiResponseClient<Survey>>("GET", SURVEY_GET + "/" + id);
      if (result) {
        setSurvey(result.result);
         PersonelGetNamesService().then((x) => {
            setPersonels(x.result);
          });
        if (result.result?.surveyType === SurveyType.Egitim || result.result?.surveyType === SurveyType.Personel) {
          if (educationId) {
           const education= await apiRequest<ApiResponseClient<EducationPlan>>("GET",EDUCATION_PLAN_GET + "/" + educationId);
           setEducationPlan(education.result);
          }
        }
        else {
         
        }
      }
 setLoading(false);
     
    })();
  }, []);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleOptionChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, optionId }];
    });
  };
  const handleTextChange = (questionId: number, text: string, isText: boolean = true) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (isText) {
        if (existing) {
          return prev.map((a) =>
            a.questionId === questionId ? { ...a, textAnswer: text } : a
          );
        } else {
          return [...prev, { questionId, textAnswer: text }];
        }
      }
      else {
        if (existing) {
          return prev.map((a) =>
            a.questionId === questionId ? { ...a, optionDescription: text } : a
          );
        } else {
          return [...prev, { questionId, optionDescription: text }];
        }
      }

    });
  };
  const handleSubmit = async () => {
    if (!survey) return;
    const payload = {
      surveyId: survey.id,
      personelId: personelId,
      personelEducationPlanId: educationId,
      answers
    };

    try {
      const res = await  apiRequest<ApiResponseClient<Survey>>("POST", SURVEY_FILL,payload,{Authorization:"Bearer "+user.accessToken},)
      if (res.statusCode !== 200) throw new Error("Sunucu hatası");

      alert("Anket başarıyla gönderildi!");
      navigate("/");
    } catch (e) {
      alert("Gönderilemedi: " + e);
    }
  };
  const dispatch = useDispatch();
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);

  const accept = () => {
    let notFills: Question[] = [];
    let allQuestions: Question[] = [];
    survey?.surveyQuestionGroup?.forEach(element => {
      allQuestions.push(...element.surveyQuestion);
    });
    if (allQuestions && allQuestions.length > 0) {
      allQuestions.filter(c => c.type === 1).forEach(x => {
        if (answers.filter(a => a.questionId === x.id).length === 0) {
          notFills.push(x);
        }
      });
    }
    if (notFills.length > 0) {
      dispatch(setNotification({ message: "Cevaplanmayan " + notFills.length + " Adet Soru Var", title: "Eksik Cevap", type: "warning" }));
    }
    else {
      handleSubmit();
    }

  };

  const reject = () => {
  };
  let egitimci:any =personels.filter(x=>x.id == educationPlan?.egiticiPersonelId)[0];
  if (egitimci) {
    egitimci = educationPlan.icKaynakMi ? egitimci.personelAdi+ " "+ egitimci.personelSoyadi:educationPlan.disKaynakAdi;
    
  }

  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-md">
      <h1 className="text-3xl text-center font-bold mb-2">{survey?.surveyType=== SurveyType.Egitim ? educationPlan?.egitimAdi+" Değerlendirme Formu": survey?.title}</h1>
      <p className="text-gray-700 mb-8">{survey?.description}</p>
      {
        educationPlan &&  <div  className="mb-8 border border-gray-300 p-4 rounded">
          <h2 className="text-xl text-center font-semibold mb-4">Eğitim Bilgileri</h2>
              <div className="mb-6">
                <label className="block text-md font-large mb-2">
                  Eğitimci Adı : {egitimci}
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-md font-large mb-2">
                  Eğitim Tarihi : {educationPlan.egitimBitisTarihi&& parseToJsDate(educationPlan.egitimBitisTarihi?.toString()).toLocaleDateString()}
                </label>
              </div>
        </div>
      }
      {
        survey?.surveyType === SurveyType.Yetkinlik &&
        <     div className="card flex justify-content-center border border-gray-300 flex-col p-2 rounded mb-8">

          <h2 className="text-xl text-center font-semibold mb-4">{survey?.surveyType=== SurveyType.Yetkinlik ?"Değerlendirilecek Personel Seçiniz":"Formu Dolduran Personel *"}</h2>
          <Dropdown value={personelId} showClear style={{ border: "1px solid" }} onChange={(e: DropdownChangeEvent) => setPersonelId(e.value)} options={personels?.map(x => ({
            name: x.personelAdi + " " + x.personelSoyadi,
            id: x.id,
            value: x.id
          }))} optionLabel="name" placeholder=" Personel Seçiniz"
            filter className="w-full md:w-14rem" />
        </div>
      }

      {survey?.surveyQuestionGroup?.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8 border border-gray-300 p-4 rounded">
          <h2 className="text-xl text-center font-semibold mb-4">{group.name}</h2>

          {group.surveyQuestion.map((q, questionIndex) => {
            const key = `group${groupIndex}_question${questionIndex}`;
            return (
              <div key={questionIndex} className="mb-6">
                <label className="block text-md font-large mb-2">
                  {questionIndex + 1 + ". " + q.text}
                </label>

                {q.type === 0 ? (
                  <input
                    className="w-full border border-gray-300 p-2 rounded"
                    value={
                      answers.find((a) => a.questionId === q.id)?.textAnswer || ""
                    }
                    onChange={(e) =>
                      handleTextChange(q.id ?? -1, e.target.value)
                    }
                    placeholder="Cevabınız..."
                  />
                ) : (
                  <div className="flex flex-col gap-2">
                    {group.surveyOption.map((opt, optIndex) => (
                      <label key={optIndex} className="inline-flex items-center">
                        <input
                          type="radio"
                          name={key}
                          value={opt.id}
                          checked={
                            answers.find((a) => a.questionId === q.id)?.optionId ===
                            opt.id
                          }
                          onChange={() =>
                            handleOptionChange(q.id ?? -1, opt.id ?? -1)
                          }

                          className="mr-2"
                        />
                        {opt.text} {survey.puanIsShow&& "( "+opt.puan+" puan )"} 
                      </label>
                    ))}
                    <input
                      className="w-full border border-gray-300 p-2 rounded"
                      value={
                        answers.find((a) => a.questionId === q.id)?.optionDescription || ""
                      }
                      onChange={(e) =>
                        handleTextChange(q.id ?? -1, e.target.value, false)
                      }
                      placeholder="Buradan Açıklama Girebilirsiniz"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <ConfirmPopup target={buttonEl.current} visible={confirmVisible} onHide={() => setConfirmVisible(false)}
        message="Form kaydedilecektir.Onaylıyor musunuz?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <button
        ref={buttonEl}
        onClick={() => setConfirmVisible(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 w-full"
      >
        Formu Gönder
      </button>
    </div>
  );

}
