import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.logo}>
                <span style={styles.logoIcon}>⬡</span>
                GAME<span style={styles.logoGreen}>STORE</span>
            </Link>

            <div style={styles.links}>
                <Link style={styles.link} to="/">Products</Link>

                {role === "USER" && (
                    <>
                        <Link style={styles.cartBtn} to="/cart">
                            🛒 Cart
                        </Link>
                        <Link style={styles.link} to="/orders">Orders</Link>
                    </>
                )}

                {role === "ADMIN" && (
                    <Link style={styles.adminLink} to="/admin">Admin</Link>
                )}

                {!token ? (
                    <Link style={styles.loginBtn} to="/login">Login</Link>
                ) : (
                    <button style={styles.logoutBtn} onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#0d0d0d",
        padding: "0 32px",
        height: "64px",
        borderBottom: "1px solid #1a2e1a",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "'Inter', sans-serif"
    },
    logo: {
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "22px",
        fontWeight: "700",
        color: "#fff",
        textDecoration: "none",
        letterSpacing: "2px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    logoIcon: { color: "#22c55e", fontSize: "20px" },
    logoGreen: { color: "#22c55e" },
    links: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
    },
    link: {
        color: "#9ca3af",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid transparent",
        transition: "all 0.2s"
    },
    cartBtn: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        padding: "8px 16px",
        borderRadius: "8px",
        background: "#1a2e1a",
        border: "1px solid #22c55e33"
    },
    adminLink: {
        color: "#22c55e",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #22c55e33",
        background: "#0f2010"
    },
    loginBtn: {
        color: "#22c55e",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 20px",
        borderRadius: "8px",
        border: "1px solid #22c55e44",
        background: "#0f2010"
    },
    logoutBtn: {
        color: "#ef4444",
        background: "#2a1010",
        border: "1px solid #ef444433",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
    }
};

export default Navbar;