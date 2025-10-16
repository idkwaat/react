import React from "react";
import { useCart } from "../context/CartContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (item, newQty) => {
    const qty = Math.max(1, Number(newQty));
    updateQuantity(item.productId, item.variantId, qty);
  };

  const cartTotal = getCartTotal();

  return (
    <div className="vs-cart-wrapper space-top space-extra-bottom" style={{marginBottom:"80px"}}>
      <div className="container">
        <form className="woocommerce-cart-form">
          <table className="cart_table">
            <thead>
              <tr>
                <th className="cart-col-image">Image</th>
                <th className="cart-col-productname">Product Name</th>
                <th className="cart-col-price">Price</th>
                <th className="cart-col-quantity">Quantity</th>
                <th className="cart-col-total">Total</th>
                <th className="cart-col-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
  <tr>
    <td colSpan="6" className="text-center py-4">
      Giỏ hàng trống.
    </td>
  </tr>
) : (
  cartItems.map((item) => (
    <tr className="cart_item" key={`${item.productId}-${item.variantId || 0}`}>
      <td data-title="Product">
        <a
          className="cart-productimage"
          href={`/product/${item.productId}`}
        >
          <img
            width="100"
            height="95"
            src={
              item.imageUrl?.startsWith("http")
                ? item.imageUrl
                : `http://localhost:5186${item.imageUrl}`
            }
            alt={item.productName}
          />
        </a>
      </td>

      <td data-title="Name">
        <a
          className="cart-productname"
          href={`/product/${item.productId}`}
        >
          {item.productName}
        </a>
      </td>


      <td data-title="Price">
        <span className="amount">
          <bdi>{item.price.toLocaleString()}₫</bdi>
        </span>
      </td>

      {/* ✅ Quantity với style chuẩn */}
      <td data-title="Quantity">
        <div className="quantity style2">
          <div className="quantity__field quantity-container">
            <div className="quantity__buttons">
              <button
                type="button"
                className="quantity-minus qty-btn"
                onClick={() => {
                  if (item.quantity > 1)
                    updateQuantity(
                      item.productId,
                      item.variantId,
                      item.quantity - 1
                    );
                }}
              >
                <i className="fal fa-minus"></i>
              </button>

              <input
                type="number"
                id="quantity"
                className="qty-input"
                step="1"
                min="1"
                max="100"
                name="quantity"
                title="Qty"
                value={item.quantity}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(100, +e.target.value || 1));
                  updateQuantity(item.productId, item.variantId, value);
                }}
              />

              <button
                type="button"
                className="quantity-plus qty-btn"
                onClick={() => {
                  if (item.quantity < 100)
                    updateQuantity(
                      item.productId,
                      item.variantId,
                      item.quantity + 1
                    );
                }}
              >
                <i className="fal fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </td>

      <td data-title="Total">
        <span className="amount">
          <bdi>{(item.price * item.quantity).toLocaleString()}₫</bdi>
        </span>
      </td>

      <td data-title="Remove">
        <button
          type="button"
          className="remove"
          onClick={() => removeFromCart(item.productId)}
        >
          <i className="fal fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))
)}

            </tbody>
          </table>
        </form>

        {/* Cart Totals */}
        <div className="row justify-content-end">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <h2 className="h4 summary-title">Cart Totals</h2>
            <table className="cart_totals">
              <tbody>
                <tr>
                  <td>Cart Subtotal</td>
                  <td data-title="Cart Subtotal">
                    <span className="amount">
                      <bdi>{cartTotal.toLocaleString()}₫</bdi>
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="order-total">
                  <td>Order Total</td>
                  <td data-title="Total">
                    <strong>
                      <span className="amount">
                        <bdi>{cartTotal.toLocaleString()}₫</bdi>
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="text-end mt-3">
              <a href="/checkout" className="vs-btn">
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
