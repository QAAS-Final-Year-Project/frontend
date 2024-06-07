//TODO: Intergrate with env variables

import { CookieAttributes } from "js-cookie";

const AppConfig = {

    app: {
        name: "TestUniversal",

    },
    api: {
        base: "http://localhost:4000/",

    },
    asset: {
        uri: ""
    },
    constants: {
        page: 1,
        pageSize: 10,
    }
    ,
    cookies: {
        domain: window.location.hostname?.split(".")?.slice(1)?.join("."),
        secure: true,
        sameSite: "strict",
    } as CookieAttributes,
    date: {
        format: "DD/MM/YYYY",
        inputDateFormat: "YYYY-MM-DD",
    },
    typeForm: {
        basicTestUri: "https://hdid54bf7ro.typeform.com/to/L6A2dMvg#name=xxxxx&user_id=",
        technicalTestUri: "https://hdid54bf7ro.typeform.com/to/DjBoFAaz#user_id=",
    },
}

export default AppConfig;