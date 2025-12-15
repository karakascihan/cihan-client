import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { ASSEMBLY_FAILURE_CREATE, ASSEMBLY_FAILURE_DELETE, ASSEMBLY_FAILURE_DESCRIPTION, ASSEMBLY_FAILURE_GET, ASSEMBLY_FAILURE_GETALL, ASSEMBLY_FAILURE_GETALLBYMANUAL, ASSEMBLY_FAILURE_GETQUALITYOFFICER, ASSEMBLY_FAILURE_UPDATE, ASSEMBLY_MANUAL_ADDFILE, ASSEMBLY_MANUAL_CREATE, ASSEMBLY_MANUAL_DELETE, ASSEMBLY_MANUAL_GET, ASSEMBLY_MANUAL_GETALL, ASSEMBLY_MANUAL_UPDATE, ASSEMBLY_NOTE_CREATE, ASSEMBLY_NOTE_DELETE, ASSEMBLY_NOTE_GET, ASSEMBLY_NOTE_GETALL, ASSEMBLY_NOTE_GETALLBYMANUAL, ASSEMBLY_NOTE_UPDATE, ASSEMBLY_QUALITY_CREATE, ASSEMBLY_QUALITY_DELETE, ASSEMBLY_QUALITY_GET, ASSEMBLY_QUALITY_GETALL, ASSEMBLY_QUALITY_GETALLBYFAILURE, ASSEMBLY_QUALITY_UPDATE, ASSEMBLY_SUCCESS_CREATE, ASSEMBLY_SUCCESS_DELETE, ASSEMBLY_SUCCESS_GET, ASSEMBLY_SUCCESS_GETALL, ASSEMBLY_SUCCESS_GETALLBYMANUAL, ASSEMBLY_SUCCESS_UPDATE, ASSEMBLY_VISUAL_NOTE_CREATE, ASSEMBLY_VISUAL_NOTE_DELETE, ASSEMBLY_VISUAL_NOTE_GET, ASSEMBLY_VISUAL_NOTE_GETALL, ASSEMBLY_VISUAL_NOTE_GETALLBYDRAWING, CMM_ADDFILE, CMM_ADDRESULTFILE, CMM_CREATE, CMM_DELETE, CMM_GET, CMM_GETALL, CMM_UPDATE, CMMFAILURE_DESCRIPTION, CMMFAILURESTATE_CREATE, CMMFAILURESTATE_DELETE, CMMFAILURESTATE_GET, CMMFAILURESTATE_GETALL, CMMFAILURESTATE_GETALLBYMANUAL, CMMFAILURESTATE_UPDATE, CMMMODULE_CREATE, CMMMODULE_DELETE, CMMMODULE_GET, CMMMODULE_GETALL, CMMMODULE_UPDATE, CMMNOTE_CREATE, CMMNOTE_DELETE, CMMNOTE_GET, CMMNOTE_GETALL, CMMNOTE_GETALLBYMANUAL, CMMNOTE_UPDATE, CMMSUCCESSSTATE_CREATE, CMMSUCCESSSTATE_DELETE, CMMSUCCESSSTATE_GET, CMMSUCCESSSTATE_GETALL, CMMSUCCESSSTATE_GETALLBYMANUAL, CMMSUCCESSSTATE_UPDATE, DEPARTMENT_CREATE, DEPARTMENT_DELETE, DEPARTMENT_GET, DEPARTMENT_GETALL, DEPARTMENT_UPDATE, DOCUMENT_UPLOAD, EDUCATION_PLAN_ASSIGN, EDUCATION_PLAN_CREATE, EDUCATION_PLAN_DELETE, EDUCATION_PLAN_GETALL, EDUCATION_PLAN_MAPPING, EDUCATION_PLAN_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_DELETE, EMPLOYEE_GET, EMPLOYEE_GETALL, EMPLOYEE_UPDATE, KYSDOCUMENT_UPLOAD, LOGIN, PERSONEL_GETALLNAMES, REFRESH, REGISTER, RESET_PASSWORD_SERVICE, SURVEY_CREATE, SURVEY_FILL, SURVEY_GET, SURVEY_GETALL, SURVEY_GETALLSURVEYANSWERS, TECHNICALDRAWING_ADDFILE, TECHNICALDRAWING_CREATE, TECHNICALDRAWING_DELETE, TECHNICALDRAWING_FAILURE_CMMDESCRIPTION, TECHNICALDRAWING_FAILURE_CREATE, TECHNICALDRAWING_FAILURE_DELETE, TECHNICALDRAWING_FAILURE_DESCRIPTION, TECHNICALDRAWING_FAILURE_GET, TECHNICALDRAWING_FAILURE_GETALL, TECHNICALDRAWING_FAILURE_GETALLBYDRAWING, TECHNICALDRAWING_FAILURE_GETCMMUSER, TECHNICALDRAWING_FAILURE_GETQUALITYOFFICER, TECHNICALDRAWING_FAILURE_UPDATE, TECHNICALDRAWING_GET, TECHNICALDRAWING_GETALL, TECHNICALDRAWING_NOTE_CREATE, TECHNICALDRAWING_NOTE_DELETE, TECHNICALDRAWING_NOTE_GET, TECHNICALDRAWING_NOTE_GETALL, TECHNICALDRAWING_NOTE_GETALLBYDRAWING, TECHNICALDRAWING_NOTE_UPDATE, TECHNICALDRAWING_QUALITY_CREATE, TECHNICALDRAWING_QUALITY_DELETE, TECHNICALDRAWING_QUALITY_GET, TECHNICALDRAWING_QUALITY_GETALL, TECHNICALDRAWING_QUALITY_GETALLBYFAILURE, TECHNICALDRAWING_QUALITY_UPDATE, TECHNICALDRAWING_SUCCESS_CREATE, TECHNICALDRAWING_SUCCESS_DELETE, TECHNICALDRAWING_SUCCESS_GET, TECHNICALDRAWING_SUCCESS_GETALL, TECHNICALDRAWING_SUCCESS_GETALLBYDRAWING, TECHNICALDRAWING_SUCCESS_UPDATE, TECHNICALDRAWING_UPDATE, TECHNICALDRAWING_VISUAL_NOTE_CREATE, TECHNICALDRAWING_VISUAL_NOTE_DELETE, TECHNICALDRAWING_VISUAL_NOTE_GET, TECHNICALDRAWING_VISUAL_NOTE_GETALL, TECHNICALDRAWING_VISUAL_NOTE_GETALLBYDRAWING, URL, USER_DELETE, USER_GET, USER_GETALL, USER_UPDATE } from "../api";
import type { PersonelEducationMappingDto } from "../types/education";

let token = "";
let userId = "";
let user:any = {};
let header:any = {};
let headerFormData = {};
let isLoading = true;
console.log("servis ts dosyası çalıştı.");
export const init = async () => {
    try {
        
        const authData = await localStorage.getItem('persist:root');
        if (authData) {
            user = JSON.parse(authData).login;
            user = JSON.parse(user);
            token = user.accessToken || "";
            userId = user.id || -1;
        } else {
            userId = "";
        }
        header = { headers: { "Authorization": `Bearer ${token}` } };
        headerFormData = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
    } catch (error) {
        console.error("Bir hata oluştu:", error);
    } finally {
        isLoading = false;
    }
};

const useInit = async () => {
    try {
        await init();
    } catch (error) {
        console.error("Init error:", error);
    }
};

useInit();


const refreshTokenIfNeeded = async () => {
  const authData = await localStorage.getItem('persist:root');
    if (!authData) return;
     let user = JSON.parse(authData).login;
            user = JSON.parse(user);
    const accessToken = user.accessToken;
    const refreshToken = user.refreshToken;
    const refreshTokenExpireTime = user.refreshTokenExpireTime;

    const expireDate: Date = new Date(refreshTokenExpireTime);
const now: Date = new Date();

if (expireDate.getTime() - now.getTime() < 2 * 60 * 1000) {
        try {
            const res = await axios.post(REFRESH, {
                accessToken,
                refreshToken
            });
            if (res.data?.result) {
                await localStorage.setItem('auth', JSON.stringify({
                    ...user,
                    accessToken: res.data.result.accessToken,
                    refreshToken: res.data.result.refreshToken,
                    refreshTokenExpireTime: res.data.result.user.refreshTokenExpireTime
                }));
                token = res.data.result.accessToken;
                header = { headers: { "Authorization": `Bearer ${token}` } };
                headerFormData = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
            }
        } catch (err) {
            console.log("Refresh token hatası:", err);
        }
    }
};

axios.interceptors.request.use(
    async (config) => {
        await refreshTokenIfNeeded();
        const authData = await localStorage.getItem('auth');
        if (authData) {
            const user = JSON.parse(authData);
            config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export async function apiRequest<T>(
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  // Varsayılan header
  const mergedConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    ...config,
    headers:header.headers
  };

  const response = await axios.request<T>(mergedConfig);
  return response.data;
}


// AUTHENTICATION
export async function login(formData:any) {
    try {
        const response = await axios.post(LOGIN, formData);
        return response.data;
    } catch (error:any) {
        return { isSuccess: false, message: "Bağlantı hatası: " + error.message };
    }
}

export const logout = () => {
    return Promise.resolve(true);
};
// AUTHENTICATION_END




// USER
// export function ResetPassordService(mail:any) {
//     return axios.get(RESET_PASSWORD_SERVICE, { "mail": mail },header)
//         .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
// }

export function UserCreate(data:any) {
    return axios.post(REGISTER, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserUpdate(data:any) {
    return axios.put(USER_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserDelete(id:any) {
    return axios.delete(`${USER_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserGetAll(search:string, pageNumber:number, pageSize:number) {
    return axios.get(`${USER_GETALL}?searchTerm=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserGet(id:any) {
    return axios.get(`${USER_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// SURVEY

export function SurveyCreateService(data:any) {
    return axios.post(SURVEY_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function SurveyFillService(data:any) {
    return axios.post(SURVEY_FILL, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function SurveyGetAllService(type:string) {
    return axios.get(SURVEY_GETALL+"/"+type, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function SurveyGetService(id:any) {
    return axios.get(SURVEY_GET+"/"+id, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function SurveyGetAllAnswersService(type:string) {
    return axios.get(SURVEY_GETALLSURVEYANSWERS+"/"+type, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// USER_END

export function PersonelGetNamesService(onlyNames:boolean = true,isActive?:boolean) {
    return axios.get(PERSONEL_GETALLNAMES+"?onlyNames="+onlyNames+(isActive?"&isActive="+isActive:""), header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function CreateEducationPlanService(data:any) {
    return axios.post(EDUCATION_PLAN_CREATE, data,header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EducationPlanGetAllService() {
    return axios.get(EDUCATION_PLAN_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EducationPlanUpdateService(data:any) {
    return axios.put(EDUCATION_PLAN_UPDATE,data,header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EducationPlanDeleteService(id:any) {
    return axios.delete(`${EDUCATION_PLAN_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EducationPlanAssingService(data:Number[],educationId:number) {
    return axios.post(EDUCATION_PLAN_ASSIGN,data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EducationPlanMappingService(id:number) {
    return axios.get(EDUCATION_PLAN_MAPPING+"/"+id, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export const uploadDocument = async (file: File, id: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("kysDocumentId", id.toString());

  const res = await axios.post(KYSDOCUMENT_UPLOAD,formData,headerFormData);

 return res
}; 