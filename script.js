// Sample product data
const products = [
    {
        id: 1,
        name: "Apples",
        price: 150,
        image: "images/apple.jpg"
    },
    {
        id: 2,
        name: "Bananas",
        price: 80,
        image: "images/banana.jpeg"
    },
    {
        id: 3,
        name: "Carrots",
        price: 90,
        image: "images/carrots.jpeg"
    },
    {
        id: 4,
        name: "Broccoli",
        price: 230,
        image: "images/broccoli.jpg"
    },
    {
        id: 5,
        name: "Milk",
        price: 100,
        image: "images/milk.jpg"
    },
    {
        id: 6,
        name: "Bread",
        price: 50,
        image: "images/bread.jpeg"
    }
];

// Cart state
let cart = [];

// Load products into the DOM
const productsContainer = document.getElementById('products');

function loadProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartUI();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalElement = document.getElementById('total');

    // Clear current cart items
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)} <button onclick="removeFromCart(${item.id})">✖</button></span>
        `;

        cartItemsContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.length;
    totalElement.textContent = total.toFixed(2);
}

// Toggle cart visibility
function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('open');
}

// Order Modal Functions
function openOrderModal() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById('order-modal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// Handle Order Form Submission
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !address || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    // Here you would typically send the order to the server
    // For this example, we'll just log it and reset the cart
    const order = {
        name,
        address,
        phone,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    console.log("Order placed:", order);
    alert("Thank you for your order!");

    // Reset cart
    cart = [];
    updateCartUI();
    closeOrderModal();
    toggleCart();
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('order-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize
loadProducts();
updateCartUI();
