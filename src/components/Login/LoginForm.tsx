import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../SignUp/styles.module.css";
import Button from "../Common/Button";
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

  const handleSubmit = (values:any, { setSubmitting }) => {
    console.log(values, "submitted values");
    // sendOtp('+91'+values.mobileNumber)
    //   .then((res) => {
    //     console.log(res, "OTP sent response");
    //     setOtpSend(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending OTP", error);
    //   })
    //   .finally(() => {
    //     setSubmitting(false);
    //   });
        setOtpSend(true);

  };

  return (
    <div>
      {otpSend ? (
        <OtpVerification />
      ) : (
        <Formik
          initialValues={{ mobileNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col">
                <label className={styles.label_Style}>Mobile Number</label>
                <Field
                  name="mobileNumber"
                  type="text"
                  className={`${styles.field_style} sm:!w-[430px] !w-full`}
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage name="mobileNumber">
                  {(msg) => <div className={styles.error_msg}>{msg}</div>}
                </ErrorMessage>
              </div>
              <button type="submit" className="w-full mx-auto mt-14" disabled={isSubmitting}>
                <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">
                  {isSubmitting ? "Sending..." : "Get OTP"}
                </Button>
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
