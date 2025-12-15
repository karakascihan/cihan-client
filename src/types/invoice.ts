export interface CompanyFaceDto {
    id: number;
    firma: string;
    yetkili: string;
    adres: string;
    email: string;
    telefon: string;
    vergiDairesi: string;
    vergiNo: string;
  }
  
  export interface invoiceLineDtos  {
    id: number;
    productId: number;
    productName: string;
    miktar: number;
    birimFiyat: number;
    kdvHaricToplamFiyat: number;
    kdvOrani: number;
    kdvDahilToplamTutar: number;
    indirimOrani: number;
    indirimTutari: number;
  }

  export interface userProfileDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone1: string;
    image: string;
  }

  export interface FirmaBilgileriDto {
    id: number;
    yetkili: string;
    firmaName: string;
    adres: string;
    vkn: string;
    vergiDairesi: string;
    ticariSicilNo: string;
    mersisNo: string;
    telefon: string;
    eposta: string;
    web: string;
}
      // ! "teslimatAciklama": "Teslimat açıklaması",
    // ! "teslimatAdresi": "Adres bilgisi",
    // ! "teslimatTipi": "Kapıda Teslim",
  export interface Invoice {
    id: number;
    companyFaceDto: CompanyFaceDto;
    userProfileDto: userProfileDto;
    FirmaBilgileriDto: FirmaBilgileriDto;
    faturaTipi: string;
    odemeTarihi: string;
    duzenlenmeTarihi: string;
    faturaNo: string;
    paraBirimi: string;
    isIrsaliye: boolean;
    odemeYontemi: string;
    faturaGenelAciklama: string;
    indirimOncesiTutar: number;
    indirimTutari: number;
    toplamKdvTutari: number;
    genelToplam: number;
    invoiceLineDtos: invoiceLineDtos[];
    senaryo: string;
    teslimatAciklama: string;
    teslimatAdresi: string;
    teslimatTipi: string;
  }

  // crate Invoice type : 

  export interface CreateInvoice {
    companyId: number; // ID of the company associated with the invoice
    faturaTipi: string; // Type of the invoice
    duzenlenmeTarihi: string; // Date and time the invoice was issued, ISO format
    odemeTarihi: string; // Payment date, ISO format
    faturaNo: string; // Invoice number
    paraBirimi: string; // Currency of the invoice 
    isIrsaliye: boolean; // Indicates if the invoice includes a delivery note
    odemeYontemi: string; // Payment method
    faturaGenelAciklama: string; // General description of the invoice
    senaryo: string; // Scenario of the invoice
    // Teslimat Bilgileri :
    teslimatTipi: string;
    teslimatAciklama: string;
    teslimatAdresi: string;
    // Ürün kalemleri :
    invoiceLineCreateDto: {
      productId: number; 
      birimi: string; //  ! NEW ***
      miktar: number; // Quantity of the product
      birimFiyat: number; // Unit price of the product
      indirimOrani: number; // Discount rate as a percentage
      kdvOrani: number; // VAT rate as a percentage
    }[]; // Array
  }

  // Update Invoice type :

  export interface UpdateInvoice {
    id: number;
    faturaTipi: string;
    odemeTarihi: string;
    faturaNo: string;
    paraBirimi: string;
    isIrsaliye: boolean;
    odemeYontemi: string;
    faturaGenelAciklama: string;
    senaryo: string;
    invoiceLineCreateDto: invoiceLineCreateDto[];
    // Teslimat Bilgileri :
    teslimatTipi: string;
    teslimatAciklama: string;
    teslimatAdresi: string;
  }
  
  export interface invoiceLineCreateDto {
    productId: number;
    birimi: string;
    miktar: number;
    birimFiyat: number;
    indirimOrani: number;
    kdvOrani: number;
  }
  