import { OpportunityDto, OpportunityStage } from "@/api/apiDtos";

export enum InputType {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Checkbox = "checkbox",
  Radio = "radio",
  File = "file",
  Date = "date",
  // İhtiyacına göre diğer tipleri de ekle
}
export interface Folder {
  id: number;
  name: string;
  parentFolderId?: number;
  subFolders?: Folder[];
}
export interface Document {
  id: number;
  name: string;
  contentType: string | null;
  uploadedAt: string;
  folderId: number;
}
export interface KysDocument {
  id?: number;
  documentNo: string;
  documentName: string;
  publishedDate: Date;
  revisionDate?: Date;
  revisionDescription: Date;
  contentType?: string | null;

  revisionNumber?: string;
  kysDocumentType: string;
  userName?: string;
  isArchive: string | null;
  updatedAt?: Date;
  isUserUploaded: boolean | null;
}
export interface StaffLeave {
  id: number;
  personel: string | null;
  birimi: string | null;
  izinNedeni: string | null;
  talepTarihi: string | null;
  izinTuru: string | null;
  adres: string | null;
  baslangicTarih: string | null;
  baslaSaat: string | null;
  bitisTarih: string | null;
  bitisSaat: string | null;
  yerineBakacakKisi: string | null;
  gorevBaslaTarihi: string | null;
  gorevBaslaSaati: string | null;
  bolumSorumlusu: string | null;
  iK_Onay: string | null;
  yonetim_Onay: string | null;
  durumu: string | null;
  durumAciklama: string | null;
  kullanici: string | null;
  personelId: number | null;
  isActive: boolean | null;
}
export interface Overtime {
  id: number;
  projeKodu: string | null;
  projeAdi: string | null;
  parcaKodu: string | null;
  parcaAdi: string | null;
  revizyon: string | null;
  seriNo: string | null;
  aciklama: string | null;
  personel: string | null;
  departman: string | null;
  tarih: string | null;
  baslamaSaati: string | null;
  bitisSaati: string | null;
  suresi: string | null;
  tezgah_isIstasyon: string | null;
  gorevVeren: string | null;
  yonetimOnay: string | null;
  turu: string | null;
  durumu: string | null;
  durumAciklama: string | null;
  kullanici: string | null;
  tar: string | null;
  isActive: boolean | null;
}
export interface Projects {
  id: number;
  projeNo: string | null;
  projeAdi: string | null;
  dgtNo: string | null;
  nsnKodu: string | null;
  turu: string | null;
  miktar: number | null;
  yedekMiktar: number | null;
  baslangicZamani: string | null;
  bitisZamani: string | null;
  toplamSure: string | null;
  aciklama: string | null;
  sorumluPersonel: string | null;
  durum: string | null;
  isActive: boolean | null;
}
export interface Products {
  id: number;
  productCode: string | null;
  productName: string | null;
  notes: string | null;
  parcaTipi: string | null;
  olcuBirimi: string | null;
  malzemeTuru: string | null;
  muadilMalzeme: string | null;
  tedarikTipi: string | null;
  firmaAdi: string | null;
  barkod: string | null;
  projeNo: string | null;
  isActive: boolean | null;
  eklemeZaman: string | null;
  degistirmeZaman: string | null;
  depo: string | null;
  seriLotNo: string | null;
  saklamaKosulu: string | null;
  sonKullanmaTarihi: string | null;
  revizyonNo: string | null;
  revizyonTarih: string | null;
  varyantSecenegi: boolean | null;
  urunKonfiguratoru: boolean | null;
  nsnKodu: string | null;
  seriNumarasi: string | null;
  stokYeri: string | null;
  stokMiktar: string | null;
}
export interface ProjectReport {
  id: number;
  raporNo: string | null;
  tarih: string | null;
  projeNo: string | null;
  projeAdi: string | null;
  parcaKodu: string | null;
  parcaAdi: string | null;
  revizyon: string | null;
  hazirlayan: string | null;
  onaylayan: string | null;
  aciklama: string | null;
  durumu: string | null;
  durumAciklama: string | null;
  kullanici: string | null;
  isActive: boolean | null;
  dosyalar: ProjectFiles[] | null;
}
export interface ProjectFiles {
  id: number;
  dosyaAdi: string | null;
  uzantisi: string | null;
  bytes: string | null;
  projectReport_Id: number | null;
  isActive: boolean | null;
}
export interface KanbanColumnProps {
  title: string;
  stage: OpportunityStage;
  opportunities: OpportunityDto[];
  onDragEnd: (id: string, newStatus: OpportunityStage) => void;
}
export enum DependencyAction {
  Ignore = 'ignore',   // Mod 1: Kontrol yok (Default)
  Restrict = 'restrict', // Mod 2: İhlal varsa izin verme
  AutoMove = 'autoMove'  // Mod 3: Zincirleme hareket (Auto-schedule)
}
export interface DependencyLink {
    id: number;       
    type: DependencyType; 
}
export type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';
export interface ColumnSettings {
    dependencyAction?: DependencyAction;
}
export interface CalendarEvent {
    id: number;
    title: string;
    startDate: string | null;
    endDate: string | null;
    allDay: boolean | null;
    eventType: number | null;
    releatedName: string | null;
    releatedId: number | null;
    assignedId: number | null;
    status: number | null;
    priority: number | null;
    createdBy: number | null;
    createdAt: string | null;
}