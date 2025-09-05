"use client"
import { Message, ROLES } from '@/types/chat';
import { Box, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HistoryIcon from '@mui/icons-material/History';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { getAIResponse } from '@/lib/actions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponents: ComponentProps<typeof ReactMarkdown>['components'] = {
    p: ({ node, ...props }) => <Typography {...(props as any)} sx={{ mb: 1, fontSize: '11px' }} />,
    strong: ({ node, ...props }) => <strong {...props} style={{ fontWeight: 'bold' }} />,
    em: ({ node, ...props }) => <em {...props} style={{ fontStyle: 'italic' }} />,
    ul: ({ node, ...props }) => <ul {...props} style={{ paddingLeft: '20px', marginBottom: '8px' }} />,
    ol: ({ node, ...props }) => <ol {...props} style={{ paddingLeft: '20px', marginBottom: '8px' }} />,
    li: ({ node, ...props }) => <li {...props} style={{ marginBottom: '4px' }} />,
    table: ({ node, ...props }) => <table {...props} style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '8px' }} />,
    th: ({ node, ...props }) => <th {...props} style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left', backgroundColor: '#f2f2f2' }} />,
    td: ({ node, ...props }) => <td {...props} style={{ border: '1px solid #ddd', padding: '4px' }} />,
};

const AiAssistantDialogue = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([
        { role: ROLES.SUGGESTION, content: "How much yarn do I need for size Small?"},
        { role: ROLES.SUGGESTION, content: "How many sizes are there?"},
        { role: ROLES.SUGGESTION, content: "Is this an actively supported pattern?"},
    ]);
  const messagesStartRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 👇 state for width/height
  const [size, setSize] = useState({ width: 250, height: 250 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; w: number; h: number } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()

      // On first message, clear suggestions
      if (messages.some(m => m.role === 'suggestion') && !messages.some(m => m.role === 'user')) {
        setMessages([{ role: ROLES.USER, content: input?.content || "" }]);
      } else {
        setMessages((prev) => [...prev, { role: ROLES.USER, content: input?.content || "" }]);
      }

      setInput(null);

      const aiResponse = await getAIResponse(input?.content ?? "");
      setMessages((prev) => [...prev, { role: ROLES.AI, content: aiResponse || "" }]);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearHistory = () => {
    setInput(null);
    setMessages([]);
  };

  // 👇 Resize handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      w: size.width,
      h: size.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeStartRef.current) return;
      const dx = e.clientX - resizeStartRef.current.mouseX;
      const dy = e.clientY - resizeStartRef.current.mouseY;
      setSize({
        width: Math.max(200, resizeStartRef.current.w + dx),  // min width = 200
        height: Math.max(200, resizeStartRef.current.h + dy), // min height = 200
      });
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, size]);

  return (
    <Box
      className="rounded-lg my-10 mx-8"
      sx={{
        position: "absolute",
        right: -12,
        bottom: 10,
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: "1px solid rgba(192,192,192, 0.25)",
        backdropFilter: "blur(2px)",
        boxShadow: `
          rgba(240, 46, 170, 0.4) 5px 5px, 
          rgba(240, 46, 170, 0.3) 10px 10px, 
          rgba(240, 46, 170, 0.2) 15px 15px, 
          rgba(240, 46, 170, 0.1) 20px 20px, 
          rgba(240, 46, 170, 0.05) 25px 25px;
        `
      }}
    >
      {/* Header */}
      <Box
        sx={{
          m: "2px 2px -24px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <HistoryIcon
          sx={{
            scale: 0.6,
            "&:hover": { color: "var(--purple)", opacity: 0.5, borderRadius: 6, cursor: "pointer" },
          }}
          onClick={clearHistory}
        />
        <CloseIcon
          sx={{
            ml: "-4px",
            scale: 0.6,
            "&:hover": { color: "var(--purple)", opacity: 0.5, borderRadius: 6, cursor: "pointer" },
          }}
          onClick={onClose}
        />
      </Box>

      {/* Body */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          scale: 0.85,
          backgroundColor: "rgba(192,192,192, 0.35)",
          borderRadius: 1,
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 2,
            overflow: "auto",
            p: 2,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box>
            <div ref={messagesStartRef} />
            {messages.map((msg: Message, i) => {
                if (msg.role === ROLES.AI) {
                    return (
                        <Box key={i} className="text-left" sx={{ fontSize: "11px" }}>
                            <strong>AI:</strong>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                                {msg.content}
                            </ReactMarkdown>
                        </Box>
                    );
                }

                const isUserMessage = msg.role === ROLES.USER;
                const isSuggestion = msg.role === ROLES.SUGGESTION;
                return (
                    <Typography
                        key={i}
                        fontSize="11px"
                        className={isUserMessage ? "text-right" : "text-left"}
                        sx={{ pl: isUserMessage ? "20px" : "0", pr: !isUserMessage ? "20px" : "0", opacity: isSuggestion ? "70%" : "100%" }}
                    >
                        <strong>{!isSuggestion && msg.role + ':'}</strong> {msg.content}
                    </Typography>
                );
            })}
            <div ref={messagesEndRef} />
          </Box>
        </Box>

        {/* User Input Form */}
        <form
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Jump to conversation top icon */}
            <ArrowUpwardIcon
              sx={{
                scale: 0.7,
                opacity: 0.7,
                "&:hover": { opacity: 0.5, borderRadius: 6 },
              }}
              onClick={scrollToTop}
            />
            <TextField
              fullWidth
              size="small"
              sx={{
                py: 1,
                pr: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": { borderColor: "transparent" },
                  fontSize: "11px",
                  bgcolor: "#f0f0f0",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(25, 31, 52, 0.9)",
                  fontStyle: "italic",
                  fontSize: "11px",
                },
                "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #f0f0f0 inset", // match your bg color
                    WebkitTextFillColor: "#000", // text color
                    caretColor: "#000",          // cursor color
                },
              }}
              placeholder="Type a message..."
              value={input?.content ?? ""}
              onChange={(e) => setInput({ role: ROLES.USER, content: e.target.value })}
            />
          </Box>
        </form>

      </Box>
    {/* resize handle */}
      <Box
          onMouseDown={handleMouseDown}
          sx={{
            position: "absolute",
            right: 2,
            bottom: 2,
            width: 6,
            height: 6,
            cursor: "se-resize",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 2,
          }}
        />
    </Box>
  );
};

export default AiAssistantDialogue;
