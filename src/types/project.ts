export interface ResponsiblePerson {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone1: string;
    image: string;
  }
  
  export interface Project {
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
    sorumluKisi: ResponsiblePerson;
  }


  export interface CreateProject {
    projeNo: string;
    projeAdi: string;
    stokNo: string;
    nsnKodu: string;
    turu: "İhale" | "Ar-Ge" | "Tedarikçiye Verilecek İş";
    miktar: number;
    yedekMiktar: number;
    baslangicZamani: string;
    bitisZamani: string;
    aciklama: string;
    durum: "Aktif" | "Sia_Kapsamın" | "Askıda" | "Kapatıldı" | "Tamamlandı" | "Tedarikçiye Açık" | "Tedarikçiye Kapalı";
  }