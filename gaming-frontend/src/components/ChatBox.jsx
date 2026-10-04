import { useEffect, useRef, useState } from "react";
import API from "../api/axios";

const SUGGESTIONS = [
  "What do you have for PS5?",
  "Show me accessories under $50",
  "Which controller is best?",
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text) => {
    const textToSend = (text ?? message).trim();

    if (!textToSend || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: textToSend }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await API.get(
        `/ai/chat?message=${encodeURIComponent(textToSend)}`
      );

      const reply =
        typeof res.data === "string"
          ? res.data
          : res.data?.reply || res.data?.message || "";

      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "I could not reach the assistant just now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close shopping assistant" : "Open shopping assistant"}
        title={open ? "Close assistant" : "Ask the shopping assistant"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
          </svg>
        )}
      </button>

      {open ? (
        <section
          className="chat-panel"
          role="dialog"
          aria-label="Shopping assistant"
        >
          <header className="chat-panel__head">
            <span className="chat-panel__dot" aria-hidden="true" />
            <h2 className="chat-panel__title">Shopping assistant</h2>

            <button
              type="button"
              className="chat-panel__close"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div className="chat-panel__log" ref={logRef} aria-live="polite">
            {messages.length === 0 && !loading ? (
              <div className="chat-panel__empty">
                <p style={{ margin: "0 0 12px" }}>
                  Ask me what to look for.
                </p>

                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="btn btn--ghost btn--sm"
                    style={{ margin: "0 4px 6px" }}
                    onClick={() => send(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg chat-msg--${m.from === "user" ? "user" : "ai"}`}
              >
                {m.text}
              </div>
            ))}

            {loading ? (
              <div className="chat-msg chat-msg--ai">
                <span
                  className="spinner spinner--sm"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  aria-label="Assistant is typing"
                />
              </div>
            ) : null}
          </div>

          <form
            className="chat-panel__form"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              id="chat-message-input"
              name="chatMessage"
              ref={inputRef}
              type="text"
              className="field"
              placeholder="Ask about products…"
              value={message}
              maxLength={300}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn--sm"
              disabled={loading || !message.trim()}
            >
              Send
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}

export default ChatBot;
