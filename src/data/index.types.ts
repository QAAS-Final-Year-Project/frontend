import { Nationalities } from ".";

export const Countries = Nationalities.map(nationality => nationality.en_short_name);
export type Country = typeof Countries[number];

export const PaymentMethods = [
    "Card",
    "Bank",
    "Ussd",
    "Qr",
    "MobileMoney",
    "BankTransfer",
    "Eft"
] as const;

export type PaymentMethod = typeof PaymentMethods[number];

export interface IGetFilter {
    page?: string | number;
    pageSize?: number | string;
    fromDate?: any;
    toDate?: any;
    status?: string;
    sort?: string
    searchFields?: string | string[];
    search?: string
    isRated?: boolean
    exportType?: string
    isExpired?: boolean
    populate?: string | string[];
    select?: string | string[];
    gender?: string
    type?: string
    subscriptionId?: string
    minAmount?: number
    maxAmount?: number
    minBiddersCount?: number
    maxBiddersCount?: number
}