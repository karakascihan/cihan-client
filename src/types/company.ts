export interface Company {
  id: number;
  firma: string;
  user : CompanyUser;
  yetkili: string;
  adres: string;
  email: string;
  telefon: string;
  turu: string;
  tedarikciPuani: number;
  tedarikciSinifi: string;
  calismaBaslamaTarihi: string;
  degerlendirmeTarihi: string;
  sektor: string;
  referans: string;
  onayDurumu: string;
  akreditasyonu: string;
  sinifi: string;
  vergiNo: string;
  vergiDairesi: string;
  cariKodu: string;
  yggKarar: string;
  denetimNotu: string;
  longitude: number;
  latitude: number;
  benchMachineDtos: CompanyBenchMachineDto[];
}


interface CompanyUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone1: string;
  image: string;
}

interface CompanyBenchMachineDto {


}

interface CompanyBenchMachineDto {
  code: string;
  name: string;
  description: string;
  state: boolean;
  makinaSaatUcret: number;
}












// export interface Company { // ! Get Company type
//   id: number;
//   firma: string;
//   yetkili: string;
//   adres: string;
//   email: string;
//   telefon: string;
//   turu: string;
//   tedarikciPuani: number;
//   tedarikciSinifi: string;
//   calismaBaslamaTarihi: string;
//   degerlendirmeTarihi: string;
//   sektor: string;
//   referans: string;
//   onayDurumu: string;
//   akreditasyonu: string;
//   sinifi: string;
//   vergiNo: string;
//   vergiDairesi: string;
//   latitude: number | null;
//   longitude: number | null;
//   cariKodu: string;
//   yggKarar: string;
//   denetimNotu: string;
//   user: CompanyUser;
// }



export interface NewCompany {

  firma: string;
  yetkili: string;
  adres: string;
  email: string;
  telefon: string;
  turu: string;
  tedarikciPuani: 0;
  tedarikciSinifi: string;
  sektor: string;
  referans: string;
  onayDurumu: string;
  akreditasyonu: string;
  sinifi: string;
  vergiNo: string;
  vergiDairesi: string;
  cariKodu: string;
  yggKarar: string;
  denetimNotu: string;
  longitude: 0;
  latitude: 0;
}