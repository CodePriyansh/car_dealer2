"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button/index";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import instance from "@/network/axios";
import { setLocalStorage } from "@/constants/constants";
import Cookies from "universal-cookie";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Header from "../Common/Header";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  telephoneNumber: yup.string().optional(),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  shopAddress: yup.string().required("Shop Address is required"),
  // profileImage: yup.mixed().required("Profile Image is required"),
  shopImage: yup.mixed().required("Shop Image is required"),
});

export default function DealerProfileSection() {
  const cookies = new Cookies();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dealer, setDealer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const formData = new FormData();
  const formikRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState({
    shopImage: dealer?.shopImage || null,
  });
  useEffect(() => {
    const id = cookies.get("id");
    console.log(cookies.get("id"));
    const fetchDealer = async () => {
      try {
        console.log(cookies);
        const response = await instance.get(`/api/dealers/${id}`);
        console.log(response.data.data);
        console.log(response.data.data);
        console.log(Object.values(response.data.data));
        setDealer(response.data.data);
        setImagePreviews({ shopImage: response.data.data.shopImage });
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details");
      }
    };

    fetchDealer();
  }, []);

  const initialValues = {
    name: dealer?.name || "",
    phoneNumber: dealer?.phoneNumber || "",
    telephoneNumber: dealer?.telephoneNumber || "",
    email: dealer?.email || "",
    city: dealer?.city || "",
    state: dealer?.state || "",
    shopAddress: dealer?.shopAddress || "",
    profileImage: dealer?.profileImage || null,
    shopImage: dealer?.shopImage || null,
  };
  console.log(initialValues, "Initial values");

  const handleImageChange = (event, setFieldValue, fieldName) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.type.includes("image")) {
        setFieldValue(fieldName, file);
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
    setImagePreviews((prev) => ({ ...prev, [fieldName]: null }));
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("wlken");
    console.log(values);
    setLoading(true);
    for (const key in values) {
      formData.append(key, values[key]);
    }
    console.log(profileImageFile,"profileImageFile")
    try {
      const response = await instance.patch(`/api/dealers/update/${dealer?._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status >= 200  && response.status <400) {
        setLocalStorage("user", JSON.stringify(response.data.data));
        toast.success("profile updated")
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleProfileChange = (event, field) => {
    const file = event.currentTarget.files[0];
    console.log(file,"file")
    if (file) {
      if (file.type.includes("image")) {
        setProfileImageFile(file)
        formData.append("profileImage", file)
        const previewUrl = URL.createObjectURL(file);
        setImagePreviews((prev) => ({ ...prev, [field]: previewUrl }));
        if (formikRef.current) {
          formikRef.current.setFieldValue("profileImage", file);
        }
      } else {
        toast.error("Only image files are allowed.");
      }
    }
 
  };
  const shopImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <Toaster/>
      <div className=" md:px-40 2xl:px-60 4xl:px-60 md:py-10 font-rajdhani">
        <div className="bg-[#FFFFFF]">
          <div
            className="hidden  relative mx-auto md:p-8 2xl:px-10 2xl:py-6 3xl:p-12 3xl:py-8 h-[200px] md:h-[300px] md:flex flex-col z-0  border-b border-border_light"
            style={{
              backgroundImage: `url(${Images.editProfileBG.src})`,
              backgroundSize: "contain",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hidden md:flex bg-primary w-20 h-20  justify-center items-center rounded-full">
            <div
              className="relative w-full h-full bg-primary rounded-full flex justify-center items-center"
              onClick={() => profileImageInputRef.current?.click()}
            >
              
                <>
                  <img
                    src={imagePreviews?.profileImage || dealer?.profileImage ||  Images.userProfile}
                    alt="Profile"
                    className={
                      dealer?.profileImage
                        ? "rounded-full w-full h-full"
                        : "p-2 w-10 h-10"
                    }
                  />
                  <Image
                    src={Images.camera}
                    alt="Profile"
                    width={24}
                    height={24}
                    className="absolute p-2 w-10 h-10 top-6 right-[-25%]"
                  />
                </>
              <input
                type="file"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => handleProfileChange(event, "profileImage")}
                accept="image/*"
                disabled={!editMode}
              />
            </div>
            </div>

            {/* <Image
              src={Images.editIconTransparent}
              alt="profle"
              width={24}
              height={24}
              className="absolute top-8 right-20"
            /> */}
            <div className=" hidden md:flex text-xl font-bold text-para mt-4">
              Austin Robertson
            </div>
            <div className="hidden md:grid mt-6 grid-cols-12 md:grid-cols-8 gap-4 text-center">
              <div>
                <p className={styles.dealerStatsValues}>500</p>
                <p className={styles.dealerStatsTitle}>Total Vehicles</p>
              </div>
              <div>
                <p className={styles.dealerStatsValues}>240</p>
                <p className={styles.dealerStatsTitle}>Sold</p>
              </div>
              <div>
                <p className={styles.dealerStatsValues}>260</p>
                <p className={styles.dealerStatsTitle}>Available</p>
              </div>
              <div>
                <p className={styles.dealerStatsValues}>4.5/5</p>
                <p className={styles.dealerStatsTitle}>Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero */}
        <div className="md:hidden">
          <div
            className="relative mx-auto h-72  flex flex-col justify-center items-center z-0 md:border-none border-b-2 border-border_light"
            style={{
              backgroundImage: `url(${Images.editProfileBgMobile.src})`,
              backgroundSize: "contain",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* BACk */}
            <div
              className="flex absolute left-6 top-4 gap-2 items-center cursor-pointer"
              onClick={() => router.back()}
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

            <div className="flex absolute right-6 top-4 gap-2 items-center cursor-pointer">
              <Image
                src={Images.editIconMobile}
                alt="profle"
                width={24}
                height={24}
                onClick={() => setEditMode(true)}
              />
            </div>
            <Image src={Images.editProfileBanner} alt="banner" />
          </div>

          <div className="relative z-0 mt-[-30px] w-full flex justify-center items-center rounded-full">
            <div
              className="relative w-16 h-16 bg-primary rounded-full flex justify-center items-center"
              onClick={() => profileImageInputRef.current?.click()}
            >
              
                <>
                  <img
                    src={imagePreviews?.profileImage ||   dealer?.profileImage ||  Images.userProfile}
                    alt="Profile"
                    className={
                      dealer?.profileImage
                        ? "rounded-full w-full h-full"
                        : "p-2 w-10 h-10"
                    }
                  />
                  <Image
                    src={Images.camera}
                    alt="Profile"
                    width={24}
                    height={24}
                    className="absolute p-2 w-10 h-10 top-6 right-[-25%]"
                  />
                </>
              <input
                type="file"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => handleProfileChange(event, "profileImage")}
                accept="image/*"
                disabled={!editMode}
              />
            </div>
          </div>

          {/* <Image
              src={Images.editIconTransparent}
              alt="profle"
              width={24}
              height={24}
              className="absolute top-8 right-20"
            /> */}
          <div className="text-2xl font-bold text-para mt-4 text-center">
            Austin Robertson
          </div>
          <div className="mt-6 grid grid-cols-4 px-2 text-center ">
            <div>
              <p className={styles.dealerStatsValues}>500</p>
              <p className={styles.dealerStatsTitle}>Total Vehicles</p>
            </div>
            <div>
              <p className={styles.dealerStatsValues}>240</p>
              <p className={styles.dealerStatsTitle}>Sold</p>
            </div>
            <div>
              <p className={styles.dealerStatsValues}>260</p>
              <p className={styles.dealerStatsTitle}>Available</p>
            </div>
            <div>
              <p className={styles.dealerStatsValues}>4.5/5</p>
              <p className={styles.dealerStatsTitle}>Rating</p>
            </div>
          </div>
        </div>

        <div className={`${styles.form_wrapper} px-4 py-6`}>
          <div className="w-full text-left mb-6 flex flex-row justify-between md:justify-normal gap-10">
            <h2 className="md:text-3xl text-xl font-bold text-primary">
              Personal Details
            </h2>
            <Image
              src={Images.editIconMobile}
              alt="profle"
              width={24}
              height={24}
              onClick={() => setEditMode(true)}
            />
          </div>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={schema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="w-full flex flex-col gap-6">
                  <div className="grid grid-cols-2 md:gap-6 gap-4">
                    {/* <div className="flex flex-col gap-6 w-full md:w-1/2"> */}
                      <div className={`${styles.field_wrapper} col-span-2 md:col-span-1`}>
                        <label className={styles.label_Style}>Name</label>
                        <Field
                          name="name"
                          placeholder="Enter Your Name"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>

                       
                      <div className={`${styles.field_wrapper} col-span-1`}>
                        <label className={styles.label_Style}>
                          Mobile Number
                        </label>
                        <Field
                          name="phoneNumber"
                          placeholder="Enter Mobile Number"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>

                      <div className={`${styles.field_wrapper} col-span-1`}>
                        <label className={styles.label_Style}>
                          Telephone Number
                        </label>
                        <Field
                          name="telephoneNumber"
                          placeholder="Enter Telephone Number"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="telephoneNumber"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>

                    {/* </div> */}

                    {/* <div className="flex flex-col gap-6 w-full md:w-1/2"> */}
                      <div className={`${styles.field_wrapper} col-span-2 md:col-span-1`}>
                        <label className={styles.label_Style}>Email</label>
                        <Field
                          name="email"
                          placeholder="Enter Email Address"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>

                      <div className={`${styles.field_wrapper} col-span-1`}>
                        <label className={styles.label_Style}>City</label>
                        <Field
                          name="city"
                          placeholder="Enter City"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="city"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>

                      <div className={`${styles.field_wrapper} col-span-1`}>
                        <label className={styles.label_Style}>State</label>
                        <Field
                          name="state"
                          placeholder="Enter State"
                          className={`${styles.field_style} ${
                            editMode
                              ? "border-primary"
                              : "border-primaryLight !text-[#A59E9E]"
                          }`}
                          disabled={!editMode}
                        />
                        <ErrorMessage
                          name="state"
                          component="p"
                          className={styles.error_msg}
                        />
                      </div>
                    {/* </div> */}
                  </div>

                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>Shop Address</label>
                    <Field
                      name="shopAddress"
                      placeholder="Enter Shop Address"
                      className={`${styles.field_style} ${
                        editMode
                          ? "border-primary"
                          : "border-primaryLight !text-[#A59E9E]"
                      }  !w-full `}
                      disabled={!editMode}
                    />
                    <ErrorMessage
                      name="shopAddress"
                      component="p"
                      className={styles.error_msg}
                    />
                  </div>

                  {/* Add shop image */}
                  <div
                    className=" w-full"
                    onClick={() => shopImageInputRef.current?.click()}
                  >
                    <label className={styles.label_Style}>Add Shop Image</label>
                    <div className={styles.dotted_box}>
                      {imagePreviews.shopImage ? (
                        <div className={styles.img_preview}>
                          <Image
                            src={imagePreviews.shopImage}
                            alt="Shop Image"
                            className="w-full h-full object-cover rounded"
                            width={500}
                            height={500}
                          />

                          { editMode &&
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
}
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
                        disabled={!editMode}
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue, "shopImage")
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

                  {editMode && (
                    <div className="w-full flex justify-center mt-4">
                      <button
                        type="submit"
                        className="w-full mx-auto my-2"
                        disabled={isSubmitting}
                      >
                        <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">
                          {isSubmitting ? "Updating" : "Update"}
                        </Button>
                      </button>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
