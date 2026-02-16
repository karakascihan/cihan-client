import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { apiRequest, PersonelGetNamesService } from "../../services";
import { type PersonelNames } from "../../types/personel";
import { Question, type Survey } from "../../types/survey";
import { type Answer } from "../../types/survey";
import { ConfirmPopup } from "primereact/confirmpopup";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { EducationPlan } from "@/types/education";
import { EDUCATION_PLAN_GET, SURVEY_FILL, SURVEY_GET } from "@/api";
import { ApiResponseClient } from "@/types/apiResponse";
import { parseToJsDate } from "@/utils/commonUtils";
import { useLoading } from "@/context/LoadingContext";
import { RootState } from "@/store/store";
import { SurveyType } from "@/api/apiDtos";

// Icons
const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function SurveyFill({ id }: { id?: string }) {
  const { educationId } = useParams<{ id: string; educationId?: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [educationPlan, setEducationPlan] = useState<EducationPlan | null>(null);
  const [personelId, setPersonelId] = useState<number | undefined>(undefined);
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const user = useSelector<RootState>((x) => x.login);
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  const buttonEl = useRef(null);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    (async function () {
      const result = await apiRequest<ApiResponseClient<Survey>>(
        "GET",
        SURVEY_GET + "/" + id
      );
      if (result) {
        setSurvey(result.result);
        PersonelGetNamesService().then((x) => {
          setPersonels(x.result);
        });
        if (
          result.result?.surveyType === SurveyType.Egitim ||
          result.result?.surveyType === SurveyType.Personel
        ) {
          if (educationId) {
            const education = await apiRequest<ApiResponseClient<EducationPlan>>(
              "GET",
              EDUCATION_PLAN_GET + "/" + educationId
            );
            setEducationPlan(education.result);
          }
        }
      }
      setLoading(false);
    })();
  }, [id]);

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
      } else {
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
      answers,
    };

    try {
      const res = await apiRequest<ApiResponseClient<Survey>>(
        "POST",
        SURVEY_FILL,
        payload,
        { Authorization: "Bearer " + user.accessToken }
      );
      if (res.statusCode !== 200) throw new Error("Sunucu hatası");

      dispatch(
        setNotification({
          type: "success",
          title: "Başarılı!",
          message: "Anket başarıyla gönderildi",
        })
      );
      navigate("/");
    } catch (e) {
      dispatch(
        setNotification({
          type: "error",
          title: "Hata!",
          message: "Form gönderilemedi: " + e,
        })
      );
    }
  };

  const accept = () => {
    let notFills: Question[] = [];
    let allQuestions: Question[] = [];
    survey?.surveyQuestionGroup?.forEach((element) => {
      allQuestions.push(...element.surveyQuestion);
    });
    if (allQuestions && allQuestions.length > 0) {
      allQuestions
        .filter((c) => c.type === 1)
        .forEach((x) => {
          if (answers.filter((a) => a.questionId === x.id).length === 0) {
            notFills.push(x);
          }
        });
    }
    if (notFills.length > 0) {
      dispatch(
        setNotification({
          message: "Cevaplanmayan " + notFills.length + " Adet Soru Var",
          title: "Eksik Cevap",
          type: "warning",
        })
      );
    } else {
      handleSubmit();
    }
  };

  const reject = () => { };

  let egitimci: any = personels.filter(
    (x) => x.id == educationPlan?.egiticiPersonelId
  )[0];
  if (egitimci) {
    egitimci = educationPlan?.icKaynakMi
      ? egitimci.personelAdi + " " + egitimci.personelSoyadi
      : educationPlan?.disKaynakAdi;
  }

  // Calculate progress
  const totalQuestions = survey?.surveyQuestionGroup?.reduce(
    (acc, group) => acc + group.surveyQuestion.length,
    0
  ) || 0;
  const answeredQuestions = answers.length;
  const progressPercentage = totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;

  // Get all questions with their refs
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Find first unanswered question
  const findFirstUnansweredQuestion = () => {
    if (!survey) return null;

    for (const group of survey.surveyQuestionGroup || []) {
      for (const question of group.surveyQuestion) {
        const answer = answers.find((a) => a.questionId === question.id);
        const isAnswered = question.type === 0
          ? answer?.textAnswer && answer.textAnswer.trim() !== ""
          : answer?.optionId !== undefined;

        if (!isAnswered) {
          return question.id;
        }
      }
    }
    return null;
  };

  // Scroll to first unanswered question
  const scrollToFirstUnanswered = () => {
    const firstUnansweredId = findFirstUnansweredQuestion();
    if (firstUnansweredId && questionRefs.current[firstUnansweredId]) {
      questionRefs.current[firstUnansweredId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      // Add a pulse animation
      questionRefs.current[firstUnansweredId]?.classList.add('animate-pulse');
      setTimeout(() => {
        questionRefs.current[firstUnansweredId]?.classList.remove('animate-pulse');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" max-w-5xl mx-auto rounded-xl shadow-sm bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-2">
          <div className="flex items-start gap-4">
            <div className="p-1 bg-white/10 rounded-lg backdrop-blur-sm">
              <DocumentIcon />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-2">
                {survey?.surveyType === SurveyType.Egitim
                  ? educationPlan?.egitimAdi + " Değerlendirme Formu"
                  : survey?.title}
              </h1>
              {survey?.description && (
                <p className="text-blue-100 text-lg">{survey.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Progress Bar */}
      <div className="max-w-5xl mx-auto rounded-xl mt-2 shadow-sm sticky -top-5 z-20 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">
              İlerleme Durumu
            </span>
            <button
              onClick={scrollToFirstUnanswered}
              className={`text-sm font-bold px-3 py-1 rounded-lg transition-all ${progressPercentage === 100
                ? "bg-green-500 text-white cursor-default"
                : "bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                }`}
            >
              {progressPercentage === 100 ? (
                <span className="flex items-center gap-2">
                  <CheckCircleIcon />
                  Tamamlandı
                </span>
              ) : (
                `${answeredQuestions} / ${totalQuestions} soru`
              )}
            </button>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div
              className="bg-white h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 ">
        {/* Education Info Card */}
        {educationPlan && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <InfoIcon />
                Eğitim Bilgileri
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserIcon />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Eğitimci</p>
                  <p className="font-medium text-gray-900">{egitimci}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CalendarIcon />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Eğitim Tarihi</p>
                  <p className="font-medium text-gray-900">
                    {educationPlan.egitimBitisTarihi &&
                      parseToJsDate(
                        educationPlan.egitimBitisTarihi?.toString()
                      ).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personnel Selection */}
        {survey?.surveyType === SurveyType.Yetkinlik && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <UserIcon />
                Değerlendirilecek Personel Seçiniz
              </h2>
            </div>
            <div className="p-6">
              <Dropdown
                value={personelId}
                showClear
                onChange={(e: DropdownChangeEvent) => setPersonelId(e.value)}
                options={personels?.map((x) => ({
                  name: x.personelAdi + " " + x.personelSoyadi,
                  id: x.id,
                  value: x.id,
                }))}
                optionLabel="name"
                placeholder="Personel Seçiniz"
                filter
                className="w-full"
                pt={{
                  root: { className: 'border-gray-300 rounded-lg' },
                  input: { className: 'px-4 py-3' }
                }}
              />
            </div>
          </div>
        )}

        {/* Question Groups */}
        {survey?.surveyQuestionGroup?.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                  {groupIndex + 1}
                </span>
                {group.name}
              </h2>
            </div>

            <div className="p-6 space-y-8">
              {group.surveyQuestion.map((q, questionIndex) => {
                const key = `group${groupIndex}_question${questionIndex}`;
                const answer = answers.find((a) => a.questionId === q.id);
                const isAnswered = q.type === 0
                  ? answer?.textAnswer && answer.textAnswer.trim() !== ""
                  : answer?.optionId !== undefined;

                return (
                  <div
                    key={questionIndex}
                    ref={(el) => {
                      if (q.id !== undefined) {
                        questionRefs.current[q.id] = el;
                      }
                    }}
                    className={`p-5 rounded-lg border-2 transition-all ${isAnswered
                      ? "border-green-200 bg-green-50/30"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${isAnswered
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                        }`}>
                        {isAnswered ? <CheckCircleIcon /> : questionIndex + 1}
                      </div>
                      <label className="flex-1 text-base font-medium text-gray-900 leading-relaxed">
                        {q.text}
                      </label>
                    </div>

                    {q.type === 0 ? (
                      // Text Input
                      <div className="ml-10">
                        <textarea
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                          value={answer?.textAnswer || ""}
                          onChange={(e) =>
                            handleTextChange(q.id ?? -1, e.target.value)
                          }
                          placeholder=""
                          rows={1}
                        />
                      </div>
                    ) : (
                      // Radio Options
                      <div className="ml-10 space-y-3">
                        {group.surveyOption.map((opt, optIndex) => {
                          const isSelected = answer?.optionId === opt.id;
                          return (
                            <label
                              key={optIndex}
                              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                                }`}
                            >
                              <input
                                type="radio"
                                name={key}
                                value={opt.id}
                                checked={isSelected}
                                onChange={() =>
                                  handleOptionChange(q.id ?? -1, opt.id ?? -1)
                                }
                                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="ml-3 text-gray-900 font-medium flex-1">
                                {opt.text}
                              </span>
                              {survey.puanIsShow && (
                                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                  {opt.puan} puan
                                </span>
                              )}
                            </label>
                          );
                        })}

                        {/* Additional Comment */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ek Açıklama (Opsiyonel)
                          </label>
                          <input
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            value={answer?.optionDescription || ""}
                            onChange={(e) =>
                              handleTextChange(q.id ?? -1, e.target.value, false)
                            }
                            placeholder="Buradan açıklama girebilirsiniz..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-xl shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={scrollToFirstUnanswered}
              className={`flex items-center gap-3 transition-all ${progressPercentage === 100 ? "cursor-default" : "cursor-pointer hover:bg-gray-50 p-3 rounded-lg -m-3"
                }`}
              disabled={progressPercentage === 100}
            >
              <div className={`p-2 rounded-lg ${progressPercentage === 100 ? "bg-green-100" : "bg-yellow-100"
                }`}>
                {progressPercentage === 100 ? (
                  <CheckCircleIcon />
                ) : (
                  <InfoIcon />
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {progressPercentage === 100
                    ? "Tüm sorular cevaplandı!"
                    : `${totalQuestions - answeredQuestions} soru cevap bekliyor`}
                </p>
                <p className="text-xs text-gray-500">
                  {progressPercentage === 100
                    ? "Formu göndermek için butona tıklayın"
                    : "İlk cevaplanmayan soruya gitmek için tıklayın"}
                </p>
              </div>
            </button>
            <button
              ref={buttonEl}
              onClick={() => setConfirmVisible(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              <SendIcon />
              Formu Gönder
            </button>
          </div>
        </div>

        <ConfirmPopup
          target={buttonEl.current}
          visible={confirmVisible}
          onHide={() => setConfirmVisible(false)}
          message="Form kaydedilecektir. Onaylıyor musunuz?"
          icon="pi pi-exclamation-triangle"
          accept={accept}
          reject={reject}
        />
      </div>
    </div>
  );
}