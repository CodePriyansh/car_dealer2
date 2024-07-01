import Header from "@/components/Common/Header";
import SubHeader from "@/components/Common/SubHeader";
import Filters from "@/components/HomePage/Filters";
import HomePageCards from "@/components/HomePage/HomePageCards";
import PlanExpiredBanner from "@/components/Subscription/subcriptionBanner";
import { getLocalStorage } from "@/constants/constants";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {


  const user = getLocalStorage("user");
  
console.log(user,"ih");
  const showPlanExpiredBanner = true

  return (
    <div className="md:bg-f7f7f7">
      <Header />
      <SubHeader />
      <Filters />
      {showPlanExpiredBanner && <PlanExpiredBanner />}
      <HomePageCards />
    </div>
  );
}
