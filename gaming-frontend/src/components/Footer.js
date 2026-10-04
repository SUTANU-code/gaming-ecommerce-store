function Footer() {
    const email = process.env.REACT_APP_CONTACT_EMAIL || "your-email@example.com";

    return (
        <footer style={styles.footer}>
            <p style={styles.title}>GameStore 🎮</p>
            <p style={styles.text}>
                This is a demo / portfolio project built with React and
                Spring Boot. No real products are sold and no real payments
                are taken (Razorpay test mode).
            </p>
            <p style={styles.text}>
                Contact: <a style={styles.link} href={`mailto:${email}`}>{email}</a>
            </p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: "#0b1220",
        color: "#9ca3af",
        textAlign: "center",
        padding: "24px 16px",
        fontSize: "14px"
    },
    title: { color: "white", fontWeight: "bold", margin: "0 0 8px" },
    text: { margin: "4px 0" },
    link: { color: "#22c55e" }
};

export default Footer;
