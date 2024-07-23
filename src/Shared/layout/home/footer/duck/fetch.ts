import { AxiosDataService } from "Shared/utils/axios"
import axios from "axios";
import AppConfig from "config";

export const doSubscribeNewsletter = async (values) => {
    return AxiosDataService.post(`/api/home/subscribe`, values)
}