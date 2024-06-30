import Button from '@/components/Common/Button';
import React from 'react';
import styles from "./styles.module.css"
const PlanExpiredBanner = () => {
  return (
    <div className="font-rajdhani container_space large_layout flex sm:flex-row flex-col  justify-between md:bg-f7f7f7 items-center sm:mt-4 mt-2">
        <div>
      <p className="text-soldRed font-bold text-center md:text-left sm:text-[16px] text-[12px]">
        Your Plan Has Expired 
        <span className="font-normal text-greyy sm:flex block">
          (Now your customers are unable to view your post. To continue showing your post, renew your plan)
        </span>
      </p>
      </div>
      <div>
      <button
              type="submit"
              className="mx-auto w-full"
            >
              <Button otherStyles={styles.review_plan_btn}>
                Review Your Plan
               </Button>
            </button>
            </div>
    </div>
  );
};

export default PlanExpiredBanner;
