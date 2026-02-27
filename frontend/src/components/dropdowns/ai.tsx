import { cn } from '@/lib/utils';
import { RotateCcw, Send, Sparkles, SquarePen, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED = [
  'How do I make my first check-in?',
  'What is treasury bill about?',
  'How much do I need to save a month to reach GHS1million?',
];

function ThinkingDots() {
  return (
    <span className="flex items-center gap-1 text-sm text-[#A3A3A3]">
      <span>Thinking</span>
      <span className="flex gap-0.5 items-end pb-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block size-1 rounded-full bg-[#A3A3A3] animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </span>
    </span>
  );
}

interface ChatPanelProps {
  onClose: () => void;
}

function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setLoading(false);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system:
            'You are InvestAI, a personal investment AI assistant focused on Ghana and African financial markets. Be concise, helpful, and use simple language. Format responses with clear sections when needed.',
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: trimmed },
          ],
        }),
      });

      const data = await response.json();
      const content =
        data.content?.map((c: { text?: string }) => c.text || '').join('') ||
        'Sorry, I could not get a response.';

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col" style={{ width: 380, height: 480 }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] shrink-0">
        <div className="flex items-center gap-2">
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient
                id="sparkles-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#171717" />
                <stop offset="100%" stopColor="#7D7D7D" />
              </linearGradient>
            </defs>
          </svg>

          <Sparkles
            size={15}
            fill="url(#sparkles-gradient)"
            stroke="url(#sparkles-gradient)"
          />
          <span className="text-sm font-semibold text-[#0A0A0A]">
            Ask InvestAI
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            title="New chat"
            className="p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
          >
            <SquarePen size={15} color="#343330" />
          </button>
          <button
            onClick={handleReset}
            title="Reset"
            className="p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
          >
            <RotateCcw size={15} color="#343330" />
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
          >
            <X size={15} color="#737373" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        <p className="text-sm ">
          <span className="font-semibold">
            Hey there 👋! I am InvestAI, your personal investment AI assistant.
            Ask me anything.
          </span>
        </p>

        {messages.length === 0 && !loading && (
          <div className="flex flex-col gap-2 mt-1">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-left text-sm bg-[#F7F7F7] cursor-pointer hover:bg-[#F7F7F7]/60 text-[#1A1A1A] px-3 py-2.5 font-medium rounded-xl"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            {msg.role === 'user' ? (
              <div className="max-w-[80%] bg-[#297AFF] text-white text-sm rounded-2xl rounded-tr-sm px-3.5 py-2.5 leading-relaxed">
                {msg.content}
              </div>
            ) : (
              <div className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <ThinkingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 px-3 pb-3">
        <div className="flex items-center gap-2 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 focus-within:border-[#297AFF] transition-colors">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask anything"
            className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] outline-none"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className={cn(
              'flex items-center justify-center size-8 rounded-lg transition-all',
              input.trim() && !loading
                ? 'bg-[#297AFF] hover:bg-[#1a6ae0] text-white'
                : 'bg-[#E5E5E5] text-[#A3A3A3] cursor-not-allowed',
            )}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvestAIDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-linear-to-r rounded-[48px] text-sm gap-2 from-[#EF24EB] to-[#9B53FF]">
          <Sparkles fill="white" />
          Ask InvestAI
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-32}
        sideOffset={8}
        onInteractOutside={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onFocusOutside={(e) => e.preventDefault()}
        className="p-0 rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <ChatPanel onClose={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
