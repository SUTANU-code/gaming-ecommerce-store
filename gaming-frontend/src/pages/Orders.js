import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import ChatBot from "../components/ChatBox";
import { formatPrice } from "../utils/format";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f6f7f9'/%3E%3Ctext x='100' y='106' font-family='Segoe UI,sans-serif' font-size='11' fill='%2374767f' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

const normalise = (s) => (s || "").trim().toLowerCase();

function statusClass(status) {
  const s = normalise(status);

  if (s.includes("deliver") || s.includes("ship")) return "pill pill--shipped";
  if (s.includes("cancel") || s.includes("fail")) return "pill pill--cancelled";

  return "pill";
}

function Orders() {
  const [orders, setOrders] = useState(null);
  const [catalogue, setCatalogue] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    /* The order API returns only productName, price and quantity, so there is
       no image reference on the order itself. The product list is a public
       endpoint, so we fetch it once and match items by name to recover the
       image. Names are normalised so casing or stray spaces still match. */
    Promise.allSettled([API.get("/order/user"), API.get("/products")])
      .then(([ordersResult, productsResult]) => {
        if (cancelled) return;

        if (ordersResult.status === "fulfilled") {
          const data = ordersResult.value.data;
          setOrders(Array.isArray(data) ? data : []);
        } else if (ordersResult.reason?.response?.status !== 401) {
          setError("We could not load your orders. Please refresh and try again.");
          setOrders([]);
        }

        if (productsResult.status === "fulfilled") {
          const data = productsResult.value.data;
          setCatalogue(Array.isArray(data) ? data : []);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const imageByName = useMemo(() => {
    const map = new Map();

    for (const product of catalogue) {
      if (product?.name && product?.imageUrl) {
        map.set(normalise(product.name), product.imageUrl);
      }
    }

    return map;
  }, [catalogue]);

  const totalOrders = orders?.length ?? 0;

  return (
    <div className="page">
      <main className="main">
        <div className="shell">
          <header className="section-head">
            <div>
              <span className="eyebrow">Account</span>
              <h1>Your orders</h1>
              <p>
                {orders === null
                  ? "Loading your order history…"
                  : totalOrders === 0
                    ? "No orders placed yet"
                    : `${totalOrders} order${totalOrders === 1 ? "" : "s"}`}
              </p>
            </div>
          </header>

          {error ? <p className="notice notice--warn">{error}</p> : null}

          {orders === null ? (
            <div className="loading">
              <span className="spinner" aria-hidden="true" />
              <span>Loading your orders…</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty">
              <h3>No orders yet</h3>
              <p>When you place an order it will show up here.</p>
              <a className="btn btn--sm" style={{ marginTop: 14 }} href="/">
                Start shopping
              </a>
            </div>
          ) : (
            orders.map((order) => {
              const id = order.orderId ?? order.id;

              return (
                <article className="order" key={id}>
                  <header className="order__head">
                    <div>
                      <div className="order__id">Order #{id}</div>
                      <div className="order__meta">
                        {order.items?.reduce(
                          (n, i) => n + (i.quantity || 0),
                          0
                        ) || 0}{" "}
                        item
                        {(order.items?.reduce(
                          (n, i) => n + (i.quantity || 0),
                          0
                        ) || 0) === 1
                          ? ""
                          : "s"}
                      </div>
                    </div>

                    <span className={statusClass(order.status)}>
                      {order.status || "Unknown"}
                    </span>
                  </header>

                  <div className="order__body">
                    {(order.items || []).map((item, index) => (
                      <div className="line" key={`${item.productName}-${index}`}>
                        <div className="line__media">
                          <img
                            src={
                              imageByName.get(normalise(item.productName)) ||
                              PLACEHOLDER
                            }
                            alt={item.productName}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div>
                          <h3 className="line__name">{item.productName}</h3>
                          <p className="line__unit">
                            {formatPrice(item.price)} each · Qty{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <div className="line__total price">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}

                    <div className="order__total">
                      <span>Order total</span>
                      <span className="price price--lg">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>

      <ChatBot />
    </div>
  );
}

export default Orders;
