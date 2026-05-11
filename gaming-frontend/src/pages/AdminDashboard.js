import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  // ✅ CREATE NAVIGATE
  const navigate = useNavigate();

  return (

    <div style={styles.container}>

      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>

        <div
          style={styles.card}
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/admin/update-product")}
        >
          Update Product
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/admin/delete-product")}
        >
          Delete Product
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/admin/orders")}
        >
          All Orders
        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "#111827",
    color: "white",
    padding: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "20px",
    marginTop: "30px"
  },

  card: {
    backgroundColor: "#1f2937",
    padding: "40px",
    borderRadius: "12px",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default AdminDashboard;