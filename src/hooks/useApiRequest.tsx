// hooks/useApiRequest.ts
import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig, Method } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { ApiResponseClient } from "@/types/apiResponse";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "@/store/store";
import { useLoading } from "@/context/LoadingContext";

type MutateType = "add" | "update" | "delete" | "replace";

const getMutateTypeFromMethod = (method?: Method): MutateType => {
  switch (method) {
    case "POST":
      return "add";
    case "PUT":
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "replace";
  }
};

interface UseApiRequestOptions {
  method?: Method;
  body?: unknown;
  config?: AxiosRequestConfig;
  skip?: boolean;
  deps?: any[];
  keyField?: string;
  prepend?: boolean;

  notification?: {
    success?: string;
    error?: string;
  };
}

export function useApiRequest<T>(
  url: string,
  options?: UseApiRequestOptions
) {
  const {
    method = "GET",
    body,
    config,
    skip = false,
    deps = [],
    keyField = "id",
    prepend = true,
  } = options || {};

  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(!skip);
  const load = useLoading();
  const dispatch = useDispatch();
  const token = useSelector<RootState>((x) => x.login.accessToken);

const execute = useCallback(
  async (url_?: string, callBackOption?: UseApiRequestOptions) => {
    setLoading(true);
   load.setLoading(true);
    try {
      const currentMethod = callBackOption?.method ?? method;
      const mutateType = getMutateTypeFromMethod(currentMethod);
      const currentKeyField = callBackOption?.keyField ?? keyField;
      const notification = callBackOption?.notification;

      const response = await apiRequest<ApiResponseClient<T>>(
        currentMethod,
        url_ ?? url,
        { Authorization: "Bearer " + token },
        callBackOption?.body ?? body
      );

      if (response?.isSuccess) {
        // ✅ SUCCESS NOTIFICATION (opsiyonel)
        if (notification?.success) {
          dispatch(
            setNotification({
              title: "Başarılı",
              message: notification.success,
              type: "success",
            })
          );
        }

        setData((prev) => {
          switch (mutateType) {
            case "replace": {
              return Array.isArray(response.result)
                ? (response.result as T[])
                : ([response.result] as T[]);
            }

            case "add": {
              if (!Array.isArray(prev)) return [response.result] as T[];
              return prepend
                ? [response.result, ...prev]
                : [...prev, response.result];
            }

            case "update": {
              if (!Array.isArray(prev)) return prev;
              return prev.map((item) =>
                String((item as any)[currentKeyField]) ===
                String((response.result as any)[currentKeyField])
                  ? response.result
                  : item
              ) as T[];
            }

            case "delete": {
              if (!Array.isArray(prev)) return prev;

              const deletedId =
                (response.result as any)?.[currentKeyField] ??
                response.result ??
                (callBackOption?.body as any)?.[currentKeyField];

              if (deletedId == null) return prev;

              return prev.filter(
                (item) =>
                  String((item as any)[currentKeyField]) !==
                  String(deletedId)
              ) as T[];
            }

            default:
              return prev;
          }
        });
      } else {
        // ❌ API SUCCESS=FALSE
        dispatch(
          setNotification({
            title: "Hata",
            message:
              notification?.error ??
              response?.message ??
              "İşlem başarısız",
            type: "error",
          })
        );
      }

      return response;
    } catch (err) {
      dispatch(
        setNotification({
          title: "API Hatası",
          message: (err as Error).message,
          type: "error",
        })
      );
      return null;
    } finally {
      setLoading(false);
      load.setLoading(false);
    }
  },
  [url, method, body, token, keyField, prepend, dispatch]
);

  useEffect(() => {
    if (!skip) {
      execute();
    }
  }, [execute, ...deps]);

  return {
    data,
    setData,
    loading,
    refetch: execute,
  };
}
