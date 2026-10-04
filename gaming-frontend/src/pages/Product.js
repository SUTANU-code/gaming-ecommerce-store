import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import ChatBot from "../components/ChatBox";

const CATEGORIES = ["ACTION", "RPG", "SPORTS", "SHOOTING"];

function SkeletonGrid() {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div className="sk-card" key={i}>
          <div className="skeleton sk-card__media" />
          <div className="sk-card__body">
            <div className="skeleton sk-line" style={{ width: "38%" }} />
            <div className="skeleton sk-line" style={{ width: "88%" }} />
            <div className="skeleton sk-line" style={{ width: "58%" }} />
            <div
              className="skeleton sk-line"
              style={{ width: "46%", height: 18, marginTop: 4 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [inCart, setInCart] = useState(() => new Set());

  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    API.get("/products")
      .then((res) => {
        if (!cancelled) setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not reach the store. Please refresh and try again.");
          setProducts([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addToCart = useCallback(async (id) => {
    setAddingId(id);

    try {
      await API.post("/cart/add", { productId: id, quantity: 1 });

      setInCart((prev) => new Set(prev).add(id));
      toast.success("Added to cart");
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        toast.error("Please log in to add items to your cart");
      } else {
        toast.error("Could not add to cart");
      }
    } finally {
      setAddingId(null);
    }
  }, []);

  const categoryOptions = useMemo(() => {
    if (!products) return CATEGORIES;

    const found = new Set(
      products.map((p) => p.category).filter(Boolean)
    );

    return [...new Set([...CATEGORIES, ...found])];
  }, [products]);

  const visible = useMemo(() => {
    if (!products) return [];

    const q = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const brand = (product.brand || "").toLowerCase();
      const desc = (product.description || "").toLowerCase();

      const matchesSearch =
        !q || name.includes(q) || brand.includes(q) || desc.includes(q);

      const matchesCategory =
        category === "ALL" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      return [...filtered].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return filtered;
  }, [products, search, category, sort]);

  const loading = products === null;

  return (
    <div className="page">
      <main className="main">
        <div className="shell">
          <header className="section-head">
            <div>
              <span className="eyebrow">GameStore</span>
              <h1>Games, accessories &amp; collectibles</h1>
              <p>
                Everything for your setup, curated and ready to ship.
              </p>
            </div>
          </header>

          <div className="toolbar">
            <div className="toolbar__search">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" strokeLinecap="round" />
              </svg>

              <input
                id="search-games-input"
                name="searchGames"
                ref={searchRef}
                type="search"
                className="field"
                placeholder="Search products or brands"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              id="filter-category"
              name="category"
              className="field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="ALL">All categories</option>

              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <select
              id="sort-products"
              name="sort"
              className="field"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="">Sort: Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {error ? (
            <p className="notice notice--warn">{error}</p>
          ) : null}

          {loading ? (
            <>
              <div className="loading" style={{ minHeight: 0, marginBottom: 18 }}>
                <span className="spinner" aria-hidden="true" />
                <span>Loading products…</span>
              </div>
              <SkeletonGrid />
            </>
          ) : visible.length === 0 ? (
            <div className="empty">
              <h3>No products match your search</h3>
              <p>Try a different term or clear the filters.</p>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                style={{ marginTop: 14 }}
                onClick={() => {
                  setSearch("");
                  setCategory("ALL");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  adding={addingId === product.id}
                  inCart={inCart.has(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ChatBot />
    </div>
  );
}

export default Products;
