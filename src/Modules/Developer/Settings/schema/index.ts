import * as Yup from 'yup';

export interface IAccountSettings {
    profileImageUrl: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    country: string;
    organizationName: string;
    rating: number;
}


export const AccountSettingsSchema = Yup.object().shape({
    profileImageUrl: Yup.string().url('Invalid URL').notRequired(),
    fullName: Yup.string().max(100, 'Full name cannot exceed 100 characters').required(),
    emailAddress: Yup.string().email('Invalid email address').required(),
    phoneNumber: Yup.string().matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phone number must be valid').notRequired(),
    organizationName: Yup.string().max(100, 'Organization name cannot exceed 100 characters').required(),
});




export interface ISocialSettings {
    twitter: string;
    github: string;
    website: string;
    linkedIn: string

}
export interface ISecuritySettings {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;

}


export const SocialSettingsSchema = Yup.object().shape({
    twitter: Yup.string().url('Invalid URL').notRequired(),
    github: Yup.string().url('Invalid URL').notRequired(),
    linkedIn: Yup.string().url('Invalid URL').notRequired(),
    website: Yup.string().url('Invalid URL').notRequired(),

});

export const SecuritySettingsSchema = Yup.object().shape({
    oldPassword: Yup
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
        ).required("Current Password is required"),
    newPassword: Yup
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
        ).required("New  Password is required"),

    repeatNewPassword: Yup
        .string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Please confirm your password"),

});