import { useCallback, useState } from "react";
import { apiRequest } from "@/services";

type DeleteState = "idle" | "loading" | "success" | "error";

type UseDeleteResourceOptions = {
  confirmText?: string;
  onSuccess?: () => void | Promise<void>;
  onError?: (err: unknown) => void;
  confirmFn?: (text: string) => boolean; // test/mock için
};

export const useDeleteResource = (
  buildUrl: (id: number) => string,
  options?: UseDeleteResourceOptions
) => {
  const [status, setStatus] = useState<DeleteState>("idle");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<unknown>(null);

  const remove = useCallback(
    async (id: number) => {
      const confirmText = options?.confirmText ?? "Bu kaydı silmek istediğine emin misin?";
      const confirmFn = options?.confirmFn ?? window.confirm;

      if (!confirmFn(confirmText)) return false;

      setDeletingId(id);
      setStatus("loading");
      setError(null);

      try {
        // 204 NoContent 
        await apiRequest("DELETE", buildUrl(id));
        setStatus("success");
        await options?.onSuccess?.();
        return true;
      } catch (err) {
        setError(err);
        setStatus("error");
        options?.onError?.(err);
        return false;
      } finally {
        setDeletingId(null);
 
      }
    },
    [buildUrl, options]
  );

  return { remove, deletingId, status, error };
};
