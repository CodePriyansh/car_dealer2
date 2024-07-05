"use client";
import SubHeader from "@/components/Common/SubHeader";
import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import PlanExpiredBanner from "@/components/Subscription/subcriptionBanner";
import HomePageCards from "../HomePageCards";

const HomeEnteries = () => {
  const showPlanExpiredBanner = false;
  const [cars, setCars] = useState([]);
  const [carNotFoundtext, setCarNotFoundtext] = useState(
    "There Is No Car Added"
  );
  useEffect(() => {
    // console.log(cars,"pppppppppppppppppppppppppppppp")
  }, [cars]);

  return (
    <div>
      <Filters setCars={setCars} setCarNotFoundtext={setCarNotFoundtext} />
      {showPlanExpiredBanner && <PlanExpiredBanner />}
      <HomePageCards cars={cars} carNotFoundtext={carNotFoundtext} />
    </div>
  );
};

export default HomeEnteries;
