"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import CommonReactSelect from "@/components/Common/Select";

function Filters() {
  const fields = [
    {
      name: "company",
      type: "select",
      placeholder: "Select",
      options: [
        { value: "Toyota", label: "Toyota" },
        { value: "Honda", label: "Honda" },
        { value: "Ford", label: "Ford" },
      ],
    },
    {
      name: "company",
      type: "select",
      placeholder: "Select",
      options: [
        { value: "Toyota", label: "Toyota" },
        { value: "Honda", label: "Honda" },
        { value: "Ford", label: "Ford" },
      ],
    },
    {
      name: "company",
      type: "select",
      placeholder: "Select",
      options: [
        { value: "Toyota", label: "Toyota" },
        { value: "Honda", label: "Honda" },
        { value: "Ford", label: "Ford" },
      ],
    },
  ];

  const carType = [
    "Sedan",
    "Van",
    "Pickup",
    "Sedan",
    "Van",
    "Pickup",
    "Sedan",
    "Van",
    "Pickup",
  ];

  const colors = [
    "black",
    "white",
    "grey",
    "dark blue",
    "brown",
    "silver",
    "red",
    "marron",
    "yellow",
  ];
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
    <div className={styles.container}>
    <div className={styles.wrapper}>
      {/* filter box  */}
      <div className={styles.filters_wrapper}>
        <p className={styles.heading}>Filters </p>
        <div className={styles.selectors}>
          {fields.map((field, index) => (
            <div className={styles.field_wrapper} key={index}>
              <CommonReactSelect
                options={field.options}
                placeholder={field.placeholder}
                selectedOption={selectedOptions[field.name]}
                setSelectedOption={(option) => {
                  handleChange(field.name, option);
                  //   setFieldValue(field.name, option ? option.value : "");
                }}
                className={styles.field_style}
              />
            </div>
          ))}
        </div>
        <p className={styles.sub_heading}>Price Range</p>
      </div>

      {/* car type box  */}
      <div className={styles.car_type_wrapper}>
        <p className={styles.sub_heading}>Car Type</p>
        <div className={styles.checklist_wrapper}>
          {carType?.map((item, index) => {
            return (
              <label
                key={index.toString()}
                className="flex items-center space-x-2"
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    //   checked={checked}
                    //   onChange={onChange}
                  />
                  <span className="checkmark"></span>
                </div>
                <span className={styles.checklist_item}>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* color box  */}
      <div className={styles.color_wrapper}>
        <p className={styles.sub_heading}>Color</p>
        <div className={styles.checklist_wrapper}>
          {colors?.map((item, index) => {
            return (
              <label
                key={index.toString()}
                className="flex items-center space-x-2"
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    //   checked={checked}
                    //   onChange={onChange}
                  />
                  <span className="checkmark"></span>
                </div>
                <span className={styles.checklist_item}>{item}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div></div>
  );
}

export default Filters;
