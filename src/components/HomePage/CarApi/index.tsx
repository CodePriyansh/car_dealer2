import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

const CarApi = ({ selectedOptions, initial, setCars }) => {
  const [storeInitialValue, setStoreInitialValue] = useState(false);
  const [payload, setPayload] = useState({});
  const cookies = new Cookies();
  let token = cookies.get("authToken");

  useEffect(() => {
    setStoreInitialValue(initial);
  }, [initial]);

  useEffect(() => {
    if (storeInitialValue) {
      setPayload({});
    } else {
      const updatedPayload: any = {};

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
    try {
      const response = await instance.post("/api/cars/all", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M1ZmMzYWNjYzRhMGQyNTJmMDUxZiIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsImZpcmViYXNlVXNlcklkIjoiVTNxeGxYdFFHaGduSHJTSWtzRmdJSnU5WXJ6MiIsImlhdCI6MTcyMDAxODE2MSwiZXhwIjoxNzIwMTA0NTYxfQ.kVFeHWLNv1WScEkmqunsJCqKEjiFzmcjs68c2APDnMU`,
        },
      });
      setCars(response?.data?.data);
      setStoreInitialValue(false)
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleApply = () => {
    ApplyFilterApiCall();
  };

  useEffect(() => {
    if (storeInitialValue === true) {
      ApplyFilterApiCall();
    }
  }, [storeInitialValue]);


  return <>{storeInitialValue ? "" : <div onClick={handleApply}>Apply Filters</div>}</>;
};

export default CarApi;
