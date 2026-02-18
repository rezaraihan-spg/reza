// Sample Products Data
const products = [
    {
        id: 1,
        name: "Laptop Gaming",
        price: 8500000,
        description: "Laptop gaming dengan performa tinggi",
        emoji: "💻"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 4500000,
        description: "Smartphone dengan kamera terbaik",
        emoji: "📱"
    },
    {
        id: 3,
        name: "Headphone Wireless",
        price: 1200000,
        description: "Headphone nirkabel dengan bass mantap",
        emoji: "🎧"
    },
    {
        id: 4,
        name: "Smartwatch",
        price: 2000000,
        description: "Jam tangan pintar untuk tracking kesehatan",
        emoji: "⌚"
    },
    {
        id: 5,
        name: "Tablet",
        price: 3500000,
        description: "Tablet dengan layar besar",
        emoji: "📲"
    },
    {
        id: 6,
        name: "Kamera Digital",
        price: 5500000,
        description: "Kamera profesional untuk fotografi",
        emoji: "📷"
    },
    {
        id: 7,
        name: "Keyboard Mekanik",
        price: 800000,
        description: "Keyboard gaming dengan RGB lighting",
        emoji: "⌨️"
    },
    {
        id: 8,
        name: "Mouse Gaming",
        price: 600000,
        description: "Mouse presisi tinggi untuk gaming",
        emoji: "🖱️"
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateUserMenu();
    updateCartCount();
    
    // Check current page and load appropriate content
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage.includes('index')) {
        loadProducts();
        setupSearch();
    } else if (currentPage.includes('login')) {
        setupLoginForm();
        setupRegisterForm();
    } else if (currentPage.includes('cart')) {
        loadCartItems();
    }
});

// Load Products
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">Rp ${formatPrice(product.price)}</div>
                <div class="product-quantity">
                    <button class="qty-btn" onclick="decreaseQty(${product.id})">-</button>
                    <div class="qty-display" id="qty-${product.id}">1</div>
                    <button class="qty-btn" onclick="increaseQty(${product.id})">+</button>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Quantity Management
function increaseQty(productId) {
    const qtyDisplay = document.getElementById(`qty-${productId}`);
    let qty = parseInt(qtyDisplay.textContent);
    qtyDisplay.textContent = qty + 1;
}

function decreaseQty(productId) {
    const qtyDisplay = document.getElementById(`qty-${productId}`);
    let qty = parseInt(qtyDisplay.textContent);
    if (qty > 1) {
        qtyDisplay.textContent = qty - 1;
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyDisplay = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyDisplay.textContent);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            emoji: product.emoji
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    qtyDisplay.textContent = '1';
    alert('Produk berhasil ditambahkan ke keranjang!');
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load Cart Items
function loadCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><p>Keranjang Anda kosong</p></div>';
        updateCartSummary();
        return;
    }
    
    container.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-price">Rp ${formatPrice(item.price)}</div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity}" onchange="updateCartQty(${item.id}, this.value)" min="1">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                <span style="margin-left: 1rem;">Rp ${formatPrice(item.price * item.quantity)}</span>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Hapus</button>
        `;
        container.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// Update Cart Quantity
function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    const newQty = typeof change === 'string' ? parseInt(change) : item.quantity + parseInt(change);
    
    if (newQty > 0) {
        item.quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCartItems();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `Rp ${formatPrice(subtotal)}`;
    if (taxEl) taxEl.textContent = `Rp ${formatPrice(tax)}`;
    if (totalEl) totalEl.textContent = `Rp ${formatPrice(total)}`;
}

// Search Products
function setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const container = document.getElementById('products-container');
        
        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
        
        container.innerHTML = '';
        if (filteredProducts.length === 0) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Produk tidak ditemukan</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">Rp ${formatPrice(product.price)}</div>
                    <div class="product-quantity">
                        <button class="qty-btn" onclick="decreaseQty(${product.id})">-</button>
                        <div class="qty-display" id="qty-${product.id}">1</div>
                        <button class="qty-btn" onclick="increaseQty(${product.id})">+</button>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                </div>
            `;
            container.appendChild(productCard);
        });
    });
}

// Login Form Setup
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation - check against stored users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        const messageEl = document.getElementById('login-message');
        
        if (user) {
            loggedInUser = { email: user.email, name: user.name };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            messageEl.className = 'message success';
            messageEl.textContent = 'Login berhasil! Mengarahkan...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            messageEl.className = 'message error';
            messageEl.textContent = 'Email atau password salah!';
        }
    });
}

// Register Form Setup
function setupRegisterForm() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            document.getElementById('register-message').className = 'message error';
            document.getElementById('register-message').textContent = 'Email sudah terdaftar!';
            return;
        }
        
        // Add new user
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        document.getElementById('register-message').className = 'message success';
        document.getElementById('register-message').textContent = 'Pendaftaran berhasil! Silakan login.';
        
        setTimeout(() => {
            showLogin();
        }, 1500);
    });
}

// Toggle Login/Register
function showRegister() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('register-box').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('register-box').style.display = 'none';
}

// Update User Menu
function updateUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (!userMenu) return;
    
    if (loggedInUser) {
        userMenu.innerHTML = `
            <a href="#" onclick="logout(event)">Logout (${loggedInUser.name})</a>
        `;
    } else {
        userMenu.innerHTML = `<a href="login.html">Login</a>`;
    }
}

// Logout
function logout(e) {
    e.preventDefault();
    loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    updateUserMenu();
    alert('Anda telah logout');
    window.location.href = 'index.html';
}

// Format Price
function formatPrice(price) {
    return price.toLocaleString('id-ID');
}

// Checkout
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Keranjang Anda kosong!');
            return;
        }
        
        if (!loggedInUser) {
            alert('Silakan login terlebih dahulu');
            window.location.href = 'login.html';
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity * 1.1), 0);
        alert(`Pembelian berhasil!\nTotal: Rp ${formatPrice(total)}\n\nTerima kasih telah berbelanja!`);
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'index.html';
    });
}

// Setup checkout on page load
window.addEventListener('load', setupCheckout);