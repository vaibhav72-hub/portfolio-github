import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AiCore3D, { AiStatus } from './AiCore3D';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const AiAssistant: React.FC = () => {
  const [status, setStatus] = useState<AiStatus>('idle');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Hello! I am your AI assistant. Ask me anything to see my 3D core react.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || status !== 'idle') return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    
    // 1. Thinking State
    setStatus('thinking');
    
    // Mock network delay (thinking...)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Speaking State
    setStatus('speaking');
    
    const mockResponse = "I'm a simulated AI! In a real integration, this text would be streamed from an LLM like Google's Gemini, and I would pulse to the rhythm of the text generation. Isn't this 3D effect cool?";
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: '' }]);
    
    // Mock streaming text (speaking...)
    let currentText = '';
    const words = mockResponse.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = currentText;
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 100)); // typing speed
    }

    // 3. Back to Idle
    setTimeout(() => {
      setStatus('idle');
    }, 500);
  };

  const handleMicClick = () => {
    if (status === 'listening') {
      setStatus('idle');
    } else {
      setStatus('listening');
      // Mock listening timeout
      setTimeout(() => {
        setStatus(prev => prev === 'listening' ? 'idle' : prev);
      }, 3000);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 3D Core Display */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '320px', position: 'relative', border: '1px solid rgba(56, 189, 248, 0.2)', background: 'rgba(15, 23, 42, 0.4)' }}>
        <div style={{ position: 'absolute', top: 16, left: 20, zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Sparkles className="w-4 h-4" style={{ color: status === 'listening' ? '#10B981' : status === 'thinking' ? '#F59E0B' : status === 'speaking' ? '#8B5CF6' : '#38BDF8' }} />
           <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}>
             AI Core: <span style={{ color: status === 'listening' ? '#10B981' : status === 'thinking' ? '#F59E0B' : status === 'speaking' ? '#8B5CF6' : '#38BDF8', transition: 'color 0.3s ease' }}>{status}</span>
           </span>
        </div>
        <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading 3D...</div>}>
          <AiCore3D status={status} />
        </Suspense>
      </div>

      {/* Chat Interface */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '350px', padding: '20px' }}>
        
        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', paddingRight: '8px' }}>
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={msg.id} 
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--accent-cyan)' : 'rgba(30, 41, 59, 0.8)',
                color: msg.role === 'user' ? '#000' : 'var(--text-primary)',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                maxWidth: '85%',
                fontSize: '0.95rem',
                border: msg.role === 'ai' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                boxShadow: msg.role === 'user' ? '0 4px 15px rgba(56, 189, 248, 0.2)' : 'none',
                lineHeight: 1.5
              }}
              >
                {msg.content}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
          <button 
            type="button" 
            onClick={handleMicClick}
            style={{ 
              background: status === 'listening' ? 'rgba(16, 185, 129, 0.15)' : 'transparent', 
              border: status === 'listening' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent', 
              color: status === 'listening' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={status === 'listening' ? "Listening..." : "Ask me anything..."}
            disabled={status === 'thinking' || status === 'speaking'}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '12px 20px',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <button 
            type="submit"
            disabled={!input.trim() || status !== 'idle'}
            style={{
              background: input.trim() && status === 'idle' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
              color: input.trim() && status === 'idle' ? '#000' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && status === 'idle' ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: input.trim() && status === 'idle' ? '0 4px 15px rgba(56, 189, 248, 0.3)' : 'none'
            }}
          >
            <Send className="w-4 h-4" style={{ marginLeft: '2px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant;
