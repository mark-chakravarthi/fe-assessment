import * as Yup from "yup";

export const schema = Yup.object().shape({
  FirstName: Yup.string()
    .required()
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("FirstName"),
  LastName: Yup.string()
    .required()
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("LastName"),
  EmailId: Yup.string()
    .required()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/, "Enter a valid Email Id")
    .label("EmailId"),
  PhoneNo: Yup.string()
    .required()
    .min(10,'Enter a 10 digit mobile number')
    .max(10,'Enter a 10 digit mobile number')
    .matches(/^[0-9]{10}$/,'Enter a 10 digit mobile number')
    .label("PhoneNumber"),

  WholesalerId: Yup.string()
    .required()
    .matches(/^[A-Z]{3}[0-9]{3}$/,'Wholesaled Id should be of type ABC123')
    .label("WholesalerId"),

  LOCId: Yup.string()
    .required()
    .matches(/^[A-Z]{2}[0-9]{6}$/,'LOC Id should be of type AB123456')
    .label("LOCId"),
});