import React from 'react';
import { ButtonConfig } from '../types';
import * as Icons from 'lucide-react';

interface PromptButtonProps extends ButtonConfig {
  onClick: () => void;
  disabled: boolean;
}

const PromptButton: React.FC<PromptButtonProps> = ({
  label,
  icon,
  bgColor,
  hoverColor,
  onClick,
  disabled
}) => {
  const Icon = Icons[icon as keyof typeof Icons];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 ${bgColor} ${hoverColor} text-white px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50`}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}

export default PromptButton;