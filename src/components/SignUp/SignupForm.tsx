// import React from 'react'

// export default function SignupForm() {
//   return (
//     <div>SignupForm</div>
//   )
// }
// //

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image"; // Import Image from next/image
import Button from "../Button/page";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  telephoneNumber: yup.string().required("Telephone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  shopAddress: yup.string().required("Shop Address is required"),
  coverImage: yup.mixed().required("Cover Image is required"),
  profileImage: yup.mixed().required("Profile Image is required"),
  shopImage: yup.mixed().required("Shop Image is required"),
});

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    name: "",
    mobileNumber: "",
    telephoneNumber: "",
    email: "",
    city: "",
    state: "",
    shopAddress: "",
    coverImage: null,
    profileImage: null,
    shopImage: null,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const formData = new FormData();
    for (const key in values) {
      if (
        key === "coverImage" ||
        key === "profileImage" ||
        key === "shopImage"
      ) {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Dealer registered successfully!");
    } catch (error) {
      setMessage("Failed to register dealer.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white">
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="w-full flex  gap-8">
                <div className="flex full flex-col gap-6">
                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>name</label>
                    <Field
                      name="name"
                      placeholder="Enter Your Name"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>
                      Telephone Number
                    </label>

                    <Field
                      name="telephoneNumber"
                      placeholder="Enter Telephone Number"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="telephoneNumber"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>city</label>

                    <Field
                      name="city"
                      placeholder="Enter City"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex w-1/2 flex-col gap-4">
                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>Mobile Number</label>

                    <Field
                      name="mobileNumber"
                      placeholder="Enter Mobile Number"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="mobileNumber"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>email</label>

                    <Field
                      name="email"
                      placeholder="Enter Email Address"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>State</label>
                    <Field
                      name="state"
                      placeholder="Enter State"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="state"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.field_wrapper}>
                <label className={styles.label_Style}>shop address</label>
                <Field
                  name="shopAddress"
                  placeholder="Enter Shop Address"
                  className={styles.field_style}
                />
                <ErrorMessage
                  name="shopAddress"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={(event) => {
                    setFieldValue("coverImage", event.currentTarget.files[0]);
                  }}
                  className={styles.field_style}
                />
                <ErrorMessage
                  name="coverImage"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={(event) => {
                    setFieldValue("profileImage", event.currentTarget.files[0]);
                  }}
                  className={styles.field_style}
                />

                <ErrorMessage
                  name="profileImage"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block">Shop Image</label>
                <input
                  type="file"
                  name="shopImage"
                  onChange={(event) => {
                    setFieldValue("shopImage", event.currentTarget.files[0]);
                  }}
                  className={styles.field_style}
                />
                <ErrorMessage
                  name="shopImage"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
{/* 
              <button
                type="submit"
                className="w-full p-2 bg-orange-500 text-white rounded"
                disabled={isSubmitting}
              >
                {loading ? "Loading..." : "Get OTP"}
              </button> */}
              <Button text="Get OTP" className="w-1/2"/>
            </Form>
          )}
        </Formik>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
