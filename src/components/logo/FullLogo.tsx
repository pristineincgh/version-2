import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FullLogoProps {
  className?: string;
}

const FullLogo = ({ className }: FullLogoProps) => (
  <Image
    src="/images/logo/logo.png"
    alt="Company Logo"
    width={150}
    height={150}
    priority
    className={cn('object-contain', className)}
  />
);

export default FullLogo;
