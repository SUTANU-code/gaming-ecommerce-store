function ProductCard({ product, addToCart }) {
    return (
        <div style={styles.card}>

            {/* CATEGORY BADGE */}
            <div style={styles.imageWrap}>
                <span style={styles.categoryBadge}>
                    {product.category || "Gaming"}
                </span>
                <img
                    src={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={product.name}
                    style={styles.image}
                    loading="lazy"
                />
            </div>

            {/* BODY */}
            <div style={styles.body}>
                <p style={styles.brand}>{product.brand}</p>
                <h2 style={styles.title}>{product.name}</h2>
                <p style={styles.description}>{product.description}</p>

                <div style={styles.footer}>
                    <span style={styles.price}>₹{product.price.toLocaleString()}</span>
                    <button
                        style={styles.button}
                        onClick={() => addToCart(product.id)}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#22c55e";
                            e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#0f2010";
                            e.currentTarget.style.color = "#22c55e";
                        }}
                    >
                        + Add to cart
                    </button>
                </div>
            </div>

        </div>
    );
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        height: "100%",              // ✅ fills parent cardWrapper height
        fontFamily: "'Inter', sans-serif",
        background: "transparent",  // ✅ no double background
        borderRadius: "0",
        padding: "0"
    },
    imageWrap: {
        position: "relative",
        width: "100%",
        height: "200px",
        overflow: "hidden",
        background: "#1a1a1a",
        flexShrink: 0,
        borderRadius: "14px 14px 0 0"  // ✅ rounds only top corners
    },
    categoryBadge: {
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 2,
        background: "rgba(0,0,0,0.75)",
        border: "1px solid #22c55e33",
        color: "#22c55e",
        fontSize: "10px",
        fontWeight: "600",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: "6px"
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    },
    body: {
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        flex: 1                       // ✅ body grows, footer always at bottom
    },
    brand: {
        color: "#4b5563",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginBottom: "4px"
    },
    title: {
        color: "#f3f4f6",
        fontSize: "15px",
        fontWeight: "600",
        marginBottom: "8px",
        lineHeight: "1.3",
        // ✅ consistent title casing — controlled by data, not CSS
    },
    description: {
        color: "#6b7280",
        fontSize: "12px",
        lineHeight: "1.6",
        marginBottom: "16px",
        flex: 1,
        display: "-webkit-box",
        WebkitLineClamp: 3,          // ✅ max 3 lines, no cut-off mid-sentence
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        marginTop: "auto"
    },
    price: {
        color: "#22c55e",
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0
    },
    button: {
        background: "#0f2010",
        border: "1px solid #22c55e44",
        color: "#22c55e",
        fontSize: "12px",
        fontWeight: "600",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.2s",
        whiteSpace: "nowrap"
    }
};

export default ProductCard;