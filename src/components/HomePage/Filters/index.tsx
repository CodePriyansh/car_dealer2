"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import CommonReactSelect from "@/components/Common/Select";
import { Slider, Typography } from '@mui/material';
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button";
import FilterDrawer from "../FilterDrawer";
import { FaPlus } from "react-icons/fa";
import PriceRangeSlider from "@/components/Common/PriceRange";
import { useRouter } from "next/navigation";
function Filters() {
 const router = useRouter()
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
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleChange = (name: string, selectedOption: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedOption,
    });
  };
  return (
    <div className={`${styles.container} container_space large_layout`}>
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
                  className={`${styles.field_style} !bg-transparent`}
                />
              </div>
            ))}
          </div>
          {/* <p className={styles.sub_heading}>Price Range</p> */}
          <PriceRangeSlider />
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
          <button className="my-1 text-primary capitalize font-rajdhani text-18 font-bold flex w-fit gap-2 mx-auto items-center justify-center">
            view all
            <Image
              src={Images.downArrow}
              width={14}
              height={14}
              alt="down-arrow"
            />
          </button>
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
          <button className="my-1 text-primary capitalize font-rajdhani text-18 font-bold flex w-fit gap-2 mx-auto items-center justify-center">
            view all
            <Image
              src={Images.downArrow}
              width={14}
              height={14}
              alt="down-arrow"
            />
          </button>
        </div>
      </div>

      <div className={styles.responsive_filters}>
        {["price range", "brand", "model", "color", "type"]?.map(
          (item, index) => {
            return (
              <div
                key={index.toString()}
                className={styles.responsive_filter_box}
                onClick={()=>setOpenDrawer(true)}
              >
                <p className={styles.responsive_filter_item}> {item}</p>
                
              </div>
            );
          }
        )}
      </div>
      {openDrawer && <FilterDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>}

      <div className="flex justify-between items-center">

      <div> <Button otherStyles={styles.clear_fil_btn}>
          <Image
            src={Images.clearFilter}
            alt="img"
            className="w-[16px] h-[16px]"
          />
          clear filter
        </Button>
        </div>
        <div className="mt-[1px] mx-2">
        <Button otherStyles={styles.fill_btn} onclick={()=> router.push("/addcar")}>
          <Image
            src={Images.whitePlus}
            alt="img"
            className="w-[18px] h-[18px]"
          />
        </Button>
        </div>
        </div>
    </div>
  );
}

export default Filters;
