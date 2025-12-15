export interface CreatePriceOfferLineDtoFace {
  //priceOffer_Id: number,
  malzemeId: number,
  miktar: number,
  birimFiyat: number
}

export interface CreateOffer {
  priceOfferLineDtoFace: CreatePriceOfferLineDtoFace[];
  firma_Id: number,
  teklifGecerlilikTarihi: string,
  teklifAciklama: string,
  possibility: number,
  durumu: string
}

export interface CreatePriceOfferLineDtoFace2 {
  priceOffer_Id: number,
  malzemeId: number,
  miktar: number,
  birimFiyat: number
}

export interface CreateOffer2 {
  priceOfferLineDtoFace2: CreatePriceOfferLineDtoFace2[];
  firma_Id: number,
  teklifGecerlilikTarihi: string,
  teklifAciklama: string,
  possibility: number,
  durumu: string
}