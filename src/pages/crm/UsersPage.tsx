import { useNavigate } from "react-router-dom";
import { Column, SmartTable } from "@/components/SmartTable";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { FaFileArchive, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteResource } from "@/hooks/useDeleteResource";
import { useModal } from '@/context/ModalContext'
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { File, FileAxis3dIcon, FileCheck, FileIcon, MoreHorizontal, User } from "lucide-react";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { setNotification } from "@/store/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FaColonSign, FaFile, FaKey } from "react-icons/fa6";
import { Roles, Users } from "@/api/apiDtos";
import { AddUserPage } from "./AddUserPage";
import { UserPermissionForm } from "@/components/user-profile/UserPermissionForm";
import UserPermissionList from "@/components/user-profile/UserPermissionList";


 const UsersPage = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();



    const { data: users, refetch: refetchUsers } = useApiRequest<Users>(
        URL + "/User/GetAllFull",
        { method: "GET", skip: false, deps: [] }
    );
    const { data: roles, refetch: refetchRoles } = useApiRequest<Roles>(
        URL + "/roles/GetAll",
        { method: "GET", skip: false, deps: [] }
    );

    console.log("users:", users);
    const getAllUsers = (): Partial<Users>[] => {
        if (!users) return [];
        return users.map(user => ({
            id: user.id!,
            tckno: user.tckno,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone1: user.phone1,
            phone2: user.phone2,
            userName: user.userName,
            password: user.password,
            department: user.department,
            departmentId: user.departmentId,
            title: user.title,
            startDate: user.startDate,
            departureDate: user.departureDate,
            rolName: user.rolName,
            rolId: user.rolId,
            cinsiyet: user.cinsiyet,
            personel_Id: user.personel_Id,
            isActive: user.isActive,


        }));
    };
    const { remove: deleteUser, deletingId } = useDeleteResource(
        (id) => URL + `/User/Delete/${id}`,
        {
            confirmText: "Bu kullanıcıyı silmek istediğine emin misin?",
            onSuccess: async () => {
                await refetchUsers();
            },
            onError: () => {
                alert("Silme sırasında hata oluştu!");
            },
        }
    );

    const [menu, setMenu] = useState<{ id: number; top: number; left: number } | null>(null);

    useEffect(() => {
        const close = () => setMenu(null);
        window.addEventListener("click", close);
        window.addEventListener("scroll", close, true);
        return () => {
            window.removeEventListener("click", close);
            window.removeEventListener("scroll", close, true);
        };
    }, []);



    const columns: Column<Partial<Users>>[] = [
        {
            header: "Ad",
            accessor: "name",
            filterable: true,
            sortable: true,
        },

        {
            header: "Soyadı",
            accessor: "surname",
            filterable: true,
            sortable: true,
        },
        {
            header: "Rolü",
            accessor: "rolName",
            filterable: true,
            sortable: true,
        },
        {
            header: "TC Kimlik No",
            accessor: "tckno",
            filterable: true,
            sortable: true,
        },

        {
            header: "Email",
            accessor: "email",
            filterable: true,
            sortable: true,
        },
        {
            header: "Telefon 1",
            accessor: "phone1",
            filterable: true,
            sortable: true,
        },
        {
            header: "Telefon 2",
            accessor: "phone2",
            filterable: true,
            sortable: true,
        },
        {
            header: "Kullanıcı Adı",
            accessor: "userName",
            filterable: true,
            sortable: true,

        },

        {
            header: "Departman",
            accessor: "department",
            filterable: true,
            sortable: true,
        },
        {
            header: "Unvan",
            accessor: "title",
            filterable: true,
            sortable: true,
        },
        {
            header: "Başlangıç Tarihi",
            accessor: "startDate",
            filterable: true,
            sortable: true,
            body: (row) =>
                row.startDate
                    ? String(row.startDate).substring(0, 10).split("-").reverse().join(".")
                    : "",
        },
        {
            header: "Bitiş Tarihi",
            accessor: "departureDate",
            filterable: true,
            sortable: true,
            body: (row) =>
                row.departureDate
                    ? String(row.departureDate).substring(0, 10).split("-").reverse().join(".")
                    : "",
        },
       
        {
            header: "Cinsiyet",
            accessor: "cinsiyet",
            filterable: true,
            sortable: true,
        },

        {

            header: "İşlemler",
            accessor: "id",
            body: (row) => {
                return (
                    <div
                        className="w-[132px] flex items-center justify-center gap-2 pl-2 border-l border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openModal({
                                    title: "Kullanıcı Düzenle",
                                    maximizable: true,
                                    style: { width: "70vw" },
                                    content: (close) => (
                                        <div> </div>
                                    ),
                                });
                            }}
                            className="
                    inline-flex items-center justify-center
                    h-8 w-8
                    rounded-md
                    bg-amber-100
                    border border-amber-300
                    text-amber-700
                  
                    transition-all duration-200 ease-out
                    transform
                  
                    hover:-translate-y-0.5
                    hover:bg-amber-100
                    hover:border-amber-400
                    hover:text-amber-800
                    hover:shadow-lg
                  
                    shadow-md
                    focus:outline-none
                    focus:ring-2 focus:ring-amber-300
                    active:translate-y-0
                    active:shadow-sm
                  "

                            title="Düzenle"
                        >
                            <FaPencilAlt className="text-[13px]" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation(); 
                                openModal({
                                    title: "Kullanıcı Yetkilendir ("+row.name+ " "+row.surname+")",
                                    maximizable: true,
                                    style: { width: "50vw" },
                                    content: (close) => (
                                        <UserPermissionList userId={row.id} />
                                    ),
                                });

                            }}
                            disabled={deletingId === row.id}
                            className="
                    inline-flex items-center justify-center
                    h-8 w-8
                    rounded-md

                    bg-green-50
                    border border-green-300
                    text-green-700

                    transition-all duration-200 ease-out
                    transform

                    hover:-translate-y-0.5
                    hover:bg-green-100
                    hover:border-green-400
                    hover:text-green-800
                    hover:shadow-lg

                    shadow-md
                    focus:outline-none
                    focus:ring-2 focus:ring-red-300
                    active:translate-y-0
                    active:shadow-sm
                    "
                            title="Yetkilendir"
                        >
                            {deletingId === row.id ? "…" : <FaKey className="text-[13px]" />}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation(); row.id && deleteUser(row.id)

                            }}
                            disabled={deletingId === row.id}
                            className="
                    inline-flex items-center justify-center
                    h-8 w-8
                    rounded-md

                    bg-red-50
                    border border-red-300
                    text-red-700

                    transition-all duration-200 ease-out
                    transform

                    hover:-translate-y-0.5
                    hover:bg-red-100
                    hover:border-red-400
                    hover:text-red-800
                    hover:shadow-lg

                    shadow-md
                    focus:outline-none
                    focus:ring-2 focus:ring-red-300
                    active:translate-y-0
                    active:shadow-sm
                    "
                            title="Sil"
                        >
                            {deletingId === row.id ? "…" : <FaTrashAlt className="text-[13px]" />}
                        </button>
                        {/* Üç nokta menü */}
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                                    const width = 176;
                                    const left = Math.min(window.innerWidth - width - 8, Math.max(8, r.right - width));
                                    const top = r.bottom + 8; // aşağı aç

                                    setMenu((prev) => (prev?.id === row.id ? null : { id: row.id!, top, left }));
                                }}
                                className="inline-flex items-center justify-center shrink-0 h-8 w-8 rounded-md bg-gray-50 border border-gray-200 text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:border-gray-300 hover:shadow-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                title="Diğer işlemler"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {
                                menu?.id === row.id &&
                                createPortal(
                                    <div
                                        className="fixed w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-[999999] overflow-hidden"
                                        style={{ top: menu.top, left: menu.left }}
                                        onClick={(e) => e.stopPropagation()}
                                    >



                                        <button
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                            onClick={() => {
                                                setMenu(null);
                                            }}
                                        >
                                            Kopya Oluştur
                                        </button>

                                        <button
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                            onClick={() => {
                                                setMenu(null);
                                            }}
                                        >
                                            PDF Al
                                        </button>

                                        <div className="h-px bg-gray-100" />

                                        <button
                                            className="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                                            onClick={() => {
                                                setMenu(null);
                                                row.id && deleteUser(row.id);
                                            }}
                                        >
                                            Arşive Taşı
                                        </button>
                                    </div>,
                                    document.body
                                )
                            }



                        </div >
                    </div >
                );
            },
        },
    ];



    return (
        <div className="card">
            <h2 className="text-xl text-center font-bold mb-2">Kullanıcılar</h2>
            <div className="w-full overflow-x-auto">

                <SmartTable<Partial<Users>>
                    data={getAllUsers()}
                    columns={columns}
                    rowIdAccessor={"id"}
                    frozenColumns={[{ name: "id", right: true }]}
                    isExport={true}
                    newRecordVoid={() => {
                        openModal({
                            title: "",
                            maximizable: true,
                            style: { width: "50vw" },
                            content: (close) => (
                                <AddUserPage
                                    onSuccess={refetchUsers}
                                    onClose={() => close(true)}
                                />
                            ),
                        });
                    }}

                    scrollHeight="calc(100vh - 200px)"
                    enablePagination={false}
                ></SmartTable>
            </div>
        </div >
    );
};
export default UsersPage;






















