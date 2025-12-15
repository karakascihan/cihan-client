interface CompanyFaceDto {
    id: number;
    firma: string;
    yetkili: string;
  }
  
  interface UserProfileDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone1: string;
    image: string;
  }
  
  interface ProductFaceDto {
    id: number;
    productPrice: number;
    productCode: string;
    productName: string;
    birim: string;
    pictures: string;
  }
  
  export interface PriceOfferLineBayiDto {
    id: number;
    priceOffer_Id: number;
    miktar: number;
    birimFiyat: number;
    toplamFiyat: number;
    paraBirimi: string;
    teslimTarih: string;
    productFaceDto: ProductFaceDto;
  }
  
 
  export interface FiyatTeklifiBayii {  // ***  Gelen Bayii Fiyat teklifleri 
    id: number;
    companyFaceDto: CompanyFaceDto;
    userProfileDto: UserProfileDto;
    teklifTarihi: string;
    teklifGecerlilikTarihi: string;
    teklifAciklama: string;
    durumu: string;
    possibility: number;
    paraBirimi: string;
    priceOfferLineBayiDto: PriceOfferLineBayiDto[];
  }


 export interface CreatePriceOfferLineBayi {// ıexported-esma
    productId: number;
    miktar: number;
    birimFiyat: number;
    teslimTarih: string;
 }


    export interface CreatePriceOfferLineBayiWithOfferId {// ıexported-esma
      priceOffer_Id: number;
      productId: number;
      miktar: number;
      birimFiyat: number;
      teslimTarih: string;
  }  
  



export interface CreateFiyatTeklifiBayii { // *** Yeni Bayii Fiyat teklif Oluşturma 
    companyId: number;
    teklifGecerlilikTarihi: string;
    teklifAciklama: string;
    possibility: number;
    paraBirimi: string;
    createPriceOfferLineBayi: CreatePriceOfferLineBayi[];
}

export interface ChangePossibilityFiyatTeklifiBayii { // *** Bayii Fiyat Tekliflerindeki Possibility Değiştirme
    id: number;
    possibility: number;
}

export interface UpdateFiyatTeklifiBayii { // *** Bayii Fiyat Teklifi Güncelleme
  id: number;
  durumu: string;
  teklifGecerlilikTarihi: string;
  possibility: number;
  teklifAciklama: string;
}


// price offer line bayii created return type : 

export interface PriceOfferLineBayiDto {
  id: number;
  priceOffer_Id: number;
  miktar: number;
  birimFiyat: number;
  toplamFiyat: number;
  paraBirimi: string;
  teslimTarih: string;
  productFaceDto: ProductFaceDto;
}