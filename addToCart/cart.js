let cart = JSON.parse(localStorage.getItem("cart"));

const content = document.getElementsByClassName("content")[0];
const totalPrice = document.getElementById("totalPrice");
const secondCol = document.getElementById("second-col");

// function to render all selected items in the cart
function renderTheCartItems() {
  secondCol.style.display = "block";
  let total = 0;
  content.innerHTML = `
        <div class="px-3 bg-white">
            <div class="cart-title d-flex justify-content-between bg-white py-3">
                <h2>Shopping Cart</h2>
                <h4>Subtitle</h4>
            </div>
            <div class="cart-page bg-white ">

            </div>
            <div class="py-2">
                <button class="delet-item-btn clear-cart-btn mt-1 py-2 px-2 mt-2 rounded">Clear Cart</button>
            </div>
        </div>
    `;
  const cartPage = document.getElementsByClassName("cart-page")[0];
  cart.forEach((product) => {
    const productCard = document.createElement("div");

    productCard.innerHTML = `
              <div class="cart-item d-flex flex-column flex-sm-row gap-4 justify-content-between p-4">
                  <div class="img-container">
                      <img class="product-image img-fluid" src="${
                        product.image
                      }" alt="${product.title}">
    </div>
                  
                  <div class="cart-content d-flex flex-column gap-2 w-md-50">
                      <h2 class="lh-base">${product.title}</h2>
                      <p class="">${product.description.substring(0, 100)}</p>
                      <p>Unit Price $${product.price}</p>
                      <div class="quantity d-flex justify-content-center gap-2 rounded py-1">
                          <p>Qty: </p>
                          <p class="sign minus rounded px-1" style="cursor: pointer;"gi>-</p>
                          <p >${product.quantity}</p>
                          <p class="sign plus rounded px-1" style="cursor: pointer;">+</p>
                      </div>
                      <button class="delet-item-btn mt-1 py-1 px-2 rounded">Delete Item</button>
                  </div>
                  <p class="price  text-center d-flex  align-items-center ">$${
                    product.price * product.quantity
                  }</p>
              </div>
              `;

    total += product.price * product.quantity;
    cartPage.appendChild(productCard);

    //event listener for btns
    const Plus = productCard.querySelector(".plus");
    const Minus = productCard.querySelector(".minus");
    const DeleteItemBtn = productCard.querySelector(".delet-item-btn");
    Plus.addEventListener("click", () => increaseTheQuantity(product));
    Minus.addEventListener("click", () => decreaseTheQuantity(product));
    DeleteItemBtn.addEventListener("click", () => deleteItem(product));
  });
  totalPrice.textContent = "$" + total.toFixed(2);
}

// function to increase the quantity of specific item
function increaseTheQuantity(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("adding");
    renderTheCartItems();
  }
}

// function to decrease the quantity of specific item
function decreaseTheQuantity(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct && product.quantity > 1) {
    existingProduct.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("sub");
    renderTheCartItems();
  }
}

// function to delete a specific item
function deleteItem(product) {
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    if (cart.length === 0) {
      renerTheEmptyCart();
    } else {
      renderTheCartItems();
    }
  }
}

// function to render empty cart
function renerTheEmptyCart() {
  secondCol.style.display = "none";
  content.classList.add("col-lg-12");
  content.classList.remove("p-4");
  content.innerHTML = `
    
    <div class="empty-cart">
        <div class="d-flex flex-column flex-md-row justify-content-center gap-4 align-items-center py-5" style="height:100vh; box-sizing:border-box">
            <div class="p-3">
                <img src="assets/empty cart.png" alt="empty cart">
            </div>
            <div class=" p-3 empty-message rounded">
                <h1>Your cart feels lonely.</h1>
                <p>Your shopping cart lives to serve. Give it purpose - fill it with books, electronics, etc, and make
                    it happy.</p>
                <a href="products.html"><button class="mt-2 rounded">Continue Shopping</button></a>
            </div>
        </div>
    </div>
    `;
}

// Render cart page
if (cart != null) {
  renderTheCartItems();
} else {
  renerTheEmptyCart();
}

// Clear all items from cart
const buttonClear = document.getElementsByClassName("clear-cart-btn")[0];
buttonClear.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cart = JSON.parse(localStorage.getItem("cart"));
  renerTheEmptyCart();
});
