"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DealerProfileSection = () => {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    mobileNumber: '',
    telephoneNumber: '',
    email: '',
    city: '',
    state: '',
    shopAddress: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [shopImage, setShopImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [shopImagePreview, setShopImagePreview] = useState(null);

  useEffect(() => {
    // Fetch profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/profile');
        const { data } = response;
        setPersonalDetails({
          name: data.name,
          mobileNumber: data.mobileNumber,
          telephoneNumber: data.telephoneNumber,
          email: data.email,
          city: data.city,
          state: data.state,
          shopAddress: data.shopAddress,
        });
        setProfileImage(data.profileImage);
        setShopImage(data.shopImage);
        setProfileImagePreview(data.profileImage);
        setShopImagePreview(data.shopImage);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(file);
          setProfileImagePreview(reader.result);
        } else {
          setShopImage(file);
          setShopImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', personalDetails.name);
    formData.append('mobileNumber', personalDetails.mobileNumber);
    formData.append('telephoneNumber', personalDetails.telephoneNumber);
    formData.append('email', personalDetails.email);
    formData.append('city', personalDetails.city);
    formData.append('state', personalDetails.state);
    formData.append('shopAddress', personalDetails.shopAddress);
    if (profileImage) formData.append('profileImage', profileImage);
    if (shopImage) formData.append('shopImage', shopImage);

    try {
      await axios.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 lg:mb-0">
          <Image src={profileImagePreview || '/profile.png'} alt="Profile" width={80} height={80} className="rounded-full" />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{personalDetails.name}</h1>
            <div className="flex flex-wrap space-x-4 mt-2">
              <div>
                <p className="text-xl font-semibold">500</p>
                <p>Total Vehicles</p>
              </div>
              <div>
                <p className="text-xl font-semibold">240</p>
                <p>Sold</p>
              </div>
              <div>
                <p className="text-xl font-semibold">260</p>
                <p>Available</p>
              </div>
              <div>
                <p className="text-xl font-semibold">4.5/5</p>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>
        <Image src="/car.png" alt="Car" width={200} height={150} />
      </div>

      {/* Personal Details Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Personal Details</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="text-primary">{isEditing ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(personalDetails).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`border p-2 rounded ${!isEditing && 'bg-gray-100'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Shop Image Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Shop Image</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="text-primary">{isEditing ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="flex flex-col">
          <Image src={shopImagePreview || '/shop.jpg'} alt="Shop" layout="responsive" width={800} height={400} className="rounded mb-4" />
          {isEditing && (
            <input type="file" onChange={(e) => handleImageChange(e, 'shop')} className="border p-2 rounded" />
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded">Save</button>
        </div>
      )}
    </div>
  );
};

export default DealerProfileSection;
