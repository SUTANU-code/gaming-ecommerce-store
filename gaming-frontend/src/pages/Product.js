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
            await API.post("/cart/add", { productId: id, quantity: 1 });
            toast.success("Added to cart!");
        } catch (err) {
            toast.error("Failed to add to cart");
        }
    };

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "ALL" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sort === "LOW_TO_HIGH") filteredProducts.sort((a, b) => a.price - b.price);
    else if (sort === "HIGH_TO_LOW") filteredProducts.sort((a, b) => b.price - a.price);

    return (
        <div style={styles.page}>
            {/* HERO */}
            <div style={styles.hero}>
                <div style={styles.heroTag}>Next-gen gaming store</div>
                <h1 style={styles.title}>
                    GAMING<br />
                    <span style={styles.titleGreen}>STORE</span>
                </h1>
                <p style={styles.subtitle}>Explore legendary games, accessories & collectibles</p>

                <div style={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search games, accessories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                        <option value="ALL">All Categories</option>
                        <option value="ACTION">Action</option>
                        <option value="RPG">RPG</option>
                        <option value="SPORTS">Sports</option>
                        <option value="SHOOTING">Shooter</option>
                    </select>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
                        <option value="">Sort by price</option>
                        <option value="LOW_TO_HIGH">Low to high</option>
                        <option value="HIGH_TO_LOW">High to low</option>
                    </select>
                </div>
            </div>

            {/* SECTION LABEL */}
            <p style={styles.sectionLabel}>Featured products</p>

            {/* GRID */}
            <div style={styles.grid}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        style={styles.cardWrapper}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "#22c55e44";
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.background = "#111";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "#1a1a1a";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.background = "#0f0f0f";
                        }}
                    >
                        <ProductCard product={product} addToCart={addToCart} />
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <div style={styles.footerTop}>
                    {[
                        { title: "Get to know us", items: ["About us", "Careers", "Press releases", "Gaming blog"] },
                        { title: "Connect with us", items: ["Facebook", "Instagram", "Twitter", "Discord"] },
                        { title: "Make money with us", items: ["Sell products", "Affiliate program", "Advertise games", "Become a partner"] },
                        { title: "Let us help you", items: ["Your account", "Returns centre", "Purchase protection", "Help"] }
                    ].map((col, i) => (
                        <div key={i} style={styles.footerCol}>
                            <h4 style={styles.footerHeading}>{col.title}</h4>
                            {col.items.map(item => <p key={item} style={styles.footerLink}>{item}</p>)}
                        </div>
                    ))}
                </div>

                <div style={styles.footerMid}>
                    <div style={styles.footerLogo}>GAMESTORE</div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button style={styles.footerBtn}>🌐 English</button>
                        <button style={styles.footerBtn}>🇮🇳 India</button>
                    </div>
                </div>

                <div style={styles.footerBottom}>
                    <p style={styles.copyText}>© 2026 GameStore.com, Inc. All rights reserved.</p>
                    <div style={{ display: "flex", gap: "20px" }}>
                        {["Conditions of use", "Privacy notice", "Interest-based ads"].map(t => (
                            <span key={t} style={styles.copyLink}>{t}</span>
                        ))}
                    </div>
                </div>
            </footer>

            <ChatBot />
        </div>
    );
}

const styles = {
    page: { minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter', sans-serif" },
    hero: { textAlign: "center", padding: "64px 24px 48px" },
    heroTag: {
        display: "inline-block",
        background: "#0f2010",
        border: "1px solid #22c55e33",
        color: "#22c55e",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "2px",
        padding: "6px 16px",
        borderRadius: "20px",
        marginBottom: "20px",
        textTransform: "uppercase"
    },
    title: {
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "60px",
        fontWeight: "700",
        letterSpacing: "4px",
        lineHeight: "1",
        marginBottom: "14px",
        color: "#fff"
    },
    titleGreen: { color: "#22c55e" },
    subtitle: { color: "#6b7280", fontSize: "16px", maxWidth: "480px", margin: "0 auto 36px" },
    searchBar: { display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", maxWidth: "800px", margin: "0 auto" },
    searchInput: {
        background: "#111",
        border: "1px solid #1f1f1f",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "10px",
        fontSize: "14px",
        width: "280px",
        outline: "none",
        fontFamily: "'Inter', sans-serif"
    },
    select: {
        background: "#111",
        border: "1px solid #1f1f1f",
        color: "#9ca3af",
        padding: "12px 16px",
        borderRadius: "10px",
        fontSize: "14px",
        outline: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
    },
    sectionLabel: {
        color: "#4b5563",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "2px",
        textTransform: "uppercase",
        padding: "0 40px",
        marginBottom: "16px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px",
        padding: "0 40px 60px",
        maxWidth: "1400px",
        margin: "0 auto"
    },
    cardWrapper: {
    background: "#0f0f0f",
    border: "1px solid #1a1a1a",
    borderRadius: "14px",
    overflow: "hidden",          // ✅ clips image to card corners
    transition: "all 0.25s ease",
    cursor: "pointer",
    display: "flex",             // ✅ makes card stretch to full height
    flexDirection: "column"
},
    footer: { background: "#080808", borderTop: "1px solid #141414", padding: "48px 40px 24px" },
    footerTop: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginBottom: "40px" },
    footerCol: { display: "flex", flexDirection: "column", gap: "10px" },
    footerHeading: { fontSize: "13px", fontWeight: "600", color: "#fff", marginBottom: "4px" },
    footerLink: { fontSize: "13px", color: "#4b5563", cursor: "pointer" },
    footerMid: { borderTop: "1px solid #141414", borderBottom: "1px solid #141414", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    footerLogo: { fontFamily: "'Rajdhani', sans-serif", fontSize: "28px", fontWeight: "700", color: "#22c55e", letterSpacing: "3px" },
    footerBtn: { background: "#111", border: "1px solid #1f1f1f", color: "#9ca3af", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontFamily: "'Inter', sans-serif" },
    footerBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
    copyText: { fontSize: "12px", color: "#374151" },
    copyLink: { fontSize: "12px", color: "#374151", cursor: "pointer" }
};

export default Products;