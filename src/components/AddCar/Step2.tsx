import React, { useEffect, useRef, useState } from "react";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import instance from "@/network/axios";
import Cookies from "universal-cookie";
// import "react-toastify/dist/ReactToastify.css";
import { FaCross } from "react-icons/fa";

interface Step2Props {
  stepsData: any;
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;
  carData: any;
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

const Step2: React.FC<Step2Props> = ({
  stepsData,
  setShowActiveStep,
  carData,
}) => {
  const [interiorImagesPreview, setInteriorImagesPreview] = useState<
    Array<string>
  >(carData?.interiorImages || []);

  // const [interiorImagesPreview, setInteriorImagesPreview] = useState(
  //   carData?.interiorImages
  //     ? carData.interiorImages.map((image) => window.URL.createObjectURL(image))
  //     : []
  // );

  console.log("interiorImagesPreview", interiorImagesPreview);

  useEffect(() => {
    console.log(carData, "step 2 selected");
    if (!carData) {
      // Clean up object URLs to prevent memory leaks
      // interiorImagesPreview.forEach((previewUrl) =>
      //   URL.revokeObjectURL(previewUrl)
      // );
    }
  }, [interiorImagesPreview]);

  const router = useRouter();
  const cookies = new Cookies();

  const [fileNames, setFileNames] = useState(
    carImages.reduce((acc, image) => {
      acc[image.name] = "";
      return acc;
    }, {})
  );

  const [imagePreviews, setImagePreviews] = useState(
    carImages.reduce((acc, image) => {
      acc[image.name] = carData?.images[image.name] || null;
      return acc;
    }, {})
  );

  const [videoPreview, setVideoPreview] = useState(carData?.video);

  const validationSchema = Yup.object().shape({
    ...carImages.reduce((acc, field) => {
      acc[field.name] = Yup.mixed().required(`${field.label} is required`);
      return acc;
    }, {}),
    interior_images: Yup.array()
      .min(1, "At least one interior image is required")
      .required("Interior images are required"),
    video: Yup.mixed()
      .required("Video is required")
      .test("fileType", "Unsupported File Format", (value) => {
        if (typeof value === "string") {
          // If it's a string (URL), assume it's valid
          return true;
        } else if (value instanceof File) {
          // If it's a File object, check its type
          return [
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
          ].includes(value.type);
        }
        // If it's neither a string nor a File, it's invalid
        return false;
      }),
  });

  const initialValues = {
    ...carImages.reduce((acc, field) => {
      acc[field.name] = carData?.images[field.name];
      return acc;
    }, {}),
    interior_images: carData?.interiorImages || [],
    video: carData?.video || null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values, "values");
    try {
      const formData = new FormData();
      
      // Combine values with stepsData
      const allData = { ...values, ...stepsData };
  
      Object.keys(allData).forEach((key) => {
        if (key === "interior_images") {
          if (Array.isArray(allData[key])) {
            allData[key].forEach((file, index) => {
              // Check if it's a File object or a string (URL)
              if (file instanceof File) {
                formData.append(`interior_images`, file);
              } else if (typeof file === 'string') {
                formData.append(`interior_images`, file);
              }
            });
          }
        } else if (allData[key] instanceof File) {
          formData.append(key, allData[key]);
        } else if (typeof allData[key] === 'object' && allData[key] !== null) {
          formData.append(key, JSON.stringify(allData[key]));
        } else {
          formData.append(key, allData[key]);
        }
      });
  
      console.log(formData);
  
      let token = cookies.get("token");
      let response;
  
      if (carData) {
        // Edit existing car
        response = await instance.put(`/api/cars//update-car/${carData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add new car
        response = await instance.post("/api/cars/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      if (response.status === 200) {
        setShowActiveStep((prevStep) => prevStep + 1);
        toast.success(response.data.message);
        router.push("/");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  const fileInputRefs = useRef(
    carImages.map(() => React.createRef<HTMLInputElement>())
  );
  const interiorImagesRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  function extractUrl(inputString: string) {
    const urlPattern = /http:\/\/\S+/;
    const match = inputString.match(urlPattern);
    return match ? [match[0]] : [];
  }
  const handleFileChange = (setFieldValue, image, event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      if (image.name === "video") {
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
      } else {
        // Image format validation for all non-video files
        const supportedImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
          "image/webp",
          "image/avif",
          "image/heic",
          "image/heif",
          "image/tiff",
          "image/bmp",
        ];

        if (!supportedImageTypes.includes(files[0].type)) {
          toast.error(
            "Unsupported file format. Please upload an image (JPEG, PNG, GIF, WebP, or SVG)."
          );
          return;
        }
      }

      if (image.name === "interior_images") {
        const fileList = Array.from(files);
        // setFieldValue(image.name, fileList);
        setFileNames((prevState) => ({
          ...prevState,
          [image.name]: fileList.map((file) => file?.name).join(", "),
        }));

        // Generate preview URLs for each selected file
        const filePreviews = fileList.map((file) => URL.createObjectURL(file));
        console.log(extractUrl(filePreviews[0])[0], "000000000");
        setInteriorImagesPreview((prev) => [...prev, ...filePreviews]);
        setFieldValue(image.name, [...interiorImagesPreview, ...fileList.map((file) => file)]);
      }else if (image.name === "video") {
        setFieldValue(image.name, files[0]);
        setFileNames((prevState) => ({
          ...prevState,
          [image.name]: files[0].name,
        }));
  
        // Create and set video preview URL
        const previewUrl = URL.createObjectURL(files[0]);
        setVideoPreview(previewUrl);
      }
       else {
        setFieldValue(image.name, files[0]);
        setFileNames((prevState) => ({
          ...prevState,
          [image.name]: files[0].name,
        }));

        const previewUrl = URL.createObjectURL(files[0]);
        setImagePreviews((prevState) => ({
          ...prevState,
          [image.name]: previewUrl,
        }));
      }
    }
  };

  const handleRemoveImage = (setFieldValue, imageName, index) => {
    setFieldValue(imageName, null);
    setFileNames((prevState) => ({
      ...prevState,
      [imageName]: "",
    }));
    setImagePreviews((prevState) => ({
      ...prevState,
      [imageName]: null,
    }));

    // Reset the file input value
    if (fileInputRefs.current[index]?.current) {
      fileInputRefs.current[index].current.value = "";
    }
  };

  const handleDeleteInteriorImage = (index, setFieldValue) => {
    setInteriorImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setFieldValue((prev) => prev.filter((_, i) => i !== index));

    // Reset the file input value
    if (interiorImagesRef.current) {
      interiorImagesRef.current.value = "";
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="w-full">
            {/* Basic Details */}
            <div className={styles.basic_detail_heading}>
              <p className={styles.sub_heading}>Images</p>
              <p className={styles.line}></p>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full md:gap-6 gap-2 my-4">
              {carImages.map((image, index) => {
                return (
                  <div key={index} className={styles.dotted_box_step2}>
                    {imagePreviews[image.name] ? (
                      <div className="relative w-full h-full px-2 border rounded sm:max-h-[200px] max-h-[120px]">
                        <Image
                          src={imagePreviews[image.name]}
                          alt={image.alt}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImage(setFieldValue, image.name, index)
                          }
                          className="absolute top-0 right-0 p-1 bg-primary text-white rounded-full"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <>
                        <div
                          className="sm:w-20 sm:h-20 h-auto"
                          onClick={() =>
                            fileInputRefs.current[index].current?.click()
                          }
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            className="md:w-18 md:h-18 px-4 pt-2 md:!p-0 w-18 h-16"
                          />
                        </div>
                        <div
                          onClick={() =>
                            fileInputRefs.current[index].current?.click()
                          }
                        >
                          <Button otherStyles={styles.btn_step2}>
                            <Image
                              src={Images.plus}
                              alt="plus"
                              width={20}
                              height={20}
                              className={styles.step2_btn_img}
                            />
                            {image.label}
                          </Button>
                          <input
                            type="file"
                            className="hidden"
                            name={image.name}
                            accept="image/*"
                            ref={fileInputRefs.current[index]}
                            onChange={(event) =>
                              handleFileChange(setFieldValue, image, event)
                            }
                          />
                          {fileNames[image.name] && (
                            <p className="text-sm m-2">
                              {fileNames[image.name]}
                            </p>
                          )}
                          <ErrorMessage
                            name={image.name}
                            component="div"
                            className="error_msg"
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interior Images */}
            <div className="flex flex-col w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Interior Images</p>
                <p className={styles.line}></p>
              </div>
              <div className="flex w-full md:flex-row flex-col items-center">
                <div
                  className={`${styles.dotted_box_step2} w-full md:!max-w-[224px] md:min-w-[200px] !max-h-[224px] h-[200px]`}
                  onClick={() => interiorImagesRef.current?.click()}
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
                </div>

                <div className="flex max-w-full flex-col w-fit overflow-x-scroll ml-4 custome-scrollbar scroll-smooth">
                  <div className="w-full flex gap-2">
                    {interiorImagesPreview.map((previewUrl, index) => {
                      console.log("pppp", typeof previewUrl);
                      return (
                        <div
                          key={index}
                          className="mt-2 max-w-[224px] max-h-[224px] h-[224px] min-w-[224px] flex"
                        >
                          {/* <div
                            style={{
                              // backgroundImage: `url(${previewUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              width: "100%",
                              height: "100%",
                              backgroundImage: `url(${previewUrl})`,
                            }}
                            className="w-full h-full relative"
                          >
                            <button
                              className="text-black bg-white rounded-full text-[24px] font-semibold absolute top-0 right-2 rotate-45"
                              onClick={() =>
                                handleDeleteInteriorImage(index, setFieldValue)
                              }
                            >
                              <FaCross></FaCross>
                            </button>
                          </div> */}
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <Image
                              src={previewUrl}
                              width={224}
                              height={150}
                              alt="ghj"
                              className="!h-full !max-h-[224px]"
                            />
                            <button
                              className="text-black bg-white rounded-full text-[24px] font-semibold absolute top-0 right-2 rotate-45"
                              onClick={() =>
                                handleDeleteInteriorImage(index, setFieldValue)
                              }
                            >
                              <FaCross></FaCross>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <ErrorMessage
                name="interior_images"
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
            setFileNames((prevState) => ({
              ...prevState,
              video: "",
            }));
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
        <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
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
      className="error_msg"
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
      <ToastContainer />
    </div>
  );
};

export default Step2;
