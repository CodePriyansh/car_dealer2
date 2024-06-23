import React, { useRef, useState } from "react";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import ReactSelect from "../Common/Select";
import CommonReactSelect from "../Common/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
interface Step2Props {
  stepsData: any;
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;

}
const fields = [
  {
    name: "registration Date",
    type: "date",
    placeholder: "Select Registration Date",
  },

  {
    name: "color",
    type: "select",
    placeholder: "Select Color",
    options: [
      { value: "Red", label: "Red" },
      { value: "Blue", label: "Blue" },
      { value: "Black", label: "Black" },
    ],
  },
  {
    name: "transmission",
    type: "select",
    placeholder: "Select Transmission",
    options: [
      { value: "Manual", label: "Manual" },
      { value: "Automatic", label: "Automatic" },
    ],
  },
  {
    name: "fuel Type",
    type: "select",
    placeholder: "Select Fuel Type",
    options: [
      { value: "Petrol", label: "Petrol" },
      { value: "Diesel", label: "Diesel" },
      { value: "Electric", label: "Electric" },
    ],
  },
  {
    name: "cubic Capacity",
    type: "number",
    placeholder: "Enter Cubic Capacity",
  },

  {
    name: "air Conditioner",
    type: "select",
    placeholder: "Select Air Conditioner",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    name: "power Window",
    type: "select",
    placeholder: "Select Power Window",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },

  {
    name: "insurance",
    type: "select",
    placeholder: "Select Insurance",
    options: [
      { value: "Comprehensive", label: "Comprehensive" },
      { value: "Third-Party", label: "Third-Party" },
    ],
  },
];

const validationSchema = Yup.object().shape(
  fields.reduce((acc, field) => {
    acc[field.name] = Yup.string().required(`${field.placeholder} is required`);
    return acc;
  }, {})
);
const Step2: React.FC<Step2Props> = ({ stepsData,setShowActiveStep }) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form data", values);
    // Example: Call API to submit data
    setSubmitting(false); // Make sure to setSubmitting(false) when done with API call
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const fielImageRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            {/* Basic Details */}
            <div className={styles.basic_detail_heading}>
              <p className={styles.sub_heading}>Images</p>
              <p className={styles.line}></p>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-6 my-4">
              {fields.map((field, index) => (
                <div
                  className={signupStyles.dotted_box}
                  onClick={() => fielImageRef.current?.click()}
                >
                  <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
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
                    // style={{ display: 'none' }}
                    className="hidden"
                    name="profileImage"
                    ref={fielImageRef}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;
                      if (files && files.length > 0) {
                        // setFieldValue("shopImage", files[0]);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="profileImage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Interior Images */}
            <div className=" w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Interior Images</p>
                <p className={styles.line}></p>
              </div>
              <div className={`${signupStyles.dotted_box} sm:!w-1/4`}>
                <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                <Button otherStyles="mt-[50px]">
                  <Image src={Images.plus} alt="plus" width={20} height={20} />
                  Add Profile Image
                </Button>
                <Field
                  type="file"
                  // style={{ display: 'none' }}
                  className="hidden"
                  name="profileImage"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    // form.setFieldValue('profileImage', file);
                  }}
                />
                <ErrorMessage
                  name="profileImage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* video */}
            <div className=" w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>video</p>
                <p className={styles.line}></p>
              </div>
              <div className={`${signupStyles.dotted_box}`}>
                <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
                <Button otherStyles="mt-[50px]">
                  <Image src={Images.plus} alt="plus" width={20} height={20} />
                  Add Profile Image
                </Button>
                <Field
                  type="file"
                  // style={{ display: 'none' }}
                  className="hidden"
                  name="profileImage"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    // form.setFieldValue('profileImage', file);
                  }}
                />
                <ErrorMessage
                  name="profileImage"
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
