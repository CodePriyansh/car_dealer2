"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button/index";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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

  const handleLoginClick = () => {
    router.push("/login");
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values, "values");
    setLoading(true);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
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

  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const shopImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={`flex flex-col justify-center items-center`}>
      {/* Form details */}
      <div className={`${styles.form_wrapper}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className={` ${styles.scrollbar} `}>
              {/* Top headings */}
              <Image
                src={Images.myCar}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
              />
              <p className={styles.subheading}>My Car</p>
              <p className={styles.heading}>Signup Account</p>
              <div className="w-full flex sm:flex-row flex-col gap-8">
                <div className="flex full flex-col gap-6">
                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>Name</label>
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
                    <label className={styles.label_Style}>City</label>
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

                <div className="flex sm:w-1/2 w-full flex-col gap-4">
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
                    <label className={styles.label_Style}>Email</label>
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
                <label className={styles.label_Style}>Shop Address</label>
                <Field
                  name="shopAddress"
                  placeholder="Enter Shop Address"
                  className={`${styles.field_style} !max-w-[584px] !w-full`}
                />
                <ErrorMessage
                  name="shopAddress"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Cover image */}
              <div>
                <label className={styles.label_Style}>Add Cover Image</label>
                <div
                  className={styles.dotted_box}
                  onClick={() => coverImageInputRef.current?.click()}
                >
                  <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                  <Button otherStyles="mt-[50px]">
                    <Image
                      src={Images.plus}
                      alt="plus"
                      width={20}
                      height={20}
                    />
                    Add Cover Image
                  </Button>
                  <input
                    type="file"
                    ref={coverImageInputRef}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;
                      if (files && files.length > 0) {
                        setFieldValue("coverImage", files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                    name="coverImage"
                  />
                  {values.coverImage && (
                    <p className={styles.selected_file}>
                      {values.coverImage.name}
                    </p>
                  )}
                </div>
                <ErrorMessage
                  name="coverImage"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Profile image */}
              <div className="flex w-full sm:flex-row flex-col gap-6">
                <div
                  className="sm:w-1/2 w-full"
                  onClick={() => profileImageInputRef.current?.click()}
                >
                  <label className={styles.label_Style}>
                    Add Profile Image
                  </label>
                  <div className={styles.dotted_box}>
                    <Image
                      src={Images.uploadImg}
                      alt="img"
                      className="w-8 h-8"
                    />
                    <Button otherStyles="mt-[50px]">
                      <Image
                        src={Images.plus}
                        alt="plus"
                        width={20}
                        height={20}
                      />
                      Add Profile Image
                    </Button>
                    <input
                      type="file"
                      ref={profileImageInputRef}
                      style={{ display: "none" }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const files = event.currentTarget.files;
                        if (files && files.length > 0) {
                          setFieldValue("profileImage", files[0]);
                        }
                      }}
                      name="profileImage"
                    />
                    {values.profileImage && (
                      <p className={styles.selected_file}>
                        {values.profileImage.name}
                      </p>
                    )}
                  </div>
                  <ErrorMessage
                    name="profileImage"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Add shop image */}
                <div className="sm:w-1/2 w-full">
                  <label className={styles.label_Style}>Add Shop Image</label>
                  <div
                    className={styles.dotted_box}
                    onClick={() => shopImageInputRef.current?.click()}
                  >
                    <Image
                      src={Images.uploadImg}
                      alt="img"
                      className="w-8 h-8"
                    />
                    <Button otherStyles="mt-[50px]">
                      <Image
                        src={Images.plus}
                        alt="plus"
                        width={20}
                        height={20}
                      />
                      Add Shop Image
                    </Button>
                    <input
                      type="file"
                      ref={shopImageInputRef}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const files = event.currentTarget.files;
                        if (files && files.length > 0) {
                          setFieldValue("shopImage", files[0]);
                        }
                      }}
                      style={{ display: "none" }}
                      name="shopImage"
                    />
                    {values.shopImage && (
                      <p className={styles.selected_file}>
                        {values.shopImage.name}
                      </p>
                    )}
                  </div>
                  <ErrorMessage
                    name="shopImage"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mx-auto"
                disabled={isSubmitting}
              >
                <Button otherStyles="sm:w-[430px] w-full mx-auto">
                  Get OTP
                </Button>
              </button>
              {/* Bottom info */}
              <div className="flex items-center flex-col mt-6">
                <p className={styles.info_text}>Have an Account?</p>
                <p
                  className={`${styles.info_text} underline cursor-pointer`}
                  onClick={handleLoginClick}
                >
                  Login
                </p>
              </div>
            </Form>
          )}
        </Formik>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
