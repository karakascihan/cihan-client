// Auto-generated from Swagger x-enumDescriptions

import { ActivityState, ActivityType, ColumnType, CustomerType, DayOfWeek, EntityType, OperationType, OpportunityStage, PersonelEgitimDurumlari, PriceOfferState, QuestionType, SozlesmeTipi, SurveyType, TemplateType, TransactionType } from "./apiDtos";

// Auto-generated from Swagger x-enumDescriptions

export const ActivityStateDescriptions: Record<ActivityState, string> = {
  [ActivityState.Planned]: "Planlandı",
  [ActivityState.InProgress]: "Devam Ediyor",
  [ActivityState.Completed]: "Tamamlandı",
  [ActivityState.Canceled]: "İptal Edildi",
  [ActivityState.Postponed]: "Erteleme",
  [ActivityState.Failed]: "Başarısız",
};

export const ActivityTypeDescriptions: Record<ActivityType, string> = {
  [ActivityType.Task]: "Görev",
  [ActivityType.Call]: "Arama",
  [ActivityType.Email]: "E-Posta",
  [ActivityType.Meeting]: "Toplantı",
  [ActivityType.Activity]: "Aktivite",
  [ActivityType.Visiting]: "Ziyaret",
  [ActivityType.Other]: "Diğer",
};

export const ColumnTypeDescriptions: Record<ColumnType, string> = {
  [ColumnType.Text]: "Text",
  [ColumnType.Status]: "Status",
  [ColumnType.Date]: "Date",
  [ColumnType.Person]: "Person",
  [ColumnType.Timeline]: "Timeline",
  [ColumnType.Document]: "Document",
  [ColumnType.Dependency]: "Dependency",
};

export const CustomerTypeDescriptions: Record<CustomerType, string> = {
  [CustomerType.Musteri]: "Müşteri",
  [CustomerType.Tedarikci]: "Tedarikçi",
  [CustomerType.Diger]: "Diğer",
};

export const DayOfWeekDescriptions: Record<DayOfWeek, string> = {
  [DayOfWeek.Sunday]: "Sunday",
  [DayOfWeek.Monday]: "Monday",
  [DayOfWeek.Tuesday]: "Tuesday",
  [DayOfWeek.Wednesday]: "Wednesday",
  [DayOfWeek.Thursday]: "Thursday",
  [DayOfWeek.Friday]: "Friday",
  [DayOfWeek.Saturday]: "Saturday",
};

export const EntityTypeDescriptions: Record<EntityType, string> = {
  [EntityType.Account]: "Cari Hesap",
  [EntityType.Cash]: "Kasa Hesabı",
  [EntityType.Bank]: "Banka Hesabı",
};

export const OperationTypeDescriptions: Record<OperationType, string> = {
  [OperationType.Add]: "Add",
  [OperationType.Remove]: "Remove",
  [OperationType.Replace]: "Replace",
  [OperationType.Move]: "Move",
  [OperationType.Copy]: "Copy",
  [OperationType.Test]: "Test",
  [OperationType.Invalid]: "Invalid",
};

export const OpportunityStageDescriptions: Record<OpportunityStage, string> = {
  [OpportunityStage.New]: "Tanışma",
  [OpportunityStage.Qualification]: "Ön Görüşme",
  [OpportunityStage.Proposal]: "Teklif",
  [OpportunityStage.Negotiation]: "Pazarlık",
  [OpportunityStage.Contract]: "Sözleşme",
  [OpportunityStage.Won]: "Sipariş",
  [OpportunityStage.Lost]: "Kaybedildi",
};

export const PersonelEgitimDurumlariDescriptions: Record<PersonelEgitimDurumlari, string> = {
  [PersonelEgitimDurumlari.AtamaYapildi]: "AtamaYapildi",
  [PersonelEgitimDurumlari.KayitlarOkundu]: "KayitlarOkundu",
  [PersonelEgitimDurumlari.SinavYapildi]: "SinavYapildi",
  [PersonelEgitimDurumlari.SinavBasarili]: "SinavBasarili",
  [PersonelEgitimDurumlari.SinavBasarisiz]: "SinavBasarisiz",
  [PersonelEgitimDurumlari.AtamaYapilmamis]: "AtamaYapilmamis",
  [PersonelEgitimDurumlari.AtamasiKaldirilmis]: "AtamasiKaldirilmis",
};

export const PriceOfferStateDescriptions: Record<PriceOfferState, string> = {
  [PriceOfferState.Draft]: "Taslak",
  [PriceOfferState.Accepted]: "Kabul Edildi",
  [PriceOfferState.Rejected]: "Reddedildi",
  [PriceOfferState.Sended]: "Gönderildi",
  [PriceOfferState.Withdrawn]: "Geri Çekildi",
  [PriceOfferState.Waiting]: "Beklemede",
};

export const QuestionTypeDescriptions: Record<QuestionType, string> = {
  [QuestionType.Text]: "Text",
  [QuestionType.MultipleChoice]: "MultipleChoice",
};

export const SozlesmeTipiDescriptions: Record<SozlesmeTipi, string> = {
  [SozlesmeTipi.NDA_EN]: "NDA İngilizce",
  [SozlesmeTipi.NDA]: "NDA Türkçe",
  [SozlesmeTipi.SiparisSozlesmesi]: "Sipariş Sözlşemesi",
  [SozlesmeTipi.TedarikSozlesmesi]: "Tedarik Sözlşemesi",
  [SozlesmeTipi.Diger]: "Diğer",
};

export const SurveyTypeDescriptions: Record<SurveyType, string> = {
  [SurveyType.egitim]: "egitim",
  [SurveyType.tedarikci]: "tedarikci",
  [SurveyType.yetkinlik]: "yetkinlik",
  [SurveyType.diger]: "diger",
  [SurveyType.personel]: "personel",
};

export const TemplateTypeDescriptions: Record<TemplateType, string> = {
  [TemplateType.PriceOffer]: "Fiyat Teklifi",
  [TemplateType.Nda]: "Gizlilik Sözleşmesi",
  [TemplateType.NdaEn]: "Gizlilik Sözleşmesi İngilizce",
  [TemplateType.OrderContract]: "Sipariş Sözleşmesi",
  [TemplateType.Other]: "Diğer",
};

export const TransactionTypeDescriptions: Record<TransactionType, string> = {
  [TransactionType.Collection]: "Tahsilat",
  [TransactionType.Payment]: "Ödeme",
  [TransactionType.Virman]: "Virman",
};

