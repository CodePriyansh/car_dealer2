import React, { useEffect, useRef, useState } from "react";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import axios from "axios"; // Assuming axios is being used for API calls
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

interface Step2Props {
  stepsData: any;
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const carImages = [
  {
    src: Images.frontSide,
    alt: "Front Image",
    label: "Add Front Image",
    name: "front_image",
    type: "file",
  },
  {
    src: Images.frontLeft,
    alt: "Front Left Image",
    label: "Add Front Left Cover",
    name: "front_left_cover",
    type: "file",
  },
  {
    src: Images.leftSide,
    alt: "Left Side Image",
    label: "Add Left Side Image",
    name: "left_side_image",
    type: "file",
  },
  {
    src: Images.backLeft,
    alt: "Back Left Image",
    label: "Add Back Left Cover",
    name: "back_left_cover",
    type: "file",
  },
  {
    src: Images.backSide,
    alt: "Back Image",
    label: "Add Back Image",
    name: "back_image",
    type: "file",
  },
  {
    src: Images.backRight,
    alt: "Back Right Image",
    label: "Add Back Right Corner",
    name: "back_right_corner",
    type: "file",
  },
  {
    src: Images.rightSide,
    alt: "Right Side Image",
    label: "Add Right Side Image",
    name: "right_side_image",
    type: "file",
  },
  {
    src: Images.frontRight,
    alt: "Front Right Image",
    label: "Add Right Front Cover",
    name: "right_front_cover",
    type: "file",
  },
];

const Step2: React.FC<Step2Props> = ({ stepsData, setShowActiveStep }) => {
  const [interiorImagesPreview, setInteriorImagesPreview] = useState<
    Array<string>
  >([]);
  useEffect(() => {
    return () => {
      // Clean up object URLs to prevent memory leaks
      interiorImagesPreview.forEach((previewUrl) =>
        URL.revokeObjectURL(previewUrl)
      );
    };
  }, [interiorImagesPreview]);

  const router = useRouter();
  const cookies = new Cookies();

  const [fileNames, setFileNames] = useState(
    carImages.reduce((acc, image) => {
      acc[image.name] = "";
      return acc;
    }, {})
  );

  const validationSchema = Yup.object().shape(
    carImages.reduce((acc, field) => {
      acc[field.name] = Yup.mixed().required(`${field.label} is required`);
      return acc;
    }, {})
  );

  const initialValues = carImages.reduce((acc, field) => {
    acc[field.name] = null;
    return acc;
  }, {});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values, "values");
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      Object.keys(stepsData).forEach((key) => {
        formData.append(key, stepsData[key]);
      });

      try {
        const url = "/api/dealers/signup";
        const payload = formData;
        console.log(payload, "Pay");

        console.log(cookies.get("token"));
        let token = cookies.get("token");
        const response = await instance.post("/api/cars/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setShowActiveStep((prevStep) => prevStep + 1);
          toast.success(response.data.message);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      // Assuming the next step is to show a success message or move to the next step
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fileInputRefs = useRef(
    carImages.map(() => React.createRef<HTMLInputElement>())
  );
  const interiorImagesRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (setFieldValue, image, event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      if (image.name === "interior_images") {
        const fileList = Array.from(files);
        setFieldValue(image.name, fileList);
        setFileNames((prevState) => ({
          ...prevState,
          [image.name]: fileList.map((file) => file.name).join(", "),
        }));

        // Generate preview URLs for each selected file
        const filePreviews = fileList.map((file) => URL.createObjectURL(file));
        setInteriorImagesPreview(filePreviews);
      } else {
        setFieldValue(image.name, files[0]);
        setFileNames((prevState) => ({
          ...prevState,
          [image.name]: files[0].name,
        }));
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="w-full">
            {/* Basic Details */}
            <div className={styles.basic_detail_heading}>
              <p className={styles.sub_heading}>Images</p>
              <p className={styles.line}></p>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-6 my-4">
              {carImages.map((image, index) => (
                <div
                  key={index}
                  className={signupStyles.dotted_box}
                  onClick={() => fileInputRefs.current[index].current?.click()}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className="w-16 h-16"
                  />
                  <Button otherStyles="mt-[50px]">
                    <Image
                      src={Images.plus}
                      alt="plus"
                      width={20}
                      height={20}
                    />
                    {image.label}
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    name={image.name}
                    ref={fileInputRefs.current[index]}
                    onChange={(event) =>
                      handleFileChange(setFieldValue, image, event)
                    }
                  />
                  {fileNames[image.name] && (
                    <p className="text-sm mt-2">{fileNames[image.name]}</p>
                  )}
                  <ErrorMessage
                    name={image.name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Interior Images */}
            {/* Interior Images */}
            <div className="flex flex-row w-full">
              <div className="w-1/3">
                <div className={styles.basic_detail_heading}>
                  <p className={styles.sub_heading}>Interior Images</p>
                  <p className={styles.line}></p>
                </div>
                <div
                  className={`${signupStyles.dotted_box} w-full`}
                  onClick={() => interiorImagesRef.current?.click()}
                >
                  <Image
                    src={Images.uploadImg}
                    alt="img"
                    className="w-8 h-8 mx-auto"
                  />
                  <Button otherStyles="mt-[50px]">
                    <Image
                      src={Images.plus}
                      alt="plus"
                      width={20}
                      height={20}
                    />
                    Add Images
                  </Button>
                  <input
                    type="file"
                    multiple={true}
                    className="hidden"
                    name="interior_images"
                    ref={interiorImagesRef}
                    onChange={(event) =>
                      handleFileChange(
                        setFieldValue,
                        { name: "interior_images" },
                        event
                      )
                    }
                  />
                  <ErrorMessage
                    name="interior_images"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="w-2/3 grid grid-cols-3 gap-2 ml-4 mt-10">
                {interiorImagesPreview.map((previewUrl, index) => (
                  <div key={index} className="mt-2">
                    <img
                      src={previewUrl}
                      alt={`Preview ${index}`}
                      className="w-20 h-20"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Video */}
            <div className="w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Video</p>
                <p className={styles.line}></p>
              </div>
              <div
                className={`${signupStyles.dotted_box}`}
                onClick={() => videoRef.current?.click()}
              >
                <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                <Button otherStyles="mt-[50px]">
                  <Image src={Images.plus} alt="plus" width={20} height={20} />
                  Add Video
                </Button>
                <input
                  type="file"
                  className="hidden"
                  ref={videoRef}
                  name="video"
                  onChange={(event) =>
                    handleFileChange(setFieldValue, { name: "video" }, event)
                  }
                />
                {fileNames["video"] && (
                  <p className="text-sm mt-2">{fileNames["video"]}</p>
                )}
                <ErrorMessage
                  name="video"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mx-auto w-full"
              disabled={isSubmitting}
            >
              <Button otherStyles={styles.next_btn}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2;
