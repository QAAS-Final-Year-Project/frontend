import { AxiosDataService } from "Shared/utils/axios";


export const doRegisterDeveloperUser = async (values: any) => {
    return AxiosDataService.post('/api/auth/register-developer-user', values)
}


export const doRegisterTesterUser = async (values: any) => {
    return AxiosDataService.post('/api/auth/register-tester-user', values)
}
export const doVerifyEmail = async (values: any) => {
    return AxiosDataService.post('/api/auth/verify-email', values)
}
export const doLogin = async (values: any) => {
    if (values?.type == "Tester") {
        return AxiosDataService.post('/api/auth/login-tester-user', values)
    }
    else {
        return AxiosDataService.post('/api/auth/login-developer-user', values)
    }
}


