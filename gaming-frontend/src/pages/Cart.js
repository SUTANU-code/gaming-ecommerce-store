import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";
import { formatPrice } from "../utils/format";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f6f7f9'/%3E%3C/svg%3E";

/* The API stores one cart row per "add" call, so tapping Add twice on the
   same product returns two separate rows instead of one row with quantity 2.
   The server has no merge step, so we fold rows by product here before
   rendering: one line per product, quantities summed, line total recomputed. */
function mergeByProduct(rows) {
  const merged = new Map();

  for (const row of rows) {
    const key = row.productId;

    const existing = merged.get(key);

    if (existing) {
      existing.quantity += row.quantity || 0;
    } else {
      merged.set(key, {
        productId: key,
        productName: row.productName,
        price: row.price,
        imageUrl: row.imageUrl,
        quantity: row.quantity || 0,
      });
    }
  }

  return [...merged.values()];
}

function Cart() {
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  const busyRef = useRef(false);

  const load = useCallback(async () => {
    try {
      const res = await API.get("/cart");
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) return; // interceptor redirects
      setError("We could not load your cart. Please refresh and try again.");
      setRows([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const lines = useMemo(
    () => (rows ? mergeByProduct(rows) : []),
    [rows]
  );

  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.price * l.quantity, 0),
    [lines]
  );

  const shipping = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
  const total = subtotal + shipping;

  /* Each click is one more unit on the server. Because display merges rows,
     a negative delta simply cancels one of them back out. Guarded so the
     visible quantity never drops below one. */
  const changeQuantity = async (productId, delta) => {
    if (busyRef.current) return;

    busyRef.current = true;
    setBusy(productId);

    try {
      await API.post("/cart/add", { productId, quantity: delta });

      const res = await API.get("/cart");

      setRows(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Could not update your cart");
    } finally {
      busyRef.current = false;
      setBusy(null);
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeOrder = async () => {
    if (paying || !lines.length) return;

    setPaying(true);

    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        toast.error("Could not reach the payment provider");
        return;
      }

      const res = await API.post("/payment/create-order", {
        amount: Math.round(subtotal),
      });

      const order = res.data;

      const payment = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "GameStore",
        description: "Order payment",
        order_id: order.id,
        prefill: { name: "Gaming Customer" },
        theme: { color: "#0070d1" },
        handler: async () => {
          try {
            await API.post("/order/place");
            toast.success("Order placed");
            setRows([]);
          } catch {
            toast.success("Payment received");
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      payment.on("payment.failed", () => {
        toast.error("Payment failed");
        setPaying(false);
      });

      payment.open();
    } catch (err) {
      toast.error(
        err.response?.status === 401
          ? "Please log in again"
          : "Payment could not be started"
      );
    } finally {
      setPaying(false);
    }
  };

  if (rows === null) {
    return (
      <div className="page">
        <main className="main">
          <div className="loading">
            <span className="spinner" aria-hidden="true" />
            <span>Loading your cart…</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="main">
        <div className="shell">
          <header className="section-head">
            <div>
              <span className="eyebrow">Your bag</span>
              <h1>Shopping cart</h1>
              <p>
                {lines.length
                  ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready to check out`
                  : "Nothing here yet"}
              </p>
            </div>
          </header>

          {error ? <p className="notice notice--warn">{error}</p> : null}

          {lines.length === 0 ? (
            <div className="empty">
              <h3>Your cart is empty</h3>
              <p>Browse the store and add something you like.</p>
              <a
                className="btn btn--sm"
                style={{ marginTop: 14 }}
                href="/"
              >
                Continue shopping
              </a>
            </div>
          ) : (
            <div className="cart-layout">
              <section className="panel" aria-label="Cart items">
                <div className="panel__head">
                  {itemCount} item{itemCount === 1 ? "" : "s"}
                </div>

                {lines.map((line) => {
                  const isBusy = busy === line.productId;

                  return (
                    <article className="line" key={line.productId}>
                      <div className="line__media">
                        <img
                          src={line.imageUrl || PLACEHOLDER}
                          alt={line.productName}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div>
                        <h3 className="line__name">{line.productName}</h3>

                        <p className="line__unit">
                          {formatPrice(line.price)} each
                        </p>

                        <div className="line__qty">
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(line.productId, -1)
                            }
                            disabled={isBusy || line.quantity <= 1}
                            aria-label={`Remove one ${line.productName}`}
                          >
                            &minus;
                          </button>

                          <span aria-live="polite">
                            {isBusy ? (
                              <span
                                className="spinner spinner--sm"
                                style={{
                                  display: "inline-block",
                                  verticalAlign: "middle",
                                }}
                              />
                            ) : (
                              line.quantity
                            )}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(line.productId, 1)
                            }
                            disabled={isBusy}
                            aria-label={`Add one more ${line.productName}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="line__total price">
                        {formatPrice(line.price * line.quantity)}
                      </div>
                    </article>
                  );
                })}
              </section>

              <aside className="panel summary" aria-label="Order summary">
                <div className="panel__head">Order summary</div>

                <div style={{ padding: "16px 20px 20px" }}>
                  <div className="summary__row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="summary__row">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="summary__total">
                    <span>Total</span>
                    <span className="price price--lg">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn--block"
                    style={{ marginTop: 16 }}
                    onClick={placeOrder}
                    disabled={paying}
                  >
                    {paying ? (
                      <>
                        <span
                          className="spinner spinner--sm"
                          aria-hidden="true"
                        />
                        Processing…
                      </>
                    ) : (
                      "Pay now"
                    )}
                  </button>

                  <p className="summary__note">
                    Demo store. Payments run in Razorpay test mode and no real
                    money moves.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;
