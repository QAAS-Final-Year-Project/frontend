import { AxiosDataService } from "Shared/utils/axios"

export const getAssessment = async () => {
    return AxiosDataService.get('/api/tester-users/assessment',)
}
