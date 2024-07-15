"use client";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button/index";
import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "../Otp";
import { ToastContainer, toast } from "react-toastify";
import { sendOtp } from "@/services/firebase/firebaseAuthService";
import instance from "@/network/axios";
import { setLocalStorage } from "@/constants/constants";
import Cookies from "universal-cookie";
import login from "../../assets/responsive-login.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ClipSpinner from "../Common/Spinner";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  telephoneNumber: yup.string().optional(),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  shopAddress: yup.string().required("Shop Address is required"),
  coverImage: yup.mixed().required("Cover Image is required"),
  profileImage: yup.mixed().required("Profile Image is required"),
  shopImage: yup.mixed().required("Shop Image is required"),
});

export default function SignupForm() {
  const cookies = new Cookies();
  const [heading, setHeading] = useState("Signup Account");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [backBtnStatus, setBackBtnStatus] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [id, setId] = useState("");
  const searchParams = useSearchParams();
  const [savedFormData, setSavedFormData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({
    coverImage: null,
    profileImage: null,
    shopImage: null,
  });
  useEffect(() => {
    const mobileNumber = searchParams.get("mobileNumber") || "";
    const id = searchParams.get("id") || "";
    setMobileNumber(mobileNumber);
    setId(id);
  }, [searchParams]);
  const initialValues = savedFormData || {
    name: "",
    phoneNumber: searchParams.get("mobileNumber") || "",
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

  const handleImageChange = (event, setFieldValue, fieldName) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.type.includes("image")) {
        setFieldValue(fieldName, file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreviews((prev) => ({ ...prev, [fieldName]: previewUrl }));
      } else {
        toast.error("Only image files are allowed.");
      }
    }
  };

  const handleRemoveImage = (setFieldValue, fieldName, inputRef) => {
    setFieldValue(fieldName, null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // Remove preview
    setImagePreviews((prev) => ({ ...prev, [fieldName]: null }));
  };

  const onSubmit = async (
    values: {
      [x: string]: string | Blob;
      mobileNumber: SetStateAction<string>;
    },
    { setSubmitting }: any
  ) => {
    console.log(values, "--------------------");
    setBackBtnStatus(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("firebaseUserId", id);
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
    console.log([...formData.entries()], "signup form data");
    setFormData(formData);

    if (
      searchParams.get("mobileNumber") &&
      searchParams.get("mobileNumber") == values.phoneNumber
    ) {
      try {
        const url = "/api/dealers/signup";
        const payload = formData;
        console.log(payload, "Pay");

        const response = await instance.post(url, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          cookies.set("token", response.data.data.token, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          setLocalStorage("token", JSON.stringify(response.data.data.token))
          setLocalStorage("user", JSON.stringify(response.data.data));
          // toast.success(response.data.message);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      console.log(values, "wefnwfewwe");
      sendOtp(`+91${values.phoneNumber}`)
        .then(() => {
          console.log("OTP sent successfully");
          setSavedFormData(values);
          setMobileNumber(values.phoneNumber);
          setOtpSend(true);
          setSubmitting(false);
          setBackBtnStatus(true);
          setHeading("OTP Verification");

          // toast.success("OTP sent successfully!");
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
          setLoading(false);
          setSubmitting(false);
          setOtpSend(false);
          toast.error("Failed to send OTP. Please try again.");
        });
    }
  };

  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const shopImageInputRef = useRef<HTMLInputElement | null>(null);

  console.log(coverImageInputRef, shopImageInputRef);

  return (
    <div className={`flex flex-col justify-center items-center w-full`}>
      {/* Form details */}
      {/* <ToastContainer /> */}

      <div className={`${styles.form_wrapper}`}>
        <div
          className={` ${styles.scrollbar} ${
            otpSend && backBtnStatus && "flex flex-col !justify-start mt-8"
          }`}
        >
          <div className="w-full">
            {otpSend && backBtnStatus && (
              <div
                className="md:absolute md:left-16 left-0 flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setBackBtnStatus(false);
                  setHeading("Signup Account");
                }}
              >
                <Image
                  src={Images.backArrow}
                  alt="back-arrow"
                  width={32}
                  height={32}
                  className="md:w-8 md:h-8 w-6 h-6"
                />
                <p className="text-secondary text-base font-rajdhani uppercase font-medium">
                  Back
                </p>
              </div>
            )}
            {/* Top headings */}
            <Image
              src={Images.myCar}
              alt="logo"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
            />
            <p className={styles.subheading}>My Car</p>
            <p className={styles.heading}>{heading}</p>
          </div>

          {otpSend && backBtnStatus ? (
            <>
              <OtpVerification
                mobileNumber={mobileNumber}
                formData={formData}
                setBackBtnStatus={setBackBtnStatus}
                setHeading={setHeading}
              />
              <div
                className="w-full h-[50vh] flex lg:hidden absolute bottom-0 z-10"
                style={{
                  backgroundImage: `url(${login.src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "bottom",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="m-1">
                  <div>
                    <div className="w-full md:w-fit md:mx-auto flex md:flex-row flex-col gap-6">
                      <div className="flex full flex-col md:gap-6 gap-6 md:w-[280px] w-full ">
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
                            className={styles.error_msg}
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
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                          <ErrorMessage
                            name="telephoneNumber"
                            component="p"
                            className={styles.error_msg}
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
                            className={styles.error_msg}
                          />
                        </div>
                      </div>

                      <div className="flex w-full md:w-[280px] flex-col md:gap-6 gap-3">
                        <div className={styles.field_wrapper}>
                          <label className={styles.label_Style}>
                            Mobile Number
                          </label>
                          <Field
                            name="phoneNumber"
                            placeholder="Enter Mobile Number"
                            className={styles.field_style}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="p"
                            className={styles.error_msg}
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
                            className={styles.error_msg}
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
                            className={styles.error_msg}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex md:gap-6 gap-3 my-6 flex-col md:mx-auto !max-w-[584px] md:min-w-[560px]">
                      {/* shop Address */}
                      <div className={styles.field_wrapper}>
                        <label className={styles.label_Style}>
                          Shop Address
                        </label>
                        <Field
                          name="shopAddress"
                          placeholder="Enter Shop Address"
                          className={`${styles.field_style}  !w-full `}
                        />
                        <ErrorMessage
                          name="shopAddress"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>
                      {/* Cover image */}
                      <div>
                        <label className={styles.label_Style}>
                          Add Cover Image
                        </label>
                        <div
                          className={styles.dotted_box}
                          onClick={() => coverImageInputRef.current?.click()}
                        >
                          {imagePreviews.coverImage ? (
                            <div className={styles.img_preview}>
                              <Image
                                src={imagePreviews.coverImage}
                                alt="Cover Image"
                                className="w-full h-full object-cover rounded"
                                width={200}
                                height={200}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(
                                    setFieldValue,
                                    "coverImage",
                                    coverImageInputRef
                                  )
                                }
                                className="absolute top-2 right-2 bg-white rounded-full p-1"
                              >
                                <AiOutlineCloseCircle size={20} />
                              </button>
                            </div>
                          ) : (
                            <>
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
                                Add Cover Image
                              </Button>
                            </>
                          )}
                          <input
                            type="file"
                            ref={coverImageInputRef}
                            onChange={(event) =>
                              handleImageChange(
                                event,
                                setFieldValue,
                                "coverImage"
                              )
                            }
                            style={{ display: "none" }}
                            name="coverImage"
                          />
                        </div>
                        <ErrorMessage
                          name="coverImage"
                          component="p"
                          className={styles.error_msg}
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
                            {imagePreviews.profileImage ? (
                              <div className={styles.img_preview}>
                                <Image
                                  src={imagePreviews.profileImage}
                                  alt="Profile Image"
                                  className="w-full h-full object-cover rounded"
                                  width={200}
                                  height={200}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(
                                      setFieldValue,
                                      "profileImage",
                                      profileImageInputRef
                                    );
                                  }}
                                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                                >
                                  <AiOutlineCloseCircle size={20} />
                                </button>
                              </div>
                            ) : (
                              <>
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
                              </>
                            )}
                            <input
                              type="file"
                              ref={profileImageInputRef}
                              style={{ display: "none" }}
                              onChange={(event) =>
                                handleImageChange(
                                  event,
                                  setFieldValue,
                                  "profileImage"
                                )
                              }
                              name="profileImage"
                            />
                          </div>
                          <ErrorMessage
                            name="profileImage"
                            component="p"
                            className={styles.error_msg}
                          />
                        </div>

                        {/* Add shop image */}
                        <div
                          className="sm:w-1/2 w-full"
                          onClick={() => shopImageInputRef.current?.click()}
                        >
                          <label className={styles.label_Style}>
                            Add Shop Image
                          </label>
                          <div className={styles.dotted_box}>
                            {imagePreviews.shopImage ? (
                              <div className={styles.img_preview}>
                                <Image
                                  src={imagePreviews.shopImage}
                                  alt="Shop Image"
                                  className="w-full h-full object-cover rounded"
                                  width={200}
                                  height={200}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(
                                      setFieldValue,
                                      "shopImage",
                                      shopImageInputRef
                                    );
                                  }}
                                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                                >
                                  <AiOutlineCloseCircle size={20} />
                                </button>
                              </div>
                            ) : (
                              <>
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
                              </>
                            )}
                            <input
                              type="file"
                              ref={shopImageInputRef}
                              onChange={(event) =>
                                handleImageChange(
                                  event,
                                  setFieldValue,
                                  "shopImage"
                                )
                              }
                              accept="image/*"
                              style={{ display: "none" }}
                              name="shopImage"
                            />
                          </div>
                          <ErrorMessage
                            name="shopImage"
                            component="p"
                            className={styles.error_msg}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full mx-auto my-2"
                        disabled={isSubmitting}
                      >
                        <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">
                        {isSubmitting ? <ClipSpinner loading={isSubmitting}/> : mobileNumber ? "Sign Up" : "Get OTP"}
                        </Button>
                      </button>
                      {/* Bottom info */}
                      <div className="flex items-center flex-col mt-6 ">
                        <p className={styles.info_text}>Have an Account?</p>
                        <p
                          className={`${styles.info_text} underline cursor-pointer`}
                          onClick={handleLoginClick}
                        >
                          Login
                        </p>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
      <ToastContainer/>
    </div>
  );
}
