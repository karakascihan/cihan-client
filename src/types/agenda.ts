export interface Agenda {
  id: number;
  priceOffer_Id: number;
  takvimMusteriBaslik: string | null;
  takvimMusteriBaslangicTarih: string;
  takvimMusteriBitisTarih: string;
  takvimMusteriRenk: string;
  projeKodu?: string | null;
  parcaKodu?: string | null;
  sorumluPersonel?: string | null;
  takvimMusteriAciklama?: string | null;
  takvimMusteriBaslangicSaat?: string | null; 
  takvimMusteriBitisSaat?: string | null; 
  takvimMusteriDurumu?: string | null;
  takvimMusteriTipi?: string | null;
  eklemeZaman: Date;
  degismeZaman: Date;
  isActive?: boolean | null;
  kategori?: string | null;
  imageIndex?: number | null;
  projeAdi?: string | null;
  projeModulu?: string | null;
  firmaAdi?: string | null;
  firmaIlgiliKisi?: string | null;
  telefon?: string | null;
  satisPersoneli?: string | null;
  rakip?: string | null;
  ERPvaryok?: string | null;
  olasilik?: string | null;
  gorusmeYeri?: string | null;
  ilkGorusmeTarihi?: Date | null;
  sonGorusmeTarihi?: Date | null;
  siparis?: string | null;
  teklifTarihi?: Date | null;
  teklifTutari?: number | null; 
  sozlesmeTarihi?: Date | null;
  sozlesmeTutari?: number | null; 
  degerlendirme?: string | null;
  sonuc?: string | null;
}

export interface UpdateAgenda {
  id: number;
  takvimMusteriBaslangicTarih: string;
  takvimMusteriBitisTarih: string;
  takvimMusteriRenk: string;
  takvimMusteriBaslik: string | null;
}


// with DATE type
export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}