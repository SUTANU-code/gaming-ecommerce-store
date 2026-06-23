import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/order/user")
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const statusColor = (status) => {
        switch (status?.toUpperCase()) {
            case "DELIVERED": return { bg: "#0f2010", color: "#22c55e", border: "#22c55e33" };
            case "PENDING":   return { bg: "#1a1500", color: "#f59e0b", border: "#f59e0b33" };
            case "CANCELLED": return { bg: "#2a1010", color: "#ef4444", border: "#ef444433" };
            default:          return { bg: "#111", color: "#9ca3af", border: "#9ca3af33" };
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.content}>

                {/* HEADER */}
                <div style={styles.header}>
                    <div style={styles.headerTag}>Order history</div>
                    <h1 style={styles.heading}>
                        MY <span style={styles.headingGreen}>ORDERS</span>
                    </h1>
                    <p style={styles.subtitle}>Track your legendary gaming purchases</p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div style={styles.emptyBox}>
                        <p style={styles.emptySubText}>Loading orders...</p>
                    </div>
                )}

                {/* EMPTY */}
                {!loading && orders.length === 0 && (
                    <div style={styles.emptyBox}>
                        <div style={styles.emptyIcon}>📦</div>
                        <h2 style={styles.emptyText}>No orders yet</h2>
                        <p style={styles.emptySubText}>Your purchased games will appear here</p>
                    </div>
                )}

                {/* ORDER CARDS */}
                <div style={styles.orderList}>
                    {orders.map(o => {
                        const sc = statusColor(o.status);
                        return (
                            <div key={o.id} style={styles.orderCard}>

                                {/* CARD HEADER */}
                                <div style={styles.cardHeader}>
                                    <div style={styles.orderMeta}>
                                        <div style={styles.orderIdWrap}>
                                            <span style={styles.orderIdLabel}>Order</span>
                                            <span style={styles.orderId}>#{o.id}</span>
                                        </div>
                                        <p style={styles.orderSub}>Premium Gaming Purchase</p>
                                    </div>

                                    <div style={styles.headerRight}>
                                        <span style={{
                                            ...styles.statusBadge,
                                            background: sc.bg,
                                            color: sc.color,
                                            border: `1px solid ${sc.border}`
                                        }}>
                                            {o.status}
                                        </span>
                                        <div style={styles.totalWrap}>
                                            <span style={styles.totalLabel}>Total</span>
                                            <span style={styles.totalAmount}>
                                                ₹{Number(o.totalAmount).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* DIVIDER */}
                                <div style={styles.divider} />

                                {/* ITEMS */}
                                <div style={styles.itemsSection}>
                                    <p style={styles.itemsLabel}>
                                        {o.items.length} item{o.items.length !== 1 ? "s" : ""}
                                    </p>

                                    {o.items.map((item, index) => (
                                        <div key={index} style={{
                                            ...styles.itemRow,
                                            borderBottom: index < o.items.length - 1
                                                ? "1px solid #141414"
                                                : "none"
                                        }}>
                                            <div style={styles.itemLeft}>
                                                <div style={styles.itemIcon}>🎮</div>
                                                <span style={styles.productName}>
                                                    {item.productName}
                                                </span>
                                            </div>
                                            <div style={styles.itemRight}>
                                                <span style={styles.qty}>
                                                    x{item.quantity}
                                                </span>
                                                <span style={styles.itemPrice}>
                                                    ₹{Number(item.price).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        );
                    })}
                </div>

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
        maxWidth: "860px",
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
    emptyText: {
        color: "#fff",
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "8px"
    },
    emptySubText: { color: "#6b7280", fontSize: "14px" },
    orderList: { display: "flex", flexDirection: "column", gap: "16px" },
    orderCard: {
        background: "#0f0f0f",
        border: "1px solid #1a1a1a",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px 24px",
        flexWrap: "wrap",
        gap: "16px"
    },
    orderMeta: { display: "flex", flexDirection: "column", gap: "4px" },
    orderIdWrap: { display: "flex", alignItems: "baseline", gap: "6px" },
    orderIdLabel: { color: "#4b5563", fontSize: "12px", fontWeight: "500" },
    orderId: {
        color: "#fff",
        fontSize: "18px",
        fontWeight: "700",
        fontFamily: "'Rajdhani', sans-serif"
    },
    orderSub: { color: "#4b5563", fontSize: "12px" },
    headerRight: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap"
    },
    statusBadge: {
        fontSize: "11px",
        fontWeight: "700",
        padding: "5px 12px",
        borderRadius: "20px",
        letterSpacing: "0.5px",
        textTransform: "uppercase"
    },
    totalWrap: { textAlign: "right" },
    totalLabel: {
        display: "block",
        color: "#4b5563",
        fontSize: "11px",
        fontWeight: "500",
        marginBottom: "2px"
    },
    totalAmount: {
        color: "#22c55e",
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "'Rajdhani', sans-serif"
    },
    divider: { borderTop: "1px solid #141414" },
    itemsSection: { padding: "16px 24px" },
    itemsLabel: {
        color: "#4b5563",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginBottom: "12px"
    },
    itemRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        gap: "16px"
    },
    itemLeft: { display: "flex", alignItems: "center", gap: "12px" },
    itemIcon: {
        width: "36px",
        height: "36px",
        background: "#1a2e1a",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        flexShrink: 0
    },
    productName: {
        color: "#d1d5db",
        fontSize: "14px",
        fontWeight: "500"
    },
    itemRight: { display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 },
    qty: {
        color: "#4b5563",
        fontSize: "13px",
        fontWeight: "500",
        background: "#141414",
        padding: "3px 8px",
        borderRadius: "6px"
    },
    itemPrice: {
        color: "#22c55e",
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "'Rajdhani', sans-serif"
    }
};

export default Orders;