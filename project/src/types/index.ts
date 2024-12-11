export type PromptType = 'artistic' | 'realistic' | 'stock' | 'background';

export interface Prompt {
  id: string;
  text: string;
  type: PromptType;
  timestamp: number;
}

export interface PromptHistory {
  prompts: Prompt[];
}

export interface ButtonConfig {
  type: PromptType;
  label: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}