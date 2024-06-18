import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../SignUp/styles.module.css";
import Button from "../Common/Button";
import { useRouter } from "next/navigation";
import { sendOtp } from "@/services/firebase/firebaseAuthService";
import OtpVerification from "../Otp";

// Validation schema using Yup
const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be digits only")
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number can't be more than 15 digits")
    .required("Mobile number is required"),
});

export default function LoginForm() {
  const [otpSend, setOtpSend] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "value");
    },
  });
  const handleSubmit = (values) => {
    console.log(values, "value");
    // sendOtp("829192797").then((res) => {
    //   console.log(res, "value");
    //   setOtpSend(true);
    // });
  };
  return (
    <div>
      {otpSend ? (
        <OtpVerification />
      ) : (
        <form>
          <div className="flex flex-col">
            <label className={styles.label_Style}>Mobile Number</label>
            <input
              name="mobileNumber"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
              className={`${styles.field_style} sm:!w-[430px] !w-full`}
              placeholder="pidiyanshu"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className={styles.error_msg}>
                {formik.errors.mobileNumber}
              </div>
            ) : null}
          </div>
          <button  className="w-full mx-auto mt-14" onClick={() => handleSubmit(formik.values)}>
            <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">
              Get OTP
            </Button>
          </button>
        </form>
      )}
    </div>
  );
}
