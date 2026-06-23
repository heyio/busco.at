import { ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    size: {
      h1: 'text-4xl md:text-[48px] lg:text-[64px] leading-[1.125]',
      h2: 'text-3xl md:text-[40px] lg:text-[56px] leading-[1.125]',
      h3: 'text-2xl md:text-[36px] leading-[1.125]',
      h4: 'text-xl md:text-[24px] leading-[1.5]',
      h5: 'text-lg leading-[1.5] tracking-wide',
      md: 'text-md tracking-wider',
      sm: 'text-sm tracking-wider',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      normal: 'font-normal',
      light: 'font-light',
      extralight: 'font-extralight',
    },
    textColor: {
      foreground: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      white: 'text-white',
      gray: 'text-gray-700',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    textColor: 'foreground',
  },
});

type AsProp<T extends ElementType> = {
  type?: T;
};

type TypographyProps<T extends ElementType> = AsProp<T> &
  React.ComponentPropsWithoutRef<T> &
  VariantProps<typeof typographyVariants>;

const Typography = <T extends ElementType = 'p'>({
  type,
  className,
  size,
  weight,
  textColor,
  ...props
}: TypographyProps<T>) => {
  const Component = type || 'p';
  return (
    <Component
      className={cn(typographyVariants({ size, weight, textColor, className }))}
      {...props}
    />
  );
};

export default Typography;
