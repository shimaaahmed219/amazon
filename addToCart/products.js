async function get() {
  // Fetching all products from the API
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
// console.log(data)
  // Display all products
  displayProducts(data);
}

// Function to display products in HTML
function displayProducts(products) {
  const productList = document.getElementById("product-list");

  // Loop through all the products and create HTML for each
  products.forEach((product) => {
    // Create a product card div
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Add inner HTML to the card with product data
    productCard.innerHTML = `
            <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${
      product.title
    }" class="product-image">
                <div class="hover-menu">
                    <a href="#">Compare</a>
                    <button>Add to Cart</button>
                    <a href="#">View Details</a>
                    <a href="#">Add to Wish List</a>
                </div>
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-description">${product.description.substring(
                  0,
                  100
                )}...</p> <!-- Display first 100 characters -->
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">★★★★★</div>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
        `;

    // Append the card to the product list container
    productList.appendChild(productCard);

    //event listener for btn
    const button = productCard.querySelector(".add-to-cart-btn");
    button.addEventListener("click", () => addToCart(product));
  });
}

const cart = JSON.parse(localStorage.getItem('cart')) || []

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  // console.log(product)
  // Check if the 'quantity' property exists, if not, add it with value 1
  if (existingProduct) {
    existingProduct.quantity += 1;
    // console.log(product.quantity)
  } else {
    product.quantity = 1;
    cart.push(product);
     // Store the chosen product object
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  // console.log(cart)
  
}


// Call the get() function to fetch and display products when the page loads
get();
