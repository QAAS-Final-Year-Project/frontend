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
        pageSize: 5,
    }
    ,
    cookies: {
        domain: window.location.hostname?.split(".")?.slice(1)?.join("."),
        secure: true,
        sameSite: "strict",
    } as CookieAttributes,
    date: {
        format: "DD-MM-YYYY",
        inputDateFormat: "YYYY-MM-DD",
    },
    typeForm: {
        basicTestUri: "https://hdid54bf7ro.typeform.com/to/L6A2dMvg#name=xxxxx&user_id=",
        basicTestPassMark: 1,
        technicalTestUri: "https://hdid54bf7ro.typeform.com/to/DjBoFAaz#user_id=",
        technicalTestPassMark: 1,

    },
    mailChimp: {
        list_id: process.env.REACT_APP_MAILCHIMP_LIST_ID || "xxxx",
        API_SERVER: process.env.REACT_APP_MAILCHIMP_SERVER || "xxxx",
        MAILCHIMP_API_KEY: process.env.REACT_APP_MAILCHIMP_API_KEY || "xxxx"
    },
    invoice: {
        name: "TestUniversal",
        address: "xxxx",
        phoneNumber: "xxxx",
    }


}

export default AppConfig;