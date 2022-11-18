import { useFormik } from "formik";
import Link from "next/link";
import ErrorMsg from "./error-msg";
import { registerSchema } from "./validation-schema";
import { useRouter } from "next/router";
import axios from "axios";

async function register(
  username,
  email,
  password,
  passwordCheck,
  gender,
  height,
  weight
) {
  const options = {
    method: "POST",
    url: "http://141.164.51.245:8000/user/",

    data: {
      username,
      email,
      password,
      passwordCheck,
      gender,
      height,
      weight,
    },
  };
  // console.log(options);
  try {
    const response = await axios(options);
    // console.log(response);
    // return response.data;
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const RegisterForm = () => {
  const router = useRouter();
  // contact form
  const handleOnSubmit = async (values, { resetForm }) => {
    // alert(`${values.name + "\n" + values.email + "\n" + values.password}`);
    const res = await register(
      values.name,
      values.email,
      values.password,
      values.passwordCheck,
      values.gender,
      values.height,
      values.weight
    );

    if (res?.msg == "success") {
      router.push("/login");
    }

    // resetForm();
  };
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        gender: "",
        height: "",
        weight: "",
      },
      validationSchema: registerSchema,
      onSubmit: handleOnSubmit,
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Username <span>**</span>
        </label>
        <input
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Username"
          type="text"
        />
        {touched.name && <ErrorMsg error={errors.name} />}

        <label htmlFor="email-id">
          Email Address <span>**</span>
        </label>
        <input
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email address..."
          type="email"
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

        <label htmlFor="pass-check">
          Password <span>**</span>
        </label>
        <input
          id="pass-check"
          name="passwordCheck"
          value={values.passwordCheck}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="repeat password..."
        />
        {touched.passwordCheck && <ErrorMsg error={errors.password} />}

        <label htmlFor="gender">
          Gender <span>**</span>
        </label>
        <input
          id="gender"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Gender"
          type="text"
        />
        {touched.gender && <ErrorMsg error={errors.gender} />}

        <label htmlFor="height">
          Height <span>**</span>
        </label>
        <input
          id="height"
          value={values.height}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter height"
          type="text"
        />
        {touched.height && <ErrorMsg error={errors.height} />}

        <label htmlFor="weight">
          Weight <span>**</span>
        </label>
        <input
          id="weight"
          value={values.weight}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter weight"
          type="text"
        />
        {touched.weight && <ErrorMsg error={errors.weight} />}

        <div className="mt-10"></div>
        <button className="os-btn w-100" type="submit">
          Register Now
        </button>
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/login">
          <a className="os-btn os-btn-black w-100">login Now</a>
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
