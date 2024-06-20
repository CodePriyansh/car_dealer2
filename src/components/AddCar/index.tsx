"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import signupStyles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";

const fields = [
  {
    name: "company",
    type: "select",
    placeholder: "Select Company",
    options: ["Toyota", "Honda", "Ford"],
  },
  {
    name: "model Name",
    type: "select",
    placeholder: "Select Model",
    options: ["Model 1", "Model 2"],
  },
  { name: "variant", type: "text", placeholder: "Enter Variant" },
  {
    name: "type",
    type: "select",
    placeholder: "Select Type",
    options: ["SUV", "Sedan", "Truck"],
  },
  {
    name: "year Of Manufacture",
    type: "date",
    placeholder: "Select Year of Manufacture",
  },
  {
    name: "registration Date",
    type: "date",
    placeholder: "Select Registration Date",
  },
  { name: "number Plate", type: "text", placeholder: "Enter Number Plate" },
  { name: "price", type: "number", placeholder: "Enter Price" },
  {
    name: "color",
    type: "select",
    placeholder: "Select Color",
    options: ["Red", "Blue", "Black"],
  },
  {
    name: "transmission",
    type: "select",
    placeholder: "Select Transmission",
    options: ["Manual", "Automatic"],
  },
  {
    name: "fuel Type",
    type: "select",
    placeholder: "Select Fuel Type",
    options: ["Petrol", "Diesel", "Electric"],
  },
  {
    name: "cubic Capacity",
    type: "number",
    placeholder: "Enter Cubic Capacity",
  },
  { name: "average", type: "number", placeholder: "Enter Average" },
  { name: "kmDriven", type: "number", placeholder: "Enter Kilometers Driven" },
  {
    name: "air Conditioner",
    type: "select",
    placeholder: "Select Air Conditioner",
    options: ["Yes", "No"],
  },
  {
    name: "power Window",
    type: "select",
    placeholder: "Select Power Window",
    options: ["Yes", "No"],
  },
  { name: "owner", type: "text", placeholder: "Enter Owner Name" },
  {
    name: "insurance",
    type: "select",
    placeholder: "Select Insurance",
    options: ["Comprehensive", "Third-Party"],
  },
];

const validationSchema = Yup.object().shape(
  fields.reduce((acc, field) => {
    acc[field.name] = Yup.string().required(`${field.placeholder} is required`);
    return acc;
  }, {})
);

const AddCarForm = () => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form data", values);
    // Example: Call API to submit data
    setSubmitting(false); // Make sure to setSubmitting(false) when done with API call
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add Car</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              {/* Basic Details */}
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Basic Details</p>
                <p className={styles.line}></p>
              </div>
              <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-6 my-4">
                {fields.map((field, index) => (
                  <div className={styles.field_wrapper} key={index}>
                    <label className={styles.label_Style}>
                      {field.name}
                    </label>
                    <Field
                      as={field.type === "select" ? "select" : "input"}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={styles.field_style}
                    >
                      {field.type === "select" ? (
                        <>
                          <option value="">{field.placeholder}</option>
                          {field.options?.map((option, idx) => (
                            <option value={option} key={idx}>
                              {option}
                            </option>
                          ))}
                        </>
                      ) : null}
                    </Field>
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
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
                    className="border border-primary rounded-[15px] max-!h-full !h-full px-4 py-2"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

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
                    className="border border-primary rounded-[15px] max-!h-full !h-full px-4 py-2"
                  />
                  <ErrorMessage
                    name="scratchDetails"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Scratch & Dent Image (Optional) */}
              <div className="sm:w-1/4 w-full">
              <div className={styles.basic_detail_heading}>
                <p className={styles.sub_heading}>Scratch & Dent Details</p>
                <p className={styles.special_heading}>(If any) Optional</p>
              </div>
                <div className={signupStyles.dotted_box}>
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
                  <ErrorMessage name="profileImage" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Submit Button */}

              <button type="submit" className="mx-auto w-full"  disabled={isSubmitting}>
              <Button
                otherStyles={styles.next_btn}
              >
                {isSubmitting ? "Submitting..." : "Next"}
              </Button>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCarForm;
