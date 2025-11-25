'use client';

import { cn } from '@/lib/utils';
import { motion, MotionConfig } from 'motion/react';

interface MenuButtonProps {
  isOpen: boolean;
  isScrolled?: boolean;
  toggleMenu: () => void;
}

const StudentMobileMenuBtn: React.FC<MenuButtonProps> = ({
  isOpen,
  toggleMenu,
}) => {
  const variant = isOpen ? 'opened' : 'closed';

  const spanBaseProps = {
    className: 'absolute h-[2px] bg-foreground',
    style: { left: '50%', x: '-50%', y: '-50%' },
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        onClick={toggleMenu}
        className={cn(
          'min-[830px]:hidden relative w-10 h-10 bg-white/0 rounded-md transition-colors hover:bg-white/10 cursor-pointer',
          isOpen && 'bg-foreground/0 hover:bg-foreground/10'
        )}
        aria-label="Toggle menu"
        animate={variant}
        initial={false}
      >
        {/* Top line */}
        <motion.span
          {...spanBaseProps}
          className={cn(spanBaseProps.className, 'w-5')}
          style={{ ...spanBaseProps.style, top: '30%' }}
          variants={{
            opened: {
              rotate: ['0deg', '0deg', '45deg'],
              top: ['30%', '50%', '50%'],
            },
            closed: {
              rotate: ['45deg', '0deg', '0deg'],
              top: ['50%', '50%', '30%'],
            },
          }}
        />

        {/* Middle line */}
        <motion.span
          {...spanBaseProps}
          className={cn(spanBaseProps.className, 'w-5')}
          style={{ ...spanBaseProps.style, top: '50%' }}
          variants={{
            opened: {
              rotate: ['0deg', '0deg', '-45deg'],
            },
            closed: {
              rotate: ['-45deg', '0deg', '0deg'],
            },
          }}
        />

        {/* Bottom line */}
        <motion.span
          {...spanBaseProps}
          className={cn(spanBaseProps.className, 'w-2.5')}
          style={{
            left: 'calc(50% + 5px)',
            bottom: '30%',
            x: '-50%',
            y: '50%',
          }}
          variants={{
            opened: {
              rotate: ['0deg', '0deg', '45deg'],
              left: '50%',
              bottom: ['30%', '50%', '50%'],
            },
            closed: {
              rotate: ['45deg', '0deg', '0deg'],
              left: 'calc(50% + 5px)',
              bottom: ['50%', '50%', '30%'],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};
export default StudentMobileMenuBtn;
