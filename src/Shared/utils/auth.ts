import Cookies from "js-cookie";
import AppConfig from "config";
export const setMe = (user: any) => {
    Cookies.set(`user`, JSON.stringify(user), { ...AppConfig.cookies, expires: 30 });
};



export const setToken = (token: string) => {
    Cookies.set(`token`, token, { ...AppConfig.cookies, expires: 30 });
};



export const clearAuth = () => {
    Cookies.remove(`token`);
    Cookies.remove(`user`);
    window.location.href = "/login";
}