import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

const CarApi = ({ selectedOptions, initial, setCars }) => {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (initial) {
      setPayload();
    } else {
      setPayload({
        priceMax: 2500000,
        priceMin: 0,
        type: selectedOptions?.carType,
        color: selectedOptions?.color,
        company: selectedOptions?.brand?.value,
        modelName: selectedOptions?.carmodel?.value,
      });
    }
  }, [selectedOptions,initial]);

  const ApplyFilterApiCall = async () => {
    const cookies = new Cookies();
    let token = cookies.get("token");

    try {
      const response = await instance.post(
        "/api/cars/all",
        { payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU5MmZhY2E2YmY4NWFmNDY5MDY3ZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5OCIsImZpcmViYXNlVXNlcklkIjoiMGE1RnFzejZLN1B5eUJsUHJ3UmZPMzliOHhVMiIsImlhdCI6MTcxOTk0MDEwNSwiZXhwIjoxNzIwMDI2NTA1fQ.3zzuyuT0SvQRzxqgQodrJe7_RW-0V-lE4cNf82MXMgk`,
          },
        }
      );
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
