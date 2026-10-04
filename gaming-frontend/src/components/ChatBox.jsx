import { useState } from "react";
import API from "../api/axios";

function ChatBot() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

   
    const [open, setOpen] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) {
            return;
        }

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        try {

            const res = await API.get(
                `/ai/chat?message=${encodeURIComponent(currentMessage)}`
            );

            const aiMessage = {
                sender: "ai",
                text: res.data,
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {

            console.error(error);

            const errorMessage = {
                sender: "ai",
                text: "Something went wrong. Please try again.",
            };

            setMessages((prev) => [...prev, errorMessage]);

        } finally {

            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (

        <>
            {/* ✅ FLOATING BUTTON */}

            <div
                style={styles.floatingButton}
                onClick={() => setOpen(!open)}
            >
                🎮
            </div>

            {/* ✅ POPUP CHATBOX */}

            {
                open && (

                    <div style={styles.chatBox}>

                        <div style={styles.topBar}>

                            <h2 style={styles.heading}>
                                Gaming AI
                            </h2>

                            <button
                                style={styles.closeButton}
                                onClick={() => setOpen(false)}
                            >
                                ✖
                            </button>

                        </div>

                        <div style={styles.messagesContainer}>

                            {
                                messages.map((msg, index) => (

                                    <div
                                        key={index}
                                        style={
                                            msg.sender === "user"
                                                ? styles.userMessage
                                                : styles.aiMessage
                                        }
                                    >
                                        {msg.text}
                                    </div>
                                ))
                            }

                            {
                                loading && (
                                    <div style={styles.aiMessage}>
                                        AI is thinking...
                                    </div>
                                )
                            }

                        </div>

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask about games..."
                            style={styles.input}
                        />

                        <button
                            onClick={sendMessage}
                            style={styles.button}
                        >
                            Send
                        </button>

                    </div>
                )
            }
        </>
    );
}

const styles = {

    // ✅ SMALL FLOATING ICON

    floatingButton: {

        position: "fixed",

        bottom: "25px",

        right: "25px",

        width: "65px",

        height: "65px",

        borderRadius: "50%",

        background: "#22c55e",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "28px",

        cursor: "pointer",

        zIndex: 1000,

        boxShadow: "0 0 20px rgba(34,197,94,0.5)",
    },

    // ✅ POPUP CHATBOX

    chatBox: {

        position: "fixed",

        bottom: "100px",

        right: "25px",

        width: "340px",

        height: "480px",

        background: "rgba(20,20,25,0.97)",

        border: "1px solid rgba(255,255,255,0.1)",

        borderRadius: "20px",

        padding: "15px",

        color: "white",

        zIndex: 999,

        display: "flex",

        flexDirection: "column",

        backdropFilter: "blur(10px)",

        boxShadow: "0 0 25px rgba(34,197,94,0.3)",
    },

    topBar: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "10px",
    },

    heading: {

        color: "#22c55e",

        fontSize: "20px",

        margin: 0,
    },

    closeButton: {

        background: "transparent",

        border: "none",

        color: "white",

        fontSize: "18px",

        cursor: "pointer",
    },

    messagesContainer: {

        flex: 1,

        overflowY: "auto",

        display: "flex",

        flexDirection: "column",

        gap: "10px",

        marginBottom: "10px",
    },

    userMessage: {

        alignSelf: "flex-end",

        background: "#22c55e",

        color: "white",

        padding: "10px 14px",

        borderRadius: "15px",

        maxWidth: "80%",

        wordWrap: "break-word",
    },

    aiMessage: {

        alignSelf: "flex-start",

        background: "#2d2d35",

        color: "#f3f4f6",

        padding: "10px 14px",

        borderRadius: "15px",

        maxWidth: "80%",

        wordWrap: "break-word",

        whiteSpace: "pre-wrap",
    },

    input: {

        width: "100%",

        padding: "12px",

        borderRadius: "10px",

        border: "none",

        outline: "none",

        marginBottom: "10px",

        boxSizing: "border-box",
    },

    button: {

        width: "100%",

        padding: "12px",

        border: "none",

        borderRadius: "10px",

        background: "#22c55e",

        color: "white",

        fontWeight: "bold",

        cursor: "pointer",
    },
};

export default ChatBot;