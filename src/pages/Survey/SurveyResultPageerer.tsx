// import { SmartTable } from "@/components/SmartTable";
// import CashAccountPage from "../account/CashAccountPage";
// import { useApiRequest } from "@/hooks/useApiRequest";
// import { SurveyAnswerList } from "./SurveyAnswerList";
// import { URL } from "@/api";

// const SurveyResultPage = ({ type }: { type: number }) => {
//     const { data: results, refetch } = useApiRequest<SurveyAnswerList>(`${URL}/Survey/GetAllSurveyAnswers` + "/" + type, { method: 'GET' });
//     let grouped: Record<string, SurveyAnswerList[]> = {};

//     grouped = results?.reduce((acc, curr) => {
//         if (!acc[curr.surveyTitle]) {
//             acc[curr.surveyTitle] = [];
//         }
//         acc[curr.surveyTitle].push(curr);
//         return acc;
//     }, {} as Record<string, SurveyAnswerList[]>);
//     let grouped2 = results?.reduce((acc, curr) => {
//         if (!acc[curr.responseId]) {
//             acc[curr.responseId] = [];
//         }
//         acc[curr.responseId].push(curr);
//         return acc;
//     }, {} as Record<string, SurveyAnswerList[]>);
//     // console.log(grouped2);
//     return (
//         <div className="card">
//             <h2 className="text-xl text-center font-bold mb-2">Form Sonuçları </h2>
//             <SmartTable enablePagination={false} data={grouped2 ? Object.entries(grouped2).map(([title, answers], key) => (
//                 {
//                     date: answers[0].responseDate,
//                     puan: answers.reduce((acc, curr) => (acc + curr.puan), 0),
//                     dolduran: answers[0].firstName + " " + answers[0].lastName,
//                     tedarikci: answers[0].supplierName
//                 })) ?? [] : []} columns={[
//                     {
//                         header: "#",
//                         accessor: "__index"
//                     },
//                     {
//                         header: "Dolduran",
//                         accessor: "dolduran"
//                     },
//                     {
//                         header: "Tedarikci",
//                         accessor: "tedarikci",
//                         filterable: true,
//                         sortable: true
//                     },
//                     {
//                         header: "Tarih",
//                         accessor: "date",

//                     },
//                     {
//                         header: "Puan",
//                         accessor: "puan",
//                         summaryType: "avg"
//                     },

//                 ]} rowIdAccessor={"responseId"} />

//         </div>

//     )
// }
// export default SurveyResultPage;