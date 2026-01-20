import { useNavigate } from "react-router-dom";
import { Column, SmartTable } from "@/components/SmartTable";
import { ContractsDto, ContractsDtoForInsertion, PurchaseOrderDto, PurchaseOrders } from "@/api/apiDtos";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { FaFileArchive, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteResource } from "@/hooks/useDeleteResource";
import { useModal } from '@/context/ModalContext'
import  AddPurchaseOrderPage2  from "./AddPurchaseOrderPage2";
import  UpdatePurchaseOrderPage  from "./UpdatePurchaseOrderPage";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { File, FileAxis3dIcon, FileCheck, FileIcon, MoreHorizontal } from "lucide-react";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { setNotification } from "@/store/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { FaFile } from "react-icons/fa6";


 const PurchaseOrderPage = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();
    const dispatch = useDispatch<AppDispatch>();
    const enterpriseState = useSelector((state: RootState) => state.enterprise);
    const customerState = useSelector(
        (state: RootState) => state.customer as CustomerState
    );
    useEffect(() => {
        if (customerState.data.length === 0) {
            dispatch(fetchCustomers());
        }
    }, []);

    const { data: purchaseOrders, refetch: refetchOrders } = useApiRequest<PurchaseOrders>(
        URL + "/PurchaseOrder/GetAll", {
        method: "GET",
        skip: false,
        deps: [],
    }
    );
    const getAllPurchaseOrders = (): Partial<PurchaseOrders>[] => {
        if (!purchaseOrders) return [];
        return purchaseOrders.map(order => ({
            id: order.id!,
            firmaAdi: order.firmaAdi ?? "",
            aciklama: order.aciklama ?? "",
            durumu: order.durumu ?? "",
            onayAcikla: order.onayAcikla ?? "",
            faturaNo: order.faturaNo ?? "",
            siparisKosullari: order.siparisKosullari ?? "",
            kaliteKosullari: order.kaliteKosullari ?? "",
            siparisTipi: order.siparisTipi ?? "",
            turu: order.turu ?? "",
            firma_Id: order.firma_Id,
            priceOfferId: order.priceOfferId,
            toplamIndirimOraniYuzde: order.toplamIndirimOraniYuzde,
            toplamTutar: order.toplamTutar,
            siparisTarihi: order.siparisTarihi,
            teslimTarihi: order.teslimTarihi,
            yetkiliKisi: order.yetkiliKisi,
            projeNo: order.projeNo ?? "",
            siparisNo: order.siparisNo ?? "",

        }));
    };
    const { remove: deleteOrder, deletingId } = useDeleteResource(
        (id) => URL + `/PurchaseOrder/Delete/${id}`,
        {
            confirmText: "Bu siparişi silmek istediğine emin misin?",
            onSuccess: async () => {
                await refetchOrders();
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

    const formElementsforContract = (
        contractDtoForInsertion: ContractsDtoForInsertion
    ): FieldDefinition[] => {
        let fields: FieldDefinition[] = [
            {
                name: "kurum",
                label: "Kurum",
                type: "select",
                options:
                    enterpriseState.items?.map((enterprise) => ({
                        label: enterprise.enterpriseName,
                        value: enterprise.enterpriseName,
                    })) || [],
                colspan: 12,
                group: "Genel",
                required: true,
                defaultValue: contractDtoForInsertion?.kurum || "",
            },
            {
                name: "sirket",
                label: "Şirket",
                type: "select",
                disabled: true,
                options:
                    customerState.data?.map((company) => ({
                        label: company.firma,
                        value: company.firma,
                    })) || [],
                colspan: 12,
                group: "Genel",
                required: true,
                defaultValue: contractDtoForInsertion?.sirket || "",
            },
            {
                name: "sozlesmeTarihi",
                label: "Sözleşme Tarihi",
                type: "date",
                colspan: 12,
                group: "Genel",

                defaultValue: contractDtoForInsertion?.sozlesmeTarihi || "",
            },
            {
                name: "sozlesmeNo",
                label: "Sözleşme No",
                type: "text",
                colspan: 12,
                group: "Genel",
                required: true,
                defaultValue: contractDtoForInsertion?.sozlesmeNo || "",
            },
            {
                name: "sozlesmeAdi",
                label: "Sözleşme Adı",
                type: "text",
                colspan: 12,
                group: "Genel",
                required: true,
                defaultValue: contractDtoForInsertion?.sozlesmeAdi || "",
            },
            {
                name: "sozlesmeBaslangicTarihi",
                label: "Sözleşme Başlangıç Tarihi",
                type: "date",
                colspan: 12,
                group: "Genel",

                defaultValue: contractDtoForInsertion?.sozlesmeBaslangicTarihi || "",
            },
            {
                name: "sozlesmeBitisTarihi",
                label: "Sözleşme Bitiş Tarihi",
                type: "date",
                colspan: 12,
                group: "Genel",
                defaultValue: contractDtoForInsertion?.sozlesmeBitisTarihi || "",
            },
            {
                name: "aciklama",
                label: "Açıklama",
                type: "textarea",
                colspan: 12,
                group: "Genel",
                defaultValue: contractDtoForInsertion?.aciklama || "",
            },
        ];
        return fields;
    };
    const { refetch } = useApiRequest<ContractsDto[]>(URL + "/contracts/getall", { method: "GET", skip: true, deps: [], }
    );
    const ConvertToContract = async (contract: ContractsDtoForInsertion) => {
        openModal({
            title: "Sözleşme Oluştur",
            content: function (close: (result: any) => void): ReactNode {
                return (<GenericForm
                    fields={formElementsforContract(contract)}
                    onSubmit={function (data: ContractsDtoForInsertion): void {
                        data.priceOfferId = contract.priceOfferId;
                        data.purchaseOrdersId = contract.purchaseOrdersId;
                        refetch(URL + "/contracts/create", { method: "post", body: data }).then((result) => {
                            if (result) {
                                dispatch(setNotification({ message: "Sözleşme başarıyla oluşturuldu.", type: "success", title: "Başarılı" }));
                                close(result);
                            }
                        });
                    }}
                />)
            }
        });
    };

    const columns: Column<Partial<PurchaseOrders>>[] = [
        {
            header: "Sipariş Numarası",
            accessor: "siparisNo",
            filterable: true,
            sortable: true,
        },

        {
            header: "Fatura Numarası",
            accessor: "faturaNo",
            filterable: true,
            sortable: true,
        },

        {
            header: "Proje Numarası",
            accessor: "projeNo",
            filterable: true,
            sortable: true,
        },
        {
            header: "Firma Adı",
            accessor: "firmaAdi",
            filterable: true,
            sortable: true,
        },
        {
            header: "Yetkili Kişi",
            accessor: "yetkiliKisi",
            filterable: true,
            sortable: true,
        },
        {
            header: "Sipariş Tarihi",
            accessor: "siparisTarihi",
            filterable: true,
            sortable: true,
            body: (row) =>
                row.siparisTarihi
                    ? String(row.siparisTarihi).substring(0, 10).split("-").reverse().join(".")
                    : "",

        },
        {
            header: "Teslim Tarihi",
            accessor: "teslimTarihi",
            filterable: true,
            sortable: true,
            body: (row) =>
                row.teslimTarihi
                    ? String(row.teslimTarihi).substring(0, 10).split("-").reverse().join(".")
                    : "",

        },
        {
            header: "Toplam İndirim Oranı (%)",
            accessor: "toplamIndirimOraniYuzde",
            filterable: true,

            sortable: true,
        },
        {
            header: "Toplam Tutar",
            accessor: "toplamTutar",
            filterable: true,
            sortable: true,
        },
        {
            header: "Durumu",
            accessor: "durumu",
            filterable: true,
            sortable: true,
        },
        {
            header: "Sipariş Koşulları",
            accessor: "siparisKosullari",
            filterable: true,
            sortable: true,
        },
        {
            header: "Kalite Koşulları",
            accessor: "kaliteKosullari",
            filterable: true,
            sortable: true,
        },
        {
            header: "Açıklama",
            accessor: "aciklama",
            filterable: true,
            sortable: true,
        },
        {
            header: "Onay Açıklaması",
            accessor: "onayAcikla",
            filterable: true,
            sortable: true,
        },
        {

            header: "Actions",
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
                                    title: "",
                                    maximizable: true,
                                    style: { width: "70vw" },
                                    content: (close) => (
                                        <UpdatePurchaseOrderPage
                                            id={row.id!}
                                            onSuccess={refetchOrders}
                                            onClose={() => close(true)}
                                        />
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
                                e.stopPropagation(); row.id && deleteOrder(row.id)

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

                            {menu?.id === row.id &&
                                createPortal(
                                    <div
                                        className="fixed w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-[999999] overflow-hidden"
                                        style={{ top: menu.top, left: menu.left }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-gray-50"
                                            onClick={() => {
                                                setMenu(null);

                                                const contract: ContractsDtoForInsertion = {
                                                    isActive: true,
                                                    kurum: "",
                                                    sirket: customerState.data?.find(c => c.id === row.firma_Id)?.firma ?? "",
                                                    sozlesmeTarihi: undefined,
                                                    sozlesmeNo: "",
                                                    sozlesmeAdi: "",
                                                    nsnKodu: "",
                                                    urunAdi: "",
                                                    adet: 0,
                                                    birimFiyat: 0,
                                                    tutar: 0,
                                                    teslimGunu: "",
                                                    teslimTarihi: undefined,
                                                    durum: "",
                                                    aciklama: "",
                                                    priceOfferId: row.priceOfferId!,
                                                    sozlesmeBaslangicTarihi: undefined,
                                                    sozlesmeBitisTarihi: undefined,
                                                    purchaseOrdersId: row.id,                                                    
                                                };

                                                ConvertToContract(contract);
                                                console.log("contract:", contract);

                                            }}
                                        >
                                            <FaFile className="w-5 h-5 text-sky-600" />
                                            <span>Sözleşmeye Dönüştür</span>
                                        </button>


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
                                                row.id && deleteOrder(row.id);
                                            }}
                                        >
                                            Arşive Taşı
                                        </button>
                                    </div>,
                                    document.body
                                )}



                        </div>
                    </div>
                );
            },
        },
    ];



    return (
        <div className="card">
            <h2 className="text-xl text-center font-bold mb-2">Siparişler</h2>
            <div className="w-full overflow-x-auto">

                <SmartTable<Partial<PurchaseOrders>>
                    data={getAllPurchaseOrders()}
                    columns={columns}
                    rowIdAccessor={"id"}
                    frozenColumns={[{ name: "id", right: true }]}
                    isExport={true}
                    newRecordVoid={() => {
                        openModal({
                            title: "",
                            maximizable: true,
                            style: { width: "70vw" },
                            content: (close) => (
                                <AddPurchaseOrderPage2
                                    onSuccess={refetchOrders}
                                    onClose={() => close(true)}
                                />
                            ),
                        });
                    }}

                    scrollHeight="calc(100vh - 200px)"
                    enablePagination={false}
                ></SmartTable>
            </div>
        </div>
    );
};
export default PurchaseOrderPage;























