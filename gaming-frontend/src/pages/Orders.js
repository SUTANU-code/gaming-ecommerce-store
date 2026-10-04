import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        API.get("/order/user")
            .then(res => {

                setOrders(res.data);

            })
            .catch(err => {

                console.log(err);

            });

    }, []);

    return (

        <div style={styles.page}>

            <div style={styles.overlay}></div>

            <div style={styles.content}>

                <div style={styles.header}>

                    <h1 style={styles.heading}>
                        MY ORDERS
                    </h1>

                    <p style={styles.subtitle}>
                        Track your legendary gaming purchases
                    </p>

                </div>

                {orders.length === 0 && (

                    <div style={styles.emptyBox}>

                        <h2 style={styles.emptyText}>
                            📦 No Orders Found
                        </h2>

                        <p style={styles.emptySubText}>
                            Your purchased games will appear here
                        </p>

                    </div>

                )}

                {orders.map(o => (

                    <div
                        key={o.id}
                        style={styles.orderCard}

                        onMouseEnter={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(-8px) scale(1.01)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.22)";

                            e.currentTarget.style.background =
                                "rgba(35,35,40,0.95)";

                            e.currentTarget.style.boxShadow = `
                                0 0 20px rgba(255,255,255,0.10),
                                0 0 40px rgba(239,68,68,0.30),
                                0 15px 40px rgba(0,0,0,0.7)
                            `;
                        }}

                        onMouseLeave={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(0px) scale(1)";

                            e.currentTarget.style.border =
                                "1px solid rgba(255,255,255,0.08)";

                            e.currentTarget.style.background =
                                "rgba(20,20,25,0.82)";

                            e.currentTarget.style.boxShadow =
                                "0 10px 30px rgba(0,0,0,0.45)";
                        }}
                    >

                        <div style={styles.topSection}>

                            <div>

                                <h2 style={styles.orderTitle}>
                                    Order #{o.id}
                                </h2>

                                <p style={styles.orderDate}>
                                    Premium Gaming Purchase
                                </p>

                            </div>

                            <span style={styles.status}>
                                {o.status}
                            </span>

                        </div>

                        <h3 style={styles.total}>
                            Total: ₹ {o.totalAmount}
                        </h3>

                        <div style={styles.itemsBox}>

                            <h3 style={styles.itemHeading}>
                                Order Items
                            </h3>

                            {o.items.map((i, index) => (

                                <div
                                    key={index}
                                    style={styles.itemRow}
                                >

                                    <div>

                                        <p style={styles.productName}>
                                            {i.productName}
                                        </p>

                                    </div>

                                    <div style={styles.rightSection}>

                                        <p style={styles.quantity}>
                                            Qty: {i.quantity}
                                        </p>

                                        <p style={styles.price}>
                                            ₹ {i.price}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        backgroundImage: `
            linear-gradient(
                rgba(5, 5, 8, 0.84),
                rgba(5, 5, 8, 0.92)
            ),
            url("https://images6.alphacoders.com/115/1151248.jpg")
        `,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundAttachment: "fixed",

        position: "relative",

        overflow: "hidden",

        fontFamily: "'Poppins', sans-serif",

        padding: "40px"
    },

    overlay: {

        position: "absolute",

        inset: 0,

        background: `
            radial-gradient(
                circle at top right,
                rgba(255,255,255,0.06),
                transparent 30%
            ),
            radial-gradient(
                circle at bottom left,
                rgba(239,68,68,0.12),
                transparent 35%
            )
        `
    },

    content: {

        position: "relative",

        zIndex: 2,

        maxWidth: "1200px",

        margin: "0 auto"
    },

    header: {

        textAlign: "center",

        marginBottom: "50px"
    },

    heading: {

        color: "#ffffff",

        fontSize: "55px",

        fontWeight: "900",

        letterSpacing: "4px",

        marginBottom: "10px",

        textShadow: `
            0px 0px 12px rgba(255,255,255,0.18),
            0px 0px 30px rgba(239,68,68,0.25)
        `
    },

    subtitle: {

        color: "#d1d5db",

        fontSize: "18px"
    },

    emptyBox: {

        background: "rgba(20,20,25,0.82)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        padding: "50px",

        borderRadius: "24px",

        textAlign: "center",

        backdropFilter: "blur(12px)"
    },

    emptyText: {

        color: "#ffffff",

        fontSize: "32px",

        marginBottom: "12px"
    },

    emptySubText: {

        color: "#9ca3af",

        fontSize: "16px"
    },

    orderCard: {

        background: "rgba(20,20,25,0.82)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "24px",

        padding: "30px",

        marginBottom: "30px",

        backdropFilter: "blur(12px)",

        transition: "all 0.35s ease",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.45)"
    },

    topSection: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        flexWrap: "wrap",

        gap: "20px",

        marginBottom: "20px"
    },

    orderTitle: {

        color: "#ffffff",

        fontSize: "28px",

        marginBottom: "8px"
    },

    orderDate: {

        color: "#9ca3af",

        fontSize: "15px"
    },

    status: {

        background:
            "linear-gradient(135deg, #22c55e, #16a34a)",

        padding: "8px 18px",

        borderRadius: "30px",

        color: "#ffffff",

        fontWeight: "bold",

        boxShadow:
            "0 0 20px rgba(34,197,94,0.35)"
    },

    total: {

        color: "#22c55e",

        fontSize: "30px",

        marginBottom: "25px",

        fontWeight: "900"
    },

    itemsBox: {

        marginTop: "20px"
    },

    itemHeading: {

        color: "#ffffff",

        fontSize: "22px",

        marginBottom: "20px"
    },

    itemRow: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        flexWrap: "wrap",

        gap: "20px",

        padding: "18px 0",

        borderBottom:
            "1px solid rgba(255,255,255,0.08)"
    },

    productName: {

        color: "#ffffff",

        fontSize: "18px",

        fontWeight: "600"
    },

    rightSection: {

        display: "flex",

        alignItems: "center",

        gap: "25px"
    },

    quantity: {

        color: "#cbd5e1",

        fontSize: "16px"
    },

    price: {

        color: "#22c55e",

        fontSize: "20px",

        fontWeight: "bold"
    }
};

export default Orders;