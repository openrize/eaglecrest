import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
}

export default function Button({
    className = '',
    variant = 'primary',
    size = 'md',
    href,
    children,
    ...props
}: ButtonProps) {
    // Map variants to global CSS classes defined in globals.css
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        outline: 'btn-outline', // Need to add this to globals.css
        ghost: 'btn-ghost', // Need to add this to globals.css
    };

    const sizeStyles = {
        sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
        md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
        lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    };

    const combinedClassName = `btn ${variantClasses[variant] || 'btn-primary'} ${className}`;
    const style = sizeStyles[size] || sizeStyles.md;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} style={style}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} style={style} {...props}>
            {children}
        </button>
    );
}
