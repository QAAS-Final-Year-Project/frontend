import { AxiosDataService } from "Shared/utils/axios"
import axios from "axios"
import { IGetFilter } from "data/index.types"

export const doDeposit = async (values: any) => {
    return AxiosDataService.post('/api/payments/deposit', values)
}




export const getPayments = async (filter: IGetFilter) => {
    return AxiosDataService.get(`/api/payments`, filter)
}




export const getPaymentsExportUrl = async (filter: IGetFilter) => {
    return AxiosDataService.get(`/api/payments/export?populate=subscription,member`, filter)
}



export const getPayment = async (id: string | number) => {
    return AxiosDataService.get("/api/payments/" + id + "?populate=createdBy,task")
}

export const getPaymentByReference = async (reference: any, populate?: string | string[]) => {
    return AxiosDataService.get("/api/payments/by-reference/" + reference, {
        populate: populate || ["createdBy", "task"]
    })
}

export const getMiniStaffs = async () => {
    return AxiosDataService.get("/api/staff?select=name,id")
}


export const verifyPayment = async (reference: any) => {
    return axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}`
        }
    })
}