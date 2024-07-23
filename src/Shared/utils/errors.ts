import { AxiosError, isAxiosError } from "axios";
import { showToast } from "./alert";

export const flattenErrorMap = (errorMap: object): string[] => {
    let res = []
    Object.keys(errorMap).forEach((key) => {
        res = [...res, ...errorMap[key]]
    });
    return res;
}

export const formatAndShowAxiosError = (error: AxiosError | any, errorMessage?: string) => {
    if (
        isAxiosError(error) &&
        error?.response?.data &&
        error.response?.data?.message
    ) {
        showToast({
            type: "error",
            title: error.response?.data?.message,
        });
        // if (error.response?.data?.errors) {
        //     form.setErrors(error.response?.data?.errors);
        // }
    } else {
        showToast({
            type: "error",
            title: error?.message || "Error logging in",
        });
    }
}