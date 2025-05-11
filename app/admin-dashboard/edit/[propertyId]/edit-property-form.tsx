'use client';

import PropertyForm from '@/components/property-form';
import { auth, storage } from '@/firebase/client';
import { Property } from '@/types/property';
import { propertySchema } from '@/validation/propertySchema';
import { z } from 'zod';
import { updateProperty } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteObject, ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import path from 'path';
import { savePropertyImages } from '../../new/actions';

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
  images = [],
}: Props) {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, token);

    if (!!response?.error) {
      toast.success('Error', {
        description: 'Error',
      });
    }

    const storageTasks: (UploadTask | Promise<void>)[] = [];
    const imageToDelete = images.filter(
      (image) => !newImages.find((newImage) => image === newImage.url)
    );

    imageToDelete.forEach((image) => {
      storageTasks.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];
    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${image.id}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        storageTasks.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      }
    });

    console.log(paths);

    await Promise.all(storageTasks);
    await savePropertyImages({ propertyId: id, images: paths }, token);

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
        images: images.map((image) => ({
          id: image,
          url: image,
        })),
      }}
    />
  );
}
