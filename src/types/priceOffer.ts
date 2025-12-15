export interface PriceOfferLine {
  id: number;
  malzemeId: number;
  malzemeKodu: string;
  malzemeAdi: string;
  miktar: number;
  birimi: string;
  birimFiyat: number;
  toplamFiyat: number;
  priceOffer_Id: number;
  paraBirimi: string;
}

export interface PriceOffer {
  id: number;
  firma_Id: number;
  firmaAdi: string;
  distributor_Id: number;
  distributor_Name: string;
  distributor_Image: string;
  yetkiliKisi: string;
  teklifTarihi: string;
  teklifGecerlilikTarihi: string;
  teklifAciklama: string;
  durumu: string;
  possibility: number;
  priceOfferLine: PriceOfferLine[];
}

export interface PriceOfferLineDtoFace {
  malzemeId: number;
  miktar: number;
  birimFiyat: number;
}

export interface PriceOfferAdd {
  firma_Id: number;
  teklifGecerlilikTarihi: string;
  teklifAciklama: string;
  possibility: number;
  priceOfferLineDtoFace: PriceOfferLineDtoFace[];
}

export interface PriceOfferUpdate {
  id: number;
  durumu: string;
  teklifGecerlilikTarihi: string;
  possibility: number;
  teklifAciklama: string;
}

export interface PriceOfferPossibilityUpdate {
  id: number;
  possibility: number;
}


export interface PriceOfferLineAdd {
  priceOffer_Id: number;
  malzemeId: number;
  miktar: number;
  birimFiyat: number;
}

export interface PriceOfferLineUpdate {
  id: number;
  miktar: number;
  birimFiyat: number;
}