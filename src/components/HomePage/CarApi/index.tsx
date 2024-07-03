import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

const CarApi = ({ selectedOptions, initial, setCars }) => {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    console.log(selectedOptions);
    if (initial) {
        setPayload({});
    } else {
        const updatedPayload:any = {};

        if (selectedOptions?.priceRange) {
            updatedPayload.priceMax = selectedOptions.priceRange[1];
        }
        if (selectedOptions?.priceRange) {
            updatedPayload.priceMin = selectedOptions.priceRange[0];
        }
        if (selectedOptions?.carType?.length) {
            updatedPayload.type = selectedOptions.carType;
        }
        if (selectedOptions?.color?.length) {
            updatedPayload.color = selectedOptions.color;
        }
        if (selectedOptions?.company) {
            updatedPayload.company = selectedOptions.company;
        }
        if (selectedOptions?.modelName) {
            updatedPayload.modelName = selectedOptions.modelName;
        }
        if (selectedOptions?.modelYear?.length) {
            updatedPayload.modelYear = selectedOptions.modelYear;
        }
        if (selectedOptions?.transmission?.length) {
            updatedPayload.transmission = selectedOptions.transmission;
        }

        setPayload(updatedPayload);
    }
}, [selectedOptions, initial]);


  const ApplyFilterApiCall = async () => {
    const cookies = new Cookies();
    let token = cookies.get("token");
    console.log(payload);
    try {
      const response = await instance.post("/api/cars/all", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response?.data?.data);
      console.log(response.data, "filter data");
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleApply = () => {
    ApplyFilterApiCall();
  };

  useEffect(() => {
    if (initial) {
      ApplyFilterApiCall();
    }
  }, []);

  return <div onClick={handleApply}>{initial ? "" : "Apply Filters"}</div>;
};

export default CarApi;
