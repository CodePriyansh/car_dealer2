// import { useState } from "react";
// import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";

// const imageArray = [
//   "https://s3-alpha-sig.figma.com/img/2958/5291/72adedab91514198b6bab9998d0d7cfc?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nMW0fyo3~EzJmDQ1En~LWEsjy7DXX~EOSHC~UgySJarUqVx4zu2Zgy-0ySzgcVJuhoF4qhzzsIMz3K9yPuZAGjRYFaXn71RNsBnVRBMBsuftGrMINb5bFFCJxHQDra2R3eZ1iw86ukpJY9w4JXWgnicVnEgsqb1DEknKmKp-nbIs6ToNs8-6msuiUDzjVrr1t4xIBzL5lIWub8F5kjz~hV-ayDhho8NxibUFqcS~Tnwxe4eZHM0OcjJOAQyozKnjgTCMk1Jwku71kyKeq5aW5Vbs6T3vqsuwA~BLBJ6-SRrLgK~ykdW6B2VaB0JzjU2jGQosSRvQs1Ofi-E3jdvaiQ__",
//   "https://s3-alpha-sig.figma.com/img/5e42/62e3/20110c72a3be744c005273845d63ca45?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AwiVOlrmLHJRym5rJ4or9-qbTXfU6TPjvPTDbN~g7RaVKJE2QsOlaQWv0fDJQz1BgVO6m4FoE~qlwX8o4z~SjYczY1GQf3XSPa~L1wzVhlhbXwzop6AuiKSn491Fyq37Jt-mgnWQTM1LbbjYnRdXDwsE0ikwh~OqH3Ql5T7GSEkMLmokGuGhvvdZiRyfKbj56DFRG0lHVSzHtgik5qifMaGiPi1EBOLMHUf823udyRqxMmTC9pLX95pkmz27IAucej95dLxXimL3FV~R89PnwZi40zAOx4ceGiodqvjZ-o9v2buhzkvdEq~PiGky5cjZwc9eyJkI6miOVRdUpf5B6g__",
//   "https://s3-alpha-sig.figma.com/img/eb5c/e924/4648c8abe9dcec2f965c0f5a96d193f5?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bNpQ0jN0NsHfyyO-aV~xxAer9INta9R7DAmKFDwalZ60xRE~c4s32NmQQQprm~gZwN09pYiPCE92TS3qhTJ21xI-PHPXIDCvV-UJfjblERBQ~2XdAL8vs~XvieOxnZycxJQnE9FV~QAEH-Ao66hZKYixe27-Hy3MC9rad3EaDgm~gVIUsQ8M5~Idx1wqMYoK-eU7tYXI4gVGphvfVSxx2xtxcPuhG2Lof297fdyl9RJXI8cfQtQE93mx2BP1ZcHe68ch6qolM3As5x9GCHt29lSyziNITaq3x0OcOTpOz9Xs7apQg0lGRqdnW6sFbZnBj6RMthOsHMy6~I3rkR6ZdQ__",
//   "https://s3-alpha-sig.figma.com/img/5e42/62e3/20110c72a3be744c005273845d63ca45?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AwiVOlrmLHJRym5rJ4or9-qbTXfU6TPjvPTDbN~g7RaVKJE2QsOlaQWv0fDJQz1BgVO6m4FoE~qlwX8o4z~SjYczY1GQf3XSPa~L1wzVhlhbXwzop6AuiKSn491Fyq37Jt-mgnWQTM1LbbjYnRdXDwsE0ikwh~OqH3Ql5T7GSEkMLmokGuGhvvdZiRyfKbj56DFRG0lHVSzHtgik5qifMaGiPi1EBOLMHUf823udyRqxMmTC9pLX95pkmz27IAucej95dLxXimL3FV~R89PnwZi40zAOx4ceGiodqvjZ-o9v2buhzkvdEq~PiGky5cjZwc9eyJkI6miOVRdUpf5B6g__",
//   "https://s3-alpha-sig.figma.com/img/eb5c/e924/4648c8abe9dcec2f965c0f5a96d193f5?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bNpQ0jN0NsHfyyO-aV~xxAer9INta9R7DAmKFDwalZ60xRE~c4s32NmQQQprm~gZwN09pYiPCE92TS3qhTJ21xI-PHPXIDCvV-UJfjblERBQ~2XdAL8vs~XvieOxnZycxJQnE9FV~QAEH-Ao66hZKYixe27-Hy3MC9rad3EaDgm~gVIUsQ8M5~Idx1wqMYoK-eU7tYXI4gVGphvfVSxx2xtxcPuhG2Lof297fdyl9RJXI8cfQtQE93mx2BP1ZcHe68ch6qolM3As5x9GCHt29lSyziNITaq3x0OcOTpOz9Xs7apQg0lGRqdnW6sFbZnBj6RMthOsHMy6~I3rkR6ZdQ__",
//   "https://s3-alpha-sig.figma.com/img/f35d/9807/ff56d7dfb2652819eca5ec24321712c6?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TrxI3aMYZXkS2sjkdfy1X2jUDQMbWqI47F04f6XvQSaUcLePE~iqcBtLuIMLlvQLNMOQVo645tIoKuVjWSf3P48PdbcIxt~4BwIUo5sjCIiClCoapBD1OxRVi3W5qLJUMF36wztnowbgdbyabwhYGycOeHjX7OeM2tSvVjz0fzEP7-HsEQk1o71acmajGrD0jo9xnbiosT98QL9CSSR1BozjHMOgLZUK6DMAblZ4Zx2mniCj8WqK8W6mAjnb9NwcRilOMwBdFN5vFI6jcsgpF-1O5NNMkL--T4ajUuSYR~qh0pOPnXCSQCEoDJyR6j17yR7Qz4vKs4JFB7SB9aDlhA__",
// ];

// export default function CarDetails() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleImageClick = (index: number) => {
//     setCurrentImageIndex(index);
//   };

//   return (
//     <div className="w-full h-full flex flex-col md:flex-row bg-white">
//       {/* Left Section (Images) */}
//       <div className="w-full md:w-3/5 h-full p-4 flex flex-col items-center">
//         {/* Main Image */}
//         <img
//           src={imageArray[currentImageIndex]}
//           alt={`Car part ${currentImageIndex + 1}`}
//           className="w-full rounded-lg"
//           style={{ height: "300px" }}
//         />
//         {/* Thumbnail Images */}
//         <div className="flex flex-wrap mt-4 justify-center md:justify-start">
//           {imageArray.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Car part ${index + 1}`}
//               className="w-20 h-20 md:w-24 md:h-24 m-2 rounded-lg cursor-pointer"
//               onClick={() => handleImageClick(index)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Section (Details) */}
//       <div className="w-full md:w-2/5 h-full p-4 flex flex-col justify-between">
//         <div className="border border-gray-300 rounded-lg shadow-lg p-4 ">
//           {/* Car Title */}
//           <h1 className="text-black font-rajdhani font-bold text-xl leading-7  ">
//             2016 Volkswagen Ameo HIGHLINE 1.2L
//           </h1>

//           {/* Car Details (Km, Owner, Fuel, Transmission) */}
//           <div className="flex flex-wrap space-x-4 text-[#737373] text-sm md:text-base mb-4">
//             <span>6540 Km</span>
//             <span>First Owner</span>
//             <span>Petrol</span>
//             <span>Manual</span>
//           </div>
//           <hr className="my-2" />
//           {/* Car Price */}
//           <h1 className="text-[#ff751a] mt-2 font-bold text-lg md:text-2xl">
//             Rs. 45,10,000
//           </h1>
//           {/* Action Buttons (Edit, Delete) */}
//           <div className="flex justify-center mt-4 space-x-4">
//             <button className="flex items-center justify-center w-40 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm md:text-base px-4 md:px-5 py-2.5">
//               <MdEdit className="text-blue w-5 h-5 md:w-6 md:h-6 mr-2" />
//               <span className="">Edit</span>
//             </button>
//             <button
//               type="button"
//               className="flex items-center justify-center w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm md:text-base px-4 md:px-5 py-2.5"
//             >
//               <MdOutlineDeleteOutline className="text-red w-5 h-5 md:w-6 md:h-6 mr-2" />
//               <span className="">Delete</span>
//             </button>
//             <button className="flex md:hidden bg-red-700 items-center justify-center w-32 md:w-40 text-white hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm md:text-base px-3 md:px-5 py-2.5">
//               <span className="inline-block">Sold</span>
//             </button>
//           </div>
//         </div>
//         {/* Car Description */}
//         <div className="border border-gray-300 rounded-lg mt-5 p-4 md:flex md:flex-col md:items-start">
//           <h1 className="text-black font-bold text-lg md:text-2xl mb-2">
//             Description
//           </h1>
//           <p className="text-[#737373] text-sm md:text-base">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
