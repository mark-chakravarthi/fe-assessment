import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .min(1)
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("FirstName"),
  lastName: Yup.string()
    .required()
    .min(1)
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("LastName"),
  emailId: Yup.string()
    .required()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid Email Id"
    )
    .label("EmailId"),
  phoneNo: Yup.string()
    .required()
    .min(10, "Enter a 10 digit mobile number")
    .max(10, "Enter a 10 digit mobile number")
    .matches(/^[0-9]{10}$/, "Enter a 10 digit mobile number")
    .label("PhoneNumber"),

  wholesalerId: Yup.string()
    .required()
    .matches(/^[A-Z]{3}[0-9]{3}$/, "Wholesaled Id should be of type ABC123")
    .label("WholesalerId"),

  locId: Yup.string()
    .required()
    .matches(/^[A-Z]{2}[0-9]{6}$/, "LOC Id should be of type AB123456")
    .label("LOCId"),
});
