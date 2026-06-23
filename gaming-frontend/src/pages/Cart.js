import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Cart() {
    const [cart, setCart] = useState([]);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        API.get("/cart")
            .then(res => setCart(res.data))
            .catch(err => console.log(err));
    }, []);

    // REMOVE FROM CART — optimistic UI
    const removeFromCart = async (itemId) => {
        const previous = cart;
        setCart(prev => prev.filter(item => item.cartItemId !== itemId));
        try {
            await API.delete(`/cart/remove/${itemId}`);
            toast.success("Item removed");
        } catch (err) {
            setCart(previous);
            toast.error("Failed to remove item");
        }
    };

    const loadRazorpayScript = () => new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    const placeOrder = async () => {
        setPaying(true);
        try {
            const loaded = await loadRazorpayScript();
            if (!loaded) { toast.error("Razorpay failed to load"); return; }

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const response = await API.post("/payment/create-order", { amount: Number(total) }, { headers: { "Content-Type": "application/json" } });
            const data = response.data;

            const options = {
                key: "rzp_test_SnkZ0PZaU8BhrZ",
                amount: data.amount,
                currency: data.currency,
                name: "GameStore",
                description: "Game Purchase",
                order_id: data.id,
                handler: async () => {
                    toast.success("Payment successful!");
                    try { await API.post("/order/place"); } catch (e) { console.log(e); }
                },
                prefill: { name: "Gaming User", email: "user@gmail.com", contact: "9999999999" },
                theme: { color: "#22c55e" }
            };
            new window.Razorpay(options).open();
        } catch (err) {
            toast.error("Payment failed");
        } finally {
            setPaying(false);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={styles.page}>
            <div style={styles.content}>

                {/* HEADER */}
                <div style={styles.header}>
                    <div style={styles.headerTag}>Your cart</div>
                    <h1 style={styles.heading}>YOUR <span style={styles.headingGreen}>CART</span></h1>
                    <p style={styles.subtitle}>Ready to complete your legendary purchase?</p>
                </div>

                {cart.length === 0 ? (
                    <div style={styles.emptyBox}>
                        <div style={styles.emptyIcon}>🛒</div>
                        <h2 style={styles.emptyText}>Your cart is empty</h2>
                        <p style={styles.emptySubText}>Add some epic games to continue</p>
                    </div>
                ) : (
                    <div style={styles.layout}>

                        {/* CART ITEMS */}
                        <div style={styles.itemsList}>
                            {cart.map((item) => (
                                <div key={item.cartItemId} style={styles.card}>
                                    <div style={styles.cardLeft}>
                                        <div style={styles.itemIcon}>🎮</div>
                                        <div>
                                            <h3 style={styles.productName}>{item.productName}</h3>
                                            <p style={styles.quantity}>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div style={styles.cardRight}>
                                        <span style={styles.price}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        <button
                                            style={styles.removeBtn}
                                            onClick={() => removeFromCart(item.cartItemId)}
                                            onMouseEnter={e => e.currentTarget.style.background = "#2a1010"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            🗑 Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ORDER SUMMARY */}
                        <div style={styles.summary}>
                            <h3 style={styles.summaryTitle}>Order summary</h3>

                            <div style={styles.summaryRow}>
                                <span style={styles.summaryLabel}>Items ({cart.length})</span>
                                <span style={styles.summaryValue}>₹{total.toLocaleString()}</span>
                            </div>
                            <div style={styles.summaryRow}>
                                <span style={styles.summaryLabel}>Delivery</span>
                                <span style={{ ...styles.summaryValue, color: "#22c55e" }}>Free</span>
                            </div>

                            <div style={styles.divider} />

                            <div style={styles.summaryRow}>
                                <span style={styles.totalLabel}>Total</span>
                                <span style={styles.totalPrice}>₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                style={{ ...styles.payBtn, opacity: paying ? 0.7 : 1 }}
                                onClick={placeOrder}
                                disabled={paying}
                            >
                                {paying ? "Processing..." : "Pay now →"}
                            </button>

                            <p style={styles.secureText}>🔒 Secured by Razorpay</p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Inter', sans-serif",
        padding: "40px 24px"
    },
    content: {
        maxWidth: "1100px",
        margin: "0 auto"
    },
    header: {
        textAlign: "center",
        marginBottom: "48px"
    },
    headerTag: {
        display: "inline-block",
        background: "#0f2010",
        border: "1px solid #22c55e33",
        color: "#22c55e",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "2px",
        padding: "6px 16px",
        borderRadius: "20px",
        marginBottom: "16px",
        textTransform: "uppercase"
    },
    heading: {
        fontFamily: "'Rajdhani', sans-serif",
        color: "#fff",
        fontSize: "52px",
        fontWeight: "700",
        letterSpacing: "4px",
        marginBottom: "10px"
    },
    headingGreen: { color: "#22c55e" },
    subtitle: { color: "#6b7280", fontSize: "15px" },
    emptyBox: {
        background: "#0f0f0f",
        border: "1px solid #1a1a1a",
        borderRadius: "16px",
        padding: "64px",
        textAlign: "center"
    },
    emptyIcon: { fontSize: "48px", marginBottom: "16px" },
    emptyText: { color: "#fff", fontSize: "22px", fontWeight: "600", marginBottom: "8px" },
    emptySubText: { color: "#6b7280", fontSize: "14px" },
    layout: {
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "24px",
        alignItems: "start"
    },
    itemsList: { display: "flex", flexDirection: "column", gap: "12px" },
    card: {
        background: "#0f0f0f",
        border: "1px solid #1a1a1a",
        borderRadius: "14px",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px"
    },
    cardLeft: { display: "flex", alignItems: "center", gap: "16px" },
    itemIcon: {
        width: "48px",
        height: "48px",
        background: "#1a2e1a",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        flexShrink: 0
    },
    productName: { color: "#f3f4f6", fontSize: "16px", fontWeight: "600", marginBottom: "4px" },
    quantity: { color: "#6b7280", fontSize: "13px" },
    cardRight: { display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 },
    price: { color: "#22c55e", fontSize: "18px", fontWeight: "700", fontFamily: "'Rajdhani', sans-serif" },
    removeBtn: {
        background: "transparent",
        border: "1px solid #2a1010",
        color: "#ef4444",
        fontSize: "12px",
        fontWeight: "500",
        padding: "7px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.2s"
    },
    summary: {
        background: "#0f0f0f",
        border: "1px solid #1a2e1a",
        borderRadius: "16px",
        padding: "28px",
        position: "sticky",
        top: "88px"        // ✅ sticks below navbar while scrolling
    },
    summaryTitle: { color: "#fff", fontSize: "16px", fontWeight: "600", marginBottom: "20px" },
    summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
    summaryLabel: { color: "#6b7280", fontSize: "14px" },
    summaryValue: { color: "#d1d5db", fontSize: "14px", fontWeight: "500" },
    divider: { borderTop: "1px solid #1a1a1a", margin: "16px 0" },
    totalLabel: { color: "#fff", fontSize: "15px", fontWeight: "600" },
    totalPrice: { color: "#22c55e", fontSize: "22px", fontWeight: "700", fontFamily: "'Rajdhani', sans-serif" },
    payBtn: {
        width: "100%",
        padding: "14px",
        background: "#22c55e",
        border: "none",
        borderRadius: "10px",
        color: "#000",
        fontSize: "15px",
        fontWeight: "700",
        cursor: "pointer",
        marginTop: "20px",
        fontFamily: "'Inter', sans-serif",
        transition: "opacity 0.2s"
    },
    secureText: {
        color: "#4b5563",
        fontSize: "12px",
        textAlign: "center",
        marginTop: "12px"
    }
};

export default Cart;