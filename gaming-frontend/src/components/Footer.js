function Footer() {
  const email =
    process.env.REACT_APP_CONTACT_EMAIL || "your-email@example.com";

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <p className="footer__brand">GameStore</p>

        <p>
          Demo portfolio project built with React and Spring Boot. No real
          products are sold and payments run in Razorpay test mode.
        </p>

        <p>
          Contact:{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
