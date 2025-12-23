// // hooks/useApiRequest.ts
// import { useState, useEffect, useCallback } from "react";
// import { AxiosRequestConfig } from "axios";
// import { Method } from "axios"; // axios'un Method tipi
// import { useDispatch, useSelector } from "react-redux";
// import { setNotification } from "@/store/slices/notificationSlice";
// import { ApiResponseClient } from "@/types/apiResponse";
// import { apiRequest } from "@/services/apiRequestService";
// import { RootState } from "@/store/store";

// interface UseApiRequestOptions {
//   method?: Method; // GET, POST, PUT, DELETE
//   body?: unknown; // POST/PUT için veri
//   config?: AxiosRequestConfig;
//   skip?: boolean; // otomatik çalışmasın
//   deps?: any[]; // bağımlılıklar
//   keyField?: string; // default: "id"
// }

// export function useApiRequest2<T>(url: string, options?: UseApiRequestOptions) {
//   const {
//     method = "GET",
//     body,
//     config,
//     skip = false,
//     deps = [],
//   } = options || {};

//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(!skip);
//   const dispatch = useDispatch();
//   const token = useSelector<RootState>((x) => x.login.accessToken);
//   const execute = useCallback(
//     async (url_?: string, callBackOption?: UseApiRequestOptions) => {
//       setLoading(true);

//       try {
//         const response = await apiRequest<ApiResponseClient<T>>(
//           callBackOption?.method ?? method,
//           url_ ?? url,
//           { Authorization: "Bearer " + token },
//           callBackOption?.body ?? body
//         );
//         if (response && response.isSuccess) {
//           if ((callBackOption?.method ?? method).toLowerCase() == "get") {
//             setData(response.result);
//           } else if (
//             (callBackOption?.method ?? method).toLowerCase() === "post"
//           ) {
//             setData((prevData) => {
//               if (Array.isArray(prevData)) {
//                 return [response.result, ...prevData] as T; // Cast to T
//               }
//               return response.result;
//             });
//           } else if (
//             (callBackOption?.method ?? method).toLowerCase() === "put" ||
//             method.toLowerCase() === "patch"
//           ) {
//             setData((prevData) => {
//               if (!Array.isArray(prevData)) return prevData;
//               const keyField = callBackOption?.keyField || "id";

//               return prevData.map((item) =>
//                 String((item as any)[keyField]) ===
//                 String((response.result as any)[keyField])
//                   ? (response.result as T)
//                   : item
//               );
//             });
//           } else if (
//             (callBackOption?.method ?? method).toLowerCase() === "delete"
//           ) {
//             setData((prevData) => {
//               if (Array.isArray(prevData)) {
//                 const keyField = callBackOption?.keyField || "id";
//                 return prevData.filter(
//                   (item) => (item as any)[keyField] !== response.result
//                 ) as T;
//               }
//               return null;
//             });
//           }
//           // else deps.push(Math.random()); // veri değiştiğinde bağımlılıkları tetikle
//         }
//         dispatch(
//           setNotification({
//             title: response?.message ?? "",
//             message: " ",
//             type:
//               response.statusCode === 500
//                 ? "error"
//                 : response.isSuccess
//                 ? "success"
//                 : "warning",
//           })
//         );
//         return response;
//       } catch (err) {
//         return null;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [url, method, JSON.stringify(body), JSON.stringify(config)]
//   );
//   // git test
//   useEffect(() => {
//     if (!skip) {
//       execute();
//     }
//   }, [execute, ...deps]);

//   return {
//     data,
//     setData,
//     loading,
//     refetch: execute,
//   };
// }
