// src/components/board/AddBoardForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { createBoard } from '../../store/features/boardSlice';
import { createBoardView } from '../../store/features/boardViewSlice';
import { createGroup } from '../../store/features/groupSlice';
import { createItem } from '../../store/features/itemSlice';
import { createColumn } from '@/store/features/columnSlice';
import { ColumnType } from '@/api/apiDtos';
import { getRandomColor } from '../../utils/colors';

interface BoardFormData {
  name: string;
  description: string;
}

interface AddBoardFormProps {
  onClose: (boardId:number) => void;
  projectType?:ProjectType
}
export enum ProjectType {
  ERP = 'ERP',
  CRM = 'CRM',
  HRM = 'HRM',
}
/* =======================
   PROJE ŞABLON DATASI
======================= */
const projectTemplate = [
  {
    title: 'Sistem Analizi Çalışması',
    items: [
      'Satış Departmanı Sistem Analizi',
      'Satınalma Departmanı Sistem Analizi',
      'Lojistik Sistem Analizi',
      'Finansman Sistem Analizi',
      'Muhasebe Sistem Analizi',
      'Bakım Yönetimi Sistem Analizi',
      'Proje Yönetimi Sistem Analizi',
    ],
  },
  {
    title: 'Data Hazırlıkları',
    items: [
      'Var Olan Dataların Düzenlenmesi ve Test Olarak Aktarılması',
      'Satış Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması',
      'Finansman ve Muhasebe Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması',
      'Bakım Yönetimi Datalarının Aktarılması',
    ],
  },
  {
    title: '1. Faz Eğitimler',
    items: [
      'Malzeme Yönetimi Eğitimleri',
      'Satış Yönetimi Eğitimleri',
      'Satınalma Eğitimleri',
      'İthalat Birimi Eğitimleri',
      'Satınalma Departmanı Eğitimleri',
      'Finansman Departmanı Eğitimleri',
      'Muhasebe Eğitimleri',
      'Entegrasyon Eğitimleri',
      'Bakım Yönetimi Kullanıcı Eğitimleri',
      'Şantiye / Proje Yönetimi Kullanıcı Eğitimleri',
    ],
  },
  {
    title: '2. Faz Eğitimler & Modifikasyonlar',
    items: [
      'Malzeme Yönetimi Eğitimleri ve Sevkiyat Simülasyonları',
      'Satış Yönetimi Eğitimleri',
      'Satınalma Eğitimleri ve İhtiyaç Toplanması',
      'İthalat Birimi Eğitimleri',
      'Satınalma Departmanı Eğitimleri',
      'Finansman Departmanı Eğitimleri',
      'Muhasebe Geliştirme Eğitimleri',
      'Entegrasyon Geliştirme Eğitimleri',
      'Bakım Yönetimi Geliştirme Eğitimleri',
    ],
  },
  {
    title: 'Paralel Test Kullanımı',
    items: ['Paralel Test Kullanımı'],
  },
  {
    title: 'Day 1 .( Projenin Gerçek Kullanıma Alınması',
    items: ['Day 1 .( Projenin Gerçek Kullanıma Alınması'],
  },
  {
    title: 'Maliyet Çalışmaları',
    items: ['Maliyet Çalışmaları'],
  },
  {
    title: 'Yönetim Raporlama Sistemleri',
    items: [ 'Yönetim Raporlama Sistemleri'],
  },
];

const AddBoardForm: React.FC<AddBoardFormProps> = ({ onClose,projectType }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<BoardFormData>();

  const onSubmit: SubmitHandler<BoardFormData> = async (data) => {
    try {
      const board = await dispatch(createBoard(data)).unwrap();
      if (!board?.id) return;

      const boardId = board.id;

      /* ===== Varsayılan Görünüm ===== */
      await dispatch(
        createBoardView({
          boardId,
          payload: { name: 'Ana Tablo', type: 'table' },
        })
      ).unwrap();

      /* ===== Kolonlar ===== */
        if(projectType === ProjectType.ERP){
        dispatch(createColumn({
          boardId,
          columnData: { title: 'Başlangıç-Bitiş', type: ColumnType.Timeline },
        })).unwrap();
        dispatch(createColumn({
          boardId,
          columnData: { title: 'Durum', type: ColumnType.Status },
        })).unwrap();
        dispatch(createColumn({
          boardId,
          columnData: { title: 'Tamamlanma Tarihi', type: ColumnType.Date },
        })).unwrap();
         dispatch(createColumn({
          boardId,
          columnData: { title: 'Atama', type: ColumnType.Person },
        })).unwrap();
        dispatch(createColumn({
          boardId,
          columnData: { title: 'Dosya', type: ColumnType.Document },
        })).unwrap();

      /* ===== Gruplar & Itemlar ===== */
      for (const group of projectTemplate) {
        const newGroup = await dispatch(
          createGroup({
            boardId,
            groupData: {
              title: group.title,
              color: getRandomColor() || '#579bfc',
            },
            position: 'bottom',
          })
        ).unwrap();

        if (newGroup?.id && group.items.length) {
        
            group.items.map((item) =>
              dispatch(
                createItem({
                  boardId,
                  groupId: newGroup.id,
                  itemData: { name: item },
                })
              ).unwrap()
            )
        } 
      }
      }

      onClose(boardId);
    } catch (error) {
      console.error('Board oluşturulurken hata:', error);
      onClose(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Proje Adı</label>
        <input
          {...register('name', { required: 'Pano adı zorunludur' })}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Açıklama</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-gray-200 px-4 py-2"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {isSubmitting ? 'Oluşturuluyor...' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
};

export default AddBoardForm;
