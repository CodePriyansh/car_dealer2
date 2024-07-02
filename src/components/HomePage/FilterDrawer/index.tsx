import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@/components/Common/Button";
import styles from "./styles.module.css";
import PriceRangeSlider from "@/components/Common/PriceRange";
import Image from "next/image";
import { Images } from "@/assets/Images";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

export default function FilterDrawer({ setOpenDrawer, openDrawer }) {
  const cookies = new Cookies();
  const [isOpen, setIsOpen] = React.useState(true);
  const [updatedPriceRange, setUpdatedPriceRange] = React.useState([100000, 2500000]);

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
    setOpenDrawer(open);
  };

  const initialFiltersState = {
    Brand: [],
    color: [],
    ModelYear: [],
    Transmission: [],
    CarType: [],
    PriceRange: [100000, 2500000],
  };

  const contentData = [
    {
      filterName: "Brand",
      filters: [
        "Maruti Suzuki",
        "Hyundai",
        "Tata Motors",
        "Honda",
        "Toyota",
        "Mahindra",
        "Kia",
        "Ford",
        "Volkswagen",
        "Skoda",
      ],
    },
    {
      filterName: "ModelYear",
      filters: ["2022 - 2024", "2019 - 2021", "2016 - 2018", "2013 - 2015"],
    },
    {
      filterName: "color",
      filters: ["Red", "Blue", "Black", "White", "Silver", "Grey", "Green", "Yellow", "Brown", "Orange"],
    },
    {
      filterName: "Transmission",
      filters: ["Manual", "Automatic"],
    },
    {
      filterName: "CarType",
      filters: ["SUV", "Sedan", "Hatchback"],
    },
  ];

  const [selectedFilters, setSelectedFilters] = React.useState(initialFiltersState);

  const handleCheckboxChange = (filterName, filterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].includes(filterValue)
        ? prevFilters[filterName].filter((item) => item !== filterValue)
        : [...prevFilters[filterName], filterValue],
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters(initialFiltersState);
    setUpdatedPriceRange([100000, 2500000]);
  };

  const ApplyFilterApiCall = async () => {
    let token = cookies.get("token");
    const response = await instance.post("/api/cars/all", {
      priceMin: selectedFilters?.PriceRange[0],
      priceMax: selectedFilters?.PriceRange[1],
      type: selectedFilters?.Variant,
      color: selectedFilters?.color,
      company: selectedFilters?.Brand,
      transmission: selectedFilters?.Transmission,
      carType: selectedFilters?.CarType,
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU5MmZhY2E2YmY4NWFmNDY5MDY3ZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5OCIsImZpcmViYXNlVXNlcklkIjoiMGE1RnFzejZLN1B5eUJsUHJ3UmZPMzliOHhVMiIsImlhdCI6MTcxOTk0MDEwNSwiZXhwIjoxNzIwMDI2NTA1fQ.3zzuyuT0SvQRzxqgQodrJe7_RW-0V-lE4cNf82MXMgk`,
      },
    });
    console.log(response, "filter data");
  };

  const handleApply = () => {
    console.log(selectedFilters);
    ApplyFilterApiCall();
  };

  React.useEffect(() => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      PriceRange: updatedPriceRange,
    }));
  }, [updatedPriceRange]);

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
          <div className={styles.wrapper}>
            <div className={styles.remove_filters}>
              <p className={styles.back_btn} onClick={toggleDrawer(false)}>
                <Image
                  src={Images.backArrow}
                  alt="back-arrow"
                  width={32}
                  height={32}
                  className="w-6 h-6"
                />
                back
              </p>
              <p className={styles.clear_filter} onClick={handleClearFilters}>clear filters</p>
            </div>

            <div className="mx-6">
              <PriceRangeSlider setUpdatedPriceRange={setUpdatedPriceRange} updatedPriceRange={updatedPriceRange} />
            </div>

            <div className={styles.content_wrapper}>
              {contentData?.map((item, index) => {
                return (
                  <div key={index.toString()} className={styles.container}>
                    <div className={styles.filter_heading}>
                      {item?.filterName}
                    </div>
                    <div className={styles.filter_ele_wrapper}>
                      {item.filters?.map((ele, ind) => {
                        return (
                          <div
                            key={ind.toString()}
                            className="flex items-center space-x-2"
                          >
                            <div className="custom-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedFilters[item.filterName]?.includes(ele)}
                                onChange={() => handleCheckboxChange(item.filterName, ele)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <span className={styles.element}>{ele}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.sticky_btn}>
              <Button otherStyles={"py-2"} onclick={() => handleApply()}>Apply</Button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
