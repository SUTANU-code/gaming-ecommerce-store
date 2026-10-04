function ProductCard({ product, addToCart }) {

    return (

        <div style={styles.card}>

            {/* IMAGE */}
            <img
                src={product.imageUrl || "https://via.placeholder.com/200"}
                alt={product.name}
                style={styles.image}
            />

            {/* PRODUCT INFO */}
            <h2 style={styles.title}>{product.name}</h2>

            <p style={styles.brand}>{product.brand}</p>

            {/* DESCRIPTION */}
            <p style={styles.description}>
                {product.description}
            </p>

            <h3 style={styles.price}>₹ {product.price}</h3>

            {/* BUTTON */}
            <button
                style={styles.button}
                onClick={() => addToCart(product.id)}
            >
                Add To Cart
            </button>

        </div>
    );
}

const styles = {

    card: {
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "20px",
        padding: "20px",
        width: "250px",
        background: "rgba(17,24,39,0.85)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",

        /* IMPORTANT FIX */
        alignSelf: "start"
    },

    image: {
        width: "100%",
        height: "220px",
        objectFit: "cover",
        borderRadius: "12px"
    },

    title: {
        color: "white",
        marginTop: "15px",
        fontSize: "28px"
    },

    brand: {
        color: "#9ca3af",
        marginTop: "-10px"
    },

    description: {
        color: "#d1d5db",
        fontSize: "14px",
        minHeight: "40px"
    },

    price: {
        color: "#22c55e",
        fontSize: "24px"
    },

    button: {
        background: "#22c55e",
        color: "white",
        border: "none",
        padding: "12px 18px",
        cursor: "pointer",
        borderRadius: "10px",
        fontWeight: "bold",
        width: "100%",
        marginTop: "10px"
    }
};

export default ProductCard;