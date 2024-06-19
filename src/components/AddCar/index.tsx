import React from "react";
import styles from "./styles.module.css";
import signupStyles from '../SignUp/styles.module.css'
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Common/Button";

export default function AddCarForm() {
  const arr = [1, 2, 3, 4, 5, 5, , 6, 6, 34, 34, 343, 3];
  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add car</p>
        {/* basic details */}
        <div className={styles.basic_detail_heading}>
          <p className={styles.sub_heading}>basic details</p>
          <p className={styles.line}></p>
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-6 my-4">
          {arr?.map((item, index) => {
            return (
              <div className={styles.field_wrapper} key={index.toString()}>
                <label className={styles.label_Style}>Name</label>
                <input
                  name="name"
                  placeholder="Enter Your Name"
                  className={styles.field_style}
                />
              </div>
            );
          })}
        </div>

        {/* description */}
        <div className={styles.basic_detail_heading}>
          <p className={styles.sub_heading}>Description</p>
          <p className={styles.special_heading}>
            [you can write in 300 words] Optional
          </p>
          <p className={styles.line}></p>
        </div>
        <div className="my-4">
          <div className={styles.field_wrapper}>
            <label className={styles.label_Style}>
              Other Description related to car
            </label>
            <textarea
              name="name"
              rows={6}
              placeholder="Enter Your Name"
              className={`border border-primary rounded-[20px] max-!h-full !h-full px-4 py-2`}
            />
          </div>
        </div>



 {/* Scratch & Dent Details */}
 <div className={styles.basic_detail_heading}>
          <p className={styles.sub_heading}>Scratch & Dent Details</p>
          <p className={styles.special_heading}>
          (If any) Optional
          </p>
          <p className={styles.line}></p>
        </div>
        <div className="my-4">
          <div className={styles.field_wrapper}>
            <label className={styles.label_Style}>
              Other Description related to car
            </label>
            <textarea
              name="name"
              rows={6}
              placeholder="Enter Your Name"
              className={`border border-primary rounded-[20px] max-!h-full !h-full px-4 py-2`}
            />
          </div>
        </div>


        {/* //Scratch & Dent Image (Optional)  */}
        <div className="sm:w-1/2 w-full">
          <label className={signupStyles.label_Style}>Add Profile Image</label>
          <div className={signupStyles.dotted_box}>
            <Image src={Images.uploadImg} alt="img" className="w-8 h-8" />
            <Button otherStyles="mt-[50px]">
              <Image src={Images.plus} alt="plus" width={20} height={20} />
              Add Profile Image
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              name="profileImage"
            />
          </div>
        </div>


        {/* // button  */}
        <Button otherStyles={styles.next_btn}>Next</Button>
      </div>
    </div>
  );
}
