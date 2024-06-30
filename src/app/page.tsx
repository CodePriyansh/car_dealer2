import Header from "@/components/Common/Header";
import SubHeader from "@/components/Common/SubHeader";
import Filters from "@/components/HomePage/Filters";
import HomePageCards from "@/components/HomePage/HomePageCards";
import PlanExpiredBanner from "@/components/Subscription/subcriptionBanner";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <Filters />
      <PlanExpiredBanner />
      <HomePageCards />
    </div>
  );
}
