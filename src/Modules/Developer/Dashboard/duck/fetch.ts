import { AxiosDataService } from "Shared/utils/axios"

export const getDashboardOverviewSummary = async () => {
    return AxiosDataService.get(`/api/summaries/overview`)
}


export const getLatestDeveloperPayments = async () => {
    return AxiosDataService.get(`/api/summaries/developer-payments`)
}
export const getDeveloperTaskTrends = async () => {
    return AxiosDataService.get(`/api/summaries/developer-tasks-trend`)
}
