import * as yup from "yup";
import { PaymentMethods, PaymentMethod } from "data/index.types";

export interface IWithdrawSchema {
    notes: string;
    amount: string;
    paymentMethod: PaymentMethod;
    paymentAccount: string;
    accepted: boolean;
}




export const WithdrawSchema = yup.object().shape({
    notes: yup.string().required("Kindly provide withdrawal details"),
    amount: yup.number().required("Kindly provide withdrawal amount"),
    paymentMethod: yup.string().oneOf([...PaymentMethods]).required("Kindly specify payment method"),
    paymentAccount: yup.string().required("Kindly specify account to receive payment"),
})