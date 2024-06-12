import { AxiosDataService } from "Shared/utils/axios"

export const checkDeveloperUserAuth = async () => {
    return AxiosDataService.get('/api/developer-users/auth',)
}