import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProperties } from '@/data/properties';
import { Link, EyeIcon, PencilIcon } from 'lucide-react';
import page from '../page';

export default async function PropertiesTable({ page = 1 }: { page?: number }) {
  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 1,
    },
  });
  console.log({ data, totalPages });
  return (
    <>
      {!data && (
        <h1 className="text-center text-zinc-400 py-20 text-3xl font-bold">
          You have no properties
        </h1>
      )}
      {!!data && (
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Listing Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((property) => {
              const address = [
                property.address1,
                property.address2,
                property.city,
                property.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(', ');

              return (
                <TableRow key={property.id}>
                  <TableCell>{address}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/property/${property.id}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin-dashboard/edit/${property.id}`}>
                        <PencilIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}
