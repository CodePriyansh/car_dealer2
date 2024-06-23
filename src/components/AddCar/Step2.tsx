import React, { useRef, useState } from "react";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import axios from "axios"; // Assuming axios is being used for API calls

interface Step2Props {
  stepsData: any;
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const carImages = [
  { src: Images.frontSide, alt: 'Front Image', label: 'Add Front Image', name: 'front_image', type: 'file' },
  { src: Images.frontLeft, alt: 'Front Left Image', label: 'Add Front Left Cover', name: 'front_left_cover', type: 'file' },
  { src: Images.leftSide, alt: 'Left Side Image', label: 'Add Left Side Image', name: 'left_side_image', type: 'file' },
  { src: Images.backLeft, alt: 'Back Left Image', label: 'Add Back Left Cover', name: 'back_left_cover', type: 'file' },
  { src: Images.backSide, alt: 'Back Image', label: 'Add Back Image', name: 'back_image', type: 'file' },
  { src: Images.backRight, alt: 'Back Right Image', label: 'Add Back Right Corner', name: 'back_right_corner', type: 'file' },
  { src: Images.rightSide, alt: 'Right Side Image', label: 'Add Right Side Image', name: 'right_side_image', type: 'file' },
  { src: Images.frontRight, alt: 'Front Right Image', label: 'Add Right Front Cover', name: 'right_front_cover', type: 'file' },
];

const Step2: React.FC<Step2Props> = ({ stepsData, setShowActiveStep }) => {
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
      console.log(values,"values");
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      Object.keys(stepsData).forEach(key => {
        formData.append(key, stepsData[key]);
      });

      // Example API call to add the car
      const response = await axios.post('/api/add-car', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('API Response:', response.data);
      // Assuming the next step is to show a success message or move to the next step
      setShowActiveStep(prevStep => prevStep + 1);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const fileInputRefs = useRef(carImages.map(() => React.createRef<HTMLInputElement>()));
  const interiorImagesRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  
  const handleFileChange = (setFieldValue, image, event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      setFieldValue(image.name, files[0]);
      setFileNames(prevState => ({
        ...prevState,
        [image.name]: files[0].name,
      }));
    }
  };

  return (
    <div>
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
                  <Image src={image.src} alt={image.alt} className="w-16 h-16" />
                  <Button otherStyles="mt-[50px]">
                    <Image src={Images.plus} alt="plus" width={20} height={20} />
                    {image.label}
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    name={image.name}
                    ref={fileInputRefs.current[index]}
                    onChange={(event) => handleFileChange(setFieldValue, image, event)}
                  />
                  {fileNames[image.name] && <p className="text-sm mt-2">{fileNames[image.name]}</p>}
                  <ErrorMessage name={image.name} component="div" className="text-red-500 text-sm" />
                </div>
              ))}
            </div>

            {/* Interior Images */}
            <div className="w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Interior Images</p>
                <p className={styles.line}></p>
              </div>
              <div className={`${signupStyles.dotted_box} sm:!w-1/4`} onClick={() => interiorImagesRef.current?.click()}>
                <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                <Button otherStyles="mt-[50px]">
                  <Image src={Images.plus} alt="plus" width={20} height={20} />
                  Add Images
                </Button>
                <Field
                  type="file"
                  className="hidden"
                  name="interior_images"
                  ref={interiorImagesRef}
                  onChange={(event) => handleFileChange(setFieldValue, { name: 'interior_images' }, event)}
                />
                {fileNames['interior_images'] && <p className="text-sm mt-2">{fileNames['interior_images']}</p>}
                <ErrorMessage name="interior_images" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Video */}
            <div className="w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Video</p>
                <p className={styles.line}></p>
              </div>
              <div className={`${signupStyles.dotted_box}`}>
                <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                <Button otherStyles="mt-[50px]">
                  <Image src={Images.plus} alt="plus" width={20} height={20} />
                  Add Video
                </Button>
                <Field
                  type="file"
                  className="hidden"
                  name="video"
                  ref={videoRef}

                  onChange={(event) => handleFileChange(setFieldValue, { name: 'video' }, event)}
                />
                {fileNames['video'] && <p className="text-sm mt-2">{fileNames['video']}</p>}
                <ErrorMessage name="video" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="mx-auto w-full" disabled={isSubmitting}>
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
