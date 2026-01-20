import { URL } from "@/api";
import { UserPermission, UserPermissionDtoForInsertion, UserPermissionDtoForUpdate } from "@/api/apiDtos";
import { useApiRequest } from "@/hooks/useApiRequest";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const UserPermissionList = ({ userId }: { userId: number }) => {
  const { data: permissions, loading, refetch } =
    useApiRequest<UserPermission>(
      URL + "/UserPermission/GetByUserId/" + userId,
      { method: "GET" }
    );

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const updatePermission = async (
    permission: UserPermission,
    field: "canRead" | "canWrite" | "canDelete",
    value: boolean
  ) => {
    try {
      setUpdatingId(permission.id);
      if(permission.id==0){
        refetch(URL+"/UserPermission/create/",{method:"post",body:{
                              userId: permission.userId,
                              serviceName: permission.serviceName,
                              canRead: field === "canRead" ? value : permission.canRead,
                              canWrite: field === "canWrite" ? value : permission.canWrite,
                              canDelete: field === "canDelete" ? value : permission.canDelete,
                          } as UserPermissionDtoForInsertion}).then(() => {

       refetch();
        });
      }
      else
      refetch(URL+"/UserPermission/update/",{method:"PUT",body:{
                              id: permission.id,
                              userId: permission.userId,
                              serviceName: permission.serviceName,
                              canRead: field === "canRead" ? value : permission.canRead,
                              canWrite: field === "canWrite" ? value : permission.canWrite,
                              canDelete: field === "canDelete" ? value : permission.canDelete,
                          } as UserPermissionDtoForUpdate}).then(() => {

       refetch();
        });
    } catch (error) {
      console.error("Yetki güncellenemedi", error);
      alert("Yetki güncellenirken hata oluştu");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader className="animate-spin m-4" />;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Servis
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Okuma
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Yazma
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Silme
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Güncelleme
            </th>
          </tr>
        </thead>

        <tbody>
          {permissions?.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                Kayıt bulunamadı
              </td>
            </tr>
          )}

          {permissions?.map((permission) => (
            <tr key={permission.id} className="border-t hover:bg-gray-50">
             

              <td className="px-4 py-3 text-sm">
                {permission.serviceName}
              </td>

              <CheckboxCell
                checked={permission.canRead}
                disabled={updatingId === permission.id}
                onChange={(val) =>
                  updatePermission(permission, "canRead", val)
                }
              />

              <CheckboxCell
                checked={permission.canWrite}
                disabled={updatingId === permission.id}
                onChange={(val) =>
                  updatePermission(permission, "canWrite", val)
                }
              />

              <CheckboxCell
                checked={permission.canDelete}
                disabled={updatingId === permission.id}
                onChange={(val) =>
                  updatePermission(permission, "canDelete", val)
                }
              />

              <td className="px-4 py-3 text-sm text-gray-500">
                {permission.updatedAt
                  ? new Date(permission.updatedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPermissionList;

/* Checkbox hücresi */
const CheckboxCell = ({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) => (
  <td className="px-4 py-3 text-center">
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 disabled:opacity-50"
    />
  </td>
);
