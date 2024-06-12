import { AxiosDataService } from "Shared/utils/axios"

export const doSubmitVerification = async (values: any) => {
    return AxiosDataService.post('/api/verifications/submit', values)
}
