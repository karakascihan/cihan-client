import { ReactNode, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import {
  CreateEducationPlanService,
  EducationPlanAssingService,
  EducationPlanDeleteService,
  EducationPlanGetAllService,
  EducationPlanMappingService,
  EducationPlanUpdateService,
  PersonelGetNamesService,
} from "../../services";
import {
  FaAddressBook,
  FaCheck,
  FaFile,
  FaFileAlt,
  FaGofore,
  FaPencilAlt,
  FaPersonBooth,
  FaPlus,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import type { EducationPlan } from "../../types/education";
import type { PersonelNames } from "../../types/personel";
import { getMimeType, parseToJsDate } from "../../utils/commonUtils";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import PersonList from "../person/PersonList";
import { useModal } from "../../context/ModalContext";
import type { Personel } from "../../types/person";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../store/slices/notificationSlice";
import { Link, useNavigate } from "react-router-dom";
import { FcAddressBook, FcSurvey } from "react-icons/fc";
import { SmartTable } from "@/components/SmartTable";
import {
  setDataToApi,
  setSelectedRows,
} from "@/store/slices/selectedRowsSlice";
import { RootState } from "@/store/store";
import PdfViewer from "@/components/PdfViewer";
import { EDUCATION_PLAN_GETALL, EDUCATION_PLAN_MAPPING, PERSONEL_GETALLNAMES, SURVEY_GETALL, URL } from "@/api";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponse, ApiResponseClient } from "@/types/apiResponse";
import { User } from "@/types/user";
import { PersonelEgitimDurumlari } from "@/api/apiDtos";
import { Survey } from "@/types/survey";
import { useConfirm } from "@/context/ConfirmContext";
import MenuButton, { MenuItem } from "@/components/MenuButton";

export default function EducationList() {
  const selectedRows = useSelector(
    (state: RootState) => state.selectedRows["my-table-id"] || []
  );
  const [plans, setPlans] = useState<EducationPlan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<null | (() => void)>(null);
  const [editingPlan, setEditingPlan] = useState<EducationPlan | null>(null);
  const [form, setForm] = useState<Omit<EducationPlan, "id">>({
    egitimAdi: "",
    egitimNotu: "",
    egitimBaslangicTarihi: null,
    egitimBitisTarihi: null,
    isActive: true,
    icKaynakMi: false,
    egiticiPersonelId: 0,
    egitimSuresiDk: null,
    disKaynakAdi: null,
    personelDegerlendirmeFormId: null,
    egitimDegerlendirmeFormId: null,
  });
  const [errors, setErrors] = useState({
    egitimAdi: "",
    egitimNotu: "",
    egiticiPersonelId: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const dispatch = useDispatch();
  const user = useSelector<RootState>((x) => x.login);
  const confirm = useConfirm();
  const validate = () => {
    const newErrors: any = {};
    if (!form.egitimAdi?.trim()) newErrors.egitimAdi = "Eğitim adı zorunlu.";
    if (form.icKaynakMi && form.egiticiPersonelId === null)
      newErrors.egiticiPersonelId =
        "İç kaynak seçildiğinde eğitici personel zorunludur.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
     apiRequest<ApiResponseClient<Personel>>("GET",PERSONEL_GETALLNAMES+"?onlyNames=false",{
        Authorization: "Bearer " + user.accessToken,
      }).then((x) => {
      setPersonels(x.result);
      apiRequest<ApiResponseClient<Survey>>("GET", SURVEY_GETALL, {
        Authorization: "Bearer " + user.accessToken,
      })
        //  SurveyGetAllService(type)
        .then((y) => {
          setSurveys(y.result);
          apiRequest<ApiResponseClient<EducationPlan>>(
            "GET",
            EDUCATION_PLAN_GETALL,
            { Authorization: "Bearer " + user.accessToken }
          )
            .then((response) => {
              (response.result as any[]).forEach((item) => {
                item.egitimBaslangicTarihi = item.egitimBaslangicTarihi
                  ? parseToJsDate(item.egitimBaslangicTarihi.toString())
                  : null;
                item.egitimBitisTarihi = item.egitimBitisTarihi
                  ? parseToJsDate(item.egitimBitisTarihi.toString())
                  : null;
              });
              setPlans(response.result as EducationPlan[]);
            })
            .catch((error) => {
              alert("Eğitim planları alınırken hata oluştu: " + error.message);
            });
        })
        .catch(console.error);
    });
  }, []);
  const openNew = () => {
    setEditingPlan(null);
    setForm({
      egitimAdi: "",
      egitimNotu: "",
      egitimBaslangicTarihi: null,
      egitimBitisTarihi: null,
      isActive: true,
      icKaynakMi: false,
      egiticiPersonelId: null,
      egitimSuresiDk: null,
      disKaynakAdi: null,
      personelDegerlendirmeFormId: null,
      egitimDegerlendirmeFormId: null,
    });
    setErrors({ egitimAdi: "", egitimNotu: "", egiticiPersonelId: "" });
    setModalOpen(true);
  };
  const openEdit = (plan: EducationPlan) => {
    setEditingPlan(plan);
    setForm({
      egitimAdi: plan.egitimAdi,
      egitimNotu: plan.egitimNotu,
      egitimBaslangicTarihi: plan.egitimBaslangicTarihi,
      egitimBitisTarihi: plan.egitimBitisTarihi,
      isActive: plan.isActive ?? true,
      icKaynakMi: plan.icKaynakMi ?? false,
      egiticiPersonelId: plan.egiticiPersonelId ?? null,
      egitimSuresiDk: null,
      disKaynakAdi: null,
      personelDegerlendirmeFormId: plan.personelDegerlendirmeFormId,
      egitimDegerlendirmeFormId: plan.egitimDegerlendirmeFormId,
    });
    setErrors({ egitimAdi: "", egitimNotu: "", egiticiPersonelId: "" });
    setModalOpen(true);
  };

  const savePlan = () => {
    if (!validate()) return;
    setConfirmDialog(() => () => {
      if (editingPlan) {
        const updatedPlan: EducationPlan = {
          ...editingPlan,
          ...form,
          id: editingPlan.id, // Ensure id is present and type number
        };
        updatedPlan.atama = null;
        updatedPlan.dosyalar = null;
        setEditingPlan(updatedPlan);
        EducationPlanUpdateService(updatedPlan)
          .then((response) => {
            if (response.statusCode == 200) {
              dispatch(
                setNotification({
                  title: "Başarılı İşlem",
                  message: "Eğitim planı başarıyla güncellendi:",
                })
              );
            } else {
              dispatch(
                setNotification({
                  title: "Eğitim Kaydı Güncellenemedi",
                  message: response.message,
                  type: "warning",
                })
              );
            }
          })
          .catch((error) => {
            dispatch(
              setNotification({
                title: "Eğitim Kaydı Güncellenemedi",
                message: error.message,
                type: "error",
              })
            );
          });
        setPlans(plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
      } else {
        const newPlan: EducationPlan = { id: Date.now(), ...form };
        form.atama = null;
        form.dosyalar = null;
        CreateEducationPlanService(form)
          .then((response) => {
            if (response.statusCode == 200) {
              dispatch(
                setNotification({
                  title: "Başarılı İşlem",
                  message: "Eğitim planı başarıyla oluşturuldu",
                })
              );
            } else {
              dispatch(
                setNotification({
                  title: "Eğitim Kaydı Oluşturulamadı",
                  message: response.message,
                  type: "warning",
                })
              );
            }
          })
          .catch((error) => {
            dispatch(
              setNotification({
                title: "Eğitim Kaydı Oluşturulamadı",
                message: error.message,
                type: "error",
              })
            );
          });
        setPlans([...plans, newPlan]);
      }
      setModalOpen(false);
    });
    setShowConfirm(true);
  };
const AtamaDurumu = (state:number) => {
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
    }
  const deletePlan = (id: number) => {
    setConfirmDialog(() => () => {
      EducationPlanDeleteService(id).then((response) => {
        if (response.statusCode == 200) {
          dispatch(
            setNotification({
              title: "Başarılı İşlem",
              message: "Eğitim Başarıyla Silindi",
            })
          );
        } else {
          dispatch(
            setNotification({
              title: "Eğitim Kaydı Silinemedi",
              message: response.message,
              type: "warning",
            })
          );
        }
      });
      setPlans(plans.filter((p) => p.id !== id));
    });
    setShowConfirm(true);
  };
  var login = useSelector((state: RootState) => state.login);
  const { openModal } = useModal();
  const AssignToPersonel = async (rowData: EducationPlan) => {
    setEditingPlan(rowData);
    let ids: number[] =await  apiRequest<ApiResponseClient<Number[]>>("GET",EDUCATION_PLAN_MAPPING+"/"+rowData.id,{
        Authorization: "Bearer " + user.accessToken,
      });
    if (ids) {
      dispatch(
        setSelectedRows({
          tableId: "my-table-id",
          rows: Array.from(ids),
        })
      );
    }

    const result: boolean = await openModal({
      title: rowData.egitimAdi ?? "Eğitim Ata",
      content: (close) => {
        return (
          <div>
            <div className="flex  flex-col gap-2 ">
              <PersonList isModal={true} />
              <div className="flex justify-end  gap-2">
                <button
                  onClick={(e) => close(true)}
                  className="
          inline-flex items-center 
          px-4 py-2 
          bg-blue-600 hover:bg-blue-700 
          text-white 
          rounded
        "
                >
                  <FaCheck className="mr-2" />
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
    if (result) {
      dispatch(setDataToApi({ datar: { educationId: rowData.id } }));
      // AssingPerson(selectedRows, rowData.id)
    }

    // setModalOpen2(true);
  };
  const KayitlariGoster = async (rowData: EducationPlan) => {
    if (!rowData.id) return;
    if (!rowData.dosyalar) return;
    openModal({
      title: rowData.egitimAdi
        ? rowData.egitimAdi + "  Kayıtları"
        : "Eğitim Kayıtları",
      content: (close) => {
        let fields = [];
        let iconlar = [<FaFileAlt title="Önizleme" />];
        if (roller.includes(user.user.rolId)) {
          iconlar.push(<FaTrash color="red" title="Sil" />);
        }

        rowData.dosyalar?.forEach((item, index) => {
          let functions = [
            (setValue, allValues) => {
              openModal({
                title: rowData.egitimAdi
                  ? rowData.egitimAdi + "  Kayıtları"
                  : "Eğitim Kayıtları",
                maximized: true,
                content: function (close: (result: any) => void): ReactNode {
                  return (
                    <iframe
                      src={
                        URL.replace("api", "") +
                        allValues.dosyalar[index].filePath
                      }
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                      title="PDF Viewer"
                    />
                  );
                },
              });
            },
          ];
          if (roller.includes(user.user.rolId)) {
            functions.push((setValue, allValues, setFields) => {
              setValue(`dosyalar.${index}.fileName`, "");
              setFields &&
                setFields((prev) =>
                  prev.filter((x) => x.name != `dosyalar.${index}.fileName`)
                );
            });
          }
          fields?.push({
            name: "dosyalar." + index + ".fileName",
            type: "text",
            label: index + 1 + ".Dosya",
            colspan: 12,
            defaultValue: item.fileName,
            clickIcon: iconlar,
            onThreeDotsClick: functions,
          });
          fields?.push({
            type: "text",
            name: `dosyalar.${index}.filePath`,
            label: "Dosya Adı",
            defaultValue: item.filePath,
            hidden: true,
          });
          fields?.push({
            type: "text",
            name: `dosyalar.${index}.id`,
            label: "Dosya Adı",
            defaultValue: item.id,
            hidden: true,
          });
        });
        if (roller.includes(user.user.rolId)) {
          fields?.push({
            defaultValue: null,
            type: "button",
            name: "btn",
            label: "Yeni Dosya Ekle",
            onClick(setFields, setValue, allValues) {
              let input = document.createElement("input");
              input.type = "file";
              // input.accept = ".pdf,image/*"; // PDF ve resim dosyaları için
              input.onchange = async (event) => {
                let index = allValues?.dosyalar ? allValues.dosyalar.length : 0;
                setFields((prev) => [
                  ...prev,
                  {
                    readOnly: true,
                    type: "text",
                    name: `dosyalar.${index}.fileName`,
                    label: index + 1 + ".Dosya",
                    defaultValue: "",
                    colspan: 12,
                    clickIcon: [
                      <FaFileAlt title="Önizleme" />,
                      <FaTrash color="red" title="Sil" />,
                    ],
                    onThreeDotsClick: [
                      (setValue, allValues) => {
                        let title = allValues.dosyalar[index].fileName;
                        openModal({
                          title: title,
                          maximized: true,
                          content: function (
                            close: (result: any) => void
                          ): ReactNode {
                            let contentType = allValues.dosyalar[index].fileName
                              .split(".")
                              .pop();
                            return contentType == "mp4" ? (
                              <video
                                width="100%"
                                height="100%"
                                controls
                                autoplay
                              >
                                <source
                                  src={allValues.dosyalar[index].filePath}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <iframe
                                src={allValues.dosyalar[index].filePath}
                                width="100%"
                                height="100%"
                                style={{ border: "none" }}
                                title="PDF Viewer"
                              />
                            );
                          },
                        });
                      },
                      (setValue, allValues, setFields) => {
                        setValue(`dosyalar.${index}.fileName`, "");
                        setFields &&
                          setFields((prev) =>
                            prev.filter(
                              (x) => x.name != `dosyalar.${index}.fileName`
                            )
                          );
                      },
                    ],
                  },
                ]);
                const fileList = (event.target as HTMLInputElement).files;
                if (fileList && fileList.length > 0) {
                  const file = fileList[0];
                  file.arrayBuffer().then((buffer) => {
                    const bytes = btoa(
                      new Uint8Array(buffer).reduce(
                        (acc, byte) => acc + String.fromCharCode(byte),
                        ""
                      )
                    );
                    const fileUrl = `data:${file.type};base64,${bytes}`;
                    setValue(`dosyalar.${index}.filePath`, fileUrl);
                    setValue(`dosyalar.${index}.fileName`, file.name || "");
                  });
                }
              };
              input.click();
            },
          });
        }
        if (rowData.atama?.state == PersonelEgitimDurumlari.AtamaYapildi) {
          fields?.push({
            defaultValue: null,
            type: "button",
            name: "btn",
            label: "Eğitimi tamamladım.",
            async onClick(setFields, setValue, allValues) {
              const result = await confirm({
                message:
                  "Bu işlemi yaptığınızda tarafınıza bir sınav tanımlanacak.",
              });
              if (result !== true) return;
              apiRequest<ApiResponseClient<string>>(
                "POST",
                URL + "/education/AssignToState",
                { Authorization: "Bearer " + login.accessToken },
                {
                  educationId: rowData.id,
                  state: PersonelEgitimDurumlari.KayitlarOkundu,
                }
              ).then((data) => {
                if (data.statusCode === 0) {
                  dispatch(
                    setNotification({
                      title: "Başarılı",
                      message: data.message || "Kayıt Başarılı",
                      type: "success",
                    })
                  );
                  close(null);
                } else {
                  dispatch(
                    setNotification({
                      title: "Başarılı",
                      message: data.message,
                      type: "warning",
                    })
                  );
                }
              });
            },
          });
        }
        return (
          <GenericForm
            fields={fields ?? []}
            onSubmit={async (r) => {
              if (!roller.includes(user.user.rolId)) {
                dispatch(
                  setNotification({
                    title: "Yetkisiz",
                    message: "Bu işlemi yapmaya yetkiniz yok.",
                    type: "warning",
                  })
                );
                return;
              }
              let body = r.dosyalar
                .filter((x) => x.fileName !== "")
                ?.map((item) => ({
                  id: item.id,
                  educationId: rowData.id,
                  fileName: item.fileName,
                  fileNameOrijinal: item.fileName,
                  contentType: "",
                  base64Data: item.filePath.split(",").pop() || "",
                }));
              try {
                const result = await apiRequest<ApiResponseClient<string>>(
                  "POST",
                  URL + "/education/AddFile?educationId=" + rowData.id,
                  { Authorization: "Bearer " + login.accessToken },
                  body
                );
                if (result && result.isSuccess) {
                  dispatch(
                    setNotification({
                      title: "Başarılı",
                      message: result.message || "Kayıt Başarılı",
                      type: "success",
                    })
                  );
                  apiRequest<ApiResponseClient<EducationPlan>>(
                    "GET",
                    EDUCATION_PLAN_GETALL,
                    { Authorization: "Bearer " + user.accessToken }
                  )
                    .then((response) => {
                      (response.result as any[]).forEach((item) => {
                        item.egitimBaslangicTarihi = item.egitimBaslangicTarihi
                          ? parseToJsDate(item.egitimBaslangicTarihi.toString())
                          : null;
                        item.egitimBitisTarihi = item.egitimBitisTarihi
                          ? parseToJsDate(item.egitimBitisTarihi.toString())
                          : null;
                      });
                      setPlans(response.result as EducationPlan[]);
                    })
                    .catch((error) => {
                      alert(
                        "Eğitim planları alınırken hata oluştu: " +
                          error.message
                      );
                    });
                  close(true);
                }
              } catch (error) {
                dispatch(
                  setNotification({
                    title: "Hata",
                    message: error.message,
                    type: "error",
                  })
                );
              }
            }}
          />
        );
      },
    });
  };
  let roller = [1, 2, 15];
  const actionBodyTemplate = (rowData: EducationPlan) => {
    let buttons: MenuItem[] = [];
    if (roller.includes(user.user.rolId)) {
      buttons.push({
        label: "Düzenle",
        onClick: function (): void {
          openEdit(rowData);
        },
      });
      buttons.push({
        label: "Sil",
        onClick: function (): void {
          deletePlan(rowData.id);
        },
      });
      buttons.push({
        label: "Personele Ata",
        onClick: function (): void {
          AssignToPersonel(rowData);
        },
      });
    }
    buttons.push({
      label: "Eğitim Kayıtları",
      onClick: function (): void {
        KayitlariGoster(rowData);
      },
    });
    if (rowData.egitimDegerlendirmeFormId) {
      buttons.push({
        label: "Form Doldur",
        onClick: function (): void {
          navigate(
            `/form/doldur/${rowData.egitimDegerlendirmeFormId}/${rowData.id}`
          );
        },
      });
    }
    if (
      rowData.atama?.state === PersonelEgitimDurumlari.KayitlarOkundu &&
      rowData.personelDegerlendirmeFormId
    ) {
      buttons.push({
        label: "Eğitim Sınavı Ol",
        onClick: function (): void {
          navigate(
            `/form/doldur/${rowData.personelDegerlendirmeFormId}/${rowData.id}`
          );
        },
      });
    }
    return (
      <div className="flex flex-row">
        {/* <MenuButton items={buttons} /> */}
        {roller.includes(user.user.rolId) && (
        <>
          <button
            title="Düzenle"
            onClick={() => openEdit(rowData)}
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
          </button>
          <button
            title="Sil"
            onClick={() => deletePlan(rowData.id)}
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
          <button
            title="Personele Ata"
            onClick={async () => await AssignToPersonel(rowData)}
            className="
        inline-flex items-center 
        px-4 py-2 
        bg-green-600 hover:bg-green-700 
        text-white 
        rounded
        mr-2
      "
          >
            <FaPersonBooth />
          </button>
        </>
      )}

      <button
        title="Eğitim Kayıtları"
        onClick={async () => await KayitlariGoster(rowData)}
        className="
        inline-flex items-center 
        px-4 py-2 
        bg-purple-600 hover:bg-purple-700 
        text-white 
        rounded
        mr-2
      "
      >
        <FaFile />
      </button>
      {rowData.egitimDegerlendirmeFormId && (
        <button
          title="Form Doldur"
          onClick={async () =>
            navigate(
              `/form/doldur/${rowData.egitimDegerlendirmeFormId}/${rowData.id}`
            )
          }
          className="
        inline-flex items-center 
        px-4 py-2 
        bg-blue-600 hover:bg-blue-700 
        text-white 
        rounded
        mr-2
      "
        >
          <FcSurvey />
        </button>
      )}
      {rowData.atama?.state === PersonelEgitimDurumlari.KayitlarOkundu &&
        rowData.personelDegerlendirmeFormId && (
          <button
            title="Eğitim Sınavı Ol"
            onClick={async () =>
              navigate(
                `/form/doldur/${rowData.personelDegerlendirmeFormId}/${rowData.id}`
              )
            }
            className="
        inline-flex items-center 
        px-4 py-2 
        bg-amber-600 hover:bg-amber-700 
        text-white 
        rounded
      "
          >
            <FaAddressBook />
          </button>
        )}
      </div>
    );
  };
  const navigate = useNavigate();
  return (
    <div className="card">
      <h2 className="text-2xl text-center font-bold  mb-1">Eğitimler</h2>

      <SmartTable
        data={plans}
        scrollHeight="calc(100vh - 200px)"
        columns={[
          { accessor: "__index", header: "#" },
          {
            accessor: "egitimAdi",
            summaryType: "count",
            header: "Eğitim Adı",
            sortable: true,
            filterable: true,
          },
          {
            accessor: "egitimNotu",
            header: "Eğitim Not",
            sortable: true,
            filterable: true,
          },
          {
            accessor: "egitimSuresiDk",
            header: "Eğitim Süresi (Dk)",
            sortable: true,
            filterable: true,
          },
          {
            accessor: "icKaynakMi",
            header: "Kaynak",
            body: (rowData) =>
              rowData.icKaynakMi ? "İç Kaynak" : "Dış Kaynak",
            sortable: true,
            filterable: true,
          },
          {
            accessor: "egiticiPersonelId",
            header: "Eğitici Personel",
            sortable: true,
            filterable: true,
            body: (rowData) => {
              if (rowData.icKaynakMi === true) {
                let per = personels?.filter(
                  (c) => c.id === rowData.egiticiPersonelId
                )[0];

                return per?.personelAdi + " " + per?.personelSoyadi;
              } else {
                return rowData.disKaynakAdi;
              }
            },
          },
          {
            accessor: "egitimBaslangicTarihi",
            header: "Planlanan Tarih",
            body: (rowData) =>
              rowData.egitimBaslangicTarihi?.toLocaleDateString(),
            sortable: true,
            filterable: true,
          },
          {
            accessor: "egitimBitisTarihi",
            header: "Gerçekleştiği Tarih",
            body: (rowData) => rowData.egitimBitisTarihi?.toLocaleDateString(),
            sortable: true,
            filterable: true,
          },
          {
            accessor: "atama",
            header: "Durum",
            body: (rowData) => AtamaDurumu(rowData.atama? rowData.atama.state:PersonelEgitimDurumlari.AtamaYapilmamis),
          },
          {
            accessor: "id",
            header: "İşlemler",
            // headerClassName: "min-w-[320px]",
            body: (rowData) => actionBodyTemplate(rowData),
          },
        ]}
        //  frozenColumns={[{name:"id",right:true}]}
        rowIdAccessor={"id"}
        enablePagination={false}
        newRecordVoid={roller.includes(user.user.rolId) ? openNew : undefined}
      />
      <Dialog
        style={{ width: "500px" }}
        header={editingPlan ? "Eğitim Düzenle" : "Yeni Eğitim Ekle"}
        visible={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <div className=" max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Eğitim Adı</label>
              <input
                type="text"
                name="educationName"
                value={form.egitimAdi || ""}
                onChange={(e) =>
                  setForm({ ...form, egitimAdi: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
              {errors.egitimAdi && (
                <small className="p-error">{errors.egitimAdi}</small>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Eğitim Notu</label>
              <textarea
                rows={3}
                name="educationName"
                value={form.egitimNotu || ""}
                onChange={(e) =>
                  setForm({ ...form, egitimNotu: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Eğitim Süresi (Dk)
              </label>
              <input
                type="number"
                min={1}
                name="egitimSuresiDk"
                value={form.egitimSuresiDk ?? undefined}
                onChange={(e) =>
                  setForm({ ...form, egitimSuresiDk: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Planlanan Tarih</label>
              <Calendar
                onClearButtonClick={() =>
                  setForm({
                    ...form,
                    egitimBaslangicTarihi: null,
                  })
                }
                showButtonBar
                value={form.egitimBaslangicTarihi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    egitimBaslangicTarihi: e.value || new Date(),
                  })
                }
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Gerçekleştiği Tarih
              </label>
              <Calendar
                onClearButtonClick={() =>
                  setForm({
                    ...form,
                    egitimBitisTarihi: null,
                  })
                }
                showButtonBar
                value={form.egitimBitisTarihi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    egitimBitisTarihi: e.value || new Date(),
                  })
                }
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Eğitim Değerlendirme Formu
              </label>
              <Dropdown
                value={form.egitimDegerlendirmeFormId}
                showClear
                style={{ border: "1px solid" }}
                onChange={(e: DropdownChangeEvent) =>
                  setForm({ ...form, egitimDegerlendirmeFormId: e.value })
                }
                options={surveys?.map((x) => ({
                  name: x.title,
                  id: x.id,
                  value: x.id,
                }))}
                optionLabel="name"
                placeholder=" Form Seçiniz"
                filter
                className="w-full md:w-14rem"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Personel Değerlendirme Formu
              </label>
              <Dropdown
                value={form.personelDegerlendirmeFormId}
                showClear
                style={{ border: "1px solid" }}
                onChange={(e: DropdownChangeEvent) =>
                  setForm({ ...form, personelDegerlendirmeFormId: e.value })
                }
                options={surveys?.map((x) => ({
                  name: x.title,
                  id: x.id,
                  value: x.id,
                }))}
                optionLabel="name"
                placeholder=" Form Seçiniz"
                filter
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="source"
                className="mb-1 font-medium text-gray-700"
              >
                Kaynak
              </label>
              <select
                id="source"
                value={form.icKaynakMi ? "ic" : "dis"}
                onChange={(e) => {
                  setForm({
                    ...form,
                    icKaynakMi: e.target.value === "ic" ? true : false,
                    egiticiPersonelId:
                      e.target.value === "ic" ? form.egiticiPersonelId : null,
                  });
                }}
                className="
          border border-gray-300 
          rounded 
          px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
              >
                <option value="ic">İç Kaynak</option>
                <option value="dis">Dış Kaynak</option>
              </select>
            </div>
            {form.icKaynakMi ? (
              <div>
                <label className="block mb-1 font-medium">
                  Eğitici Personel
                </label>
                <Dropdown
                  value={form.egiticiPersonelId}
                  showClear
                  style={{ border: "1px solid" }}
                  onChange={(e: DropdownChangeEvent) =>
                    setForm({ ...form, egiticiPersonelId: e.value })
                  }
                  options={personels?.map((x) => ({
                    name: x.personelAdi + " " + x.personelSoyadi,
                    id: x.id,
                    value: x.id,
                  }))}
                  optionLabel="name"
                  placeholder=" Personel Seçiniz"
                  filter
                  className="w-full md:w-14rem"
                />
              </div>
            ) : (
              <div>
                <label className="block mb-1 font-medium">Eğitici Adı</label>
                <input
                  type="text"
                  name="disKaynakAdi"
                  value={form.disKaynakAdi || ""}
                  onChange={(e) =>
                    setForm({ ...form, disKaynakAdi: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}
            <label className="inline-flex items-center space-x-2">
              {errors.egiticiPersonelId && (
                <small className="p-error">{errors.egiticiPersonelId}</small>
              )}
              <input
                type="checkbox"
                checked={form.isActive ?? false}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">
                {form.isActive ? "Aktif" : "Pasif"}
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setModalOpen(false)}
            className="
          inline-flex items-center 
          px-4 py-2 
          text-gray-700 hover:text-gray-900 
          bg-transparent 
          border border-transparent
          rounded
        "
          >
            <FaTimes className="mr-2" />
            İptal
          </button>

          <button
            onClick={savePlan}
            className="
          inline-flex items-center 
          px-4 py-2 
          bg-blue-600 hover:bg-blue-700 
          text-white 
          rounded
        "
          >
            <FaCheck className="mr-2" />
            Kaydet
          </button>
        </div>
      </Dialog>

      <Dialog
        header="Onay"
        visible={showConfirm}
        onHide={() => setShowConfirm(false)}
        footer={
          <>
            <button
              onClick={() => setShowConfirm(false)}
              className="
          inline-flex items-center 
          px-4 py-2 
          text-gray-700 hover:text-gray-900 
          bg-transparent 
          border border-transparent 
          rounded
        "
            >
              <FaTimes className="mr-2" />
              Hayır
            </button>

            <button
              onClick={() => {
                if (confirmDialog) confirmDialog();
                setShowConfirm(false);
              }}
              className="
          inline-flex items-center 
          px-4 py-2 
          bg-blue-600 hover:bg-blue-700 
          text-white 
          rounded
        "
            >
              <FaCheck className="mr-2" />
              Evet
            </button>
          </>
        }
      >
        <p>Bu işlemi onaylıyor musunuz?</p>
      </Dialog>
    </div>
  );
}
