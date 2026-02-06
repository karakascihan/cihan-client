import { URL } from "@/api";
import { TemplateDto, TemplateType } from "@/api/apiDtos";
import { TemplateTypeDescriptions } from "@/api/extra-enums";
import { GenericForm } from "@/components/GenericForm";
import { SmartTable } from "@/components/SmartTable";
import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import { getEnumOptions } from "@/utils/commonUtilsCompnent";
import { ReactNode } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function TemplatePage  ({isPage=true,type,onSelect}:{isPage:boolean,type?:string,onSelect?:(temp:TemplateDto)=>void})  {
  const {
    data: templates,
    loading,
    refetch,
  } = useApiRequest<TemplateDto>(URL + "/template/getall"+(type?`?type=${type}`:""), {
    method: "GET",
  });
  const {setLoading} = useLoading();
  const { openModal } = useModal();
  const TemplateHandler = async (id?: number) => {
    setLoading(true);
    let row: TemplateDto = undefined;
    if (id) {
      const result = refetch(URL + "/template/get/"+id, { method: "GET" });
      if ((await result).isSuccess) {
        row = (await result).result;
      }
    }
    setLoading(false);
    openModal({
        maximizable:true,
      style:{width:"80vw"},
      title: "Şablon " + (row ? "Düzenleme" : "Ekleme"),
      content: function (close: (result: any) => void): ReactNode {
        return (
          <GenericForm
             
            fields={[
              {
                name: "name",
                label: "Şablon Adı",
                type: "text",
                defaultValue: row?.name ?? "",
                colspan:8
              },
              {
                name: "type",
                label: "Şablon Tipi",
                type: "select",
                options: getEnumOptions<TemplateType>(TemplateTypeDescriptions),
                defaultValue: row?.type ?? "",
                colspan:4
              },
              {
                name: "htmlContent",
                label: "Şablon İçeriği",
                type: "editor",
                defaultValue: row?.htmlContent ?? "",
                colspan:12              },
            ]}
            onSubmit={function (data: any): void {
              if (id)
                refetch(URL + "/template/update/" + id, {
                  method: "PUT",
                  body: data,
                  notification: {
                    success: "Şablon başarılı bir şekilde güncellendi.",
                    error: "Şablon güncellenirken bir hata oluştu.",
                  },
                })
              else
                refetch(URL + "/template/create/", {
                  method: "POST",
                  body: data,
                  notification: {
                    success: "Şablon başarılı bir şekilde kaydedildi.",
                    error: "Şablon kaydedilirken bir hata oluştu.",
                  },
                })
            }}
          />
        );
      },
    }).then(x=>refetch(URL + "/template/getall", {
    method: "GET",
  }));
  };
  const getColumns = ()=>{
    let columns = [];
    
        columns.push( {
            header: "#",
            accessor: "__index",
          });
           columns.push({
            header: "Şablon Adı",
            accessor: "name",
            filterable: true,
            sortable: true,
          });
           columns.push({
            filterOptions:getEnumOptions<TemplateType>(TemplateTypeDescriptions),
            filterType:"select",
            header: "Şablon Tipi",
            accessor: "type",
            filterable: true,
            sortable: true,
              body: (row) => TemplateTypeDescriptions[row.type],
          });
           columns.push({
            header: "Varsayılan Mı",
            accessor: "isDefault",
            filterable: true,
            filterType:"select",
            sortable: true,
            
              body: (row) => row.type ?"Evet":"Hayır",
              filterOptions: [{
                  label: "Evet",
                  value: 1,
                
              },{
                  label: "Hayır",
                  value: 0,
              }]

          });
           columns.push({
            header: "Oluşturulma Zamanı",
            accessor: "createdAt",
            filterable: true,
            sortable: true,
             body: (row) => new Date(row.createdAt).toLocaleString(),
          });
          if(isPage)
           columns.push({
            header: "İşlemler",
            accessor: "id",
            body: (row: TemplateDto) => (
              <div className="flex flex-row">
                <button
                  onClick={() => TemplateHandler(row.id)}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
                >
                  <FaPencilAlt title="Düzenle" />
                </button>
              </div>
            ),
          });
        
    return columns;
  }
  return (
    <div className="card">
      <div className="flex flex-row justify-between gap-4">
       {isPage ? <h2 className="text-xl text-center font-bold mb-2">Şablonlar</h2> :""}
      </div>
      <SmartTable
        data={loading ? [] : templates || []}
        onDoubleClick={(row)=>onSelect(row)}
        columns={getColumns()}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={isPage}
        newRecordVoid={isPage?() =>  TemplateHandler(undefined):undefined}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      />
    </div>
  );
};
