import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, User, Bot, Clipboard, Search, BookOpen, FileText } from 'lucide-react';

export default function ContractTechBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your Contract Tech Bot. I can help with contract questions, system training, and more. What can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge Base
  const knowledgeBase = {
    'contract termination': {
      keywords: ['terminate', 'cancel', 'end contract'],
      answer: 'Contract termination typically requires 30-90 days written notice. Review your termination clause and ensure all payments are complete.'
    },
    'payment terms': {
      keywords: ['payment', 'invoice', 'net 30', 'net 60'],
      answer: 'Net 30 means payment due within 30 days. Net 60 means 60 days. Check your contract for specific terms.'
    },
    'create contract': {
      keywords: ['create', 'new contract', 'form'],
      answer: 'Go to Contracts > Create New Contract. Select a template, fill required fields, and save as draft.'
    },
    'search contracts': {
      keywords: ['search', 'find', 'contract id', 'vendor'],
      answer: 'Use the search bar to find contracts by ID, vendor name, keywords, dates, or status.'
    },
    'approval workflow': {
      keywords: ['approval', 'pending', 'approved', 'rejected'],
      answer: 'Submit for approval in the contract details. Track status in the workflow section.'
    },
    'renewal alerts': {
      keywords: ['renewal', 'expiration', 'alert', 'expire'],
      answer: 'Renewal alerts are sent automatically before contract expiration. Check your dashboard for expiring contracts.'
    }
  };

  const searchKnowledgeBase = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const [key, article] of Object.entries(knowledgeBase)) {
      for (const keyword of article.keywords) {
        if (lowerQuery.includes(keyword)) {
          return { title: key, answer: article.answer };
        }
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const match = searchKnowledgeBase(input);
    
    let botMessage;
    if (match) {
      botMessage = {
        id: messages.length + 2,
        type: 'bot',
        hasArticle: true,
        title: match.title,
        text: match.answer,
        timestamp: new Date()
      };
    } else {
      botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'I don\'t have an answer to that question. Please click "Report Issue" to escalate to our team.',
        timestamp: new Date()
      };
    }

    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  const handleReportIssue = () => {
    window.open('https://cmphdox67000ggoufnt9hjstr.zapier.app/', '_blank');
    const botMessage = {
      id: messages.length + 1,
      type: 'bot',
      text: 'A form has opened in a new window. Please submit your issue details there. Our team will respond within 2 business hours.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh', fontFamily: 'system-ui' }} className="flex flex-col">
      <div style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }} className="bg-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Clipboard className="w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold">Contract Tech Bot</h1>
            <p className="text-slate-400 text-sm">Knowledge-powered support</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }} className="rounded-lg p-4 max-w-2xl">
                  <div className="flex items-start gap-2">
                    <Bot className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      {message.hasArticle && (
                        <div style={{ background: 'rgba(34, 197, 94, 0.1)', borderLeft: '3px solid #22c55e' }} className="mb-3 p-3 rounded">
                          <div className="flex items-center gap-2 text-green-400 mb-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-semibold">Knowledge Article</span>
                          </div>
                          <p className="text-slate-300 text-xs font-semibold">{message.title}</p>
                        </div>
                      )}
                      <div className="text-slate-300 text-sm">{message.text}</div>
                    </div>
                  </div>
                </div>
              )}
              {message.type === 'user' && (
                <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }} className="rounded-lg p-4 max-w-2xl">
                  <div className="text-white text-sm">{message.text}</div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div style={{ background: 'rgba(30, 41, 59, 0.8)' }} className="rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="text-slate-400 text-sm">Searching knowledge base...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)' }} className="bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 mb-3">
            <button
              onClick={handleReportIssue}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#cbd5e1', border: '1px solid rgba(148, 163, 184, 0.2)' }}
            >
              Report Issue
            </button>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about contracts, system usage, or other questions..."
              className="flex-1 px-4 py-3 rounded-lg text-white outline-none"
              style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-lg font-medium"
              style={{ background: input.trim() && !loading ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' : 'rgba(148, 163, 184, 0.1)', color: '#ffffff' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
