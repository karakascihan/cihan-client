import {useNavigate} from "react-router-dom";
import {Column, SmartTable} from "@/components/SmartTable";
import {PurchaseOrderDto, PurchaseOrders} from "@/api/apiDtos";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import {FaPencilAlt,FaTrashAlt} from "react-icons/fa";
import {useDeleteResource} from "@/hooks/useDeleteResource";

export const PurchaseOrderPage = () => {
    const navigate = useNavigate();
    const {data: purchaseOrders, refetch: refetchOrders} = useApiRequest<PurchaseOrders>(
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
            sortable: true,},

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
            header: "Sipariş Tipi",
            accessor: "siparisTipi",
            filterable: true,
            sortable: true,
        },
        {
            header: "Türü",
            accessor: "turu",
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
                        onClick={() => {
                            navigate(`/siparisiguncelle/${row.id}`);
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
                        onClick={() => row.id && deleteOrder(row.id)}
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
                </div>
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
                    navigate("/yenisiparis");
                }}

                scrollHeight="calc(100vh - 200px)"
                enablePagination={false}
            ></SmartTable>
        </div>
    );
};
























// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Column, SmartTable } from "@/components/SmartTable";
// import { OpportunityDto, PriceOffer, PriceOfferDto, PurchaseOrderDto, PurchaseOrders } from "@/api/apiDtos";
// import { apiRequest } from "@/services";
// import { useApiRequest } from "@/hooks/useApiRequest";
// import { URL } from "@/api";
// import { FaPencilAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
// import { useDeleteResource } from "@/hooks/useDeleteResource";

// export const PurchaseOrderPage = () => {
//     const navigate = useNavigate();
//     const { opportunityId } = useParams();

//     const { data: purchaseOrders, refetch: refetchOrders } = useApiRequest<PurchaseOrderDto>(
//         URL + "/PurchaseOrder/GetAll", {
//         method: "GET",
//         skip: false,
//         deps: [],
//     }
//     );

//     //   const { data: offers, refetch: refetchOffers } = useApiRequest<PriceOfferDto>(
//     //     URL + "/PriceOffer/GetAll",    {
//     //       method: "GET",
//     //       skip: false,
//     //       deps: [],
//     //     }
//     //   );

    
//     useEffect(() => {
//         console.log("purchaseOrders geldi:", purchaseOrders);
//     }, [purchaseOrders]);

//     //   useEffect(() => {
//     //     console.log("offers geldi:", offers);
//     //   }, [offers]);

   

//     //   const getOrderedPurchaseOrders = () => {
//     //      if (!offers || !purchaseOrders) return [];

//     //      return offers
//     //        .filter(po => po.opportunityId != null)
//     //        .map(po =>
//     //          purchaseOrders.find(
//     //            o => o.opportunityId === po.opportunityId
//     //          )
//     //        )
//     //        .filter(Boolean);
//     //    };
//     const getAllPurchaseOrders = (): Partial<PurchaseOrders>[] => {
//         if (!purchaseOrders) return [];
//         return purchaseOrders.map(order => ({
//             id: order.id!,
//             firmaAdi: order.firmaAdi ?? "",
//             aciklama: order.aciklama ?? "",
//             durumu: order.durumu ?? "",
//             onayAcikla: order.onayAcikla ?? "",
//             faturaNo: order.faturaNo ?? "",
//             siparisKosullari: order.siparisKosullari ?? "",
//             kaliteKosullari: order.kaliteKosullari ?? "",
//             siparisTipi: order.siparisTipi ?? "",
//             turu: order.turu ?? "",
//             firma_Id: order.firma_Id,
//             siparisTarihi: order.siparisTarihi,
//             teslimTarihi: order.teslimTarihi,
//             yetkiliKisi: order.yetkiliKisi,
//         }));
//     };

    

//         return opportunities
//             .filter(po => po.id != null && po.opportunityStage === 5)
//             .map(po => {
//                 const order = purchaseOrders.find(o => o.opportunityId === po.id);
//                 if (!order) return null;

//                 // DTO → PurchaseOrders dönüşümü
//                 return {
//                     id: order.id!,
//                     siparisNo: "",  // default değerler ver
//                     talepNo: "",
//                     isActive: true,
//                     opportunityId: order.opportunityId,
//                     firmaAdi: po.customerName ?? "",
//                     aciklama: order.aciklama ?? "",
//                     durumu: order.durumu ?? "",
//                     onayAcikla: order.onayAcikla ?? "",
//                     faturaNo: order.faturaNo ?? "",
//                     siparisKosullari: order.siparisKosullari ?? "",
//                     kaliteKosullari: order.kaliteKosullari ?? "",
//                     siparisTipi: order.siparisTipi ?? "",
//                     turu: order.turu ?? "",
//                     firma_Id: order.firma_Id,
//                     siparisTarihi: order.siparisTarihi,
//                     teslimTarihi: order.teslimTarihi,
//                     yetkiliKisi: order.yetkiliKisi,

//                 } as Partial<PurchaseOrders>;
//             })
//             .filter(Boolean) as Partial<PurchaseOrders>[];
//     };


//     const { remove: deleteOrder, deletingId } = useDeleteResource(
//         (id) => URL + `/PurchaseOrder/Delete/${id}`,
//         {
//             confirmText: "Bu siparişi silmek istediğine emin misin?",
//             onSuccess: async () => {
//                 await refetchOrders();
//             },
//             onError: () => {
//                 alert("Silme sırasında hata oluştu!");
//             },
//         }
//     );
//     const columns: Column<Partial<PurchaseOrders>>[] = [
//         {
//             header: "Sipariş Numarası",
//             accessor: "siparisNo",
//             filterable: true,
//             sortable: true,
//         },


//         {
//             header: "Fatura Numarası",
//             accessor: "faturaNo",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Proje Numarası",
//             accessor: "projeNo",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Firma Adı",
//             accessor: "firmaAdi",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Yetkili Kişi",
//             accessor: "yetkiliKisi",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Sipariş Tarihi",
//             accessor: "siparisTarihi",
//             filterable: true,
//             sortable: true,
//         },

//         {
//             header: "Teslim Tarihi",
//             accessor: "teslimTarihi",
//             filterable: true,
//             sortable: true,
//         },

//         {
//             header: "Sipariş Tipi",
//             accessor: "siparisTipi",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Türü",
//             accessor: "turu",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Durumu",
//             accessor: "durumu",
//             filterable: true,
//             sortable: true,
//         },


//         {
//             header: "Sipariş Koşulları",
//             accessor: "siparisKosullari",
//             filterable: true,
//             sortable: true,

//         },
//         {
//             header: "Kalite Koşulları",
//             accessor: "kaliteKosullari",
//             filterable: true,
//             sortable: true,
//         },

//         {
//             header: "Açıklama",
//             accessor: "aciklama",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Onay Açıklaması",
//             accessor: "onayAcikla",
//             filterable: true,
//             sortable: true,
//         },
//         {
//             header: "Actions",
//             accessor: "id",
//             body: (row) => (
//                 <div className="w-[96px] flex items-center justify-center gap-2  pl-2 border-l border-gray-200">
//                     <button
//                         onClick={() => {
//                             navigate(`/siparisiguncelle/${row.id}`);
//                         }}
//                         className="
//                     inline-flex items-center justify-center
//                     h-8 w-8
//                     rounded-md
//                     bg-amber-100
//                     border border-amber-300
//                     text-amber-700
                  
//                     transition-all duration-200 ease-out
//                     transform
                  
//                     hover:-translate-y-0.5
//                     hover:bg-amber-100
//                     hover:border-amber-400
//                     hover:text-amber-800
//                     hover:shadow-lg
                  
//                     shadow-md
//                     focus:outline-none
//                     focus:ring-2 focus:ring-amber-300
//                     active:translate-y-0
//                     active:shadow-sm
//                   "

//                         title="Düzenle"
//                     >
//                         <FaPencilAlt className="text-[13px]" />
//                     </button>
//                     <button
//                         onClick={() => row.id && deleteOrder(row.id)}
//                         disabled={deletingId === row.id}
//                         className="
//                   inline-flex items-center justify-center
//                   h-8 w-8
//                   rounded-md
              
//                   bg-red-50
//                   border border-red-300
//                   text-red-700
              
//                   transition-all duration-200 ease-out
//                   transform
              
//                   hover:-translate-y-0.5
//                   hover:bg-red-100
//                   hover:border-red-400
//                   hover:text-red-800
//                   hover:shadow-lg
              
//                   shadow-md
//                   focus:outline-none
//                   focus:ring-2 focus:ring-red-300
//                   active:translate-y-0
//                   active:shadow-sm
//                 "
//                         title="Sil"
//                     >
//                         {deletingId === row.id ? "…" : <FaTrashAlt className="text-[13px]" />}
//                     </button>
//                 </div>
//             ),
//         },
//     ];




//     useEffect(() => {
//         console.log("getWonOpportunities()", getWonOpportunities());
//     }, [opportunities, purchaseOrders]);








//     return (
//         <div className="card">
//             <h2 className="text-xl text-center font-bold mb-2">Siparişler</h2>
//             <SmartTable<Partial<PurchaseOrders>>
//                 data={getAllPurchaseOrders()}
//                 columns={columns}
//                 rowIdAccessor={"id"}
//                 frozenColumns={[{ name: "id", right: true }]}
//                 isExport={true}
//                 newRecordVoid={() => {
//                     navigate("/yenisiparis");
//                 }}

//                 scrollHeight="calc(100vh - 200px)"
//                 enablePagination={false}
//             ></SmartTable>
//         </div>
//     );
// };
