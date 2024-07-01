import React, { useRef, useState } from "react";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import CommonReactSelect from "../Common/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";

interface Step1Props {
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsData: (data: any) => void;
}

const fields = [
  {
    name: "company",
    type: "select",
    placeholder: "Select Company",
    options: [
      { value: "Toyota", label: "Toyota" },
      { value: "Honda", label: "Honda" },
      { value: "Ford", label: "Ford" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Select Model",
    options: [
      { value: "Model 1", label: "Model 1" },
      { value: "Model 2", label: "Model 2" },
    ],
  },
  { name: "variant", type: "text", placeholder: "Enter Variant" },
  {
    name: "type",
    type: "select",
    placeholder: "Select Type",
    options: [
      { value: "SUV", label: "SUV" },
      { value: "Sedan", label: "Sedan" },
      { value: "Pickup", label: "Pickup" },
      { value: "Minivan", label: "Minivan" },
      { value: "Coupes", label: "Coupes" },
      { value: "Hatchbacks", label: "Hatchbacks" },
      { value: "Wagon", label: "Wagon" },
      { value: "Van", label: "Van" },
    ],
  },
  {
    name: "yearOfManufacture",
    type: "month",
    placeholder: "Select Year of Manufacture",
  },
  {
    name: "registrationDate",
    type: "date",
    placeholder: "Select Registration Date",
  },
  { name: "numberPlate", type: "text", placeholder: "Enter Number Plate" },
  { name: "price", type: "number", placeholder: "Enter Price" },
  {
    name: "color",
    type: "select",
    placeholder: "Select Color",
    options: [
      { value: "Red", label: "Red" },
      { value: "Blue", label: "Blue" } ,
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
      { value: "Paddle Shift", label: "Paddle Shift" },
    ],
  },
  {
    name: "fuelType",
    type: "select",
    placeholder: "Select Fuel Type",
    options: [
      { value: "Petrol", label: "Petrol" },
      { value: "Diesel", label: "Diesel" },
      { value: "Electric", label: "Electric" },
      { value: "CNG", label: "CNG" },
    ],
  },
  {
    name: "cubicCapacity",
    type: "number",
    placeholder: "Enter Cubic Capacity",
  },
  { name: "average", type: "number", placeholder: "Enter Average" },
  { name: "kmDriven", type: "number", placeholder: "Enter Kilometers Driven" },
  {
    name: "airConditioner",
    type: "select",
    placeholder: "Select Air Conditioner",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    name: "powerWindow",
    type: "select",
    placeholder: "Select Power Window",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    name: "ownerType",
    type: "select",
    placeholder: "Select Owner Type",
    options: [
      { value: "First Owner", label: "First Owner" },
      { value: "Second Owner", label: "Second Owner" },
      { value: "Third Owner", label: "Third Owner" },
    ],
  },
  {
    name: "insurance",
    type: "select",
    placeholder: "Select Insurance",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  // { name: "insuranceValidity", type: "date", placeholder: "Enter Insurance Validity Date" },

];


const Step1: React.FC<Step1Props> = ({ setShowActiveStep, setStepsData }) => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const initialValues = {
    dentDetails: "",
    description: "",
    scratchAndDentImage: null,
    ...fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    ...fields.reduce((acc, field) => {
      acc[field.name] = Yup.string().required(`${field.placeholder} is required`);
      return acc;
    }, {}),
    insuranceValidity: Yup.string().when("insurance", {
      is: (insurance: string) => insurance === "Yes",
      then: () => Yup.string().required("Enter Insurance Validity Date is required"),
    }),
  });
  const handleSubmit = (values: any, { setSubmitting }) => {
    console.log("Form data", values);
    setSubmitting(false);
    setShowActiveStep(2);
    setStepsData(values);
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

  return (
    <div>
      <ToastContainer />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
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
                    {field.placeholder}
                  </label>
                  {field.type === "select" ? (
                    <CommonReactSelect
                      options={field.options}
                      placeholder={field.placeholder}
                      selectedOption={selectedOptions[field.name]}
                      setSelectedOption={(option) => {
                        handleChange(field.name, option);
                        console.log(field.name, option)
                        setFieldValue(field.name, option ? option.value : "");
                      }}
                      className={styles.field_style}
                      isCreatable={['company', 'modelName', 'color'].includes(field.name)}
                    />
                  ) : (
                    <Field
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={styles.field_style}
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
                      name="scratchDetails"
                      rows={6}
                      placeholder="Enter Scratch & Dent Details"
                      className={styles.description_and_dent_style}
                      onChange={(e) =>
                        setFieldValue("dentDetails", e.target.value)
                      }
                    />
                    <ErrorMessage
                      name="scratchDetails"
                      component="div"
                      className="error_msg"
                    />
                  </div>
                </div>

                {/* Scratch & Dent Image (Optional) */}
                <div className="sm:w-1/2 sm:h-1/3 w-full">
                  <div className={styles.basic_detail_heading}>
                    <p className={styles.sub_heading}>Scratch & Dent Image</p>
                    <p className={styles.special_heading}>(If any) Optional</p>
                  </div>

                  <div
                    className={styles.dotted_box}
                    onClick={() => profileImageInputRef.current?.click()}
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
                          setFieldValue("scratchAndDentImage", files[0]);
                        }
                      }}
                      name="profileImage"
                    />
                    {/* Conditional rendering within Formik's child function */}
                    {values.profileImage && (
                      <p className={styles.selected_file}>
                        {values.profileImage.name}
                      </p>
                    )}
                    <ErrorMessage
                      name="profileImage"
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
                      Other Description related to car
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
            <div>
            </div>
            {/* Submit Button */}
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
        )}
      </Formik>
    </div>
  );
};

export default Step1;
