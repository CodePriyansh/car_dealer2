"use client";
import SubHeader from "@/components/Common/SubHeader";
import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import PlanExpiredBanner from "@/components/Subscription/subcriptionBanner";
import HomePageCards from "../HomePageCards";
import Button from "@/components/Common/Button";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";

const HomeEnteries = () => {
  const showPlanExpiredBanner = false;
  const [cars, setCars] = useState([]);
  const [carNotFoundtext, setCarNotFoundtext] = useState(
    "There Is No Car Added"
  );
  const router = useRouter();
  useEffect(() => {
    // console.log(cars,"pppppppppppppppppppppppppppppp")
  }, [cars]);

  return (
    <div>
      <Filters setCars={setCars} setCarNotFoundtext={setCarNotFoundtext} />
      {showPlanExpiredBanner && <PlanExpiredBanner />}
      <HomePageCards cars={cars} carNotFoundtext={carNotFoundtext} />
      <button className="fixed bottom-4 right-4 bg-primary  text-white px-1 py-1 rounded-[20%] shadow-lg hover:bg-primary-dark">
        <Button onclick={() => router.push("/addcar")}>
          <Image
            src={Images.whitePlus}
            alt="img"
            className="w-[18px] h-[18px]"
          />
        </Button>
      </button>
    </div>
  );
};

export default HomeEnteries;
