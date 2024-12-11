import { Prompt, PromptType } from '../types';
import { technicalDetails, colors, textures, styles } from './promptData';

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const createBackgroundPrompt = () => {
  const technical = getRandomElement(technicalDetails.background);
  const colorStyle = getRandomElement(colors.gradients);
  const texture = getRandomElement(textures);
  const style = getRandomElement(styles.background);

  return `Generate a ${technical} background with ${colorStyle}. Incorporate ${texture} with a ${style} approach. Optimize for ${getRandomElement([
    "website backgrounds",
    "digital presentations",
    "marketing materials",
    "UI design",
    "brand identity",
    "commercial applications"
  ])}. Feature ${getRandomElement([
    "elegant sophistication",
    "modern simplicity",
    "dynamic energy",
    "corporate professionalism",
    "creative innovation"
  ])}.`;
};

export const generateUniquePrompt = (type: PromptType, usedPrompts: Set<string>): Prompt => {
  const createPrompt = () => {
    if (type === 'background') {
      return createBackgroundPrompt();
    }

    const technical = getRandomElement(technicalDetails[type]);
    const color = getRandomElement(colors.base);
    
    const basePrompts = {
      artistic: `Create a ${technical} ${color} artwork. Style: ${getRandomElement(styles.artistic)}. Focus on ${getRandomElement([
        "emotional impact", "visual storytelling", "artistic expression",
        "creative interpretation", "unique perspective", "innovative technique"
      ])}.`,
      
      realistic: `Capture a ${technical} photograph with ${color} palette. Composition featuring ${getRandomElement([
        "natural environment", "urban landscape", "human element",
        "architectural detail", "product showcase", "lifestyle moment"
      ])}. Emphasize ${getRandomElement([
        "authentic moments", "natural lighting", "genuine emotions",
        "real-world scenarios", "documentary style", "journalistic approach"
      ])}.`,
      
      stock: `Professional ${technical} image with ${color} scheme. Optimized for ${getRandomElement([
        "commercial usage", "marketing materials", "business presentations",
        "website headers", "social media", "print media"
      ])}. Include ${getRandomElement([
        "negative space", "modern aesthetic", "clean composition",
        "versatile layout", "professional setting", "lifestyle element"
      ])}.`
    };

    return basePrompts[type];
  };

  let newPrompt: string;
  do {
    newPrompt = createPrompt();
  } while (usedPrompts.has(newPrompt));

  return {
    id: Math.random().toString(36).substr(2, 9),
    text: newPrompt,
    type,
    timestamp: Date.now()
  };
};