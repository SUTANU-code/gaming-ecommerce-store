import { useState, useEffect, useRef } from "react";
import API from "../api/axios";

const SUGGESTIONS = [
    "What games do you have?",
    "Recommend me an RPG",
    "What's under ₹2000?",
    "Do you sell accessories?",
];

function ChatBot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hey! I'm your Gaming AI assistant 🎮 I can help you find games, recommend products, and answer any questions about our store. What are you looking for?"
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [unread, setUnread] = useState(0);
    const bottomRef = useRef(null);

    useEffect(() => {
        API.get("/products")
            .then(res => {
                console.log("✅ Products loaded:", res.data.length);
                setProducts(res.data);
            })
            .catch(err => console.log("❌ Products failed:", err));
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (!open) setUnread(0);
    }, [open]);

    // ✅ FIXED — shorter context, saves tokens
    const buildContextWithProducts = (productList) => {
        if (!productList || productList.length === 0) {
            return `You are GAME-X AI, a gaming store assistant. Be short and friendly.`;
        }

        const list = productList.map(p =>
            `${p.id}:${p.name}|${p.category}|₹${p.price}`
        ).join("\n");

        return `You are GAME-X AI for GameStore. Be short and punchy.
ONLY recommend products from this list. No other products exist.
For product questions respond ONLY as JSON (no markdown):
{"type":"products","reply":"<message>","matches":[{"id":<id>,"name":"<name>","price":<price>,"category":"<cat>","reason":"<why>"}]}
For other questions respond as plain text.
PRODUCTS:
${list}`;
    };

    const handleAddToCart = async (productId) => {
        try {
            await API.post("/cart/add", { productId, quantity: 1 });
            setMessages(prev => [...prev, {
                sender: "ai",
                text: "✅ Added to your cart! Anything else?"
            }]);
        } catch {
            setMessages(prev => [...prev, {
                sender: "ai",
                text: "❌ Couldn't add to cart — make sure you're logged in!"
            }]);
        }
    };

    const sendMessage = async (text, retryCount = 0) => {
        const msgText = text || message;
        if (!msgText.trim()) return;

        if (retryCount === 0) {
            setMessages(prev => [...prev, { sender: "user", text: msgText }]);
            setMessage("");
            setLoading(true);
        }

        try {
            let currentProducts = products;
            if (currentProducts.length === 0) {
                console.log("⚠️ Products empty, fetching...");
                const res = await API.get("/products");
                currentProducts = res.data;
                setProducts(res.data);
            }

            const context = buildContextWithProducts(currentProducts);
            console.log("📦 Products:", currentProducts.length);
            console.log("📝 Context length:", context.length);

            const res = await API.post("/ai/chat", {
                message: msgText,
                context: context
            });

            const raw = res.data?.trim();

            if (raw.includes("heavy load") && retryCount < 3) {
                console.log(`⚡ Retrying... attempt ${retryCount + 1}`);
                setTimeout(() => sendMessage(msgText, retryCount + 1), 3000);
                return;
            }

            let aiMsg;
            try {
                const parsed = JSON.parse(raw);
                if (parsed.type === "products") {
                    aiMsg = { sender: "ai", text: parsed.reply, products: parsed.matches };
                } else {
                    aiMsg = { sender: "ai", text: raw };
                }
            } catch {
                aiMsg = { sender: "ai", text: raw };
            }

            setMessages(prev => [...prev, aiMsg]);
            if (!open) setUnread(u => u + 1);

        } catch (err) {
            console.log("❌ Chat error:", err);
            if (retryCount < 2) {
                setTimeout(() => sendMessage(msgText, retryCount + 1), 3000);
                return;
            }
            setMessages(prev => [...prev, {
                sender: "ai",
                text: "😔 AI is busy right now. Try again in a moment!"
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={styles.floatingBtn} onClick={() => setOpen(!open)}>
                <span style={{ fontSize: "24px" }}>{open ? "✕" : "🎮"}</span>
                {unread > 0 && !open && (
                    <span style={styles.unreadBadge}>{unread}</span>
                )}
            </div>

            {open && (
                <div style={styles.chatBox}>
                    <div style={styles.header}>
                        <div style={styles.headerLeft}>
                            <div style={styles.avatar}>AI</div>
                            <div>
                                <p style={styles.botName}>Gaming AI</p>
                                <p style={styles.botStatus}>
                                    <span style={styles.statusDot} />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
                    </div>

                    <div style={styles.messages}>
                        {messages.map((msg, i) => (
                            <div key={i} style={msg.sender === "user" ? styles.userRow : styles.aiRow}>
                                {msg.sender === "ai" && <div style={styles.aiAvatar}>AI</div>}
                                <div style={{ maxWidth: "85%", display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={msg.sender === "user" ? styles.userBubble : styles.aiBubble}>
                                        {msg.text}
                                    </div>
                                    {msg.products?.map((p) => (
                                        <div key={p.id} style={styles.productCard}>
                                            <div style={styles.productCardTop}>
                                                <span style={styles.productName}>{p.name}</span>
                                                <span style={styles.productPrice}>₹{p.price}</span>
                                            </div>
                                            <span style={styles.productCategory}>{p.category}</span>
                                            <p style={styles.productReason}>{p.reason}</p>
                                            <button
                                                style={styles.addToCartBtn}
                                                onClick={() => handleAddToCart(p.id)}
                                                onMouseEnter={e => e.currentTarget.style.background = "#16a34a"}
                                                onMouseLeave={e => e.currentTarget.style.background = "#22c55e"}
                                            >
                                                + Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div style={styles.aiRow}>
                                <div style={styles.aiAvatar}>AI</div>
                                <div style={styles.aiBubble}>
                                    <span className="typing">
                                        <span>•</span><span>•</span><span>•</span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {messages.length <= 1 && (
                        <div style={styles.suggestions}>
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    style={styles.suggestionBtn}
                                    onClick={() => sendMessage(s)}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "#0f2010";
                                        e.currentTarget.style.borderColor = "#22c55e66";
                                        e.currentTarget.style.color = "#22c55e";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.borderColor = "#1f1f1f";
                                        e.currentTarget.style.color = "#6b7280";
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div style={styles.inputRow}>
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                            placeholder="Ask about games..."
                            style={styles.input}
                        />
                        <button
                            onClick={() => sendMessage()}
                            style={{ ...styles.sendBtn, opacity: loading || !message.trim() ? 0.5 : 1 }}
                            disabled={loading || !message.trim()}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes blink {
                    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
                    40% { opacity: 1; transform: scale(1); }
                }
                .typing span {
                    display: inline-block;
                    animation: blink 1.4s infinite;
                    margin: 0 1px;
                    font-size: 18px;
                }
                .typing span:nth-child(2) { animation-delay: 0.2s; }
                .typing span:nth-child(3) { animation-delay: 0.4s; }
            `}</style>
        </>
    );
}

const styles = {
    floatingBtn: {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#22c55e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
        transition: "transform 0.2s",
        userSelect: "none"
    },
    unreadBadge: {
        position: "absolute",
        top: "-4px",
        right: "-4px",
        background: "#ef4444",
        color: "#fff",
        fontSize: "11px",
        fontWeight: "700",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    chatBox: {
        position: "fixed",
        bottom: "96px",
        right: "25px",
        width: "360px",
        height: "520px",
        background: "#0d0d0d",
        border: "1px solid #1a2e1a",
        borderRadius: "18px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px",
        borderBottom: "1px solid #141414",
        background: "#0f0f0f",
        flexShrink: 0
    },
    headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
    avatar: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#0f2010",
        border: "1px solid #22c55e44",
        color: "#22c55e",
        fontSize: "11px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    botName: { color: "#fff", fontSize: "14px", fontWeight: "600", margin: 0 },
    botStatus: {
        color: "#6b7280",
        fontSize: "11px",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "4px"
    },
    statusDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#22c55e",
        display: "inline-block"
    },
    closeBtn: {
        background: "transparent",
        border: "none",
        color: "#6b7280",
        fontSize: "16px",
        cursor: "pointer",
        padding: "4px",
        lineHeight: 1
    },
    messages: {
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    aiRow: { display: "flex", alignItems: "flex-start", gap: "8px" },
    userRow: { display: "flex", justifyContent: "flex-end" },
    aiAvatar: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#0f2010",
        border: "1px solid #22c55e33",
        color: "#22c55e",
        fontSize: "9px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "2px"
    },
    aiBubble: {
        background: "#141414",
        border: "1px solid #1f1f1f",
        color: "#e5e7eb",
        padding: "10px 14px",
        borderRadius: "14px 14px 14px 4px",
        fontSize: "13px",
        lineHeight: "1.6",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap"
    },
    userBubble: {
        background: "#22c55e",
        color: "#000",
        padding: "10px 14px",
        borderRadius: "14px 14px 4px 14px",
        fontSize: "13px",
        lineHeight: "1.6",
        fontWeight: "500",
        wordBreak: "break-word"
    },
    suggestions: {
        padding: "0 12px 12px",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        flexShrink: 0
    },
    suggestionBtn: {
        background: "transparent",
        border: "1px solid #1f1f1f",
        color: "#6b7280",
        fontSize: "11px",
        padding: "6px 12px",
        borderRadius: "20px",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.2s"
    },
    inputRow: {
        display: "flex",
        gap: "8px",
        padding: "12px 14px",
        borderTop: "1px solid #141414",
        background: "#0f0f0f",
        flexShrink: 0
    },
    input: {
        flex: 1,
        background: "#141414",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        color: "#fff",
        padding: "10px 14px",
        fontSize: "13px",
        outline: "none",
        fontFamily: "'Inter', sans-serif"
    },
    sendBtn: {
        background: "#22c55e",
        border: "none",
        borderRadius: "10px",
        color: "#000",
        width: "40px",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "opacity 0.2s"
    },
    productCard: {
        background: "#0f1a0f",
        border: "1px solid #22c55e22",
        borderRadius: "12px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    productCardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    productName: { color: "#fff", fontSize: "13px", fontWeight: "600" },
    productPrice: {
        color: "#22c55e",
        fontSize: "13px",
        fontWeight: "700",
        fontFamily: "'Rajdhani', sans-serif"
    },
    productCategory: {
        color: "#6b7280",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    productReason: {
        color: "#9ca3af",
        fontSize: "12px",
        margin: "4px 0 8px",
        lineHeight: "1.5"
    },
    addToCartBtn: {
        background: "#22c55e",
        border: "none",
        borderRadius: "8px",
        color: "#000",
        fontSize: "12px",
        fontWeight: "600",
        padding: "7px 12px",
        cursor: "pointer",
        alignSelf: "flex-start",
        transition: "background 0.2s",
        fontFamily: "'Inter', sans-serif"
    }
};

export default ChatBot;