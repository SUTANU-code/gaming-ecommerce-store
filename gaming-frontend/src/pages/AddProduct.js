import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AddProduct() {

    // 🧠 Form State
    const [product, setProduct] = useState({

        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        stock: ""
    });

    // 🧠 Handle Input Change
    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value
        });
    };

    // 🧠 Add Product API
    const addProduct = async () => {

        try {

            await API.post("/products", product);

            toast.success("Product Added Successfully");

            // 🧠 Clear form
            setProduct({
                name: "",
                description: "",
                price: "",
                imageUrl: "",
                category: "",
                stock: ""
            });

        } catch (err) {

            console.log(err);

            toast.error("Failed To Add Product");
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h1 style={styles.title}>
                    Add Product
                </h1>

                <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />

                <textarea
                    style={styles.textarea}
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                />

                <button
                    style={styles.button}
                    onClick={addProduct}
                >
                    Add Product
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a"
    },

    card: {
        width: "450px",
        backgroundColor: "#1e293b",
        padding: "35px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    title: {
        color: "white",
        textAlign: "center"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px"
    },

    textarea: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        minHeight: "100px",
        fontSize: "16px"
    },

    button: {
        padding: "14px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#22c55e",
        color: "white",
        fontSize: "18px",
        cursor: "pointer"
    }
};

export default AddProduct;