// hooks/useApiRequest.ts
import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig, Method } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { ApiResponseClient } from "@/types/apiResponse";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "@/store/store";

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
  method?: Method; // GET, POST, PUT, DELETE
  body?: unknown; // POST/PUT için veri
  config?: AxiosRequestConfig;
  skip?: boolean; // otomatik çalışmasın
  deps?: any[]; // bağımlılıklar
  keyField?: string; // default: "id"
  prepend?: boolean; // POST eklerken başa mı ekleyecek
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
  const dispatch = useDispatch();
  const token = useSelector<RootState>((x) => x.login.accessToken);

  const execute = useCallback(
    async (url_?: string, callBackOption?: UseApiRequestOptions) => {
      setLoading(true);

      try {
        const currentMethod = (callBackOption?.method ?? method).toUpperCase() as Method;
        const mutateType = getMutateTypeFromMethod(currentMethod);
        const currentKeyField = callBackOption?.keyField ?? keyField;

        const response = await apiRequest<ApiResponseClient<T>>(
          currentMethod,
          url_ ?? url,
          { Authorization: "Bearer " + token },
          callBackOption?.body ?? body
        );

        if (response?.isSuccess) {
          setData((prev) => {
            switch (mutateType) {
              case "replace": {
                return response.result as T[];
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

              default: {
                return prev;
              }
            }
          });
        }
        else
        { 
          dispatch(
            setNotification({
              title: response?.message ?? "Bilinmeyen Hata",
              message: JSON.stringify(response?.result) ?? " ",
              type: "error",
            })
          );
        }
        return response;
      } catch (err) {
        dispatch(
          setNotification({
            title: "API İstek Hatası",
            message: (err as Error).message,
            type: "error",
          })
        );
        return null;
      } finally {
        setLoading(false);
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
