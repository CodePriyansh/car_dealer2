"use client"
import SubHeader from '@/components/Common/SubHeader'
import React, { useEffect, useState } from 'react'
import Filters from '../Filters'
import PlanExpiredBanner from '@/components/Subscription/subcriptionBanner'
import HomePageCards from '../HomePageCards'

const HomeEnteries=()=> {
  const showPlanExpiredBanner = true;
  const [cars, setCars] = useState([]);
useEffect(()=>{
    console.log(cars,"pppppppppppppppppppppppppppppp")
},[cars])

  return (
    <div><SubHeader />
    <Filters setCars={setCars}/>
    {showPlanExpiredBanner && <PlanExpiredBanner />}
    <HomePageCards cars={cars} setCars={setCars}/></div>
  )
}

export default HomeEnteries