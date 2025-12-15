

export interface PurchaseOrderLine {
  id: number;
  order_Id: number;
  malzemeId: number;
  malzemeKodu: string;
  malzemeAdi: string;
  miktar: number;
  birimi: string;
  birimFiyat: number;
  toplamFiyat: number;
  paraBirimi: string;
  aciklama: string;
}

export interface PurchaseOrder {
  id: number;
  firma_Id: number;
  firmaAdi: string;
  distributor_Id: number;
  distributor_Name: string;
  distributor_Image: string;
  priceOffer_Id: number;
  yetkiliKisi: string;
  siparisTarihi: string;
  teslimTarihi: string;
  aciklama: string;
  onayAcikla: string;
  durumu: string;
  isImportand: boolean;
  purchaseOrdersLine: PurchaseOrderLine[];
}


export interface PurchaseOrderUpdate {
  id: number;
  teslimTarihi: string;
  durumu: string;
  onayAcikla: string;
}

export interface PurchaseOrderLineUpdate {
  id: number;
  aciklama: string;
  miktar: number;
  birimFiyat: number;
}

export interface PurchaseOrderLineAdd {
  order_Id: number;
  malzemeId: number;
  miktar: number;
  birimFiyat: number;
  aciklama: string;
}

export interface PurchaseDetailDialogProps {
  selectedPurchase: PurchaseOrder | null;
  isModalVisible: boolean;
  closePurchaseDetail: () => void;
}