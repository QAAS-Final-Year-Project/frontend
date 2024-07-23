import { AxiosDataService } from "Shared/utils/axios";

export const doUpdateTesterUserProfile = async (values) => {
    return AxiosDataService.post("/api/tester-users/update-profile", values);
};
export const doUpdateTesterUserSocialLinks = async (values) => {
    return AxiosDataService.post("/api/tester-users/update-social-links", values);
};
export const doUpdateTesterUserPassword = async (values) => {
    return AxiosDataService.post("/api/tester-users/update-password", values);
};