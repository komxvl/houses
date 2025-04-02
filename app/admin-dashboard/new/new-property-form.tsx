"use client"

import PropertyForm from '@/components/property-form'
import { useAuth } from '@/context/auth'
import {formSchema, propertySchema} from '@/validation/propertySchema'
import { PlusCircleIcon } from 'lucide-react'
import { z } from 'zod'
import { createProperty } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function NewPropertyForm() {
  const auth = useAuth()
  const router = useRouter()
  const handleSubmit = async (data) => {
    const token = await auth?.currentUser?.getIdToken()
    console.log(token)
    if(!token) {
      return
    }
    const responese = await createProperty({...data, token})
    if(!!responese.error) {
      toast.error("Error", {
        description: responese.error
      });
      return
    }

      toast.success("Success", {
        description: "Property created!"
      })

      router.push('/admin-dashboard')
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
