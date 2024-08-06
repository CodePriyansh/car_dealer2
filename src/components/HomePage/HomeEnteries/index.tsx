"use client";
import SubHeader from "@/components/Common/SubHeader";
import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import HomePageCards from "../HomePageCards";
import Button from "@/components/Common/Button";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";
import PlanExpiredBanner from "@/components/Subscription/SubscriptionBanner";
import { useFilter } from "@/context/FilterContext";

const HomeEnteries = () => {
  const showPlanExpiredBanner = false;
  const [cars, setCars] = useState([]);
  const { activeFilter } = useFilter();
  console.log(activeFilter,"woiefwoiewgioegiorrrrrrrrrrrrrrrrrrrrrrrr")

  const [carNotFoundtext, setCarNotFoundtext] = useState(``);
  const router = useRouter();

  useEffect(() => {
    setCarNotFoundtext(`There Is No ${activeFilter.toUpperCase()} Added`);
  }, [activeFilter]);

  const handleDeleteCar = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
  };

  return (
    <div>
      <Filters setCars={setCars} setCarNotFoundtext={setCarNotFoundtext} />
      {showPlanExpiredBanner && <PlanExpiredBanner />}
      <HomePageCards cars={cars} carNotFoundtext={carNotFoundtext} onDelete={handleDeleteCar} />
      <button className="fixed md:hidden bottom-4 right-4 bg-primary  text-white px-1 py-1 rounded-[20%] shadow-lg hover:bg-primary-dark">
        <Button onclick={() => router.push(activeFilter === "car" ? "/addcar" : "/addbike")}>
          <Image
            src={Images.whitePlus}
            alt="img"
            className="w-[14px] h-[16px]"
          />
        </Button>
      </button>
    </div>
  );
};

export default HomeEnteries;
