import React, { useEffect, useState, useCallback } from "react";
import type { Question, QuestionGroup, Option } from "../../types/survey";
import { ApiResponseClient } from "@/types/apiResponse";
import { SURVEY_CREATE, SURVEY_GET } from "@/api";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/context/ConfirmContext";
import { apiRequest } from "@/services/apiRequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setNotification } from "@/store/slices/notificationSlice";
import { Survey, SurveyType } from "@/api/apiDtos";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Icons as SVG components
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const DragIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
);

const DuplicateIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

// Constants
const EMPTY_QUESTION: Question = { text: "", type: 1 };
const EMPTY_OPTION: Option = { text: "", puan: null };
const EMPTY_GROUP: QuestionGroup = {
  name: "",
  surveyOption: [],
  surveyQuestion: [],
  inverseParentGroup: [],
};
const INITIAL_SURVEY: Survey = {
  id: 0,
  title: "",
  description: "",
  surveyQuestionGroup: [],
  surveyType: SurveyType.Egitim,
};

const SURVEY_TYPE_OPTIONS = [
  { value: SurveyType.Egitim, label: "Eğitim Değerlendirme Formu" },
  { value: SurveyType.Tedarikci, label: "Tedarikçi Değerlendirme Formu" },
  { value: SurveyType.Yetkinlik, label: "Yetkinlik/Beceri Matris Formu" },
  { value: SurveyType.PersonelDegerlendirme, label: "Personel Değerlendirme Formu" },
  { value: SurveyType.Diger, label: "Diğer" },
];

const QUESTION_TYPE_OPTIONS = [
  { value: "1", label: "Çoktan Seçmeli" },
  { value: "0", label: "Metin" },
];

// Custom Hooks
const useSurveyData = (id?: string) => {
  const [survey, setSurvey] = useState<Survey>(INITIAL_SURVEY);
  const [loading, setLoading] = useState(false);
  const token = useSelector<RootState>((x) => x.login.accessToken) as string;

  useEffect(() => {
    if (!id) {
      setSurvey(INITIAL_SURVEY);
      return;
    }

    const fetchSurvey = async () => {
      setLoading(true);
      try {
        const result = await apiRequest<ApiResponseClient<Survey>>(
          "GET",
          `${SURVEY_GET}/${id}`,
          { Authorization: `Bearer ${token}` }
        );
        setSurvey(result?.result || INITIAL_SURVEY);
      } catch (error) {
        console.error("Survey yüklenirken hata:", error);
        setSurvey(INITIAL_SURVEY);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id, token]);

  return { survey, setSurvey, loading };
};

// Main Component
interface SurveyCreateProps {
  id?: string;
}

export default function SurveyCreate({ id }: SurveyCreateProps) {
  const { survey, setSurvey, loading } = useSurveyData(id);
  const confirm_ = useConfirm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector<RootState>((x) => x.login.accessToken) as string;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSurveyChange = useCallback(
    (field: keyof Survey, value: string | boolean | number) => {
      setSurvey((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addGroup = useCallback(() => {
    setSurvey((prev) => ({
      ...prev,
      surveyQuestionGroup: [...(prev.surveyQuestionGroup || []), { ...EMPTY_GROUP }],
    }));
  }, []);

  const updateGroup = useCallback((index: number, updatedGroup: QuestionGroup) => {
    setSurvey((prev) => {
      const groups = [...(prev.surveyQuestionGroup || [])];
      groups[index] = updatedGroup;
      return { ...prev, surveyQuestionGroup: groups };
    });
  }, []);

  const removeGroup = useCallback(
    async (index: number) => {
      const isConfirmed = await confirm_({
        title: "Silme işlemi",
        message: "Grubu silmek istediğinize emin misiniz?",
        confirmText: "Evet",
        cancelText: "Vazgeç",
      });

      if (isConfirmed) {
        setSurvey((prev) => {
          const groups = [...(prev.surveyQuestionGroup || [])];
          groups.splice(index, 1);
          return { ...prev, surveyQuestionGroup: groups };
        });
      }
    },
    [confirm_]
  );

  const duplicateGroup = useCallback((index: number) => {
    setSurvey((prev) => {
      const groups = [...(prev.surveyQuestionGroup || [])];
      const groupToDuplicate = groups[index];
      // Deep copy of the group
      const duplicatedGroup = {
        ...groupToDuplicate,
        name: `${groupToDuplicate.name} (Kopya)`,
        surveyQuestion: groupToDuplicate.surveyQuestion.map(q => ({ ...q })),
        surveyOption: groupToDuplicate.surveyOption.map(o => ({ ...o })),
        inverseParentGroup: [],
      };
      groups.splice(index + 1, 0, duplicatedGroup);
      return { ...prev, surveyQuestionGroup: groups };
    });
  }, []);

  const handleDragEndGroups = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSurvey((prev) => {
        const groups = prev.surveyQuestionGroup || [];
        const oldIndex = groups.findIndex((_, i) => `group-${i}` === active.id);
        const newIndex = groups.findIndex((_, i) => `group-${i}` === over.id);
        return {
          ...prev,
          surveyQuestionGroup: arrayMove(groups, oldIndex, newIndex),
        };
      });
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await apiRequest<ApiResponseClient<Survey>>(
        "POST",
        SURVEY_CREATE,
        { Authorization: `Bearer ${token}` },
        survey
      );

      if (res.statusCode !== 200) {
        throw new Error("Sunucu hatası");
      }

      dispatch(
        setNotification({
          type: "success",
          title: "Anket başarıyla kaydedildi!",
          message: " ",
        })
      );

      navigate(`/formlar/${survey.surveyType}`);
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          title: "Anket Kaydedilirken Hata Oluştu",
          message: error instanceof Error ? error.message : "Bilinmeyen hata",
        })
      );
    }
  }, [survey, token, dispatch, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const groupIds = (survey.surveyQuestionGroup || []).map((_, i) => `group-${i}`);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {id ? "Form Düzenle" : "Yeni Form Oluştur"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Dinamik anket ve değerlendirme formları oluşturun
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium"
            >
              <SaveIcon />
              Formu Kaydet
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-auto  top-24">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DocumentIcon />
                  Form Bilgileri
                </h2>
              </div>
              <div className="p-5 space-y-5 ">
                <SurveyInfoForm survey={survey} onChange={handleSurveyChange} />
              </div>
            </div>
          </div>

          {/* Right Column - Question Groups */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FolderIcon />
                    Soru Grupları
                  </h2>
                  <button
                    onClick={addGroup}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    <PlusIcon />
                    Yeni Grup
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {survey.surveyQuestionGroup?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <ListIcon />
                    </div>
                    <p className="text-gray-500 mb-4">Henüz soru grubu eklenmedi</p>
                    <button
                      onClick={addGroup}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <PlusIcon />
                      İlk Grubu Ekle
                    </button>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEndGroups}
                  >
                    <SortableContext items={groupIds} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4">
                        {survey.surveyQuestionGroup?.map((group, index) => (
                          <SortableGroup
                            key={`group-${index}`}
                            id={`group-${index}`}
                            group={group}
                            groupIndex={index}
                            onUpdate={(updated) => updateGroup(index, updated)}
                            onRemove={() => removeGroup(index)}
                            onDuplicate={() => duplicateGroup(index)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sortable Group Component
interface SortableGroupProps {
  id: string;
  group: QuestionGroup;
  groupIndex: number;
  onUpdate: (group: QuestionGroup) => void;
  onRemove: () => void;
  onDuplicate: () => void;
}

const SortableGroup: React.FC<SortableGroupProps> = ({
  id,
  group,
  groupIndex,
  onUpdate,
  onRemove,
  onDuplicate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionGroupForm
        group={group}
        groupIndex={groupIndex}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onDuplicate={onDuplicate}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

// Sub-components
interface SurveyInfoFormProps {
  survey: Survey;
  onChange: (field: keyof Survey, value: string | boolean | number) => void;
}

const SurveyInfoForm: React.FC<SurveyInfoFormProps> = ({ survey, onChange }) => {
  return (
    <>
      <div >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form Başlığı <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={survey.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="Örn: Eğitim Değerlendirme Anketi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form Açıklaması
        </label>
        <textarea
          value={survey.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
          placeholder="Form hakkında kısa açıklama..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form Tipi <span className="text-red-500">*</span>
        </label>
        <select
          value={survey.surveyType}
          onChange={(e) => onChange("surveyType", Number(e.target.value))}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
        >
          {SURVEY_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form No <span className="text-red-500"></span>
        </label>
        <input
          type="text"
          value={survey.formNo}
          onChange={(e) => onChange("formNo", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder=""
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Revizyon No <span className="text-red-500"></span>
        </label>
        <input
          type="text"
          value={survey.revizyonNo}
          onChange={(e) => onChange("revizyonNo", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder=""
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Puan Görünürlüğü
        </label>
        <select
          value={String(survey.puanIsShow ?? false)}
          onChange={(e) => onChange("puanIsShow", e.target.value === "true")}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
        >
          <option value="true">Puanlar Görünsün</option>
          <option value="false">Puanlar Görünmesin</option>
        </select>
      </div>
    </>
  );
};

interface QuestionGroupFormProps {
  group: QuestionGroup;
  groupIndex: number;
  onUpdate: (group: QuestionGroup) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  dragHandleProps?: any;
}

const QuestionGroupForm: React.FC<QuestionGroupFormProps> = ({
  group,
  groupIndex,
  onUpdate,
  onRemove,
  onDuplicate,
  dragHandleProps,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const updateField = useCallback(
    (field: keyof QuestionGroup, value: any) => {
      onUpdate({ ...group, [field]: value });
    },
    [group, onUpdate]
  );

  const addQuestion = useCallback(() => {
    updateField("surveyQuestion", [...group.surveyQuestion, { ...EMPTY_QUESTION }]);
  }, [group.surveyQuestion, updateField]);

  const updateQuestion = useCallback(
    (index: number, field: keyof Question, value: any) => {
      const updated = [...group.surveyQuestion];
      updated[index] = { ...updated[index], [field]: value };
      updateField("surveyQuestion", updated);
    },
    [group.surveyQuestion, updateField]
  );

  const removeQuestion = useCallback(
    (index: number) => {
      const updated = group.surveyQuestion.filter((_, i) => i !== index);
      updateField("surveyQuestion", updated);
    },
    [group.surveyQuestion, updateField]
  );

  const duplicateQuestion = useCallback(
    (index: number) => {
      const questionToDuplicate = group.surveyQuestion[index];
      const duplicated = { ...questionToDuplicate };
      const updated = [...group.surveyQuestion];
      updated.splice(index + 1, 0, duplicated);
      updateField("surveyQuestion", updated);
    },
    [group.surveyQuestion, updateField]
  );

  const handleDragEndQuestions = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = group.surveyQuestion.findIndex((_, i) => `question-${groupIndex}-${i}` === active.id);
        const newIndex = group.surveyQuestion.findIndex((_, i) => `question-${groupIndex}-${i}` === over.id);
        updateField("surveyQuestion", arrayMove(group.surveyQuestion, oldIndex, newIndex));
      }
    },
    [group.surveyQuestion, updateField, groupIndex]
  );

  const addOption = useCallback(() => {
    updateField("surveyOption", [...group.surveyOption, { ...EMPTY_OPTION }]);
  }, [group.surveyOption, updateField]);

  const updateOption = useCallback(
    (index: number, field: keyof Option, value: any) => {
      const updated = [...group.surveyOption];
      updated[index] = { ...updated[index], [field]: value };
      updateField("surveyOption", updated);
    },
    [group.surveyOption, updateField]
  );

  const removeOption = useCallback(
    (index: number) => {
      const updated = group.surveyOption.filter((_, i) => i !== index);
      updateField("surveyOption", updated);
    },
    [group.surveyOption, updateField]
  );

  const duplicateOption = useCallback(
    (index: number) => {
      const optionToDuplicate = group.surveyOption[index];
      const duplicated = { ...optionToDuplicate };
      const updated = [...group.surveyOption];
      updated.splice(index + 1, 0, duplicated);
      updateField("surveyOption", updated);
    },
    [group.surveyOption, updateField]
  );

  const handleDragEndOptions = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = group.surveyOption.findIndex((_, i) => `option-${groupIndex}-${i}` === active.id);
        const newIndex = group.surveyOption.findIndex((_, i) => `option-${groupIndex}-${i}` === over.id);
        updateField("surveyOption", arrayMove(group.surveyOption, oldIndex, newIndex));
      }
    },
    [group.surveyOption, updateField, groupIndex]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      {/* Group Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Sürükle"
            >
              <DragIcon />
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex-1">
              <input
                type="text"
                value={group.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                placeholder={`Grup ${groupIndex + 1} - İsim giriniz`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDuplicate}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all text-sm font-medium"
              title="Grubu Çoğalt"
            >
              <DuplicateIcon />
              Çoğalt
            </button>
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all text-sm font-medium"
            >
              <TrashIcon />
              Sil
            </button>
          </div>
        </div>
      </div>

      {/* Group Content */}
      {isExpanded && (
        <div className="p-4 space-y-5">
          {/* Questions */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Sorular</h4>
              <button
                onClick={addQuestion}
                className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all text-xs font-medium"
              >
                <PlusIcon />
                Soru Ekle
              </button>
            </div>
            <div className="p-3">
              {group.surveyQuestion.length === 0 ? (
                <p className="text-center text-gray-400 py-4 text-sm">Henüz soru eklenmedi</p>
              ) : (
                <QuestionList
                  questions={group.surveyQuestion}
                  groupIndex={groupIndex}
                  onUpdate={updateQuestion}
                  onRemove={removeQuestion}
                  onDuplicate={duplicateQuestion}
                  onDragEnd={handleDragEndQuestions}
                  sensors={sensors}
                />
              )}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-green-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Cevap Seçenekleri</h4>
              <button
                onClick={addOption}
                className="inline-flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-all text-xs font-medium"
              >
                <PlusIcon />
                Seçenek Ekle
              </button>
            </div>
            <div className="p-3">
              {group.surveyOption.length === 0 ? (
                <p className="text-center text-gray-400 py-4 text-sm">Henüz seçenek eklenmedi</p>
              ) : (
                <OptionList
                  options={group.surveyOption}
                  groupIndex={groupIndex}
                  onUpdate={updateOption}
                  onRemove={removeOption}
                  onDuplicate={duplicateOption}
                  onDragEnd={handleDragEndOptions}
                  sensors={sensors}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sortable Question Item
interface SortableQuestionProps {
  id: string;
  question: Question;
  index: number;
  onUpdate: (index: number, field: keyof Question, value: any) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
}

const SortableQuestion: React.FC<SortableQuestionProps> = ({
  id,
  question,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all group ${isDragging ? "shadow-lg bg-white z-10" : ""
        }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors pt-2"
      >
        <DragIcon />
      </div>
      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
        {index + 1}
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={question.text}
          onChange={(e) => onUpdate(index, "text", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
          placeholder="Soru metni"
        />
        <select
          value={question.type}
          onChange={(e) => onUpdate(index, "type", Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white text-sm"
        >
          {QUESTION_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDuplicate(index)}
          className="flex-shrink-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all"
          title="Çoğalt"
        >
          <DuplicateIcon />
        </button>
        <button
          onClick={() => onRemove(index)}
          className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

interface QuestionListProps {
  questions: Question[];
  groupIndex: number;
  onUpdate: (index: number, field: keyof Question, value: any) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  sensors: any;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  groupIndex,
  onUpdate,
  onRemove,
  onDuplicate,
  onDragEnd,
  sensors,
}) => {
  const questionIds = questions.map((_, i) => `question-${groupIndex}-${i}`);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={questionIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <SortableQuestion
              key={`question-${groupIndex}-${i}`}
              id={`question-${groupIndex}-${i}`}
              question={q}
              index={i}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// Sortable Option Item
interface SortableOptionProps {
  id: string;
  option: Option;
  index: number;
  onUpdate: (index: number, field: keyof Option, value: any) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
}

const SortableOption: React.FC<SortableOptionProps> = ({
  id,
  option,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-all group ${isDragging ? "shadow-lg bg-white z-10" : ""
        }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors pt-2"
      >
        <DragIcon />
      </div>
      <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
        {String.fromCharCode(65 + index)}
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={option.text}
          onChange={(e) => onUpdate(index, "text", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-sm"
          placeholder="Seçenek metni"
        />
        <input
          type="number"
          value={option.puan ?? ""}
          onChange={(e) => onUpdate(index, "puan", Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-sm"
          placeholder="Puan değeri"
        />
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDuplicate(index)}
          className="flex-shrink-0 text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-lg transition-all"
          title="Çoğalt"
        >
          <DuplicateIcon />
        </button>
        <button
          onClick={() => onRemove(index)}
          className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

interface OptionListProps {
  options: Option[];
  groupIndex: number;
  onUpdate: (index: number, field: keyof Option, value: any) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  sensors: any;
}

const OptionList: React.FC<OptionListProps> = ({
  options,
  groupIndex,
  onUpdate,
  onRemove,
  onDuplicate,
  onDragEnd,
  sensors,
}) => {
  const optionIds = options.map((_, i) => `option-${groupIndex}-${i}`);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={optionIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <SortableOption
              key={`option-${groupIndex}-${i}`}
              id={`option-${groupIndex}-${i}`}
              option={opt}
              index={i}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};