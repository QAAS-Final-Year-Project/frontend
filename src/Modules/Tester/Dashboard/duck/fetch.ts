import { AxiosDataService } from "Shared/utils/axios"

export const getDashboardOverviewSummary = async () => {
    return AxiosDataService.get(`/api/summaries/overview`)
}
export const getLatestTesterPayouts = async () => {
    return AxiosDataService.get(`/api/summaries/tester-payouts`)
}
export const getTesterEarningOverview = async () => {
    return AxiosDataService.get(`/api/summaries/tester-earnings`)
}
