import Link from "next/link";
import { useFormik } from "formik";

import ErrorMsg from "./error-msg";
import { loginSchema } from "./validation-schema";

import { useRouter } from "next/router";
import axios from "axios";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import jwtState from "../../../states/jwt";

async function login(email, password) {
  const options = {
    method: "POST",
    url: "/api/login",

    data: {
      email,
      password,
    },
  };

  try {
    const response = await axios(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const LoginForm = () => {
  const router = useRouter();
  const [jwt, setJwt] = useRecoilState(jwtState);
  // contact form
  const handleOnSubmit = async (values, { resetForm }) => {
    // alert(`${values.email + "\n" + values.password}`);
    const res = await login(values.email, values.password);
    document.cookie = `Authorization=${res.Authorization}`;
    setJwt(res.Authorization);
    router.push("/");
    // resetForm();
  };
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: handleOnSubmit,
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Email Address <span>**</span>
        </label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Email address..."
        />
        {touched.email && <ErrorMsg error={errors.email} />}
        <label htmlFor="pass">
          Password <span>**</span>
        </label>
        <input
          id="pass"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Enter password..."
        />
        {touched.password && <ErrorMsg error={errors.password} />}
        <div className="login-action mb-20 fix">
          <span className="log-rem f-left">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me!</label>
          </span>
          <span className="forgot-login f-right">
            <a href="#">Lost your password?</a>
          </span>
        </div>
        <button className="os-btn w-100" type="submit">
          Login Now
        </button>
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/register">
          <a className="os-btn os-btn-black w-100">Register Now</a>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
