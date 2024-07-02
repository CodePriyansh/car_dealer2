"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import CommonReactSelect from "@/components/Common/Select";
import { Slider, Typography } from "@mui/material";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button";
import FilterDrawer from "../FilterDrawer";
import PriceRangeSlider from "@/components/Common/PriceRange";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import instance from "@/network/axios";

function Filters() {
  const router = useRouter();
  const [updatedPriceRange, setUpdatedPriceRange] = React.useState([
    100000, 2500000,
  ]);
  const cookies = new Cookies();

  const fields = [
    {
      name: "brand", // corrected spelling from 'barnd' to 'brand'
      type: "select",
      placeholder: "Select",
      options: [
        { value: "Toyota", label: "Toyota" },
        { value: "Honda", label: "Honda" },
        { value: "Ford", label: "Ford" },
      ],
    },
    {
      name: "carmodel",
      type: "select",
      placeholder: "Select",
      options: [
        { value: "Renault Kwid", label: "Renault Kwid" },
        { value: "Datsun Redi-GO", label: "Datsun Redi-GO" },
        { value: "Maruti Suzuki S-Presso", label: "Maruti Suzuki S-Presso" },
      ],
    },
    {
      name: "modelyear",
      type: "select",
      placeholder: "Select",
      options: [
        { value: "2022 - 2024", label: "2022 - 2024" },
        { value: "2019 - 2021", label: "2019 - 2021" },
        { value: "2016 - 2018", label: "2016 - 2018" },
        { value: "2013 - 2015", label: "2013 - 2015" },
      ],
    },
  ];

  const carType = [
    "Sedan",
    "Van",
    "Pickup",
    "Sedan2",
    "Van2",
    "Pickup2",
    "Sedan3",
    "Van3",
    "Pickup3",
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

  const [selectedOptions, setSelectedOptions] = useState({
    carType: [],
    color: [],
    priceRange: updatedPriceRange,
    brand: null,
    modelName: "",
    company: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (name, selectedOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedOption,
    });
  };

  const handleCarType = (value) => {
    const isChecked = selectedOptions.carType.includes(value);
    let updatedCarTypes;
    if (isChecked) {
      updatedCarTypes = selectedOptions.carType.filter(
        (type) => type !== value
      );
    } else {
      updatedCarTypes = [...selectedOptions.carType, value];
    }
    setSelectedOptions({
      ...selectedOptions,
      carType: updatedCarTypes,
    });
  };

  const handleColorType = (value) => {
    const isChecked = selectedOptions.color.includes(value);
    let updatedColorTypes;
    if (isChecked) {
      updatedColorTypes = selectedOptions.color.filter(
        (color) => color !== value
      );
    } else {
      updatedColorTypes = [...selectedOptions.color, value];
    }
    setSelectedOptions({
      ...selectedOptions,
      color: updatedColorTypes,
    });
  };

  const ApplyFilterApiCall = async () => {
    let token = cookies.get("token");

    try {
      const response = await instance.post(
        "/api/cars/all",
        {
          priceMin: selectedOptions?.priceRange[0],
          priceMax: selectedOptions?.priceRange[1],
          type: selectedOptions?.carType,
          color: selectedOptions?.color,
          company: selectedOptions?.brand?.value,
          modelName: selectedOptions?.carmodel?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU5MmZhY2E2YmY4NWFmNDY5MDY3ZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5OCIsImZpcmViYXNlVXNlcklkIjoiMGE1RnFzejZLN1B5eUJsUHJ3UmZPMzliOHhVMiIsImlhdCI6MTcxOTk0MDEwNSwiZXhwIjoxNzIwMDI2NTA1fQ.3zzuyuT0SvQRzxqgQodrJe7_RW-0V-lE4cNf82MXMgk`,
          },
        }
      );

      console.log(response.data, "filter data");
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleApply = () => {
    ApplyFilterApiCall();
    console.log(selectedOptions);
  };

  useEffect(() => {
    setSelectedOptions({
      ...selectedOptions,
      priceRange: updatedPriceRange,
    });
  }, [updatedPriceRange]);

  return (
    <div className={`${styles.container} container_space large_layout`}>
      <div className={styles.wrapper}>
        {/* filter box  */}
        <div className={styles.filters_wrapper}>
          <div className="flex w-full justify-between">
            <div className={styles.heading}>Filters </div>
            <Button
              otherStyles="absolute top-0 right-0 rounded-[10px] !py-2"
              onclick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
          <div className={styles.selectors}>
            {fields.map((field, index) => (
              <div className={styles.field_wrapper} key={index}>
                <CommonReactSelect
                  options={field.options}
                  placeholder={field.placeholder}
                  selectedOption={selectedOptions[field.name]}
                  setSelectedOption={(option) => {
                    handleChange(field.name, option);
                  }}
                  className={`${styles.field_style} !bg-transparent`}
                />
              </div>
            ))}
          </div>
          <div>
            <PriceRangeSlider
              setUpdatedPriceRange={setUpdatedPriceRange}
              updatedPriceRange={updatedPriceRange}
            />
          </div>
        </div>

        {/* car type box  */}
        <div className={styles.car_type_wrapper}>
          <p className={styles.sub_heading}>Car Type</p>
          <div className={styles.checklist_wrapper}>
            {carType.map((item, index) => (
              <label
                key={index.toString()}
                className="flex items-center space-x-2"
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    onChange={() => handleCarType(item)}
                    checked={selectedOptions.carType.includes(item)}
                  />
                  <span className="checkmark"></span>
                </div>
                <span className={styles.checklist_item}>{item}</span>
              </label>
            ))}
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
            {colors.map((item, index) => (
              <label
                key={index.toString()}
                className="flex items-center space-x-2"
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    onChange={() => handleColorType(item)}
                    checked={selectedOptions.color.includes(item)}
                  />
                  <span className="checkmark"></span>
                </div>
                <span className={styles.checklist_item}>{item}</span>
              </label>
            ))}
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
        {["price range", "brand", "model", "color", "type"].map(
          (item, index) => (
            <div
              key={index.toString()}
              className={styles.responsive_filter_box}
              onClick={() => setOpenDrawer(true)}
            >
              <p className={styles.responsive_filter_item}> {item}</p>
            </div>
          )
        )}
      </div>
      {openDrawer && (
        <FilterDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      )}

      <div className="flex justify-between items-center">
        <div>
          <Button otherStyles={styles.clear_fil_btn}>
            <Image
              src={Images.clearFilter}
              alt="img"
              className="w-[16px] h-[16px]"
            />
            clear filter
          </Button>
        </div>
        <div className="mt-[1px] mx-2">
          <Button
            otherStyles={styles.fill_btn}
            onclick={() => router.push("/addcar")}
          >
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
