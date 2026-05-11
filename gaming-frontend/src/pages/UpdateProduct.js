import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function UpdateProduct() {

    const [products, setProducts] = useState([]);

    const [selectedId, setSelectedId] = useState("");

    const [formData, setFormData] = useState({

        name: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
    });

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
        }
    };

    // SELECT PRODUCT
    const handleSelect = (id) => {

        setSelectedId(id);

        const product = products.find(
            (p) => p.id === Number(id)
        );

        if (product) {

            setFormData({

                name: product.name,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl
            });
        }
    };

    // HANDLE CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    // UPDATE PRODUCT
    const updateProduct = async () => {

        try {

            await API.put(

                `/products/${selectedId}`,

                formData
            );

            toast.success("Product Updated");

            fetchProducts();

        } catch (err) {

            console.log(err);

            toast.error("Update Failed");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <h1 style={styles.title}>
                    Update Product
                </h1>

                {/* SELECT PRODUCT */}

                <select
                    value={selectedId}
                    onChange={(e) =>
                        handleSelect(e.target.value)
                    }
                    style={styles.select}
                >

                    <option value="">
                        Select Product
                    </option>

                    {

                        products.map(product => (

                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.name}
                            </option>
                        ))
                    }

                </select>

                {/* FORM */}

                <div style={styles.form}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <button
                        onClick={updateProduct}
                        style={styles.button}
                    >
                        Update Product
                    </button>

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
                rgba(5,5,10,0.95),
                rgba(10,20,50,0.95)
            )
        `,

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        fontFamily: "'Poppins', sans-serif"
    },

    container: {

        width: "700px",

        background: "rgba(20,20,25,0.92)",

        padding: "40px",

        borderRadius: "24px",

        border:
            "1px solid rgba(255,255,255,0.08)",

        boxShadow:
            "0 0 40px rgba(0,0,0,0.45)"
    },

    title: {

        color: "white",

        fontSize: "42px",

        marginBottom: "30px",

        textAlign: "center"
    },

    form: {

        display: "flex",

        flexDirection: "column",

        gap: "18px"
    },

    input: {

        padding: "14px",

        borderRadius: "12px",

        border: "none",

        outline: "none",

        background: "#1f2937",

        color: "white",

        fontSize: "16px"
    },

    textarea: {

        padding: "14px",

        borderRadius: "12px",

        border: "none",

        outline: "none",

        background: "#1f2937",

        color: "white",

        minHeight: "120px",

        resize: "none",

        fontSize: "16px"
    },

    select: {

        padding: "14px",

        marginBottom: "25px",

        borderRadius: "12px",

        border: "none",

        outline: "none",

        background: "#1f2937",

        color: "white",

        fontSize: "16px"
    },

    button: {

        padding: "16px",

        border: "none",

        borderRadius: "14px",

        background: "#22c55e",

        color: "white",

        fontSize: "18px",

        fontWeight: "bold",

        cursor: "pointer"
    }
};

export default UpdateProduct;