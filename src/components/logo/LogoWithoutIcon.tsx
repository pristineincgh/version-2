import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoWithoutIconProps {
  className?: string;
}

const LogoWithoutIcon = ({ className }: LogoWithoutIconProps) => (
  <Image
    src="/images/logo/no_icon.png"
    alt="Company Logo"
    width={150}
    height={150}
    priority
    className={cn('object-contain', className)}
  />
);

export default LogoWithoutIcon;
