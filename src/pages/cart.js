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
    <div className="vs-cart-wrapper space-top space-extra-bottom" style={{ marginBottom: "80px" }}>
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
                cartItems.map((item) => {
                  const imageSrc = item.imageUrl
                    ? item.imageUrl.startsWith("http")
                      ? item.imageUrl
                      : `${API_BASE_URL}${item.imageUrl}`
                    : "/placeholder.png";

                  const engravingFee = item.engravingFee || 0;
                  const basePrice = item.price || 0;
                  const finalPrice = basePrice + engravingFee;

                  const productName = item.productName || item.name || "Sản phẩm";

                  // ✅ Link chuẩn /shop/{productId}/{variantId}
                  const productLink = item.variantId
                    ? `/shop/${item.productId}/${item.variantId}`
                    : `/shop/${item.productId}`;

                  return (
                    <tr className="cart_item" key={`${item.productId}-${item.variantId || 0}`}>
                      <td data-title="Product">
                        <a className="cart-productimage" href={productLink}>
                          <img
                            width="100"
                            height="95"
                            src={imageSrc}
                            alt={productName}
                            style={{
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #eee",
                            }}
                          />
                        </a>
                      </td>

                      <td data-title="Name" style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                       <a
  className="cart-productname"
  href={productLink}
  style={{
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 600,
    color: "#333",
  }}
>
  {(item.productName || item.name || "")
    .replace(/(.+)\s-\s\1/, "$1")}
  {item.engravingText && " (Khắc)"}
</a>


                        {/* ✅ Nếu có chữ khắc */}
                        {item.engravingText && (
                          <div style={{ fontSize: "13px", color: "#777", marginTop: "4px" }}>
                            Khắc: “{item.engravingText}”
                          </div>
                        )}
                      </td>

                      {/* ✅ Hiển thị giá gốc + phí khắc nếu có */}
<td data-title="Price">
  <span className="amount" style={{ display: "block" }}>
    <bdi>{(basePrice + engravingFee).toLocaleString()}₫</bdi>
  </span>
                      </td>

                      {/* ✅ Quantity */}
                      <td data-title="Quantity">
                        <div className="quantity style2">
                          <div className="quantity__field quantity-container">
                            <div className="quantity__buttons">
                              <button
                                type="button"
                                className="quantity-minus qty-btn"
                                onClick={() => {
                                  if (item.quantity > 1)
                                    updateQuantity(item.productId, item.variantId, item.quantity - 1);
                                }}
                              >
                                <i className="fal fa-minus"></i>
                              </button>

                              <input
                                type="number"
                                className="qty-input"
                                step="1"
                                min="1"
                                max="100"
                                name="quantity"
                                title="Qty"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item, e.target.value)}
                              />

                              <button
                                type="button"
                                className="quantity-plus qty-btn"
                                onClick={() => {
                                  if (item.quantity < 100)
                                    updateQuantity(item.productId, item.variantId, item.quantity + 1);
                                }}
                              >
                                <i className="fal fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ✅ Tổng = (giá + phí khắc) * số lượng */}
                      <td data-title="Total">
                        <span className="amount">
                          <bdi>{(finalPrice * item.quantity).toLocaleString()}₫</bdi>
                        </span>
                      </td>

                      {/* ✅ Xóa đúng sản phẩm/variant */}
                      <td data-title="Remove">
                        <button
                          type="button"
                          className="remove"
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#d33",
                          }}
                        >
                          <i className="fal fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </form>

        {/* ✅ Cart Totals */}
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
