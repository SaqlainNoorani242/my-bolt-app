import React from 'react';
import { Prompt } from '../types';
import { Clock } from 'lucide-react';

interface PromptHistoryProps {
  prompts: Prompt[];
  onPromptSelect: (prompt: Prompt) => void;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ prompts, onPromptSelect }) => {
  if (prompts.length === 0) return null;

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} />
        <h2 className="text-xl font-semibold">Recent Prompts</h2>
      </div>
      <div className="space-y-4">
        {prompts.slice(-5).reverse().map((prompt) => (
          <div
            key={prompt.id}
            className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={() => onPromptSelect(prompt)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {new Date(prompt.timestamp).toLocaleTimeString()}
              </span>
              <span className="px-2 py-1 rounded text-xs capitalize bg-opacity-50" 
                style={{
                  backgroundColor: prompt.type === 'artistic' ? '#9333ea' :
                                 prompt.type === 'realistic' ? '#2563eb' : '#16a34a'
                }}>
                {prompt.type}
              </span>
            </div>
            <p className="text-sm text-gray-300">{prompt.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromptHistory;