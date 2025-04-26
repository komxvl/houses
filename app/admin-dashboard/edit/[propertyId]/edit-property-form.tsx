'use client';

import PropertyForm from '@/components/property-form';
import { auth } from '@/firebase/client';
import { Property } from '@/types/property';
import { propertySchema } from '@/validation/propertySchema';
import { z } from 'zod';
import { updateProperty } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  address2,
  postcode,
  city,
  price,
  description,
  status,
  bathrooms,
  bedrooms,
}: Props) {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }
    await updateProperty({ ...data, id }, token);
    toast.success('Succes', {
      description: 'Propert updated',
    });
    router.push('/admin-dashboard');
  };

  return (
    <PropertyForm
      handleSubmit={handleSubmit}
      submitButtonLabel={'Save'}
      defaultValues={{
        address1,
        address2,
        postcode,
        city,
        price,
        description,
        status,
        bathrooms,
        bedrooms,
        images: [
          {
            id: '',
            url: '',
            file: '',
          },
        ],
      }}
    />
  );
}
