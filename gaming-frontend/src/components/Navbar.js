import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const logout = () => {
    if (!window.confirm("Log out of GameStore?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="shell topbar__inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">
            G
          </span>
          GameStore
        </Link>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <nav className={`nav${open ? " is-open" : ""}`}>
          <NavLink
            className="nav__link"
            to="/"
            onClick={closeMenu}
            end
          >
            Store
          </NavLink>

          {role === "USER" ? (
            <>
              <NavLink
                className="nav__link"
                to="/cart"
                onClick={closeMenu}
              >
                Cart
              </NavLink>

              <NavLink
                className="nav__link"
                to="/orders"
                onClick={closeMenu}
              >
                Orders
              </NavLink>
            </>
          ) : null}

          {role === "ADMIN" ? (
            <NavLink
              className="nav__link"
              to="/admin"
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          ) : null}

          {token ? (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={logout}
            >
              Log out
            </button>
          ) : (
            <>
              <NavLink
                className="nav__link"
                to="/login"
                onClick={closeMenu}
              >
                Log in
              </NavLink>

              <NavLink
                className="nav__link"
                to="/register"
                onClick={closeMenu}
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
