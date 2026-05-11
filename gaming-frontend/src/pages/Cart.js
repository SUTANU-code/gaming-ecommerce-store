import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {

        API.get("/cart")
            .then(res => setCart(res.data))
            .catch(err => console.log(err));

    }, []);

    // LOAD RAZORPAY SCRIPT
    const loadRazorpayScript = () => {

        return new Promise((resolve) => {

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    // PLACE ORDER + PAYMENT
    const placeOrder = async () => {

        try {

            const loaded = await loadRazorpayScript();

            if (!loaded) {

                toast.error("Razorpay SDK Failed to load");

                return;
            }

            const total = cart.reduce(
                (sum, item) =>
                    sum + (item.price * item.quantity),
                0
            );

            console.log("TOTAL =", total);

            // CREATE ORDER FROM BACKEND
            const response = await API.post(
                "/payment/create-order",
                {
                    amount: Number(total)
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response.data);

            const data = response.data;

            const options = {

                key: "rzp_test_SnkZ0PZaU8BhrZ",

                amount: data.amount,

                currency: data.currency,

                name: "Gaming Store",

                description: "Game Purchase",

                order_id: data.id,

                handler: async function (response) {

                    console.log(response);

                    toast.success("Payment Successful");

                    try {

                        await API.post("/order/place");

                    } catch (err) {

                        console.log(err);
                    }
                },

                prefill: {

                    name: "Gaming User",

                    email: "user@gmail.com",

                    contact: "9999999999"
                },

                theme: {
                    color: "#22c55e"
                }
            };

            const paymentObject =
                new window.Razorpay(options);

            paymentObject.open();

        } catch (err) {

            console.log(err);

            toast.error("Payment Failed");
        }
    };

    const total = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );

    return (

        <div style={styles.page}>

            <div style={styles.overlay}></div>

            <div style={styles.content}>

                <div style={styles.header}>

                    <h1 style={styles.heading}>
                        YOUR CART
                    </h1>

                    <p style={styles.subtitle}>
                        Ready to complete your legendary purchase?
                    </p>

                </div>

                {

                    cart.length === 0 ? (

                        <div style={styles.emptyBox}>

                            <h2 style={styles.emptyText}>
                                🛒 Your Cart is Empty
                            </h2>

                            <p style={styles.emptySubText}>
                                Add some epic games to continue
                            </p>

                        </div>

                    ) : (

                        <>
                            <div style={styles.cartContainer}>

                                {

                                    cart.map((item, index) => (

                                        <div
                                            key={item.id || index}
                                            style={styles.card}
                                        >

                                            <div>

                                                <h2 style={styles.productName}>
                                                    {item.productName}
                                                </h2>

                                                <p style={styles.quantity}>
                                                    Quantity: {item.quantity}
                                                </p>

                                            </div>

                                            <div style={styles.priceBox}>

                                                ₹ {item.price * item.quantity}

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                            <div style={styles.totalBox}>

                                <div>

                                    <h2 style={styles.totalText}>
                                        Total Amount
                                    </h2>

                                    <p style={styles.totalPrice}>
                                        ₹ {total}
                                    </p>

                                </div>

                                <button
                                    style={styles.orderBtn}
                                    onClick={placeOrder}
                                >
                                    Pay Now
                                </button>

                            </div>

                        </>
                    )
                }

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

        marginBottom: "10px"
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

        textAlign: "center"
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

    cartContainer: {

        display: "flex",

        flexDirection: "column",

        gap: "25px"
    },

    card: {

        background: "rgba(20,20,25,0.80)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "22px",

        padding: "28px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center"
    },

    productName: {

        color: "#ffffff",

        fontSize: "26px",

        marginBottom: "10px"
    },

    quantity: {

        color: "#cbd5e1",

        fontSize: "16px"
    },

    priceBox: {

        color: "#22c55e",

        fontSize: "26px",

        fontWeight: "bold"
    },

    totalBox: {

        marginTop: "40px",

        background: "rgba(20,20,25,0.82)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "24px",

        padding: "35px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center"
    },

    totalText: {

        color: "#ffffff",

        fontSize: "22px",

        marginBottom: "8px"
    },

    totalPrice: {

        color: "#22c55e",

        fontSize: "38px",

        fontWeight: "900"
    },

    orderBtn: {

        padding: "16px 34px",

        border: "none",

        borderRadius: "14px",

        background:
            "linear-gradient(135deg, #22c55e, #16a34a)",

        color: "#ffffff",

        fontSize: "17px",

        fontWeight: "bold",

        cursor: "pointer"
    }
};

export default Cart;