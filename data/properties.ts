import { firestore, getTotalPages } from '@/firebase/server';
import { Property } from '@/types/property';
import { PropertyStatus } from '@/types/propertySatus';
import { log } from 'console';
import 'server-only';

type GetPropertiesOptions = {
  filters?: {
    maxPrice?: number | null;
    minPrice?: number | null;
    minBedRooms?: number | null;
    status?: PropertyStatus[];
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { maxPrice, minPrice, minBedRooms, status } = options?.filters || {};

  let propertyQueries = firestore.collection('properties').orderBy('updated', 'desc');

  if (minPrice !== null && minPrice !== undefined) {
    propertyQueries = propertyQueries.where('price', '>=', minPrice);
  }
  if (maxPrice !== null && maxPrice !== undefined) {
    propertyQueries = propertyQueries.where('price', '<=', minPrice);
  }

  if (minBedRooms !== null && minBedRooms !== undefined) {
    propertyQueries = propertyQueries.where('price', '>=', minBedRooms);
  }

  if (status !== null && status !== undefined) {
    propertyQueries = propertyQueries.where('status', 'in', status);
  }

  const totalPages = await getTotalPages(propertyQueries, pageSize);

  const propertiesSnapshot = await propertyQueries
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const properties = propertiesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Property
  );

  return { data: properties, totalPages };
};

export const getPropertyById = async (propertyId: string) => {
  const propertySnapshot = await firestore.collection('properties').doc(propertyId).get();
  const propertyData = { id: propertySnapshot.id, ...propertySnapshot.data() } as Property;
  return propertyData;
};
