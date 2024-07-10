import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";
import CommonReactSelect from "../Common/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface Step1Props {
  setShowActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsData: (data: any) => void;
  carData: any;
}

const fields = [
  {
    name: "company",
    type: "select",
    placeholder: "Select Company",
    options: [
      { value: "Toyota", label: "Toyota" },
      { value: "Honda", label: "Honda" },
      { value: "Tata Motors", label: "Tata" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Maruti Suzuki", label: "Maruti Suzuki" },
      { value: "Hyundai", label: "Hyundai" },
      { value: "Skoda", label: "Skoda" },
      { value: "Kia", label: "Kia" },
      { value: "Ford", label: "Ford" },
      { value: "Volkswagen", label: "Volkswagen" },
    ],
  },
  {
    name: "modelName",
    type: "select",
    placeholder: "Select Model",
    options: [
      {
        name: "modelName",
        type: "select",
        placeholder: "Select Model",
        options: [
          // Toyota Models
          { value: "Fortuner", label: "Fortuner" },
          { value: "Innova Crysta", label: "Innova Crysta" },
          { value: "Glanza", label: "Glanza" },
          // Honda Models
          { value: "City", label: "City" },
          { value: "Amaze", label: "Amaze" },
          { value: "Jazz", label: "Jazz" },
          // Tata Motors Models
          { value: "Nexon", label: "Nexon" },
          { value: "Harrier", label: "Harrier" },
          { value: "Altroz", label: "Altroz" },
          // Mahindra Models
          { value: "Scorpio", label: "Scorpio" },
          { value: "Thar", label: "Thar" },
          { value: "XUV700", label: "XUV700" },
          // Maruti Suzuki Models
          { value: "Swift", label: "Swift" },
          { value: "Baleno", label: "Baleno" },
          { value: "Ertiga", label: "Ertiga" },
          // Hyundai Models
          { value: "Creta", label: "Creta" },
          { value: "Venue", label: "Venue" },
          { value: "i20", label: "i20" },
          // Skoda Models
          { value: "Rapid", label: "Rapid" },
          { value: "Kushaq", label: "Kushaq" },
          { value: "Octavia", label: "Octavia" },
          // Kia Models
          { value: "Seltos", label: "Seltos" },
          { value: "Sonet", label: "Sonet" },
          { value: "Carnival", label: "Carnival" },
          // Ford Models
          { value: "EcoSport", label: "EcoSport" },
          { value: "Endeavour", label: "Endeavour" },
          { value: "Figo", label: "Figo" },
          // Volkswagen Models
          { value: "Polo", label: "Polo" },
          { value: "Vento", label: "Vento" },
          { value: "Tiguan", label: "Tiguan" },
        ],
      },
    ],
  },
  { name: "variant", type: "text", placeholder: "Enter Variant" },
  {
    name: "type",
    type: "select",
    placeholder: "Select Type",
    options: [
      { value: "Compact SUV", label: "Compact SUV" },
      { value: "Coupe", label: "Coupe" },
      { value: "Crossover Suv", label: "Crossover Suv" },
      { value: "Hatchback", label: "Hatchback" },
      { value: "Pickup", label: "Pickup" },
      { value: "Sedan", label: "Sedan" },
      { value: "SUV", label: "SUV" },
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
  { name: "mileage", type: "number", placeholder: "Enter Mileage" },
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

const Step1: React.FC<Step1Props> = ({
  setShowActiveStep,
  setStepsData,
  carData,
}) => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const [scratchAndDentImagePreview, setScratchAndDentImagePreview] = useState<
    string | null
  >(carData?.scratchAndDentDetails?.image || null);
  console.log(carData, "oeihehrh");

  const formatYearOfManufacture = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

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
  // console.log(carData?.images,"scratchAndDentImagePreview")
  const initialValues = carData
    ? {
        description: carData?.description || "",
        scratchAndDentImage:
          carData?.scratchAndDentDetails?.scratchAndDentImage || "",
        scratchAndDentDescription:
          carData?.scratchAndDentDetails?.description || "",
        insuranceValidity: formatRegistrationDate(carData["insuranceValidity"]),
        ...fields.reduce((acc, field) => {
          if (field.name === "yearOfManufacture") {
            acc[field.name] = formatYearOfManufacture(carData[field.name]);
          } else if (field.name === "registrationDate") {
            acc[field.name] = formatRegistrationDate(carData[field.name]);
          } else if (
            field.name === "powerWindow" ||
            field.name === "insurance" ||
            field.name === "airConditioner"
          ) {
            acc[field.name] = booleanToYesNo(carData[field.name]);
          } else {
            acc[field.name] = carData[field.name] || "";
          }
          return acc;
        }, {}),
      }
    : {
        scratchAndDentDescription: "",
        description: "",
        scratchAndDentImage: null,
        ...fields.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {}),
      };

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
      if(field.name === "registrationDate"){
        acc[field.name] = Yup.date()
        .required('Registration Date is required')
        .test('is-after-manufacture', 'Registration date must be after manufacture date', function(value) {
          const yearOfManufacture = this.parent.yearOfManufacture;
          if (!yearOfManufacture || !value) return true;
          const [year, month] = yearOfManufacture.split('-');
          const manufactureDate = new Date(parseInt(year), parseInt(month) - 1);
          return value >= manufactureDate;
        })
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
  const handleSubmit = (values: any, { setSubmitting }) => {
    console.log("Form data", values);
    setStepsData(values);
    setShowActiveStep(2);
    setSubmitting(false);
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

  const handleRemoveImage = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("scratchAndDentImage", null);
    setScratchAndDentImagePreview(null);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
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
    console.log(carData ? carData : "ifh");

    // if (carData) {
    //   console.log("wef");
    //   if (carData.scratchAndDentDetails?.image) {
    //     setScratchAndDentImagePreview(carData?.scratchAndDentDetails?.image);
    //     console.log("scratchAndDentImage", scratchAndDentImagePreview);
    //   }
    // }
    // // Clean up object URL to prevent memory leaks
    // if (scratchAndDentImagePreview) {
    //   console.log("ekf")
    //   URL.revokeObjectURL(scratchAndDentImagePreview);
    // }
  }, [scratchAndDentImagePreview, carData]);
  return (
    <div>
      {/* <ToastContainer /> */}

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
                    {field.name === "mileage"
                      ? field.placeholder + " (kmpl)"
                      : field.name == "cubicCapacity" ? field.placeholder+ "(CC)" : field.placeholder}
                  </label>
                  {field.type === "select" ? (
                    <CommonReactSelect
                      options={field.options}
                      defaultValue={
                        carData
                          ? () => {
                              const value = booleanToYesNo(values[field.name]);
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
                      placeholder={field.placeholder == "Enter Cubic Capacity" ? "Enter CC " :  field.placeholder}
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
                      }}

                      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                        if (field.name === "numberPlate") {
                          const value = event.target.value.replace(/\s+/g, "").toUpperCase();
                          setFieldValue(field.name, value);
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
                        setFieldValue("scratchAndDentDescription", e.target.value)
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
      <ToastContainer />
    </div>
  );
};

export default Step1;
