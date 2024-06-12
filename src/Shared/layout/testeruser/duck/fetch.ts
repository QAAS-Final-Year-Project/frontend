import { AxiosDataService } from "Shared/utils/axios"

export const checkTesterUserAuth = async () => {
    return AxiosDataService.get('/api/tester-users/auth',)
}