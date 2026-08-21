import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { Sparkles, Send, BookOpen, Trash2, ArrowRight } from 'lucide-react';

const SUGGESTED_QUERIES = [
  "What made me happiest last month?",
  "Show my most meaningful goals",
  "When did I write about work stress?",
  "What topics have I been reflecting on?",
];

export const PensievePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = { role: 'user', content: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await apiRequest('/pensieve/explore', {
        method: 'POST',
        body: JSON.stringify({ query: queryText, conversationId }),
      });

      setConversationId(res.conversationId);
      const assistantMsg = {
        role: 'assistant',
        content: res.answer,
        sources: res.sources || [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'The Pensieve water is turbulent. Failed to explore memories.', sources: [] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPensieve = async () => {
    if (conversationId) {
      try {
        await apiRequest(`/pensieve/conversations/${conversationId}`, { method: 'DELETE' });
      } catch (e) {
        console.error(e);
      }
    }
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gold-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            The Pensieve — AI Memory Vault
          </h1>
          <p className="font-serif italic text-parchment-300 text-xs mt-1">
            Immerse yourself in your memories using natural language exploration
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearPensieve}
            className="flex items-center gap-1 text-xs font-serif text-parchment-300 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Pensieve
          </button>
        )}
      </div>

      {/* Suggested Quick Prompt Chips */}
      {messages.length === 0 && (
        <ParchmentCard dark className="space-y-4">
          <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider">
            🔮 Stir the Pensieve Water — Ask a Question:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleSendQuery(q)}
                className="text-left p-3 rounded bg-black/40 border border-purple-500/30 hover:border-purple-400 text-xs font-sans text-parchment-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>"{q}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </ParchmentCard>
      )}

      {/* Chat Transcript Container */}
      <div className="space-y-4 min-h-[300px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-xl p-5 space-y-3 ${
                msg.role === 'user'
                  ? 'bg-gold-500/20 border border-gold-400/40 text-parchment-100 font-sans text-sm'
                  : 'parchment-dark-bg border border-purple-500/30 text-parchment-100 font-serif text-sm leading-relaxed'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-gold-400 font-bold mb-1">
                <span>{msg.role === 'user' ? '🧙‍♂️ You' : '🔮 Pensieve Assistant'}</span>
              </div>

              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Source Citations */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-3 border-t border-purple-500/20 space-y-1.5">
                  <span className="text-[10px] font-serif uppercase tracking-widest text-purple-300 block">
                    Grounded Sources & Referenced Memories:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src: any) => (
                      <Link
                        key={src.entryId}
                        to={`/diary/${src.entryId}`}
                        className="inline-flex items-center gap-1 text-xs font-sans bg-purple-950/60 border border-purple-500/40 px-2.5 py-1 rounded text-purple-200 hover:text-gold-300 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{src.date} — "{src.title}"</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="parchment-dark-bg border border-purple-500/30 p-4 rounded-xl text-xs font-serif text-purple-300 animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" /> Retrieving grounded diary memories...
            </div>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery(query);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your Pensieve memory assistant..."
          className="flex-1 px-4 py-3 bg-black/50 border border-purple-500/40 rounded-lg text-parchment-100 placeholder:text-parchment-700 focus:outline-none focus:border-purple-400 text-sm font-sans"
        />
        <MagicalButton type="submit" variant="spell" size="md" disabled={isLoading || !query.trim()}>
          <Send className="w-4 h-4" /> Seek
        </MagicalButton>
      </form>
    </div>
  );
};
