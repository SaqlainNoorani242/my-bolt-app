import { ButtonConfig } from '../types';

export const buttonConfigs: ButtonConfig[] = [
  {
    type: 'artistic',
    label: 'Artistic',
    icon: 'Palette',
    bgColor: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700'
  },
  {
    type: 'realistic',
    label: 'Realistic',
    icon: 'Camera',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700'
  },
  {
    type: 'stock',
    label: 'Stock',
    icon: 'Image',
    bgColor: 'bg-green-600',
    hoverColor: 'hover:bg-green-700'
  },
  {
    type: 'background',
    label: 'Background',
    icon: 'Layers',
    bgColor: 'bg-amber-600',
    hoverColor: 'hover:bg-amber-700'
  }
];