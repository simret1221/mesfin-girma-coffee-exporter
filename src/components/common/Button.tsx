import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { COMPANY } from '../../constants/company';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  href,
  isExternal = false,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2.5 text-sm font-medium',
    lg: 'px-6 py-3.5 text-base font-semibold'
  }[size];

  const variantClasses = {
    primary:
      'bg-[#14281D] hover:bg-[#1E3C2C] text-[#FBF9F5] shadow-sm border border-[#2A4C39] active:scale-[0.99] transition-all',
    secondary:
      'bg-[#382417] hover:bg-[#4A3020] text-[#FBF9F5] shadow-sm active:scale-[0.99] transition-all',
    gold:
      'bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-semibold shadow-sm active:scale-[0.99] transition-all',
    outline:
      'bg-transparent hover:bg-[#14281D]/5 text-[#14281D] border border-[#14281D]/30 hover:border-[#14281D] transition-all',
    whatsapp:
      'bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium shadow-sm transition-all',
    ghost:
      'bg-transparent hover:bg-black/5 text-[#14281D] transition-all'
  }[variant];

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center justify-center rounded-lg cursor-pointer text-center ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

export const WhatsAppButton: React.FC<{
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}> = ({
  message = 'Hello Mesfin Girma Gemeda Coffee, I am interested in inquiring about Ethiopian specialty coffee export.',
  size = 'md',
  className = '',
  label = 'Chat on WhatsApp'
}) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${COMPANY.whatsappNumber}?text=${encoded}`;

  return (
    <Button
      variant="whatsapp"
      size={size}
      href={url}
      isExternal
      icon={<MessageCircle className="w-4 h-4" />}
      className={className}
    >
      {label}
    </Button>
  );
};
