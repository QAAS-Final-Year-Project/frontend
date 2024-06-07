import { Countries, Country } from "data/index.types";
import * as yup from "yup";

export interface ICreateTesterUser {
  fullName: string;
  emailAddress: string;
  country: Country;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}

export const TesterUserSchema = yup.object().shape({
  emailAddress: yup.string().email().required("Email Address is Required"),
  fullName: yup.string().required("Full Name is Required"),

  password: yup
    .string()
    .min(8, "Password must be more than 8 characters")
    .required("Password is required")
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
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  country: yup
    .string()
    .oneOf([...Countries])
    .required("Country is Required"),
})



export interface ICreateDeveloperUser {
  fullName: string;
  emailAddress: string;
  country: Country;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}
export const DeveloperUserSchema = yup.object().shape({
  emailAddress: yup.string().email().required("Email Address is Required"),
  fullName: yup.string().required("Full Name is Required"),
  organizationName: yup.string().notRequired(),
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

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  country: yup
    .string()
    .oneOf([...Countries])
    .required("Country is Required"),
})



export interface IVerifyEmail {
  code: string;
}


export const VerifyEmailSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^[0-9]{6}$/, "Verification Code must be 6 digits")
    .required("Verification Code is Required")

})