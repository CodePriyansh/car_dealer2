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
      setPayload({
        priceMax: selectedOptions?.priceMax,
        priceMin: selectedOptions?.priceMin,
        type: selectedOptions?.carType,
        color: selectedOptions?.color,
        company: selectedOptions?.company ,
        modelName: selectedOptions?.carmodel?.value,
        modelYear: selectedOptions?.modelYear,
        transmission: selectedOptions?.transmission,
      });
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODQ1Mjc1NjlkODJmNTdlNDIwZGI2YyIsInBob25lTnVtYmVyIjoiODk2NTk4NDM5OCIsImZpcmViYXNlVXNlcklkIjoiODRCRzUyWjhIa1ptU2ZmWDZjRjNDb1FRaTRtMiIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvbXktY2FyLTc2NTU0LmFwcHNwb3QuY29tL28vcHJvZmlsZV9pbWFnZXMlMkYxNzE5OTQ3ODkyMTc4X3RoJTIwKDE5KS5qcGc_YWx0PW1lZGlhJnRva2VuPTI5YThhZjRlLTk4Y2EtNDZiMy1hMjNhLTIyNGE1ZTdjYmUxMyIsIm5hbWUiOiJib3JpbmdjYW52YXNUb2tlbiIsImlhdCI6MTcxOTk0Nzg5MywiZXhwIjoxNzIwMDM0MjkzfQ.xT7vGNyPOKGvLVw2eRDAh6EMojoylNJbPQLD2y8IFn8`,
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
