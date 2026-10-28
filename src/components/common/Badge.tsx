import React from 'react';
import { Info, Check, Award, Sparkles, Clock, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { RequestStatus } from '../../types';

interface TypicalBadgeProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TypicalRegionalBadge: React.FC<TypicalBadgeProps> = ({
  label = 'Typical Regional Characteristics',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-xs font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium tracking-wide border transition-colors ${sizeClasses} bg-[#FAF5EE] text-[#7A5B35] border-[#E8DAC2] ${className}`}
      title="Regional typical characteristics based on Ethiopian coffee origin profiles. Individual lot data is provided upon request."
    >
      <Info className={size === 'sm' ? 'w-3 h-3 text-[#B08130]' : 'w-3.5 h-3.5 text-[#B08130]'} />
      <span>{label}</span>
    </span>
  );
};

export const VerifiedInformationBadge: React.FC<{ label?: string; className?: string; size?: 'sm' | 'md' }> = ({
  label = '✓ Verified Information',
  className = '',
  size = 'md'
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold tracking-wide bg-[#EBF6EE] text-[#1D5E34] border border-[#BCE1C7] ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
      title="Confirmed company baseline or verified export parameter."
    >
      <Check className="w-3.5 h-3.5 text-[#1D5E34] stroke-[2.5]" />
      <span>{label.replace(/^✓\s*/, '')}</span>
    </span>
  );
};

export const VerifiedLotBadge = VerifiedInformationBadge;

export const GradeBadge: React.FC<{ grade?: string; className?: string; size?: 'sm' | 'md' }> = ({
  grade = 'Grade 1',
  className = '',
  size = 'md'
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold uppercase tracking-wider bg-[#14281D] text-[#C8963E] border border-[#C8963E]/40 ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
    >
      <Award className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{grade}</span>
    </span>
  );
};

export const CupScoreBadge: React.FC<{ score?: string; className?: string; size?: 'sm' | 'md' }> = ({
  score = 'Above 85',
  className = '',
  size = 'md'
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium bg-[#382417] text-[#FAF5EE] border border-[#523725] ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
    >
      <Sparkles className="w-3 h-3 text-[#C8963E]" />
      <span>Cup Score: {score}</span>
    </span>
  );
};

export const ProcessingBadge: React.FC<{ method: string; className?: string; size?: 'sm' | 'md' }> = ({
  method,
  className = '',
  size = 'md'
}) => {
  const isWashed = method.toLowerCase().includes('washed');
  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${
        isWashed
          ? 'bg-[#E3EFF9] text-[#1B4B75] border border-[#BFDBF1]'
          : 'bg-[#F9EFE6] text-[#7A3E1D] border border-[#ECCFBC]'
      } ${className}`}
    >
      {method}
    </span>
  );
};

export const AvailabilityBadge: React.FC<{
  availability?: string;
  status?: string;
  className?: string;
  size?: 'sm' | 'md';
}> = ({ availability, status, className = '', size = 'md' }) => {
  const val = availability || status || 'Available for Export';
  const isAvailable = val.toLowerCase().includes('available');
  const isProcessing = val.toLowerCase().includes('processing');
  const isHarvesting = val.toLowerCase().includes('harvesting');

  let colorClasses = 'bg-[#FAF5EE] text-[#7A5B35] border-[#E8DAC2]';
  if (isAvailable) {
    colorClasses = 'bg-[#EBF6EE] text-[#1D5E34] border-[#BCE1C7]';
  } else if (isProcessing) {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-200';
  } else if (isHarvesting) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium border ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]'
      } ${colorClasses} ${className}`}
    >
      {isAvailable ? (
        <CheckCircle2 className="w-3 h-3 text-[#1D5E34]" />
      ) : (
        <Clock className="w-3 h-3 text-[#7A5B35]" />
      )}
      <span>{val}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{
  status: RequestStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}> = ({ status, className = '', size = 'md' }) => {
  let styleClasses = 'bg-gray-100 text-gray-800 border-gray-300';
  let Icon = Clock;

  switch (status) {
    case 'Submitted':
      styleClasses = 'bg-amber-50 text-amber-800 border-amber-200';
      Icon = Clock;
      break;
    case 'Under Review':
      styleClasses = 'bg-blue-50 text-blue-800 border-blue-200';
      Icon = Info;
      break;
    case 'Quote Prepared':
      styleClasses = 'bg-purple-50 text-purple-800 border-purple-200';
      Icon = Sparkles;
      break;
    case 'Buyer Confirmation':
      styleClasses = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      Icon = AlertCircle;
      break;
    case 'Processing':
      styleClasses = 'bg-cyan-50 text-cyan-800 border-cyan-200';
      Icon = Clock;
      break;
    case 'Ready for Export':
      styleClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      Icon = CheckCircle2;
      break;
    case 'Completed':
      styleClasses = 'bg-green-100 text-green-900 border-green-300';
      Icon = Check;
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs'
      } ${styleClasses} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{status}</span>
    </span>
  );
};
