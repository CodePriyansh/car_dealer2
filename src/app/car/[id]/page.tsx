import CarDetails from "@/components/HomePage/CarDetails";

const CarDetailsPage = ({ params }: { params: { id: string } }) => {
  return <CarDetails params={params} />;
};

export default CarDetailsPage;
