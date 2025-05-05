'use client';

import PropertyForm from '@/components/property-form';
import { useAuth } from '@/context/auth';
import { formSchema, propertySchema } from '@/validation/propertySchema';
import { PlusCircleIcon } from 'lucide-react';
import { string, z } from 'zod';
import { createProperty, savePropertyImages } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { storage } from '@/firebase/client';

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images, ...rest } = data;
    console.log(rest);
    const responese = await createProperty({ ...rest, images: [] }, token);
    if (!!responese.error) {
      toast.error('Error', {
        description: responese.error,
      });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];
    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${responese.propertyId}/${Date.now()}-${index}-${image.id}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await savePropertyImages({ propertyId: responese.propertyId, images: paths }, token);

    toast.success('Success', {
      description: 'Property created!',
    });

    router.push('/admin-dashboard');
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create property
          </>
        }
      />
    </div>
  );
}
