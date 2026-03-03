import { Accordion, AccordionTab } from 'primereact/accordion';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import React, { useEffect, useState } from 'react'
import { SurveyGetAllAnswersService } from '../../services';
import { parseToJsDate, toInputDate } from '../../utils/commonUtils';
import { DataTable, type DataTableExpandedRows, type DataTableRowToggleEvent } from 'primereact/datatable';
import { useParams } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequestService';
import { ApiResponseClient } from '@/types/apiResponse';
import { SURVEY_GETALLSURVEYANSWERS, URL } from '@/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SmartTable } from '@/components/SmartTable';
import { FaFileExport, FaTrash } from 'react-icons/fa6';
import { useTabs } from '@/context/TabsContext';
import { GenericForm } from '@/components/GenericForm';
import { form_template } from '@/price-offer-templates/form_template';
import SurveyTemplate from '@/components/survey/SurveyTemplate';
import ReactDOMServer from 'react-dom/server';
import { useConfirm } from '@/context/ConfirmContext';
import { CustomerDto } from '@/api/apiDtos';
import { toDateInputValue } from '@/components/crm/UserForm';

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
    supplierId: number | undefined
    supplierName: string | undefined;

}

export default function SurveyResultPage({ type }: { type?: string }) {
    const [surveys, setSurveys] = useState<SurveyAnswerList[]>([]);
    const token = useSelector<RootState>(x => x.login.accessToken);
    useEffect(() => {
        apiRequest<ApiResponseClient<SurveyAnswerList[]>>("GET", SURVEY_GETALLSURVEYANSWERS + "/" + type, { Authorization: "Bearer " + token })
            .then(x => {
                (x.result as any[]).forEach(element => {
                    element.surveyCreateDate = parseToJsDate(element.surveyCreateDate.toString());
                    element.responseDate = parseToJsDate(element.responseDate.toString());

                });
                setSurveys(x.result)
            })
            .catch(console.error);
    }, [type]);
    const confirm = useConfirm();
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
    const { openTab } = useTabs();
    return (
        <div className="card" >
            <h2 className="text-2xl text-center font-bold  mb-1">{type == "0" ? "Eğitim Değerlendirme Formları" : "Form Listesi"}</h2>
            <Accordion multiple activeIndex={null} >
                {
                    Object.entries(grouped).map(([title, answers], key) => {
                        let grouped2 = answers?.reduce((acc, curr) => {
                            if (!acc[curr.responseId]) {
                                acc[curr.responseId] = [];
                            }
                            acc[curr.responseId].push(curr);
                            return acc;
                        }, {} as Record<string, SurveyAnswerList[]>);
                        return (
                            <AccordionTab header={
                                <span className="flex align-items-center gap-2 w-full">
                                    <span className="font-bold white-space-nowrap">{key + 1 + ". " + title}</span>
                                    <Badge value={answers.filter(
                                        (person, index, self) =>
                                            index === self.findIndex(p => p.responseId === person.responseId)
                                    ).length} className="ml-auto" />
                                </span>
                            }>
                                <SmartTable isExport={true} enablePagination={false} data={grouped2 ? Object.entries(grouped2).map(([title, answers2], key) => (
                                    {
                                        id: answers2[0].responseId,
                                        date: answers2[0].responseDate,
                                        puan: answers2.reduce((acc, curr) => (acc + curr.puan), 0),
                                        dolduran: answers2[0].firstName + " " + answers2[0].lastName,
                                        tedarikci: answers2[0].supplierName,
                                        surveyTitle: answers2[0].surveyTitle,
                                        groups_option: answers2,
                                        supplierId: answers2[0].supplierId
                                    })) ?? [] : []}

                                    columns={[
                                        {
                                            header: "#",
                                            accessor: "__index"
                                        },
                                        {
                                            header: "Dolduran",
                                            accessor: "dolduran"
                                        },
                                        {
                                            header: "Tedarikci",
                                            accessor: "tedarikci",
                                            filterable: true,
                                            sortable: true
                                        },
                                        {
                                            header: "Tarih",
                                            accessor: "date",
                                            filterable: true,
                                            filterType: "text",
                                            body: (row: any) => <input type="date" onChange={(e) => apiRequest<Boolean>("PUT", URL + "/survey/survey-response/response-date/" + row.id, { Authorization: "Bearer " + token }, { date: e.target.value }).then(() => {
                                                setSurveys(surveys.map(x => x.responseId == row.id ? { ...x, responseDate: new Date(e.target.value) } : x));
                                            })
                                            }

                                                value={toInputDate(row.date)} />
                                        },
                                        {
                                            header: "Puan",
                                            accessor: "puan",
                                            summaryType: "avg"
                                        },
                                        {
                                            header: "İşlemler",
                                            accessor: "id",

                                            body: (row: any) => {
                                                let grouped3 = row.groups_option.reduce((acc, curr) => {
                                                    if (!acc[curr.groupName]) {
                                                        acc[curr.groupName] = [];
                                                    }
                                                    acc[curr.groupName].push(curr);
                                                    return acc;
                                                }, {} as Record<string, SurveyAnswerList[]>);
                                                let supplier: CustomerDto; apiRequest<CustomerDto>("GET", URL + "/customer/" + row.supplierId, { Authorization: "Bearer " + token }).then((res) => { supplier = res });
                                                let surveyTemplate = ReactDOMServer.renderToStaticMarkup(<SurveyTemplate
                                                    formTitle={row.surveyTitle} adSoyad={row.tedarikci} tarih={row.date.toLocaleDateString()} adres={supplier?.adres} logoUrl={URL + "/logo.png"} telefon={supplier?.telefon} ePosta={supplier?.email} webSitesi={""}
                                                    groups={Object.entries(grouped3).map(([title, answers], key) => ({
                                                        title: title,
                                                        questions: answers.map((answer) => ({
                                                            text: answer.question,
                                                            score: answer.puan
                                                        })),
                                                        groupTotal: answers.reduce((acc, curr) => (acc + curr.puan), 0)
                                                    }))} genelToplam={row.puan} puanAciklamalari={[{
                                                        puan: 80,
                                                        aciklama: ' Firma tedarikçi olarak yeterlidir(Onaylı Tedarikçi Listesine Girebilir) A GRUBU'
                                                    }, {
                                                        puan: 70,
                                                        aciklama: 'Eksiklikleri var ama çalışılabilir .(Onaylı Tedarikçi Listesine Girebilir)  B GRUBU'
                                                    }, {
                                                        puan: 0,
                                                        aciklama: ' Firma tedarikçi olarak şu an için yetersizdir. C GRUBU (Listeye Giremez)'
                                                    }]} dolduranAdSoyad={row.dolduran} onaylayanAdSoyad={''} />);
                                                // let form = form_template;
                                                // form = form.replaceAll("{{FORM_ADI}}", row.surveyTitle);
                                                // form = form.replaceAll("{{FORM_NO}}", "121");
                                                // form = form.replaceAll("{{REV_NO}}", "REV-321");
                                                // form = form.replaceAll("{{AD_SOYAD}}", row.tedarikci);
                                                // form = form.replaceAll("{{TARIH}}", row.date);
                                                // form = form.replaceAll("{{ADRES}}", row.tedarikci);
                                                // form = form.replaceAll("{{SORU_1}}", row.groups_option[0].question);
                                                // form = form.replaceAll("{{SORU_1_PUAN}}", row.groups_option[0].puan);
                                                // form = form.replaceAll("{{SORU_2}}", row.groups_option[1].question);
                                                // form = form.replaceAll("{{SORU_2_PUAN}}", row.groups_option[1].puan);
                                                return <div className="flex flex-row"> <button onClick={async () => openTab({
                                                    id: 'anket-export-' + row.id,
                                                    title: 'Anket Export-' + row.id,
                                                    component: <GenericForm buttonNode={<></>} fields={[{
                                                        name: 'surveyId',
                                                        label: '',
                                                        type: 'editor',
                                                        defaultValue: surveyTemplate,
                                                        colspan: 12
                                                    }]} onSubmit={function (data: any): void {

                                                    }} />
                                                })} className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
                                                >
                                                    <FaFileExport title="Çıktı Al" /></button><button
                                                        onClick={async () => {

                                                        }}
                                                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
                                                    >
                                                        <FaTrash title="Sil" onClick={
                                                            async () => {
                                                                const resultt = await confirm({
                                                                    title: "Sil",
                                                                    message: "Formu Silmek istediğinize emin misiniz?",
                                                                    confirmText: "Evet",
                                                                    cancelText: "Hayır"
                                                                });
                                                                if (resultt) {
                                                                    apiRequest<ApiResponseClient<SurveyAnswerList[]>>("DELETE", URL + "/survey/survey-response/" + row.id, { Authorization: "Bearer " + token })
                                                                        .then(x => {

                                                                            setSurveys(surveys.filter(x => x.responseId !== row.id))
                                                                        })
                                                                        .catch(console.error);
                                                                }
                                                            }} />
                                                    </button></div>
                                            }
                                        }

                                    ]} rowIdAccessor={"id"} />
                            </AccordionTab>

                        )
                    })
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
