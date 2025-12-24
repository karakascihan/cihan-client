import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Column, SmartTable } from "@/components/SmartTable";
import { OpportunityDto, PriceOffer, PriceOfferDto, PurchaseOrderDto, PurchaseOrders } from "@/api/apiDtos";
import { apiRequest } from "@/services";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { FaSearch } from "react-icons/fa";

export const PurchaseOrderPage = () => {
    const navigate = useNavigate();
    const { opportunityId } = useParams();

    const { data: purchaseOrders, refetch: refetchOrders } = useApiRequest<PurchaseOrderDto>(
        URL + "/PurchaseOrder/GetAll", {
        method: "GET",
        skip: false,
        deps: [],
    }
    );

    //   const { data: offers, refetch: refetchOffers } = useApiRequest<PriceOfferDto>(
    //     URL + "/PriceOffer/GetAll",    {
    //       method: "GET",
    //       skip: false,
    //       deps: [],
    //     }
    //   );

    const { data: opportunities, refetch: refetchOpportunities } = useApiRequest<OpportunityDto>(
        URL + "/opportunity/GetAll", {
        method: "GET",
        skip: false,
        deps: [],
    }
    );

    useEffect(() => {
        console.log("purchaseOrders geldi:", purchaseOrders);
    }, [purchaseOrders]);

    //   useEffect(() => {
    //     console.log("offers geldi:", offers);
    //   }, [offers]);

    useEffect(() => {
        console.log("opportunities geldi, url yanında", opportunities, URL);
    }, [opportunities]);



    //   const getOrderedPurchaseOrders = () => {
    //      if (!offers || !purchaseOrders) return [];

    //      return offers
    //        .filter(po => po.opportunityId != null)
    //        .map(po =>
    //          purchaseOrders.find(
    //            o => o.opportunityId === po.opportunityId
    //          )
    //        )
    //        .filter(Boolean);
    //    };
    const getAllPurchaseOrders = (): Partial<PurchaseOrders>[] => {
        if (!purchaseOrders) return [];
        return purchaseOrders.map(order => ({
            id: order.id!,
            opportunityId: order.opportunityId,
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
        }));
    };

    const getWonOpportunities = (): Partial<PurchaseOrders>[] => {
        if (!opportunities || !purchaseOrders) return [];

        return opportunities
            .filter(po => po.id != null && po.opportunityStage === 5)
            .map(po => {
                const order = purchaseOrders.find(o => o.opportunityId === po.id);
                if (!order) return null;

                // DTO → PurchaseOrders dönüşümü
                return {
                    id: order.id!,
                    siparisNo: "",  // default değerler ver
                    talepNo: "",
                    isActive: true,
                    opportunityId: order.opportunityId,
                    firmaAdi: po.customerName ?? "",
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

                } as Partial<PurchaseOrders>;
            })
            .filter(Boolean) as Partial<PurchaseOrders>[];
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
              <button
                onClick={() => {
                  navigate(`/siparisiguncelle/${row.id}`); 
                }}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Güncelle
              </button>
            ),
          },
        ];

    


    useEffect(() => {
        console.log("getWonOpportunities()", getWonOpportunities());
    }, [opportunities, purchaseOrders]);








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
