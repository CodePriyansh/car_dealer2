import Header from "@/components/Common/Header";
import HomeEnteries from "@/components/HomePage/HomeEnteries";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {


  return (
    <div>
      <Header />
      <HomeEnteries/>
      <ToastContainer />
    </div>
  );
}
