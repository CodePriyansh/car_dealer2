// components/LoginForm/index.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import styles from "../SignUp/styles.module.css";
import Button from "@/components/Common/Button";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone Number is required"),
});

export default function LoginForm() {
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Replace with your login API endpoint
      const response = await axios.post("YOUR_API_ENDPOINT", values);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:max-w-[584px] max-w-full bg-white">
      <div className="w-full">
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className={styles.field_wrapper}>
                <label className={styles.label_Style}>Phone Number</label>
                <Field
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  className={styles.field_style}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
              >
                <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">get otp</Button>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
