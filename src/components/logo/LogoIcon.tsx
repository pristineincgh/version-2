import { cn } from '@/lib/utils';
import Image from 'next/image';

const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <div className="relative">
      <Image
        src="/images/logo/logo_icon.png"
        alt="Logo"
        width={50}
        height={50}
        priority
        className={cn('object-contain', className)}
      />
    </div>
  );
};
export default LogoIcon;
