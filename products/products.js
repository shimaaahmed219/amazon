async function get() {
    // Fetching all products from the API
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    
    // Display all products
    displayProducts(data);
}

// Function to display products in HTML
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    
    // Loop through all the products and create HTML for each
    products.forEach(product => {
        // Create a product card div
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Add inner HTML to the card with product data
        productCard.innerHTML = `
            <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="hover-menu">
                    <a href="#">Compare</a>
                    <a href="#">Add to Cart</a>
                    <a href="#">View Details</a>
                    <a href="#">Add to Wish List</a>
                </div>
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-description">${product.description.substring(0, 100)}...</p> <!-- Display first 100 characters -->
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">★★★★★</div>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
        `;

        // Append the card to the product list container
        productList.appendChild(productCard);
    });
}

// Call the get() function to fetch and display products when the page loads
get();
