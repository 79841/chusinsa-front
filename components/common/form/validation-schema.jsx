import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
  passwordCheck: Yup.string().required().label("PasswordCheck"),
  gender: Yup.string().required().label("Gender"),
  height: Yup.string().required().label("Height"),
  weight: Yup.string().required().label("Weight"),
});

export const blogSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().min(10).label("Subject"),
  msg: Yup.string().required().min(20).label("Message"),
});
