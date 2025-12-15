import { SurveyType } from "@/enums";

export interface Option {
    id?:number,
  text: string;
  puan: number| null;
}

export interface Question {
      id?:number,
  text: string;
  type:number
}

export interface QuestionGroup {
  name: string;
  surveyOption: Option[];
  surveyQuestion: Question[];
  inverseParentGroup: QuestionGroup[];
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  surveyQuestionGroup?: QuestionGroup[];
  surveyType?:number,
  puanIsShow?:boolean
}
export interface Answer {
  questionId: number;
  optionId?: number;
  textAnswer?: string;
  optionDescription?: string;

}
export  interface SurveyAnswerList {
  surveyTitle: string
  surveyCreateDate: Date
  firstName: string
  lastName: string
  responseDate: Date
  question: string
  response: string
  responseText: string
  puan: number |null
  surveyId:number
  responseId:number
  groupName:string|null
  optionDescription:string | null
  personelAdiSoyadi:string | null
  personelDepartman:string | null
}