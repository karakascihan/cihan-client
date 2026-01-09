// src/components/item/DocumentCell.tsx (GÜNCELLENDİ)

import React, { useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { Item, updateItemValue } from '../../store/features/itemSlice';
import { FiPaperclip, FiPlus, FiExternalLink, FiDelete } from 'react-icons/fi'; // FiExternalLink eklendi
import { ColumnDto, FileRecordDtoForInsertion } from '@/api/apiDtos';
import { addFileRecord } from '@/store/slices/fileRecordSlice';
import { convertFileToBase64 } from '@/utils/commonUtils';
import { URL } from '@/api';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useConfirm } from '@/context/ConfirmContext';

interface DocumentCellProps {
    item: Item;
    column: ColumnDto;
}

const DocumentCell: React.FC<DocumentCellProps> = ({ item, column }) => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const currentValue = item.itemValues.find(v => v.columnId === column.id)?.value || '';

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileName = file.name;
           
               if (!file) return;
           
               // Base model
               const newFile: FileRecordDtoForInsertion = {
                 relatedEntityId: item.id,
                 relatedEntityName: "Item",
                 fileName: file.name,
                 contentType: file.type,
                 content: await convertFileToBase64(file), // Base64 string
               };
           
                dispatch(addFileRecord(newFile)).unwrap().then((c) => {
             dispatch(updateItemValue({
                itemId: item.id,
                columnId: column.id,
                value:  c.filePath, // URL'yi kaydet
            }));
            e.target.value = '';
            })
           

           
        }
    };

    const handleCellClick = () => {
        if (!currentValue) { 
            fileInputRef.current?.click();
        }
    };

    const isUrl = currentValue.startsWith('http://') || currentValue.startsWith('https://') || currentValue.startsWith('/');
    
    const getFileNameFromUrl = (url: string) => {
        try {
            return url.substring(url.lastIndexOf('/') + 1);
        } catch {
            return url;
        }
    };

    const displayFileName = isUrl ? getFileNameFromUrl(currentValue) : currentValue;
const confirm = useConfirm();
    return (
        // Ana div'e tıklama olayını ekle
        <div 
            onClick={handleCellClick} 
            className="w-full h-full flex items-center justify-center cursor-pointer group p-2 overflow-hidden" 
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {currentValue ? (
                // Değer varsa (URL varsayıyoruz), tıklanabilir link oluştur
                <>
                <a
                    href={URL+"/"+ currentValue} // href'e URL'yi ver
                    target="_blank"
                    rel="noopener noreferrer"
                    // KRİTİK DÜZELTME: Linki hücre içinde tutmak için w-full ve block/flex özellikleri
                    className="flex items-center gap-x-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline w-full min-w-0" 
                    title={`Belgeyi aç: ${displayFileName}`}
                >
                    <FiPaperclip className="flex-shrink-0"/> 
                    {/* Metni taşmayı önlemek için flex-grow ve truncate */}
                    <span className="truncate flex-grow min-w-0">{displayFileName}</span>
                    {/* <FiExternalLink className="flex-shrink-0 w-3 h-3 opacity-70" /> */}
                </a>
                <FiDelete onClick={async ()=>{  const isConfirmed = await confirm({
                            title: "Silme işlemi",
                            message: "Dosyayı silmek istediğinize emin misiniz?",
                            confirmText: "Evet",
                            cancelText: "Vazgeç",
                          });
                          if (isConfirmed) {
                          dispatch(updateItemValue({
                itemId: item.id,
                columnId: column.id,
                value:  "", // URL'yi kaydet
            }));}}}/>
                </>
            ) : (
                // Değer yoksa, dosya ekleme (+) ikonunu göster
                <div className="w-6 h-6 rounded bg-gray-200 text-gray-500 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center transition-colors">
                    <FiPlus />
                </div>
            )}
        </div>
    );
};

export default DocumentCell;