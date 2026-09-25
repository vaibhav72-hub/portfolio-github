import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import './SpotlightCommandBar.css';
import type { AiStatus } from './AiCore3D';

interface SpotlightProps {
  onStatusChange: (status: AiStatus) => void;
  onIntentDecoded: (intent: string) => void;
}

const CONTEXT_PROMPT = `
You are the central nervous system of Vaibhav Pernole's interactive 3D portfolio.
You must classify the user's intent into one of the following exact sections to navigate to:
"hero", "about", "skills", "experience", "projects", "contact", "credentials".

If the user asks something general, say hello, or wants to explore, default to "hero".
If they ask about Python, SQL, ML, or skills, return "skills".
If they ask about his background or bio, return "about".
If they ask to see his work, projects, or specific apps, return "projects".
If they ask for his job history or internship, return "experience".
If they want to reach out, hire him, or message him, return "contact".
If they ask about certificates, awards, or degrees, return "credentials".

You MUST reply with ONLY ONE WORD from the list above. No punctuation, no other text.
`;

const SpotlightCommandBar: React.FC<SpotlightProps> = ({ onStatusChange, onIntentDecoded }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommand = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    onStatusChange('thinking');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("API Key missing. Defaulting to hero.");
        setTimeout(() => {
          onIntentDecoded('hero');
          setIsProcessing(false);
          onStatusChange('idle');
          setInput('');
        }, 1000);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${CONTEXT_PROMPT}\n\nUser: ${input}`,
      });

      const intent = (response.text || 'hero').trim().toLowerCase();
      const validIntents = ['hero', 'about', 'skills', 'experience', 'projects', 'contact', 'credentials'];
      
      const finalIntent = validIntents.includes(intent) ? intent : 'hero';
      
      onStatusChange('speaking'); // Brief flash of speaking color
      
      // Navigate/trigger 3D camera
      onIntentDecoded(finalIntent);
      
      setTimeout(() => {
        onStatusChange('idle');
        setIsProcessing(false);
        setInput('');
      }, 800);

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      onStatusChange('idle');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand();
    }
  };

  return (
    <div className={`spotlight-wrapper ${isFocused ? 'focused' : ''}`}>
      <div className="spotlight-bar">
        {isProcessing ? (
          <Loader2 className="spotlight-icon spinning" size={20} />
        ) : (
          <Search className="spotlight-icon" size={20} />
        )}
        <input
          type="text"
          placeholder="Ask me to navigate (e.g. 'Show me your projects')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          className="spotlight-input"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SpotlightCommandBar;
