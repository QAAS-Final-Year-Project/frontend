import { AxiosDataService } from "Shared/utils/axios";

export const doUpdateDeveloperUserProfile = async (values) => {
    return AxiosDataService.post("/api/developer-users/update-profile", values);
};
export const doUpdateDeveloperUserSocialLinks = async (values) => {
    return AxiosDataService.post("/api/developer-users/update-social-links", values);
};
export const doUpdateDeveloperUserPassword = async (values) => {
    return AxiosDataService.post("/api/developer-users/update-password", values);
};