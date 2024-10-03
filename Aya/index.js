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
/////////////////////////////////////////////////////////////////////////////
async function get() {
    // Fetching all products from the API
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    
    // Display all products
    displayProducts(data);
}

// Function to update the wishlist count badge
function updateWishlistCount() {
    const wishListProducts = JSON.parse(localStorage.getItem('wishListProducts')) || [];
    const wishlistCount = wishListProducts.length || 0; // Set count to 0 if no products
    document.getElementById('wishlist-count').textContent = wishlistCount;
    return wishlistCount;
}

// Function to display products in HTML
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    
    // Loop through the products and generate HTML
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="hover-menu">
                    <a href="#" class="add-to-wishlist">Add to Wish List</a>
                    <a href="#">Compare</a>
                    <a href="#">Add to Cart</a>
                    <a href="#">View Details</a>
                </div>
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-description">${product.description.substring(0, 100)}...</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">★★★★★</div>
            </div>
        `;
        
        productList.appendChild(productCard);

        const wishListLink = productCard.querySelector('.add-to-wishlist');
        wishListLink.addEventListener('click', function(event) {
            event.preventDefault();
            let wishListProducts = JSON.parse(localStorage.getItem('wishListProducts')) || [];
            const alreadyInWishlist = wishListProducts.find(p => p.id === product.id);

            if (!alreadyInWishlist) {
                wishListProducts.push(product);
                localStorage.setItem('wishListProducts', JSON.stringify(wishListProducts));
                showToast(`${product.title} has been added to your wishlist!`);
            } else {
                showToast(`${product.title} is already in your wishlist!`);
            }

            updateWishlistCount(); // Ensure the count is updated
        });
    });
}

// Function to show a toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Function to reset the wishlist (set to 0)
function resetWishlist() {
    localStorage.setItem('wishListProducts', JSON.stringify([]));
    updateWishlistCount(); // Update the count to 0
}

window.onload = function() {
    updateWishlistCount(); // Ensure count is updated on page load

    // Add click event to the wishlist count badge
    document.getElementById('wishlist-count').onclick = function() {
        const wishlistCount = updateWishlistCount(); 
        if (wishlistCount > 0) {
            window.location.href = 'wishlist.html';
        }
    };

    get(); // Fetch products when the page loads
};
