import React from 'react'
import AddBike from '@/components/AddBike'

function EditBikePage({ params }: { params: { id: string } }) {
  return (
    <div><AddBike params={params}/></div>
  )
}


export default EditBikePage
