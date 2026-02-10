import { Products, ProductsDtoForInsertion } from '@/api/apiDtos';
import { GenericForm } from '@/components/GenericForm';
import { Column, SmartTable } from '@/components/SmartTable';
import { useModal } from '@/context/ModalContext';
import { selectActivitiesWithCustomerWithOpportunity } from '@/store/selectors/opportunitySelector';
import { AppDispatch, productsSlice, RootState } from '@/store/store';
import { create } from 'domain';
import type { FieldDefinition, FieldType } from "@/components/GenericForm";

import React, { useEffect } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fileToBase64 } from '@/utils/commonUtils';
import { useConfirm } from '@/context/ConfirmContext';

const Product = () => {


    const {openModal} =useModal();
    const { items } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
useEffect(() => {
    if (items.length===0) {
        dispatch( productsSlice.actions.fetchAll() as any );    
    }
}, []);   


const fields: FieldDefinition[] = [
    {
            name: 'productCode',
            label: 'Ürün Kodu',
            type: 'text',
            required: true,
            group:"Genel Bilgiler"
        },
        {
           name: 'productName',
           label: 'Ürün Adı',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"
       },
       {
           name: 'notes',
           label: 'Notlar',
           type: 'editor',
           required: false,
           colspan:12,
           group:"Teknik Özellikler"

       },
       {
           name: 'parcaTipi',
           label: 'Parça Tipi',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"
        
       },
       {
           name: 'olcuBirimi',
           label: 'Birimi',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"
       },
       {
           name: 'birimFiyat',
           label: 'Birim Fiyatı',
           type: 'number',
           required: false,
           group:"Genel Bilgiler"
       },
       {
           name: 'malzemeTuru',
           label: 'Malzeme Türü',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"

       },
       {
           name: 'muadilMalzeme',
           label: 'Muadil Malzeme',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'tedarikTipi',
           label: 'Tedarik Tipi',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'firmaAdi',
           label: 'Firma Adı',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"

       },
       {
           name: 'barkod',
           label: 'Barkod',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'projeNo',
           label: 'Proje No',
           type: 'text',
           required: false,
           group:"Genel Bilgiler"

       },
       {
           name: 'isActive',
           label: 'Is Active',
           type: 'text',
           required: false,
           hidden:true
       },
       {
           name: 'eklemeZaman',
           label: 'Ekleme Zamanı',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'degistirmeZaman',
           label: 'Değiştirme Zamanı',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'depo',
           label: 'Depo', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'seriLotNo',
           label: 'Seri/Lot No', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'saklamaKosulu',
           label: 'Saklama Koşulu', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'sonKullanmaTarihi',
           label: 'Son Kullanma Tarihi',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'revizyonNo',
           label: 'Revizyon No', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'revizyonTarih',
           label: 'Revizyon Tarih', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'varyantSecenegi',
           label: 'Varyant Seçeneği', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'urunKonfiguratoru',
           label: 'Ürün Konfigüratörü', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'nsnKodu',
           label: 'NSN Kodu', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'seriNumarasi',
           label: 'Seri Numarası', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'stokYeri',
           label: 'Stok Yeri', 
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
       {
           name: 'stokMiktar',
           label: 'Stok Miktarı',
           type: 'text',
           required: false,
           group:"Detay Bilgiler"
       },
        {
           name: 'paraBirimi',
           label: 'Para Birimi',
           type: 'select',
           options:[ {
               value: "TRY",
               label: 'TRY'
           },{

                value: "USD",    
                label: 'USD'
           },{
                value: "EUR",    
                label: 'EUR'       
           }],  
           required: false,
           group:"Genel Bilgiler"
       },
        {
           name: 'pictures',
           label: 'Resim',
           type: 'file',
           required: false,
           group:"Genel Bilgiler"
       },
       {
           name: 'id',
           label: '',
           type: 'text',
           required: false,
           defaultValue: 0,
           group:"Genel Bilgiler",
           hidden:true

          
    }];
function mapToInsertionDto(p: Products): ProductsDtoForInsertion {
    return {
        id: p.id,
        productName: p.productName,
        barkod: p.barkod,
        projeNo: p.projeNo,
        productCode: p.productCode,
        notes: p.notes,
        parcaTipi: p.parcaTipi,
        olcuBirimi: p.olcuBirimi,
        malzemeTuru: p.malzemeTuru,
        muadilMalzeme: p.muadilMalzeme,
        tedarikTipi: p.tedarikTipi,
        firmaAdi: p.firmaAdi,
        isActive: p.isActive,
        eklemeZaman: new Date(p.eklemeZaman),
        degistirmeZaman: new Date(p.degistirmeZaman),        
        depo: p.depo,
        seriLotNo: p.seriLotNo,
        saklamaKosulu: p.saklamaKosulu,
        sonKullanmaTarihi: p.sonKullanmaTarihi,
        revizyonNo: p.revizyonNo,
        revizyonTarih: p.revizyonTarih,
        varyantSecenegi: p.varyantSecenegi,
        urunKonfiguratoru:p.urunKonfiguratoru,
        nsnKodu: p.nsnKodu,
        seriNumarasi: p.seriNumarasi,
        stokYeri: p.stokYeri,
        stokMiktar: p.stokMiktar,
        birimFiyat: p.birimFiyat
        ,paraBirimi:p.paraBirimi,
        pictures: p.pictures 
        
    };
}

  const actionBodyTemplate = (rowData: Products) => {
    
    function openEdit(rowData: ProductsDtoForInsertion): void {
        const updateFields = fields.map(f => ({
            ...f,
            defaultValue: rowData[f.name as keyof ProductsDtoForInsertion] ?? f.defaultValue
        }));
    
        openModal({
            title: "Ürün Fiyat Düzenleme",
            content: (close) => (
                <GenericForm
                    fields={updateFields}
                    onSubmit={async (updatedDto) => {
                         const file = updatedDto.pictures[0];
                         if(file)
                         {
                             if (typeof file === 'string' ) {
                                // Eğer dosya zaten base64 formatındaysa, doğrudan kullan
                                updatedDto.pictures = updatedDto.pictures;
                            }    
                            else
                             updatedDto.pictures=await  fileToBase64(file) as any;
                         }
                        else
                            updatedDto.pictures=null;
                        dispatch(productsSlice.actions.createItem(updatedDto) as any);
                        close(null);
                    }}
                />
            )
        });
    }
    
const confirm =useConfirm();
    return (
      <div className="flex flex-row">
          { <button
            title="Düzenle"
            onClick={() => openEdit(mapToInsertionDto(rowData))}
            className="
        inline-flex items-center 
        px-4 py-2 
        bg-yellow-500 hover:bg-yellow-600 
        text-white 
        rounded 
        mr-2
      "
          >
            <FaPencilAlt /> 
          </button> }
          <button
            title="Sil"
            onClick={async () => {
                  const isConfirmed = await confirm({
                                                        title: "Silme işlemi",
                                                        message: "Ürünü silmek istediğinize emin misiniz?",
                                                        confirmText: "Evet",
                                                        cancelText: "Vazgeç",
                                                      });
                                                      if (isConfirmed) {
                                                         dispatch(productsSlice.actions.deleteItem(rowData.id) as any)
                                                    }}}
              
            className="
        inline-flex items-center 
        px-4 py-2 
        bg-red-600 hover:bg-red-700 
        text-white 
        rounded
         mr-2
      "
          >
            <FaTrash />
          </button>
        </div>
    );
  }; 
   
    const columns: Column<Products>[] = [
        { header: "#", accessor: "__index" },
        { header: "Ürün Kodu", accessor: "productCode",filterable:true ,sortable:true  },
        { header: "Ürün Adı", accessor: "productName" },
        { header: "Birimi", accessor: "olcuBirimi" },
        { header: "Birim Fiyatı", accessor: "birimFiyat", body:(row)=> row.birimFiyat?.toLocaleString() },
        { header: "Para Birimi", accessor: "paraBirimi" },

        { header: "Ürün Resmi", accessor: "pictures", body:(row)=> row.pictures ?<img onClick={()=> openModal({
            title: '',
            maximized:true,
            content: function (close: (result: any) => void): React.ReactNode {
                return (
             <img  src={"data:image/jpeg;base64,"+row.pictures} />
                )
            }
        })} src={"data:image/jpeg;base64,"+row.pictures} style={{width:"50px",height:"50px"}} />:null },
        {header:"İşlemler",accessor:"id" ,body:(row:any)=>actionBodyTemplate(row) }
    ]
  let title="Ürünler";
  
  const CreateProduct = () => {
    openModal({
        title: 'Ürün Ekleme Sayfası',
        content:  (close: (result: any) => void): React.ReactNode => {
         return  <GenericForm 
        fields={fields}
        onSubmit={async function (data: ProductsDtoForInsertion): void {
            const file = data.pictures[0];
           if(file)
                         {
                             if (typeof file === 'string' ) {
                                // Eğer dosya zaten base64 formatındaysa, doğrudan kullan
                                data.pictures = data.pictures;
                            }    
                            else
                             data.pictures=await  fileToBase64(file) as any;
                         }
                        else
                            data.pictures=null;
            data.id=0;
            dispatch(productsSlice.actions.createItem(data) as any);
            close(null);
         } } />
        }
    });
    }
  
  
  
  
    return (
        <div className="card">
            {title && (
                <div className="flex flex-row justify-between gap-4">
                    <h2 className="text-xl text-center font-bold mb-2">{title} </h2>{" "}

                </div>
            )}

            <SmartTable
                data={items ?? []}
                columns={columns}
                rowIdAccessor={"id"}
                frozenColumns={[{ name: "id", right: true }]}
                isExport={true}
                newRecordVoid={CreateProduct}
                scrollHeight="calc(100vh - 200px)"
                enablePagination={true}
                pageSize={10}
            />
        </div>
    )
}

export default Product
