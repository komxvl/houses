"use client"

import PropertyForm from '@/components/property-form'
import { useAuth } from '@/context/auth'
import {formSchema, propertySchema} from '@/validation/propertySchema'
import { PlusCircleIcon } from 'lucide-react'
import { z } from 'zod'
import { createProperty } from './actions'


export default function NewPropertyForm() {
  const auth = useAuth()
  const handleSubmit = async (data) => {
    const token = await auth?.currentUser?.getIdToken()
    console.log(token)
    if(!token) {
      return
    }
    const responese = await createProperty({...data, token})
      console.log({responese})
  }
  return (
    <div>
      <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={
        <>
        <PlusCircleIcon /> Create property
        </>
      } />
    </div>
  )
}
