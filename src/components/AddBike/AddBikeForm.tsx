import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import CommonReactSelect from "../Common/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../AddCar/styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AddBikeFields } from "@/constants/formFields";
import instance from "@/network/axios";
import Cookies from "universal-cookie";
import { FaCross } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ClipSpinner from "../Common/Spinner";
interface AddBikeProps {
  bikeData: any;
}

const fields = AddBikeFields;

const AddBikeForm: React.FC<AddBikeProps> = ({ bikeData }) => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const [scratchAndDentImagePreview, setScratchAndDentImagePreview] = useState<
    string | null
  >(bikeData?.scratchAndDentDetails?.image || null);
  const [bikeImagesPreview, setBikeImagesPreview] = useState<Array<string>>(
    bikeData?.bikeImages || []
  );
  const [videoPreview, setVideoPreview] = useState(bikeData?.video);
  console.log(bikeData, "oeihehrh");
  const cookies = new Cookies();
  const formatYearOfManufacture = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };
  const router = useRouter();
  const formatRegistrationDate = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const booleanToYesNo = (value: any) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return value; // Return the original value if it's not a boolean
  };
  // console.log(bikeData?.images,"scratchAndDentImagePreview")
  const initialValues = {
    description: bikeData?.description || "",
    scratchAndDentImage: bikeData?.scratchAndDentDetails?.image || "",
    scratchAndDentDescription:
      bikeData?.scratchAndDentDetails?.description || "",
    bikeImages: bikeData?.bikeImages || [],
    video: bikeData?.video || null,
    insuranceValidity: formatRegistrationDate(bikeData?.insuranceValidity),
    ...fields.reduce((acc, field) => {
      if (field.name === "yearOfManufacture") {
        acc[field.name] = formatYearOfManufacture(bikeData?.[field.name]);
      } else if (field.name === "registrationDate") {
        acc[field.name] = formatRegistrationDate(bikeData?.[field.name]);
      } else if (
        field.name === "powerWindow" ||
        field.name === "insurance" ||
        field.name === "airConditioner"
      ) {
        acc[field.name] = booleanToYesNo(bikeData?.[field.name]);
      } else {
        acc[field.name] = bikeData?.[field.name] || "";
      }
      return acc;
    }, {}),
  };
  const bikeImagesRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const validationSchema = Yup.object().shape({
    ...fields.reduce((acc, field) => {
      acc[field.name] = Yup.string().required(
        `${field.placeholder} is required`
      );
      if (field.name === "average") {
        acc[field.name] = Yup.string()
          .matches(/^\d{1,2}$/, {
            message: "Average should be exactly 1 or 2 digits",
            excludeEmptyString: true,
          })
          .required(`${field.placeholder} is required`)
          .max(2, "Average should be exactly 1 or 2 digits");
      }
      if (field.name === "registrationDate") {
        acc[field.name] = Yup.date()
          .required("Registration Date is required")
          .test(
            "is-after-manufacture",
            "Registration date must be after manufacture date",
            function (value) {
              const yearOfManufacture = this.parent.yearOfManufacture;
              if (!yearOfManufacture || !value) return true;
              const [year, month] = yearOfManufacture.split("-");
              const manufactureDate = new Date(
                parseInt(year),
                parseInt(month) - 1
              );
              return value >= manufactureDate;
            }
          );
      }
      if (field.name === "numberPlate") {
        acc[field.name] = Yup.string()
          .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, {
            message: "Please enter a correct Number Plate (e.g., MP09VP8908)",
            excludeEmptyString: true,
          })
          .required("Number Plate is required");
      }
      return acc;
    }, {}),
    insuranceValidity: Yup.string().when("insurance", {
      is: (insurance: string) => insurance === "Yes",
      then: () =>
        Yup.string().required("Enter Insurance Validity Date is required"),
    }),
  });

  useEffect(() => {
    // Clean up object URLs to prevent memory leaks
    return () => {
      bikeImagesPreview.forEach((url) => URL.revokeObjectURL(url));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [bikeImagesPreview, videoPreview]);
  const handleSubmit = async (values: any, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Combine values with any other data you need to send
      const allData = { ...values };
      console.log(values, "values");
      Object.keys(allData).forEach((key) => {
        if (key === "bikeImages") {
          if (Array.isArray(allData[key])) {
            allData[key].forEach((file, index) => {
              if (file instanceof File) {
                formData.append(`bikeImages`, file);
              } else if (typeof file === "string") {
                formData.append(`bikeImages`, file);
              }
            });
          }
        } else if (allData[key] instanceof File) {
          formData.append(key, allData[key]);
        } else if (typeof allData[key] === "object" && allData[key] !== null) {
          formData.append(key, JSON.stringify(allData[key]));
        } else {
          formData.append(key, allData[key]);
        }
      });

      console.log(formData);

      let token = cookies.get("token");
      let response;

      if (bikeData) {
        // Edit existing bike
        response = await instance.put(
          `/api/bikes/update/${bikeData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Add new bike
        response = await instance.post("/api/bikes/addbike", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200) {
        toast.success(response.data.message);
        // router.push("/");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: any;
  }>({});

  const handleChange = (name: string, selectedOption: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedOption,
    });
  };

  const checkFilledFields = (values: any) => {
    console.log(values, "fil vae");
    const filledFields = Object.values(values).filter((value) => value).length;
    console.log(filledFields, "filledFields");
  };

  const handleRemoveImage = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("scratchAndDentImage", null);
    setScratchAndDentImagePreview(null);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
    }
  };

  const handleFileChange = (setFieldValue, fieldName, event,values:any = undefined) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      if (fieldName === "video") {
        const supportedVideoTypes = [
          "video/mp4",
          "video/avi",
          "video/mkv",
          "video/mov",
          "video/wmv",
          "video/flv",
          "video/webm",
          "video/mpeg",
          "video/3gpp",
          "video/ogg",
          "video/quicktime",
          "video/x-msvideo",
          "video/x-ms-wmv",
        ];

        if (!supportedVideoTypes.includes(files[0].type)) {
          toast.error(
            "Unsupported video format. Please upload a supported format."
          );
          return;
        }

        setFieldValue(fieldName, files[0]);
        const previewUrl = URL.createObjectURL(files[0]);
        setVideoPreview(previewUrl);
      } else if (fieldName === "bikeImages") {
        const fileList = Array.from(files);
        const filePreviews = fileList.map((file) => URL.createObjectURL(file));
        setBikeImagesPreview((prev) => [...prev, ...filePreviews]);
        setFieldValue(fieldName, [...values, ...fileList]);
      }
    }
  };

  const handleDeleteBikeImage = (index, setFieldValue, e, images) => {
    e.preventDefault();
    e.stopPropagation();
  
    setBikeImagesPreview((prev) => prev.filter((_, i) => i !== index));
  
    // Update the form values
    const updatedImages = Array.isArray(images) 
      ? images.filter((_, i) => i !== index) 
      : [];
    
    setFieldValue("bikeImages", updatedImages);
  
    if (bikeImagesRef.current) {
      bikeImagesRef.current.value = "";
    }
  };
  

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      if (file.type.includes("image")) {
        setFieldValue("scratchAndDentImage", file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setScratchAndDentImagePreview(previewUrl);
      } else {
        toast.error("Only image files are allowed.");
      }
    }
  };

  useEffect(() => {
    console.log("useEffect");
    console.log(bikeData ? bikeData : "ifh");

    // if (bikeData) {
    //   console.log("wef");
    //   if (bikeData.scratchAndDentDetails?.image) {
    //     setScratchAndDentImagePreview(bikeData?.scratchAndDentDetails?.image);
    //     console.log("scratchAndDentImage", scratchAndDentImagePreview);
    //   }
    // }
    // // Clean up object URL to prevent memory leaks
    // if (scratchAndDentImagePreview) {
    //   console.log("ekf")
    //   URL.revokeObjectURL(scratchAndDentImagePreview);
    // }
  }, []);
  return (
    <div>
      {/* <ToastContainer /> */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => {
          return (
            <Form className="w-full sm:px-6">
              {/* Basic Details */}
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Basic Details</p>
                <p className={`${styles.line} h-[1px] w-full`}></p>
              </div>
              <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full sm:gap-6 sm:my-4 gap-2 my-2">
                {fields.map((field, index) => (
                  <div className={styles.field_wrapper} key={index}>
                    <label className={styles.label_Style}>
                      {field.name === "mileage"
                        ? field.placeholder + " (kmpl)"
                        : field.name == "cubicCapacity"
                        ? field.placeholder + "(CC)"
                        : field.placeholder}
                    </label>
                    {field.type === "select" ? (
                      <CommonReactSelect
                        options={field.options}
                        // defaultValue={() => {
                        //   const value = booleanToYesNo(
                        //     ([||
                        //     (bikeData && bikeData[field.name])
                        //   );
                        //   return { value: value, label: value };
                        // }}

                        defaultValue={
                          bikeData
                            ? () => {
                                const value = booleanToYesNo(
                                  values[field.name]
                                );
                                return { value: value, label: value };
                              }
                            : undefined
                        }
                        placeholder={field.placeholder}
                        selectedOption={selectedOptions[field.name]}
                        setSelectedOption={(option) => {
                          handleChange(field.name, option);
                          console.log(field.name, option);
                          setFieldValue(field.name, option ? option.value : "");
                          checkFilledFields({
                            ...values,
                            [field.name]: option?.value?.value
                              ? option?.value?.value
                              : "",
                          });
                        }}
                        className={styles.field_style}
                        isCreatable={["company", "modelName", "color"].includes(
                          field.name
                        )}
                      />
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={
                          field.placeholder == "Enter Cubic Capacity"
                            ? "Enter CC "
                            : field.placeholder
                        }
                        className={styles.field_style}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          // Handle input length restriction for average field
                          if (field.name === "mileage") {
                            const value = event.target.value;
                            console.log(value);
                            if (value.length < 99) {
                              event.target.value = value.slice(0, 2);
                              setFieldValue("mileage", event.target.value); // Limit to first two digits
                            }
                          } else {
                            setFieldValue(field.name, event.target.value); // Limit to first two digits
                          }
                          checkFilledFields({
                            ...values,
                            [field.name]: event.target.value,
                          });
                        }}
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                          if (field.name === "numberPlate") {
                            const value = event.target.value
                              .replace(/\s+/g, "")
                              .toUpperCase();
                            setFieldValue(field.name, value);
                            checkFilledFields({
                              ...values,
                              [field.name]: value,
                            });
                          }
                        }}
                      />
                    )}
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="error_msg"
                    />
                  </div>
                ))}
                {values.insurance === "Yes" && (
                  <div className={styles.field_wrapper}>
                    <label className={styles.label_Style}>
                      Enter Insurance Validity Date
                    </label>
                    <Field
                      type="date"
                      name="insuranceValidity"
                      placeholder="Enter Insurance Validity Date"
                      className={styles.field_style}
                    />
                    <ErrorMessage
                      name="insuranceValidity"
                      component="div"
                      className="error_msg"
                    />
                  </div>
                )}
              </div>

              {/* Bike Images */}
              <div className="flex flex-col w-full">
                <div className={styles.basic_detail_heading}>
                  <p className={styles.sub_heading}>Bike Images</p>
                  <p className={styles.line}></p>
                </div>
                <div className="flex w-full md:flex-row flex-col items-center">
                  <div
                    className={`${styles.dotted_box_step2} w-full md:!max-w-[224px] md:min-w-[200px] !max-h-[224px] h-[200px]`}
                    onClick={() => bikeImagesRef.current?.click()}
                  >
                    <Image
                      src={Images.uploadImg}
                      alt="img"
                      className="w-8 h-8 mx-auto"
                    />
                    <Button otherStyles={styles.btn_step2}>
                      <Image
                        src={Images.plus}
                        alt="plus"
                        width={20}
                        height={20}
                        className={styles.step2_btn_img}
                      />
                      Add Images
                    </Button>
                    <input
                      type="file"
                      multiple={true}
                      className="hidden"
                      name="bikeImages"
                      accept="image/*"
                      ref={bikeImagesRef}
                      onChange={(event) =>
                        handleFileChange(setFieldValue, "bikeImages", event, values.bikeImages)
                      }
                    />
                  </div>

                  <div className="flex max-w-full flex-col w-fit overflow-x-scroll ml-4 custome-scrollbar scroll-smooth">
                    <div className="w-full flex gap-2">
                      {bikeImagesPreview.map((previewUrl, index) => (
                        <div
                          key={index}
                          className="mt-2 max-w-[224px] max-h-[224px] h-[224px] min-w-[224px] flex"
                        >
                          <div style={{ position: "relative" }}>
                            <Image
                              src={previewUrl}
                              width={224}
                              height={150}
                              alt="bike image"
                              className="!h-full !max-h-[224px]"
                            />
                            <button
                              className="text-black bg-white rounded-full text-[24px] font-semibold absolute top-0 right-2 rotate-45"
                              onClick={(e) =>
                                handleDeleteBikeImage(index, setFieldValue, e, values.bikeImages)
                              }
                            >
                              <FaCross />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <ErrorMessage
                  name="bikeImages"
                  component="div"
                  className="error_msg"
                />
              </div>

              {/* Video */}
              <div className="w-full">
                <div className={styles.basic_detail_heading}>
                  <p className={styles.sub_heading}>Video</p>
                  <p className={styles.line}></p>
                </div>
                <div className={`${styles.dotted_box_step2} relative`}>
                  {videoPreview ? (
                    <>
                      <video
                        src={videoPreview}
                        controls
                        className="w-full h-auto max-h-64 object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoPreview(null);
                          setFieldValue("video", null);
                          if (videoRef.current) {
                            videoRef.current.value = "";
                          }
                        }}
                        className="absolute top-2 right-2 p-1 bg-primary text-white rounded-full"
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    <div onClick={() => videoRef.current?.click()}>
                      <Image
                        src={Images.uploadImg}
                        alt="img"
                        className="w-8 h-8"
                      />
                      <Button otherStyles={styles.btn_step2}>
                        <Image
                          src={Images.plus}
                          alt="plus"
                          width={20}
                          height={20}
                          className={styles.step2_btn_img}
                        />
                        Add Video
                      </Button>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    ref={videoRef}
                    name="video"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={(event) =>
                      handleFileChange(setFieldValue, "video", event)
                    }
                  />
                  <ErrorMessage
                    name="video"
                    component="div"
                    className="error_msg"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex sm:flex-row gap flex-col sm:gap-x-10">
                <div className="basis-1/3 sm:flex-row">
                  {/* Scratch & Dent Details */}
                  <div className={styles.basic_detail_heading}>
                    <p className={styles.sub_heading}>Scratch & Dent Details</p>
                    <p className={styles.special_heading}>(If any) Optional</p>
                    <p className={styles.line}></p>
                  </div>
                  <div className="my-4">
                    <div className={styles.field_wrapper}>
                      <label className={styles.label_Style}>
                        Scratch & Dent Details
                      </label>
                      <Field
                        as="textarea"
                        name="scratchAndDentDescription"
                        rows={6}
                        placeholder="Enter Scratch & Dent Details"
                        className={styles.description_and_dent_style}
                        onChange={(e) =>
                          setFieldValue(
                            "scratchAndDentDescription",
                            e.target.value
                          )
                        }
                      />
                      <ErrorMessage
                        name="scratchAndDentDescription"
                        component="div"
                        className="error_msg"
                      />
                    </div>
                  </div>

                  {/* Scratch & Dent Image (Optional) */}
                  {/* Scratch & Dent Image (Optional) */}
                  <div className="sm:w-1/2 sm:h-1/3 w-full">
                    <div className={styles.basic_detail_heading}>
                      <p className={styles.sub_heading}>Scratch & Dent Image</p>
                      <p className={styles.special_heading}>
                        (If any) Optional
                      </p>
                    </div>

                    <div
                      className={styles.dotted_box}
                      onClick={() => profileImageInputRef.current?.click()}
                    >
                      {scratchAndDentImagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={scratchAndDentImagePreview}
                            alt="Scratch & Dent Image"
                            className="w-full h-full object-cover rounded"
                            width={200}
                            height={200}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(setFieldValue);
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
                            Add Image
                          </Button>
                        </>
                      )}
                      <input
                        type="file"
                        ref={profileImageInputRef}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                        name="scratchAndDentImage"
                      />
                      <ErrorMessage
                        name="scratchAndDentImage"
                        component="p"
                        className="error_msg"
                      />
                    </div>
                  </div>
                </div>
                <div className="basis-1/2">
                  <div className={styles.basic_detail_heading}>
                    <p className={styles.sub_heading}>Description</p>
                    <p className={styles.special_heading}>
                      [you can write in 300 words] Optional
                    </p>
                    <p className={styles.line}></p>
                  </div>
                  <div className="my-4">
                    <div className={styles.field_wrapper}>
                      <label className={styles.label_Style}>
                        Other Description related to Bike
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={6}
                        placeholder="Enter Description"
                        className={styles.description_and_dent_style}
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error_msg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              {/* <div><ClipSpinner loading/></div> */}
              <button
                type="submit"
                className="mx-auto w-full"
                disabled={isSubmitting}
              >
                <Button otherStyles={styles.next_btn}>
                  {isSubmitting ? "Submitting..." : "Next"}
                </Button>
              </button>
            </Form>
          );
        }}
      </Formik>
      <Toaster />
    </div>
  );
};

export default AddBikeForm;
