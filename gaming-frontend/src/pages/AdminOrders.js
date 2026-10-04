import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    // LOAD ORDERS
    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await API.get("/order/all");

            setOrders(res.data);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load orders");
        }
    };

    // UPDATE STATUS
    const updateStatus = async (orderId, status) => {

        try {

            await API.put(
                `/order/status/${orderId}?status=${status}`
            );

            toast.success("Order Status Updated");

            fetchOrders();

        } catch (err) {

            console.log(err);

            toast.error("Failed to update status");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <h1 style={styles.title}>
                    All Orders
                </h1>

                {

                    orders.length === 0 ? (

                        <h2 style={styles.noOrders}>
                            No Orders Found
                        </h2>

                    ) : (

                        <div style={styles.ordersContainer}>

                            {

                                orders.map((order) => (

                                    <div
                                        key={order.id}
                                        style={styles.orderCard}
                                    >

                                        {/* TOP */}

                                        <div style={styles.topSection}>

                                            <div>

                                                <h2 style={styles.orderId}>
                                                    Order #{order.id}
                                                </h2>

                                                <p style={styles.total}>
                                                    Total: ₹
                                                    {order.totalAmount}
                                                </p>

                                            </div>

                                            <div>

                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            order.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    style={styles.select}
                                                >

                                                    <option value="PLACED">
                                                        PLACED
                                                    </option>

                                                    <option value="SHIPPED">
                                                        SHIPPED
                                                    </option>

                                                    <option value="DELIVERED">
                                                        DELIVERED
                                                    </option>

                                                    <option value="CANCELLED">
                                                        CANCELLED
                                                    </option>

                                                </select>

                                            </div>

                                        </div>

                                        {/* ITEMS */}

                                        <div style={styles.itemsContainer}>

                                            {

                                                order.items.map(
                                                    (item, index) => (

                                                        <div
                                                            key={index}
                                                            style={styles.item}
                                                        >

                                                            <div>

                                                                <h3 style={styles.productName}>
                                                                    {item.productName}
                                                                </h3>

                                                                <p style={styles.itemText}>
                                                                    Quantity:
                                                                    {" "}
                                                                    {item.quantity}
                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p style={styles.price}>
                                                                    ₹
                                                                    {item.price}
                                                                </p>

                                                            </div>

                                                        </div>
                                                    )
                                                )
                                            }

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        background: `
            linear-gradient(
                rgba(5,5,10,0.95),
                rgba(10,20,50,0.95)
            )
        `,

        padding: "50px",

        fontFamily: "'Poppins', sans-serif"
    },

    container: {

        maxWidth: "1200px",

        margin: "0 auto"
    },

    title: {

        color: "white",

        fontSize: "50px",

        fontWeight: "800",

        marginBottom: "40px"
    },

    noOrders: {

        color: "#9ca3af",

        textAlign: "center",

        marginTop: "100px"
    },

    ordersContainer: {

        display: "flex",

        flexDirection: "column",

        gap: "30px"
    },

    orderCard: {

        background: "rgba(20,20,25,0.92)",

        borderRadius: "24px",

        padding: "30px",

        border:
            "1px solid rgba(255,255,255,0.08)",

        boxShadow:
            "0 0 30px rgba(0,0,0,0.4)"
    },

    topSection: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "25px"
    },

    orderId: {

        color: "white",

        fontSize: "30px",

        marginBottom: "8px"
    },

    total: {

        color: "#22c55e",

        fontSize: "20px",

        fontWeight: "600"
    },

    select: {

        padding: "12px 16px",

        borderRadius: "12px",

        border: "none",

        outline: "none",

        background: "#1f2937",

        color: "white",

        fontWeight: "600",

        cursor: "pointer"
    },

    itemsContainer: {

        display: "flex",

        flexDirection: "column",

        gap: "18px"
    },

    item: {

        background: "#1f2937",

        borderRadius: "16px",

        padding: "18px 22px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center"
    },

    productName: {

        color: "white",

        fontSize: "22px",

        marginBottom: "5px"
    },

    itemText: {

        color: "#d1d5db",

        fontSize: "15px"
    },

    price: {

        color: "#22c55e",

        fontSize: "20px",

        fontWeight: "700"
    }
};

export default AdminOrders;