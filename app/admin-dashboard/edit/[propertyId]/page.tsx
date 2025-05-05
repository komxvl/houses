import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getPropertyById } from '@/data/properties';
import EditPropertyForm from './edit-property-form';

export default async function EditProperty({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: '/admin-dashboard',
            label: 'Dashboard',
          },
          {
            label: 'Edit property',
          },
        ]}
      />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            description={property.description}
            postcode={property.postcode}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            price={property.price}
            status={property.status}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </>
  );
}
