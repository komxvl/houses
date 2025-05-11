import { PropertyStatus } from '@/types/propertySatus';
import { Badge } from './ui/badge';

const statusLabel = {
  'for-sale': 'For Sale',
  withdrawn: 'WithDrawn',
  draft: 'Draft',
  sold: 'Sold',
};

const variant: Record<string, 'primary' | 'destructive' | 'secondary' | 'success'> = {
  'for-sale': 'primary',
  withdrawn: 'destructive',
  draft: 'secondary',
  sold: 'success',
};

export default function PropertyStatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const label = statusLabel[status];
  return (
    <Badge variant={variant[status]} className={className}>
      {statusLabel[status]}
    </Badge>
  );
}
