import { AxiosDataService } from "Shared/utils/axios"

export const getDashboardOverviewSummary = async () => {
    return AxiosDataService.get(`/api/summaries/overview`)
}
