"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import instance from "@/network/axios";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import CarCards from "../CarCards";
import styles from "./styles.module.css";
import Header from "@/components/Common/Header";
import moment from "moment";
import ClipSpinner from "@/components/Common/Spinner";
import { useRouter } from "next/navigation";
import { Images } from "@/assets/Images";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import DynamicDialog from "@/components/Common/Dialogs";
import { useFilter } from "@/context/FilterContext";
const CarDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [car, setCar] = useState(null);
  let { id } = params;
  const { activeFilter } = useFilter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarCars, setSimilarCars] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    // Update image name based on index (you'll need to define these names)
    if (activeFilter == "car") {
      const imageNames = Object.keys(car.images);
      setImageName(imageNames[index] || `View ${index + 1}`);
    }
  };

  const fetchSimilarCars = async (dealerId) => {
    try {
      const response = await instance.get(
        `/api/${activeFilter}s/${activeFilter}-by-dealer-id/${dealerId._id}`
      );
      setSimilarCars(response.data.data);
    } catch (error) {
      console.error("Error fetching similar " + activeFilter + "s:", error);
      // toast.error("Failed to fetch similar cars");
    }
  };

  const updateSoldStatus = async (carId: string) => {
    try {
      const response = await instance.patch(
        `/api/${activeFilter}s/update-sold-status/${carId}`,
        {
          soldStatus: true,
        }
      );
      id = carId;
      toast.success(activeFilter + " status updated successfully!");
    } catch (error) {
      console.error("Error updating status", error);
      toast.error("Failed to update");
    }
  };

  const [imageName, setImageName] = useState("Right View");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(
          `/api/${activeFilter}s/${activeFilter}-by-id/${id}`
        );

        setCar(response.data.data);
        if (response.data.data.dealerId) {
          fetchSimilarCars(response.data.data.dealerId);
        }
      } catch (error) {
        console.error(`Error fetching ${activeFilter} details`, error);
        toast.error(`Failed to fetch ${activeFilter} details`);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  if (!car) {
    return (
      <div className="flex justify-center items-center">
        <ClipSpinner loading={true} />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      console.log(car._id, "idfghjkly");
      const response = await instance.delete(
        `/api/${activeFilter}s/delete/${car._id}`
      );
      if (response.status === 200) {
        toast.success(activeFilter.toUpperCase() + " deleted successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to delete car. Please try again.");
      console.error("Delete car error:", error);
    }
  };

  const handleDialogOpen = () => {
    setDialogType("DELETE_CAR");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const images =
    activeFilter === "car" ? Object.values(car.images) : car.bikeImages;

  return (
    <>
      <Header page="addcar" />
      <Toaster />

      <div className={styles.backButton} onClick={() => router.back()}>
        <Image
          src={Images.backArrow}
          alt="back-arrow"
          width={32}
          height={32}
          className={styles.backArrowImage}
        />
        <p className={styles.backText}>Back</p>
      </div>
      <div className={styles.mainContainer}>
        <DynamicDialog
          open={dialogOpen}
          type={dialogType}
          onClose={handleDialogClose}
          onConfirm={handleDialogClose}
          onDeleteCar={handleDelete}
        />

        <div className={styles.carDetailsContainer}>
          {/* Left Section (Images) */}
          <div className={styles.imagesContainer}>
            <Carousel
              selectedItem={currentImageIndex}
              onChange={(index) => {
                setCurrentImageIndex(index);
                if (activeFilter === "car") {
                  const imageNames = Object.keys(car?.images);
                  setImageName(imageNames[index] || `View ${index + 1}`);
                }
              }}
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              className="custom-carousel"
            >
              {images?.map((image, index) => (
                <div key={index} className="relative w-full  ">
                  <img
                    src={image}
                    alt={`Car part ${index + 1}`}
                    className={styles.mainImage}
                  />
                  {activeFilter == "car" && (
                    <div className="font-rajdhani font-bold absolute text-[14px] h-5 md:bottom-4 md:left-4 bottom-3 left-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded capitalize ">
                      {imageName?.replaceAll("_", " ")}
                    </div>
                  )}
                  <div className="font-rajdhani font-bold absolute text-[14px] h-5 md:bottom-4 md:right-4 bottom-3 right-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded">
                    {index + 1}/{images?.length}
                  </div>
                </div>
              ))}
            </Carousel>
            <div className={styles.thumbnailContainer}>
              {images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Car part ${index + 1}`}
                  className={`${styles.thumbnailImage} ${
                    currentImageIndex === index ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <div className="flex justify-center sm:mb-4 mb-2">
              <span
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentImageIndex === 0 ||
                  currentImageIndex < images?.length - 1
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentImageIndex === images?.length - 1
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              ></span>
            </div>
          </div>

          {/* Right Section (Details) */}
          <div className={styles.detailsContainer}>
            <div className={`${styles.sectionBorder}`}>
              <h1 className={styles.carTitle}>
                {moment(car?.yearOfManufacture).format("YYYY")} {car.company}{" "}
                {car.type} {car.variant}
              </h1>
              <div className={styles.carInfo}>
                <span>{car.kmDriven}</span>
                <span>{car.ownerType}</span>
                <span>{car.fuelType}</span>
                <span>{car.transmission}</span>
              </div>
              <hr className={styles.separator} />
              <h1 className={styles.carPrice}>
                {+car.price > 99000
                  ? ` Rs. ${car?.price?.toLocaleString("en-IN")}`
                  : `Rs. ${car?.price?.toLocaleString("en-IN")}`}
              </h1>
              <div className={styles.actionButtons}>
                <button
                  className={styles.editButton}
                  onClick={() =>
                    router.push(`/edit-${activeFilter}/${car._id}`)
                  }
                >
                  <MdEdit className={styles.icon} />
                  <span>Edit</span>
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleDialogOpen}
                >
                  <MdOutlineDeleteOutline className={styles.icon} />
                  <span>Delete</span>
                </button>
                {!car?.sold && (
                  <button
                    className={`${styles.soldButton}`}
                    onClick={() => updateSoldStatus(car?._id)}
                  >
                    <span>Sold</span>
                  </button>
                )}
              </div>
            </div>

            <div className={styles.borderDivider}></div>

            <div
              className={`${styles.descriptionContainer} ${styles.sectionBorder} hidden sm:block`}
            >
              <h1 className={styles.descriptionTitle}>Description</h1>
              <p className={styles.descriptionText}>
               {car?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Overview and Scratch & Dent sections */}
        <div className={styles.overviewContainer}>
          <div className={`${styles.overviewPanel} ${styles.sectionBorder}`}>
            <h1 className={styles.overviewTitle}>Car Overview</h1>
            <div className={styles.overviewDetails}>
              <div key={car?.id} className={styles.overviewItem}>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Company</p>
                  <p className={styles.overviewValues}>{car?.company}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Model</p>
                  <p className={styles.overviewValues}>{car?.modelName}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Variant</p>
                  <p className={styles.overviewValues}>{car?.variant}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Year of Manufacture</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.yearOfManufacture).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Registration Date</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.registrationDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Number Plate</p>
                  <p className={styles.overviewValues}>{car?.numberPlate}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Color</p>
                  <p className={styles.overviewValues}>{car?.color}</p>
                </div>
                {activeFilter == "car" && (
                  <>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Transmission</p>
                      <p className={styles.overviewValues}>
                        {car?.transmission}
                      </p>
                    </div>
                  </>
                )}
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Fuel Type</p>
                  <p className={styles.overviewValues}>{car?.fuelType}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Cubic Capacity</p>
                  <p className={styles.overviewValues}>
                    {car?.cubicCapacity} cc
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Average Approx.</p>
                  <p className={styles.overviewValues}>{car?.mileage}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Km Driven</p>
                  <p className={styles.overviewValues}>{car?.kmDriven}</p>
                </div>
                {activeFilter == "car" && (
                  <>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Air Conditioner</p>
                      <p className={styles.overviewValues}>
                        {car?.airConditioner ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Power Window</p>
                      <p className={styles.overviewValues}>
                        {car?.powerWindow ? "Yes" : "No"}
                      </p>
                    </div>
                  </>
                )}
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Owner</p>
                  <p className={styles.overviewValues}>{car?.ownerType}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Insurance</p>
                  <p className={styles.overviewValues}>
                    {car?.insurance ? "Yes" : "No"}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Insurance Validity</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.insuranceValidity).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.descriptionContainer} ${styles.sectionBorder} sm:hidden col-span-5 !px-6 !mt-0`}
          >
            <h1 className={styles.descriptionTitle}>Description</h1>
            <p className={styles.descriptionText}>{car?.description}</p>
          </div>

          {/* Right Panel (Scratch & Dent) */}
          <div className="col-span-5 ">
            <div className={`${styles.scratchDentPanel} md:h-[80%]`}>
              <h1 className={styles.scratchDentTitle}>Scratch & Dent</h1>
              <div className={styles.scratchDentContent}>
                <p className={styles.scratchDentText}>
                  {car?.scratchAndDentDetails?.description}
                </p>

                {car?.scratchAndDentDetails?.image && (
                  <img
                    src={car?.scratchAndDentDetails?.image}
                    alt="Dent on Left Gate"
                    className={styles.scratchDentImage}
                  />
                )}
              </div>
            </div>

            {!car?.sold && (
              <div
                className="h-[20%] flex justify-center items-center"
                onClick={() => updateSoldStatus(car?._id)}
              >
                <button type="button" className={`${styles.soldButton2}`}>
                  Sold
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Similarly Added Cars */}
        <div
          className={`${styles.similarCarsContainer} custome-scrollbar scroll-smooth`}
        >
          <h1 className={styles.similarCarsTitle}>Similarly Added</h1>
          {!similarCars?.length ? (
            <div className="text-2xl text-greyy text-center">
              {" "}
              NO Similar Car Found.{" "}
            </div>
          ) : (
            <div className={styles.similarCarsList}>
              <>
                {similarCars.map((car, index) => (
                  <div key={index} className={styles.similarCarCard}>
                    <CarCards item={car} />
                  </div>
                ))}
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarDetails;
