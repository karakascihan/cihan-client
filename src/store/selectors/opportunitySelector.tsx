import { createSelector } from "@reduxjs/toolkit";
import { ActivityDto, CustomerDto, OpportunityDto, PriceOfferDto } from "@/api/apiDtos";
import { RootState } from "../store";

export const selectOpportunitiesWithCustomer = createSelector(
  [(state: RootState) => state.opportunity.data,(state: RootState) => state.customer.data,(state: RootState) => state.user.data],
  (opportunities, customers,users) => {
    return  opportunities.map((opportunity :OpportunityDto) => {
      const customer = customers?.find((c:CustomerDto) => c.id === opportunity.customerId);
      const user = users.find(u=>u.id===opportunity.createdByUserId);
      return {
        ...opportunity,
        sektor: customer?.sektor ?? "",
        userName: (user?.name ??"")+" "+(user?.surname ?? ""),
        ulkeAdi: customer ? (customer.ulkeAdi) : "",
      };
    });
  }
);
export const selectActivitiesWithCustomerWithOpportunity = createSelector(
  [(state: RootState) => state.opportunity.data,(state: RootState) => state.customer.data,(state: RootState) => state.activity.data],
  (opportunities, customers,activities) => {
    return  activities.map((activity :ActivityDto) => {
      const customerId=activity.relatedEntityName =="Customer"? activity.relatedEntityId: opportunities.find((o:OpportunityDto) => o.id === activity.relatedEntityId)?.customerId;
      if(customerId){
       const customer = customers.find((c:CustomerDto) => c.id === customerId);
        return {
        ...activity,
        customerName: customer ? customer.firma : "Bilinmeyen Müşteri",
        customerSector: customer?.sektor ?? "",
        opportunityName: opportunities.find((o:OpportunityDto) => o.id === activity.relatedEntityId)?.title ?? "",
        customerContactPersonName: customer?.contacts?.find(cp=>cp.id===activity.customerContactPersonId)?.yetkiliKisi ?? "",
      };
      }
      else  return {
        ...activity,
       
      };
     
    });
  }
);
export const selectPriceOffersWithCustomerWithOpportunity = createSelector(
  [(state: RootState) => state.opportunity.data,(state: RootState) => state.customer.data,(state: RootState) => state.user.data,(state: RootState) => state.personel.items,(state: RootState) => state.priceOffer.data],
  (opportunities, customers,users,personels,priceoffers) => {
    return  priceoffers?.map((priceoffer :PriceOfferDto) => {
      const customer = customers.find((c:CustomerDto) => c.id === priceoffer.firma_Id);
      const opportunity = opportunities.find((c:OpportunityDto) => c.id === priceoffer.opportunityId);
      const yetkili = customer?.contacts.find(cp=>cp.id===opportunity?.customerContactPersonId);
      const user = users.find(u=>u.userName===priceoffer.ekleyen);
      const personel = personels.find(p=>p.id==priceoffer.teklifOnay);
      return {
        ...priceoffer,
       hazirlayan: user ? (user.name+" "+user.surname) : "",
       adet: priceoffer.priceOfferLine.filter(x=>x.opsiyonMu!==true)?.reduce((curr,pre)=>curr+(pre.miktar??0),0) ,
       toplamFiyat: priceoffer.priceOfferLine.filter(x=>x.opsiyonMu!==true)?.reduce((curr,pre)=>curr+((pre.miktar??0)*(pre.birimFiyat??0)),0),
       customerContact: yetkili&& (yetkili.yetkiliKisi)+"("+(yetkili?.gorevi)+")",
       onaylayanPersonel: personel ? (personel.personelAdi+" "+personel.personelSoyadi) : "",
       ulkeAdi: customer ? (customer.ulkeAdi) : "",
      };
    });
  }
);
