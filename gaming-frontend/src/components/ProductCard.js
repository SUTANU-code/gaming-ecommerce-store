import { formatPrice } from "../utils/format";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f6f7f9'/%3E%3Ctext x='200' y='205' font-family='Segoe UI,sans-serif' font-size='15' fill='%2374767f' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

function ProductCard({ product, addToCart, adding, inCart }) {
  return (
    <article className="card">
      <div className="card__media">
        {product.category && product.category !== "ALL" ? (
          <span className="card__tag">{product.category}</span>
        ) : null}

        <img
          src={product.imageUrl || PLACEHOLDER}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="card__body">
        {product.brand ? (
          <span className="card__brand">{product.brand}</span>
        ) : null}

        <h3 className="card__name">{product.name}</h3>

        {product.description ? (
          <p className="card__desc">{product.description}</p>
        ) : null}

        <div className="card__foot">
          <span className="price">{formatPrice(product.price)}</span>

          <button
            type="button"
            className="btn btn--sm"
            style={{ marginLeft: "auto" }}
            onClick={() => addToCart(product.id)}
            disabled={adding}
            aria-label={`Add ${product.name} to cart`}
          >
            {adding ? (
              <span className="spinner spinner--sm" aria-hidden="true" />
            ) : inCart ? (
              "Add another"
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
