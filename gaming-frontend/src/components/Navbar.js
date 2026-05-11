import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // ✅ GET ROLE
    const role = localStorage.getItem("role");

   const logout = () => {

    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
};

    return (

        <div style={styles.navbar}>

            {/* LEFT */}
            <div style={styles.logo}>
                GameStore 🎮
            </div>

            {/* RIGHT */}
            <div style={styles.links}>

    <Link style={styles.link} to="/">
        Products
    </Link>

    {/* USER ONLY */}
    {role === "USER" && (
        <>
            <Link style={styles.link} to="/cart">
                Cart
            </Link>

            <Link style={styles.link} to="/orders">
                Orders
            </Link>
        </>
    )}

    {/* ADMIN ONLY */}
    {role === "ADMIN" && (
        <Link style={styles.adminLink} to="/admin">
            Admin
        </Link>
    )}

    {/* NOT LOGGED IN */}
    {!token ? (
        <Link style={styles.link} to="/login">
            Login
        </Link>
    ) : (
        <button style={styles.button} onClick={logout}>
            Logout
        </button>
    )}

</div>

        </div>
    );
}

const styles = {

    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#111",
        color: "white",
        padding: "15px 30px",
        borderBottom: "1px solid #333"
    },

    logo: {
        fontSize: "24px",
        fontWeight: "bold"
    },

    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center"
    },

    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "18px"
    },

    // ✅ ADMIN BUTTON STYLE
    adminLink: {
        color: "#22c55e",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold"
    },

    button: {
        background: "red",
        color: "white",
        border: "none",
        padding: "8px 15px",
        cursor: "pointer",
        borderRadius: "5px"
    }
};

export default Navbar;