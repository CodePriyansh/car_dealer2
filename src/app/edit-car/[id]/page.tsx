import React from 'react'
import AddCarForm from '@/components/AddCar'

function EditCarPage({ params }: { params: { id: string } }) {
  return (
    <div><AddCarForm params={params}/></div>
  )
}


export default EditCarPage
