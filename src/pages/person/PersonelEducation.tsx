import { PersonelEgitimDurumlari, PersonelWithEducationDto } from '@/api/apiDtos';
import { Column, SmartTable } from '@/components/SmartTable';
import { AppDispatch, personelWithEducationSlice, RootState } from '@/store/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { departmanlar } from './OvertimeList';
import { useLoading } from '@/context/LoadingContext';

export default function PersonelEducation  ()  {
    const dispatch=useDispatch<AppDispatch>();
     const { items , loading, error } = useSelector(
    (state: RootState) => state.personelWithEducation
  );
  const {setLoading} = useLoading();
  setLoading(loading);
    useEffect(() => {
      dispatch(personelWithEducationSlice.actions.fetchAll());
    }, [dispatch]);
   const getColumns=()=>{
     let sendData:Column<PersonelWithEducationDto> []= 
          [
           {accessor:"__index",header:"#"},
           {accessor:"personelAdi", header:"Ad",summaryType:"count",filterable:true,sortable:true},
           {accessor:"personelSoyadi",header:"Soyad",filterable:true,sortable:true},
           {accessor:"personelDepartman",header:"Departman",filterable:true,sortable:true, filterType: "select",
                     filterOptions: departmanlar},
           {accessor:"personelGorevi",header:"Görev",filterable:true,sortable:true},
   
         ];

          (items as PersonelWithEducationDto [])?.[0]?.educations?.forEach((edu,ind)=>{
            sendData.push(
                {
                  filterType:"select",
                  filterOptions:[{
                    label: "Eğitim Atanmadı",
                    value: PersonelEgitimDurumlari.AtamaYapilmamis
                  },{
                    label: "Atama Yapıldı",
                    value: PersonelEgitimDurumlari.AtamaYapildi
                  },
                {
                  label: 'Kayıtlar Okundu',
                  value: PersonelEgitimDurumlari.KayitlarOkundu
                },
              {
                  label: 'Sınav Yapıldı',
                  value: PersonelEgitimDurumlari.SinavYapildi
                },
              {
                  label: 'Sınav Başarılı',
                  value: PersonelEgitimDurumlari.SinavBasarili
                },
              {
                  label: 'Sınav Başarısız',
                  value: PersonelEgitimDurumlari.SinavBasarisiz
                }],
                filterable:true,
                header: edu.egitimAdi,
                accessor:`educations[${ind}].state`,
                body: (rowdata) =>
                     <div className="grid grid-cols-2 gap-4 p-2 ">
  {/* Durum sütunu */}
  <div>
    {(() => {
      const edu = rowdata.educations[ind];
      if (!edu) return null;

      const state = edu.state ?? PersonelEgitimDurumlari.AtamaYapilmamis;
      let text = "";
      let colorClass = "";

      switch (state) {
        case PersonelEgitimDurumlari.AtamaYapilmamis:
          text = "Eğitim Atanmadı";
          colorClass = "text-gray-500";
          break;
        case PersonelEgitimDurumlari.AtamaYapildi:
          text = "Atama Yapıldı";
          colorClass = "text-blue-500";
          break;
        case PersonelEgitimDurumlari.KayitlarOkundu:
          text = "Kayıtlar Okundu";
          colorClass = "text-indigo-500";
          break;
        case PersonelEgitimDurumlari.SinavYapildi:
          text = "Sınav Yapıldı";
          colorClass = "text-yellow-500";
          break;
        case PersonelEgitimDurumlari.SinavBasarili:
          text = "Sınav Başarılı";
          colorClass = "text-green-500";
          break;
        case PersonelEgitimDurumlari.SinavBasarisiz:
          text = "Sınav Başarısız";
          colorClass = "text-red-500";
          break;
        default:
          text = "Bilinmiyor";
          colorClass = "text-gray-400";
      }

      return <span className={`${colorClass} font-medium`}>{text}</span>;
    })()}
  </div>

  {/* Puan sütunu */}
  <div>
    {(() => {
      const edu = rowdata.educations[ind];
      if (!edu) return null;

      // sadece sınav yapıldı ve sonrası için puan göster
      if (edu.state >= PersonelEgitimDurumlari.SinavYapildi && edu.puan !== -1) {
        return <span className="text-sm font-semibold text-purple-600">Puan: {edu.puan}</span>;
      }

      return null;
    })()}
  </div>
</div>

               }
            )
         })
         
         return sendData;
   }
  return (
    <div className="card">
          <h2 className="text-xl text-center font-bold mb-2">Personel Eğitim Durumları</h2>
          
          <SmartTable data={items as PersonelWithEducationDto [] ??[]} enablePagination={false}  tableClassName='min-w-max'  frozenColumns={[{name:"personelAdi",right:false},{name:"personelSoyadi",right:false}]}  scrollHeight={"calc(100vh - 200px)"}   columns={getColumns()} rowIdAccessor={"id"}/>
        </div>
  )
}
