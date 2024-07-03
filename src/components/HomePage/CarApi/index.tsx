import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";

const CarApi = ({ selectedOptions, initial, setCars }) => {
  const [payload, setPayload] = useState({});
  const cookies = new Cookies();
  let token = cookies.get("authToken");

  useEffect(() => {
    console.log(selectedOptions);
    if (initial) {
      setPayload({});
    } else {
      setPayload({
        priceMax: selectedOptions?.priceRange[1],
        priceMin: selectedOptions?.priceRange[0],
        type: selectedOptions?.carType,
        color: selectedOptions?.color,
        company: selectedOptions?.company ,
        modelName: selectedOptions?.modelName?.value,
        modelYear: selectedOptions?.modelYear,
        transmission: selectedOptions?.transmission,
      });
    }
  }, [selectedOptions, initial]);

  const ApplyFilterApiCall = async () => {
    console.log(token,"token")
    console.log(payload,"payload");
    try {
      const response = await instance.post("/api/cars/all", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M1ZmMzYWNjYzRhMGQyNTJmMDUxZiIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsImZpcmViYXNlVXNlcklkIjoiVTNxeGxYdFFHaGduSHJTSWtzRmdJSnU5WXJ6MiIsImlhdCI6MTcyMDAxODE2MSwiZXhwIjoxNzIwMTA0NTYxfQ.kVFeHWLNv1WScEkmqunsJCqKEjiFzmcjs68c2APDnMU`,
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
