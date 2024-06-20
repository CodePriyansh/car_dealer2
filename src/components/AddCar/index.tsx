"use client";

import React from "react";

import styles from "./styles.module.css";
import Step1 from "./Step1";



const AddCarForm = () => {


  
  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add Car</p>

<Step1/>
        
      </div>
    </div>
  );
};

export default AddCarForm;
