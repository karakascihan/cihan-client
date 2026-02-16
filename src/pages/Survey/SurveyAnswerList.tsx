import { Accordion, AccordionTab } from 'primereact/accordion';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import React, { useEffect, useState } from 'react'
import { SurveyGetAllAnswersService } from '../../services';
import { parseToJsDate } from '../../utils/commonUtils';
import { DataTable, type DataTableExpandedRows, type DataTableRowToggleEvent } from 'primereact/datatable';
import { useParams } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequestService';
import { ApiResponseClient } from '@/types/apiResponse';
import { SURVEY_GETALLSURVEYANSWERS } from '@/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export interface SurveyAnswerList {
  surveyTitle: string;
  firstName: string;
  lastName: string;
  personelAdiSoyadi?: string;
  responseId: string;
  surveyCreateDate: Date;
  responseDate: Date;
  personelDepartman?: string;
  groupName?: string;
  question?: string;
  response?: string;
  responseText?: string;
  optionDescription?: string;
  puan: number | null;
  pesonelEducationPlanId: number | null;
  pesonelEducationPlanAdi: string | null;
}

export const SurveyAnswerList = ({ type }: { type?: string }) => {
  const [surveys, setSurveys] = useState<SurveyAnswerList[]>([]);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | SurveyAnswerList[]>([]);
  // const { type } = useParams<{ type: string }>();

  const headerTemplate = (data: SurveyAnswerList, options: any, groupData: SurveyAnswerList[]) => {
    return (
      <React.Fragment>
        <span
          className="cursor-pointer text-red-500 mr-3"
          onClick={options.toggle}
        >

          {/* {options.expanded ? "▼" : "▶"} */}
          {"Hesap Kullanıcısı: " + data.firstName + " " + data.lastName}
        </span>
        <span
          className="cursor-pointer text-green-500"
          onClick={options.toggle}
        >
          {data.personelAdiSoyadi ? "Dolduran Personel: " + data.personelAdiSoyadi : null}
        </span>
        <Badge severity="info" value={toplam(groupData.filter(x => x.responseId === data.responseId)) + " Puan"} className="ml-4" />
      </React.Fragment>
    );
  };
  const token = useSelector<RootState>(x => x.login.accessToken);
  useEffect(() => {
    apiRequest<ApiResponseClient<SurveyAnswerList[]>>("GET", SURVEY_GETALLSURVEYANSWERS + "/" + type, { Authorization: "Bearer " + token })
      // SurveyGetAllAnswersService(type)
      .then(x => {
        (x.result as any[]).forEach(element => {
          element.surveyCreateDate = parseToJsDate(element.surveyCreateDate.toString());
          element.responseDate = parseToJsDate(element.responseDate.toString());

        });
        setSurveys(x.result)
      })
      .catch(console.error);
  }, [type]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const onFilterChange = (field: keyof SurveyAnswerList, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  let grouped: Record<string, SurveyAnswerList[]> = {};
  if (type === "0") {
    grouped = surveys.filter(x => x.pesonelEducationPlanId).reduce((acc, curr) => {

      if (!acc[curr.pesonelEducationPlanAdi]) {
        acc[curr.pesonelEducationPlanAdi] = [];
      }
      acc[curr.pesonelEducationPlanAdi].push(curr);
      return acc;

    }, {} as Record<number, SurveyAnswerList[]>);
  }
  else {
    grouped = surveys.reduce((acc, curr) => {
      if (!acc[curr.surveyTitle]) {
        acc[curr.surveyTitle] = [];
      }
      acc[curr.surveyTitle].push(curr);
      return acc;
    }, {} as Record<string, SurveyAnswerList[]>);
  }




  const footerGroup = (puan: any) => (
    <ColumnGroup>
      <Row>
        <Column footer="Form Toplam Puan:" colSpan={6} footerStyle={{ textAlign: 'right', color: "red" }} />
        <Column footer={toplam(puan)} footerStyle={{ color: "red" }} />
        <Column footer="Form Ortalama Puan:" footerStyle={{ textAlign: 'right', color: "red" }} />
        <Column footer={(toplam(puan) / puan.filter(x => x.puan).length).toFixed(2)} footerStyle={{ color: "red" }} />
      </Row>
    </ColumnGroup>
  );
  const toplam = (sales: any) => {
    let total = 0;

    for (let sale of sales) {
      total += sale.puan ?? 0;
    }

    return total;
  };

  let groupCounter: Record<string, number> = {};
  const counterBody = (rowData: SurveyAnswerList) => {
    const group = rowData.responseId;
    if (!groupCounter[group]) {
      groupCounter[group] = 1;
    } else {
      groupCounter[group]++;
    }
    return groupCounter[group];
  };

  return (
    <div className="card" >
      <h2 className="text-2xl text-center font-bold  mb-1">{type == "0" ? "Eğitim Değerlendirme Formları" : "Form Listesi"}</h2>
      <Accordion multiple activeIndex={null} >
        {
          Object.entries(grouped).map(([title, answers], key) => (
            <AccordionTab header={
              <span className="flex align-items-center gap-2 w-full">
                <span className="font-bold white-space-nowrap">{key + 1 + ". " + title}</span>
                <Badge value={answers.filter(
                  (person, index, self) =>
                    index === self.findIndex(p => p.responseId === person.responseId)
                ).length} className="ml-auto" />
              </span>
            }>
              <DataTable value={answers} frozenRow scrollable scrollHeight="700px" stripedRows rowHover size='small'
                rowGroupFooterTemplate={(puan: SurveyAnswerList) => {
                  let toplamKullaniciPuani = toplam(answers.filter(x => x.responseId === puan.responseId))
                  let toplamKullaniciSorusu = answers.filter(x => x.responseId === puan.responseId && x.puan).length;
                  return (
                    <React.Fragment>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colSpan={2}>
                        <div className="flex justify-content-end font-bold w-full">Kullanıcı Toplam Puan: {toplamKullaniciPuani ?? 0}</div>
                      </td>
                      <td colSpan={2}>
                        <div className="flex justify-content-end font-bold w-full">Kullanıcı Ortalama Puan: {(toplamKullaniciPuani / (toplamKullaniciSorusu == 0 ? 1 : toplamKullaniciSorusu)).toFixed(2)}</div>
                      </td>
                    </React.Fragment>
                  );
                }}
                footerColumnGroup={footerGroup(answers)}
                rowGroupMode="subheader"
                groupRowsBy="responseId"
                expandableRowGroups
                expandedRows={expandedRows} onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={(item, item2) => headerTemplate(item, item2, answers)}
              // header={<h5 className="text-xl text-center  mb-1">Kullanıcı Form Cevapları</h5>}
              >
                <Column
                />
                {/* <Column header="#" body={(rowData, options) => options.rowIndex + 1} style={{ width: '50px' }} /> */}
                <Column header="#" body={counterBody} style={{ width: '50px' }} />
                <Column
                  field="surveyCreateDate"
                  dataType='date'
                  body={(x: SurveyAnswerList) => { return (<span >{x.surveyCreateDate.toLocaleDateString()}</span>) }}
                  header={
                    <ColumnFilterHeader
                      title="Form Oluşturulma Tarihi"
                      field="surveyCreateDate"
                      value={filters["surveyCreateDate"] || ""}
                      onChange={onFilterChange}

                    />
                  }
                />
                <Column
                  field="personelDepartman"
                  header={
                    <ColumnFilterHeader
                      title="Personel Departmanı"
                      field="personelDepartman"
                      value={filters["personelDepartman"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                {/* <Column
                  field="firstName" 
                  sortable
                  header={
                    <ColumnFilterHeader
                      title="Dolduran Adı"
                      field="firstName"
                      value={filters["firstName"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="lastName"
                  sortable
                  header={
                    <ColumnFilterHeader
                      title="Dolduran Soyadı"
                      field="lastName"
                      value={filters["lastName"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                /> */}
                <Column
                  field="groupName"
                  header={
                    <ColumnFilterHeader
                      title="Grup Adı"
                      field="groupName"
                      value={filters["groupName"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="responseDate"
                  body={(x: SurveyAnswerList) => { return (<span>{x.responseDate.toLocaleString()}</span>) }}
                  header={
                    <ColumnFilterHeader
                      title="Cevap Tarihi"
                      field="responseDate"
                      value={filters["responseDate"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="question"
                  header={
                    <ColumnFilterHeader
                      title="Form Sorusu"
                      field="question"
                      value={filters["question"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="response"
                  header={
                    <ColumnFilterHeader
                      title="Cevap"
                      field="response"
                      value={filters["response"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="responseText"
                  header={
                    <ColumnFilterHeader
                      title="Cevap Metni"
                      field="responseText"
                      value={filters["responseText"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="optionDescription"
                  header={
                    <ColumnFilterHeader
                      title="Seçenek Açıklaması"
                      field="optionDescription"
                      value={filters["optionDescription"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
                <Column
                  field="puan"
                  header={
                    <ColumnFilterHeader
                      title="Puan"
                      field="puan"
                      value={filters["puan"] || ""}
                      onChange={onFilterChange}
                    />
                  }
                />
              </DataTable>
            </AccordionTab>
          ))
        }
      </Accordion>



    </div>
  );
}

interface ColumnFilterHeaderProps {
  title: string;
  field: keyof SurveyAnswerList;
  value: string;
  onChange: (field: keyof SurveyAnswerList, value: string) => void;
}

const ColumnFilterHeader: React.FC<ColumnFilterHeaderProps> = ({
  title,
  field,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <span className="font-large">{title}</span>
      {/* <input
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={``}
        className="border-2 rounded-md"
      /> */}
    </div>
  );
}
