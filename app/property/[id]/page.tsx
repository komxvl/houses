import PropertyStatusBadge from '@/components/property-status.badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getPropertyById } from '@/data/properties';
import { ArrowLeft, BathIcon, BedIcon } from 'lucide-react';
import numeral from 'numeral';
import Markdown from 'react-markdown';
import Image from 'next/image';
import BackButton from './back-button';

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.id);
  console.log(property);

  const fullAddress = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((address) => !!address);

  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div className="property-description max-w-screen-md mx-auto py-10 px-4">
        {!!property.images && (
          <Carousel>
            <CarouselContent>
              {property.images.map((image) => (
                <CarouselItem key={image}>
                  <div className="relative h-[80vh] min-h-80">
                    <Image src={''} alt="test" fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24" />

                <CarouselNext className="-translate-x-24" />
              </>
            )}
          </Carousel>
        )}

        <BackButton />
        <Markdown>{property.description}</Markdown>
      </div>
      <div className="bg-sky-200 h-screen sticky top-0 grid place-items-center">
        <div className="flex flex-col gap-10">
          <PropertyStatusBadge
            status={property.status}
            className="mr-auto text-base"
          ></PropertyStatusBadge>
          <h1 className="text-4xl font-semibold">
            {fullAddress.map((addressLine, index) => (
              <div key={index}>
                {addressLine} {index < fullAddress?.length - 1 && ','}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl">Price: {numeral(property.price).format('0,0')}</h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bed rooms
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms} Bath rooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
