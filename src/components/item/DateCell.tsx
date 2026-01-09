import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Stil dosyasını import etmeyi unutma!
import { useAppDispatch } from '../../store/hooks';
import { Item, updateItemValue } from '../../store/features/itemSlice';
// date-fns'ten format ve parseISO fonksiyonları daha güvenilir olabilir
import { parseISO, format } from 'date-fns';
import { ColumnDto } from '@/api/apiDtos';

interface DateCellProps {
    item: Item;
    column: ColumnDto;
}

const DateCell: React.FC<DateCellProps> = ({ item, column }) => {
    const dispatch = useAppDispatch();
    const currentValue = item.itemValues.find(v => v.columnId === column.id)?.value;
    
    // "YYYY-MM-DD" string'ini yerel saat diliminde gece yarısı olarak yorumlar.
    let selectedDate: Date | null = null;
    if (currentValue) {
        try {
            // "YYYY-MM-DD" formatını doğru parse etmek için parseISO kullan
            // Bu, string'i yerel saat diliminde 00:00 olarak alır.
             selectedDate = parseISO(currentValue);
             // Eğer parseISO başarısız olursa (Invalid Date), null bırak
             if (isNaN(selectedDate.getTime())) {
                 selectedDate = null;
                 console.warn(`Geçersiz tarih formatı: ${currentValue}`);
             }
        } catch (e) {
            console.error(`Tarih parse hatası: ${currentValue}`, e);
            selectedDate = null;
        }
    }

    const handleDateChange = (date: Date | null) => {
        // date-fns format fonksiyonu genellikle saat dilimi sorunlarını daha iyi yönetir.
        const valueToSave = date ? format(date, 'yyyy-MM-dd') : '';
        dispatch(updateItemValue({
            itemId: item.id,
            columnId: column.id,
            value: valueToSave,
        }));
    };
const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
        <DatePicker
       isClearable
        clearButtonTitle='Temizle'
        open={isOpen}
        onChange={(date) => {
    handleDateChange(date);
    setIsOpen(false); // tarih seçince kapat
  }}
  onClickOutside={() => setIsOpen(false)} // 🔑 DIŞA TIKLAYINCA
  onInputClick={() => setIsOpen(true)}
            selected={selectedDate}
            dateFormat="d MMMM YYYY" // "Eki 19" gibi görünecek
            placeholderText="-"
            className="w-full bg-transparent text-center outline-none cursor-pointer"
                locale="tr"
     portalId="root"
        />
        </div>
    );
};

export default DateCell;