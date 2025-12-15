// ! PROJELERIN DONUS TIPI : 


 interface SupplySorumluKisi {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone1: string;
    image: string;
  }
  
   export interface Supply { // ! *** SUPPLY A AÇIK PROJELER GELIYO  ***
    id: number;
    projeNo: string;
    projeAdi: string;
    stokNo: string;
    nsnKodu: string;
    turu: string;
    miktar: number;
    yedekMiktar: number;
    baslangicZamani: string;
    bitisZamani: string;
    toplamSure: string;
    aciklama: string;
    durum: string;
    sorumluKisi: SupplySorumluKisi;
  }

  // ! CREATE SUPPLY PART !  

  // ...existing code...

 interface PriceOfferCostLineTedarikciCreateDto { // Düz Costline
  maliyetTipi: string;
  islemAciklamasi: string;
  dovizKuru: number;
  malzemeAdi: string;
  miktar: number;
  birimi: string;
  toplamFiyat: number;
}

 interface PriceOfferDetailTedarikciCreateDto { // Ayrinti Maliyet
  malzemeAdi: string;
  malzemeCinsi: string;
  malzemeTipi: string;
  islemAciklamasi: string;
  kurTarihi: string;
  dovizKuru: number;
  miktar: number;
  birimi: string;
  disCap: string;
  icCap: number;
  en: number;
  boy: number;
  kalinlik: number;
  yogunluk: number;
  agirlik: string;
  birimTutar: number;
}

 interface LaborCreateTedarikciDto { // işçilik maaliyeti 
  malzemeAdi: string;
  operasyonTipi: string;
  islemAciklamasi: string;
  kurTarihi: string;
  dovizKuru: number;
  miktar: number;
  birimi: string;
  torna: number;
  cyTorna: number;
  ucEksen: number;
  dortEksen: number;
  besEksen: number;
  iscilikDoviz: number;
  iscilikTL: number;
}

 interface CreatePriceOfferLineTedarikci { // Linelar ve ayrintilari 
  productId: number;
  miktar: number;
  teslimTarih: string;
}

export interface createTedarikOffer { // ! *** TEDARIKCI OLUSTURMA ISTEGI ***
  projectId: number;
  teklifAciklama: string;
  teklifGecerlilikTarihi: string;
  paraBirimi: string;
  createPriceOfferLineTedarikci: CreatePriceOfferLineTedarikci[];
}

// !  Get Tedarik types : 

interface PriceOfferCostLineDto {
  id: number;
  maliyetTipi: string;
  islemAciklamasi: string;
  paraBirimi: string;
  dovizKuru: number;
  malzemeAdi: string;
  miktar: number;
  birimi: string;
  toplamFiyat: number;
  laborDto: any;
  priceOfferDetailDto: any;
}

interface ProductFaceDto {
  id: number;
  productPrice: number;
  productCode: string;
  productName: string;
  birim: string;
  pictures: string;
}

interface PriceOfferLineTedarikDto {
  id: number;
  miktar: number;
  birimFiyat: number;
  toplamFiyat: number;
  paraBirimi: string;
  priceOfferCostLineDtos: PriceOfferCostLineDto[];
  teslimTarih: string;
  productFaceDto: ProductFaceDto;
}

interface SorumluKisi {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone1: string;
  image: string;
}

interface ProjectsDto {
  id: number;
  projeNo: string;
  projeAdi: string;
  stokNo: string;
  nsnKodu: string;
  turu: string;
  miktar: number;
  yedekMiktar: number;
  baslangicZamani: string;
  bitisZamani: string;
  toplamSure: string;
  aciklama: string;
  durum: string;
  sorumluKisi: SorumluKisi;
}

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

export interface TedarikOffer { // ! *** Tedarik Type *** comes from get request
  id: number;
  paraBirimi: string;
  companyFaceDto: CompanyFaceDto;
  userProfileDto: UserProfileDto;
  projectsDto: ProjectsDto;
  teklifTarihi: string;
  teklifGecerlilikTarihi: string;
  teklifAciklama: string;
  durumu: string;
  priceOfferLineTedarikDto: PriceOfferLineTedarikDto[];
}