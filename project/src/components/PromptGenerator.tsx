import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateUniquePrompt } from '../utils/promptUtils';
import { buttonConfigs } from '../config/buttonConfig';
import PromptHistory from './PromptHistory';
import PromptButton from './PromptButton';
import type { Prompt, PromptType } from '../types';

function PromptGenerator() {
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptHistory, setPromptHistory] = useState<Prompt[]>([]);
  const [usedPrompts] = useState(new Set<string>());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('promptHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setPromptHistory(history);
      history.forEach((prompt: Prompt) => usedPrompts.add(prompt.text));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
  }, [promptHistory]);

  const handleGenerate = (type: PromptType) => {
    setIsGenerating(true);
    setCopied(false);
    
    setTimeout(() => {
      const newPrompt = generateUniquePrompt(type, usedPrompts);
      usedPrompts.add(newPrompt.text);
      setCurrentPrompt(newPrompt);
      setPromptHistory(prev => [...prev, newPrompt]);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = async () => {
    if (!currentPrompt) return;
    
    try {
      await navigator.clipboard.writeText(currentPrompt.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setCurrentPrompt(prompt);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Prompt Generator</h1>
          <p className="text-gray-300">Generate unique, professional prompts for Adobe Stock-style images</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {buttonConfigs.map((config) => (
              <PromptButton
                key={config.type}
                {...config}
                onClick={() => handleGenerate(config.type)}
                disabled={isGenerating}
              />
            ))}
          </div>

          <div className="relative">
            <div className={`bg-gray-700 rounded-lg p-6 min-h-[150px] transition-opacity duration-200 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Generated Prompt:</h2>
                {currentPrompt && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {currentPrompt ? currentPrompt.text : 'Click any button to generate a prompt'}
              </p>
            </div>
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>

        <PromptHistory prompts={promptHistory} onPromptSelect={handlePromptSelect} />

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Each prompt is uniquely generated and never repeats.</p>
          <p>Your prompt history is saved locally for future reference.</p>
        </div>
      </div>
    </div>
  );
}

export default PromptGenerator;