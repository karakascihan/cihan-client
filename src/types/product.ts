export interface Product {
  id: number;
  productCode: string;
  productName: string;
  productPrice: number; // Added this field
  birim: string;
  notes: string;
  parcaTipi: string;
  olcuBirimi: string;
  malzemeTuru: string;
  muadilMalzeme: string;
  tedarikTipi: string;
  firmaAdi: string;
  barkod: string;
  pictures: string | null;
  projeNo: string;
  eklemeZaman: string;
  degistirmeZaman: string;
  depo: string;
  seriLotNo: string;
  saklamaKosulu: string;
  sonKullanmaTarihi: string;
  revizyonNo: string;
  revizyonTarih: string;
  varyantSecenegi: string;
  urunKonfiguratoru: string;
  image: string | null;
}


export interface CreateProduct {
  productCode: string;
  productName: string;
  productPrice: number;
  birim: string;
  notes: string;
  parcaTipi: string;
  olcuBirimi: string;
  malzemeTuru: string;
  muadilMalzeme: string;
  tedarikTipi: string;
  firmaAdi: string;
  barkod: string;
  pictures: string;
  projeNo: string;
  depo: string;
  seriLotNo: string;
  saklamaKosulu: string;
  sonKullanmaTarihi: string;
  revizyonNo: string;
  revizyonTarih: string;
  varyantSecenegi: string;
  urunKonfiguratoru: string;
}