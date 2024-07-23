import * as yup from "yup";


export type AccountType = "Tester" | "Developer";
export interface ILoginTesterUserSchema {
    emailAddress: string;
    password: string;
    accountType: AccountType
}
export interface IVerifyEnterEmailSchema {
    emailAddress: string;
    accountType: AccountType

}



export const LoginTesterUserSchema = yup.object().shape({
    emailAddress: yup.string().email("Must be a valid email").required("Email Address is Required"),

    password: yup
        .string()
        .min(8, "Password must be more than 8 characters")
        .matches(
            /^(?=.*[a-z])/,
            "Must Contain at least One Lowercase Character"
        )
        .matches(
            /^(?=.*[A-Z])/,
            "Must Contain at least One Uppercase Character"
        )
        .matches(/^(?=.*[0-9])/, "Must Contain at least One Number")
        .matches(
            /^(?=.*[!@#$%^&*\\|/{}()<>:;[\]_\\-\\=?])/,
            "Must Contain at least One special case Character"
        ).required("Password is required"),
})


export const VerifyEnterEmailSchema = yup.object().shape({
    emailAddress: yup.string().email("Must be a valid email").required("Email Address is Required"),

})