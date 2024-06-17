import { Nationalities } from ".";

export const Countries = Nationalities.map(nationality => nationality.en_short_name);
export type Country = typeof Countries[number];


export interface IGetFilter {
    page?: string | number;
    pageSize?: number | string;
    fromDate?: any;
    toDate?: any;
    status?: string;
    searchFields?: string | string[];
    search?:string
isRated?:boolean
    exportType?:string
    gender?:string
    subscriptionId?:string
}