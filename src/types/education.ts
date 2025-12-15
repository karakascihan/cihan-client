import { FileRecord, PersonelEducationAssignDto, PersonelEducationMapping } from "@/api/apiDtos";

export interface EducationPlan {
    id: number;
    egitimAdi: string | null;
    egitimNotu: string | null;
    egitimBaslangicTarihi: Date | null;
    egitimBitisTarihi: Date | null;
    icKaynakMi: boolean;
    egiticiPersonelId: number | null;
    isActive: boolean | null;
    disKaynakAdi:string| null;
    egitimSuresiDk:number | null
    dosyalar?:FileRecord[]
    atama: PersonelEducationAssignDto | undefined
    egitimDegerlendirmeFormId:number | null
    personelDegerlendirmeFormId :number | null
}
export interface PersonelEducationMappingDto {
    id?: number;
    personelId: number;
    personelEducationPlanId: number;
    state: number;
}