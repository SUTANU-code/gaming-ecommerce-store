import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function DeleteProduct() {

    const [products, setProducts] = useState([]);

    // LOAD PRODUCTS
    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const res = await API.get("/products");

            setProducts(res.data);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load products");
        }
    };

    // DELETE PRODUCT
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(`/products/${id}`);

            toast.success("Product Deleted");

            // REMOVE FROM UI
            setProducts(
                products.filter(
                    (product) => product.id !== id
                )
            );

        } catch (err) {

            console.log(err);

            toast.error("Delete Failed");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <h1 style={styles.title}>
                    Delete Products
                </h1>

                <div style={styles.grid}>

                    {

                        products.map((product) => (

                            <div
                                key={product.id}
                                style={styles.card}
                            >

                                {/* IMAGE */}

                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={styles.image}
                                />

                                {/* DETAILS */}

                                <div style={styles.details}>

                                    <h2 style={styles.productName}>
                                        {product.name}
                                    </h2>

                                    <p style={styles.brand}>
                                        {product.brand}
                                    </p>

                                    <p style={styles.category}>
                                        {product.category}
                                    </p>

                                    <p style={styles.price}>
                                        ₹{product.price}
                                    </p>

                                    <p style={styles.stock}>
                                        Stock: {product.stock}
                                    </p>

                                </div>

                                {/* DELETE BUTTON */}

                                <button
                                    style={styles.button}
                                    onClick={() =>
                                        deleteProduct(product.id)
                                    }
                                >
                                    Delete Product
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        background: `
            linear-gradient(
                rgba(5,5,10,0.96),
                rgba(10,20,50,0.95)
            )
        `,

        padding: "50px",

        fontFamily: "'Poppins', sans-serif"
    },

    container: {

        maxWidth: "1400px",

        margin: "0 auto"
    },

    title: {

        color: "white",

        fontSize: "52px",

        fontWeight: "800",

        marginBottom: "40px"
    },

    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",

        gap: "30px"
    },

    card: {

        background: "rgba(20,20,25,0.92)",

        borderRadius: "24px",

        overflow: "hidden",

        border:
            "1px solid rgba(255,255,255,0.08)",

        boxShadow:
            "0 0 30px rgba(0,0,0,0.4)",

        transition: "0.3s"
    },

    image: {

        width: "100%",

        height: "220px",

        objectFit: "cover"
    },

    details: {

        padding: "20px"
    },

    productName: {

        color: "white",

        fontSize: "28px",

        marginBottom: "8px"
    },

    brand: {

        color: "#9ca3af",

        marginBottom: "6px",

        fontSize: "16px"
    },

    category: {

        color: "#60a5fa",

        marginBottom: "10px",

        fontSize: "15px"
    },

    price: {

        color: "#22c55e",

        fontSize: "24px",

        fontWeight: "700",

        marginBottom: "10px"
    },

    stock: {

        color: "#d1d5db",

        fontSize: "15px"
    },

    button: {

        width: "100%",

        padding: "16px",

        border: "none",

        background: "#ef4444",

        color: "white",

        fontSize: "17px",

        fontWeight: "700",

        cursor: "pointer",

        transition: "0.3s"
    }
};

export default DeleteProduct;