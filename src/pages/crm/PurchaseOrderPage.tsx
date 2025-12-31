import { useNavigate } from "react-router-dom";
import { Column, SmartTable } from "@/components/SmartTable";
import { PurchaseOrderDto, PurchaseOrders } from "@/api/apiDtos";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteResource } from "@/hooks/useDeleteResource";
import { useModal } from '@/context/ModalContext'
import { AddPurchaseOrderPage2 } from "./AddPurchaseOrderPage2";
import { UpdatePurchaseOrderPage } from "./UpdatePurchaseOrderPage";

export const PurchaseOrderPage = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();

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
        },
        {
            header: "Teslim Tarihi",
            accessor: "teslimTarihi",
            filterable: true,
            sortable: true,
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
            body: (row) => (
                <div className="w-[96px] flex items-center justify-center gap-2  pl-2 border-l border-gray-200">
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
                </div >
            ),
        },
    ];


    return (
        <div className="card">
            <h2 className="text-xl text-center font-bold mb-2">Siparişler</h2>
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
    );
};























