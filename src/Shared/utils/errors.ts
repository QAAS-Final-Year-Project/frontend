import { AxiosError } from "axios";
import { showToast } from "./alert";

export const flattenErrorMap = (errorMap: object): string[] => {
    let res = []
    Object.keys(errorMap).forEach((key) => {
        res = [...res, ...errorMap[key]]
    });
    return res;
}

export const formatAndShowAxiosError = (error: AxiosError | any, form?: any,) => {
    if (error?.response?.data?.errors) {
        let errors = {};
        Object.keys(error?.response?.data?.errors).map((key) => {
            errors[key] = error?.response?.data?.errors[key][0];
        });
        if (form) {
            form?.setErrors({
                ...errors,
            });
        }
        const errorsMap = flattenErrorMap(error?.response?.data?.errors);
        for (error in errorsMap) {
            showToast({
                type: "error",
                title: errorsMap[error],
            });
        }
    } else {
        showToast({
            type: "error",
            title: error.message,
        });
    }
}