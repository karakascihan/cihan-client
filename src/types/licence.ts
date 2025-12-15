import type { Product } from "./product";
import type { Company } from "./company";



export interface Licence{
    id: number;
    licenceKey: string;
    devices: number;
    createDate: string;
    updateDate: string;
    licenceStartDate: string;
    licenceEndDate: string;
    product: Product;
    company: Company;
    createdByUser: CreatedByUser;
}



export interface CreateLicence{
    licenceKey: string;
    devices: number;
    licenceStartDate: string;
    licenceEndDate: string;
    forProduct: number;
    forCompany: number;
}

export interface UpdateLicence{
    id: number;
    licenceStartDate: string;
    licenceEndDate: string;
}

interface CreatedByUser {
    id: number;
    name: string;
    image: string;
  }