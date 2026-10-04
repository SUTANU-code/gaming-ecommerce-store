import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";

import ProductCard from "../components/ProductCard";
import ChatBot from "../components/ChatBox";

function Products() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [sort, setSort] = useState("");

    useEffect(() => {

        API.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));

    }, []);

    const addToCart = async (id) => {

        try {

            await API.post("/cart/add", {
                productId: id,
                quantity: 1
            });

            toast.success("Added to cart");

        } catch (err) {

            console.log(err);

            toast.error("Failed to add to cart");
        }
    };

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "ALL" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "LOW_TO_HIGH") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sort === "HIGH_TO_LOW") {

        filteredProducts.sort((a, b) => b.price - a.price);
    }

    return (

        <div style={styles.page}>

            <div style={styles.overlay}></div>

            <div style={styles.content}>

                <div style={styles.header}>

                    <h1 style={styles.title}>
                        GAMING STORE
                    </h1>

                    <p style={styles.subtitle}>
                        Explore legendary games, accessories & collectibles
                    </p>

                </div>

                <div style={styles.topBar}>

                    <input
                        type="text"
                        placeholder="Search games..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.select}
                    >

                        <option value="ALL">
                            All Categories
                        </option>

                        <option value="ACTION">
                            Action
                        </option>

                        <option value="RPG">
                            RPG
                        </option>

                        <option value="SPORTS">
                            Sports
                        </option>

                        <option value="SHOOTING">
                            Shooter
                        </option>

                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        style={styles.select}
                    >

                        <option value="">
                            Sort By Price
                        </option>

                        <option value="LOW_TO_HIGH">
                            Low To High
                        </option>

                        <option value="HIGH_TO_LOW">
                            High To Low
                        </option>

                    </select>

                </div>

                <div style={styles.container}>

                    {filteredProducts.map(product => (

                        <div
                            style={styles.cardWrapper}
                            key={product.id}

                            onMouseEnter={(e) => {

                                e.currentTarget.style.transform =
                                    "translateY(-10px) scale(1.03)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.25)";

                                e.currentTarget.style.background =
                                    "rgba(35,35,40,0.95)";

                                e.currentTarget.style.boxShadow = `
                                    0 0 20px rgba(255,255,255,0.10),
                                    0 0 40px rgba(239,68,68,0.35),
                                    0 15px 45px rgba(0,0,0,0.7)
                                `;
                            }}

                            onMouseLeave={(e) => {

                                e.currentTarget.style.transform =
                                    "translateY(0px) scale(1)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.08)";

                                e.currentTarget.style.background =
                                    "rgba(20,20,25,0.78)";

                                e.currentTarget.style.boxShadow =
                                    "0 10px 30px rgba(0,0,0,0.45)";
                            }}
                        >

                            <ProductCard
                                product={product}
                                addToCart={addToCart}
                            />

                        </div>

                    ))}

                </div>

                <footer style={styles.footer}>

                    <div style={styles.footerTop}>

                        <div style={styles.footerColumn}>

                            <h3 style={styles.footerHeading}>
                                Get to Know Us
                            </h3>

                            <p style={styles.footerText}>
                                About Us
                            </p>

                            <p style={styles.footerText}>
                                Careers
                            </p>

                            <p style={styles.footerText}>
                                Press Releases
                            </p>

                            <p style={styles.footerText}>
                                Gaming Blog
                            </p>

                        </div>

                        <div style={styles.footerColumn}>

                            <h3 style={styles.footerHeading}>
                                Connect with Us
                            </h3>

                            <p style={styles.footerText}>
                                Facebook
                            </p>

                            <p style={styles.footerText}>
                                Instagram
                            </p>

                            <p style={styles.footerText}>
                                Twitter
                            </p>

                            <p style={styles.footerText}>
                                Discord
                            </p>

                        </div>

                        <div style={styles.footerColumn}>

                            <h3 style={styles.footerHeading}>
                                Make Money with Us
                            </h3>

                            <p style={styles.footerText}>
                                Sell Products
                            </p>

                            <p style={styles.footerText}>
                                Affiliate Program
                            </p>

                            <p style={styles.footerText}>
                                Advertise Games
                            </p>

                            <p style={styles.footerText}>
                                Become a Partner
                            </p>

                        </div>

                        <div style={styles.footerColumn}>

                            <h3 style={styles.footerHeading}>
                                Let Us Help You
                            </h3>

                            <p style={styles.footerText}>
                                Your Account
                            </p>

                            <p style={styles.footerText}>
                                Returns Centre
                            </p>

                            <p style={styles.footerText}>
                                Purchase Protection
                            </p>

                            <p style={styles.footerText}>
                                Help
                            </p>

                        </div>

                    </div>

                    <div style={styles.footerMiddle}>

                        <h1 style={styles.footerLogo}>
                            GAMING STORE
                        </h1>

                        <div style={styles.footerButtons}>

                            <button style={styles.footerButton}>
                                🌐 English
                            </button>

                            <button style={styles.footerButton}>
                                🇮🇳 India
                            </button>

                        </div>

                    </div>

                    <div style={styles.footerBottom}>

                        <div style={styles.bottomGrid}>

                            <div>

                                <h4 style={styles.bottomHeading}>
                                    Game Library
                                </h4>

                                <p style={styles.bottomText}>
                                    Action, RPG & Open World
                                </p>

                            </div>

                            <div>

                                <h4 style={styles.bottomHeading}>
                                    Cloud Gaming
                                </h4>

                                <p style={styles.bottomText}>
                                    Play Anywhere Anytime
                                </p>

                            </div>

                            <div>

                                <h4 style={styles.bottomHeading}>
                                    Gaming Music
                                </h4>

                                <p style={styles.bottomText}>
                                    Soundtracks & Podcasts
                                </p>

                            </div>

                            <div>

                                <h4 style={styles.bottomHeading}>
                                    Gaming Community
                                </h4>

                                <p style={styles.bottomText}>
                                    Streamers & Esports
                                </p>

                            </div>

                        </div>

                        <div style={styles.copyright}>

                            <p>
                                Conditions of Use & Sale
                            </p>

                            <p>
                                Privacy Notice
                            </p>

                            <p>
                                Interest-Based Ads
                            </p>

                        </div>

                        <p style={styles.copyText}>
                            © 2026 GamingStore.com, Inc. All rights reserved.
                        </p>

                    </div>

                </footer>

            </div>

            <ChatBot />

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        backgroundImage: `
            linear-gradient(
                rgba(5, 5, 8, 0.82),
                rgba(5, 5, 8, 0.90)
            ),
            url("https://images6.alphacoders.com/115/1151248.jpg")
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        position: "relative",
        overflow: "hidden",

        fontFamily: "'Poppins', sans-serif"
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
        zIndex: 2
    },

    header: {

        textAlign: "center",

        paddingTop: "55px",
        paddingBottom: "25px"
    },

    title: {

        color: "#ffffff",

        fontSize: "58px",
        fontWeight: "900",

        letterSpacing: "5px",

        textTransform: "uppercase",

        marginBottom: "12px",

        textShadow: `
            0px 0px 12px rgba(255,255,255,0.18),
            0px 0px 30px rgba(239,68,68,0.25)
        `
    },

    subtitle: {

        color: "#d1d5db",

        fontSize: "18px",

        fontWeight: "400",

        letterSpacing: "1px"
    },

    topBar: {

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        gap: "20px",

        flexWrap: "wrap",

        marginBottom: "35px",

        padding: "0 20px"
    },

    searchInput: {

        width: "320px",

        padding: "15px 18px",

        borderRadius: "14px",

        border: "1px solid rgba(255,255,255,0.12)",

        background: "rgba(20,20,25,0.82)",

        color: "#fff",

        fontSize: "15px",

        outline: "none",

        backdropFilter: "blur(10px)",

        boxShadow:
            "0 0 18px rgba(0,0,0,0.35)"
    },

    select: {

        padding: "15px 18px",

        borderRadius: "14px",

        border: "1px solid rgba(255,255,255,0.12)",

        background: "rgba(20,20,25,0.82)",

        color: "#fff",

        fontSize: "15px",

        outline: "none",

        cursor: "pointer",

        backdropFilter: "blur(10px)"
    },

    container: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",

        gap: "35px",

        padding: "40px",

        maxWidth: "1450px",

        margin: "0 auto"
    },

    cardWrapper: {

        background: "rgba(20,20,25,0.78)",

        border: "1px solid rgba(255,255,255,0.08)",

        borderRadius: "24px",

        padding: "18px",

        backdropFilter: "blur(12px)",

        transition: "all 0.35s ease",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.45)",

        cursor: "pointer"
    },

    footer: {

        marginTop: "80px",

        background: "rgba(10,10,15,0.96)",

        borderTop: "1px solid rgba(255,255,255,0.08)",

        padding: "60px 40px 30px",

        color: "white"
    },

    footerTop: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "40px",

        marginBottom: "50px"
    },

    footerColumn: {

        display: "flex",

        flexDirection: "column",

        gap: "12px"
    },

    footerHeading: {

        fontSize: "22px",

        fontWeight: "700",

        marginBottom: "10px",

        color: "#ffffff"
    },

    footerText: {

        color: "#d1d5db",

        cursor: "pointer",

        transition: "0.3s",

        fontSize: "15px"
    },

    footerMiddle: {

        borderTop: "1px solid rgba(255,255,255,0.08)",

        borderBottom: "1px solid rgba(255,255,255,0.08)",

        padding: "30px 0",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        flexWrap: "wrap",

        gap: "20px"
    },

    footerLogo: {

        color: "white",

        fontSize: "34px",

        fontWeight: "900",

        letterSpacing: "3px"
    },

    footerButtons: {

        display: "flex",

        gap: "15px"
    },

    footerButton: {

        background: "rgba(255,255,255,0.08)",

        border: "1px solid rgba(255,255,255,0.12)",

        color: "white",

        padding: "12px 18px",

        borderRadius: "12px",

        cursor: "pointer"
    },

    footerBottom: {

        marginTop: "40px"
    },

    bottomGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "30px",

        marginBottom: "40px"
    },

    bottomHeading: {

        color: "white",

        marginBottom: "8px"
    },

    bottomText: {

        color: "#9ca3af",

        fontSize: "14px"
    },

    copyright: {

        display: "flex",

        justifyContent: "center",

        gap: "30px",

        flexWrap: "wrap",

        color: "#d1d5db",

        marginBottom: "20px",

        fontSize: "14px"
    },

    copyText: {

        textAlign: "center",

        color: "#6b7280",

        fontSize: "14px"
    }
};

export default Products;