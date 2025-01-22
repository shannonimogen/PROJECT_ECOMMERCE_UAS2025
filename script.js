// Definisikan products di awal file, sebelum fungsi-fungsi lainnya
const products = {
    // Produk-produk dari halaman 1 (1-17)
    1: {
        id: 1,
        name: 'CALL OF DUTY 6',
        price: 100,
        image: 'images/TOP 2024/COD_6.jpg',
        description: 'Experience the latest in the Call of Duty franchise.'
    },
    2: {
        id: 2,
        name: 'CYBERPUNK 2077',
        price: 85,
        image: 'images/TOP 2024/cyberpunk-2077-button-fin-1594877291453.webp',
        description: 'Enter the futuristic world of Night City.'
    },
    3: {
        id: 3,
        name: 'Marvel Spider-Man 2',
        price: 90,
        image: 'images/TOP 2024/MARVEL_SPIDERMAN 2.avif',
        description: 'Swing through New York City in this epic adventure.'
    },
    // ... (produk 4-17)

    // Produk-produk dari halaman 2 (18-25)
    18: {
        id: 18,
        name: 'GRAND THEFT AUTO V',
        price: 15,
        oldPrice: 40,
        image: 'images/GTAV_Gen9_MFT_Webstore_Hero_3840x2160_DELIV.jpg',
        description: 'Experience the thrilling world of Los Santos in this action-packed adventure.'
    },
    19: {
        id: 19,
        name: 'RESIDENT EVIL 4',
        price: 30,
        oldPrice: 60,
        image: 'images/GAMES/EVWyZD63pahuh95eKloFaJuC.avif',
        description: 'Survive horror and uncover sinister plots in this reimagined classic.'
    },
    20: {
        id: 20,
        name: 'GOD OF WAR RAGNARÖK',
        price: 35,
        oldPrice: 70,
        image: 'images/GAMES/god-of-war-ragnarok-button-1663953454461.jpg',
        description: 'Join Kratos and Atreus in their epic Norse adventure.'
    },
    21: {
        id: 21,
        name: 'HORIZON FORBIDDEN WEST',
        price: 25,
        oldPrice: 50,
        image: 'images/GAMES/horizon.jpg',
        description: 'Explore a vibrant, post-apocalyptic world as Aloy.'
    },
    22: {
        id: 22,
        name: 'FAR CRY 6',
        price: 20,
        oldPrice: 45,
        image: 'images/GAMES/FC6.jpg',
        description: 'Fight against a ruthless dictator in this open-world FPS.'
    },
    23: {
        id: 23,
        name: 'TEKKEN 8',
        price: 30,
        oldPrice: 55,
        image: 'images/GAMES/TEKKEN8.avif',
        description: 'Experience the next generation of fighting games.'
    },
    24: {
        id: 24,
        name: 'MORTAL KOMBAT 1',
        price: 40,
        oldPrice: 65,
        image: 'images/GAMES/MORTAL KOMBAT 1.avif',
        description: 'Enter the brutal world of Mortal Kombat.'
    },
    25: {
        id: 25,
        name: 'STREET FIGHTER 6',
        price: 35,
        oldPrice: 60,
        image: 'images/GAMES/STREET FIGHTER 6.avif',
        description: 'Master new fighting mechanics in this legendary series.'
    }
};

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Initialize cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Tambahkan di products.js atau di bagian atas script.js
const specialProducts = {
    'ps5': {
        id: 'ps5',
        name: 'PlayStation 5',
        price: 499.99,
        image: 'images/BACKGROUND/ps5-product-thumbnail-01-en-14sep21.webp',
        description: 'Next-generation gaming console'
    },
    'psvr2': {
        id: 'psvr2',
        name: 'PlayStation VR2',
        price: 549.99,
        image: 'images/PSVR2-thumbnail-01-en-22feb22.webp',
        description: 'Next-generation virtual reality system'
    }
};

// Add these functions to your existing script.js file
let isDiscountApplied = false;

function applyCoupon() {
    const couponCode = document.getElementById('couponInput').value.trim();
    const discountRow = document.getElementById('discountRow');
    const subtotalElement = document.getElementById('cartSubtotal');
    const discountElement = document.getElementById('discountAmount');
    const totalElement = document.getElementById('cartTotal');

    if (couponCode.toUpperCase() === 'DISKONPSKU') {
        if (!isDiscountApplied) {
            const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
            const discount = subtotal * 0.1; // 10% discount
            const total = subtotal - discount;

            discountRow.style.display = 'table-row';
            discountElement.textContent = `-$${discount.toFixed(2)}`;
            totalElement.innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
            
            isDiscountApplied = true;
            alert('Coupon applied successfully! You got 10% discount.');
        } else {
            alert('Discount already applied!');
        }
    } else {
        alert('Invalid coupon code!');
    }
}

// Modify your existing updateCartDisplay function
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    let subtotal = 0;
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        subtotal += item.price;
        cartContainer.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeFromCart(${item.id})"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>1</td>
                <td>$${item.price}</td>
            </tr>
        `;
    });

    // Update subtotal
    const subtotalElement = document.getElementById('cartSubtotal');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Update total with discount if applied
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        if (isDiscountApplied) {
            const discount = subtotal * 0.1;
            const total = subtotal - discount;
            document.getElementById('discountAmount').textContent = `-$${discount.toFixed(2)}`;
            totalElement.innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
        } else {
            totalElement.innerHTML = `<strong>$${subtotal.toFixed(2)}</strong>`;
        }
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
});

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        alert('Item already in cart!');
        return;
    }

    // Add new item to cart
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    });

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    alert('Item added to cart!');
    
    // Update cart display if on cart page
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
}

// Fungsi untuk mengupdate quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(x => x.id.toString() === productId.toString());
    if (item) {
        const quantity = parseInt(newQuantity);
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

// Reset discount when cart is cleared
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    isDiscountApplied = false;
    window.location.href = 'success.html';
}

function loadProducts() {
    const containers = document.querySelectorAll('.pro-container');
    containers.forEach(container => {
        const productElements = container.querySelectorAll('.pro');
        productElements.forEach(element => {
            const link = element.querySelector('.cart');
            if (link) {
                const productId = parseInt(link.href.split('id=')[1]);
                const product = products[productId];
                if (product) {
                    // Update product details
                    element.querySelector('img').src = product.image;
                    element.querySelector('h5').textContent = product.name;
                    
                    const priceContainer = element.querySelector('.price-container');
                    if (priceContainer) {
                        if (product.oldPrice) {
                            priceContainer.innerHTML = `
                                <span class="old-price">$${product.oldPrice}</span>
                                <span class="new-price">$${product.price}</span>
                            `;
                        } else {
                            priceContainer.innerHTML = `<span class="new-price">$${product.price}</span>`;
                        }
                    } else {
                        element.querySelector('h4').textContent = `$${product.price}`;
                    }
                }
            }
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    
    // Jika di halaman single product
    if (window.location.pathname.includes('singleProduct.html')) {
        console.log('Loading product details...'); // Debug log
        loadProductDetails();
        
        // Tambahkan event listener untuk tombol Add to Cart
        const addToCartButton = document.querySelector('button.normal');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function() {
                addToCartFromDetails();
            });
        }
    }

    // Update tampilan cart
    updateCartDisplay();
});

// Fungsi untuk validasi email
function validateAndSubmitEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        alert('Email successfully registered!');
        emailInput.value = ''; // Clear input after successful registration
    } else {
        alert('Please enter a valid email address!');
    }
}

// Fungsi untuk memuat detail produk di halaman single product
function loadProductDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        console.log('Loading product details for ID:', productId); // Debug log
        
        const product = products[productId];
        if (!product) {
            console.error('Product not found:', productId);
            alert('Product not found!');
            window.location.href = 'shop.html';
            return;
        }
        
        document.getElementById('MainImg').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productDescription').textContent = product.description || 'No description available';
        
        // Set small images if they exist
        const smallImages = document.getElementsByClassName('small-img');
        if (smallImages.length > 0) {
            Array.from(smallImages).forEach(img => {
                img.src = product.image;
            });
        }
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

// Fungsi untuk menambahkan item ke keranjang dari halaman detail
function addToCartFromDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        console.log('Adding to cart from details, product ID:', productId); // Debug log
        
        const product = products[productId];
        if (product) {
            addToCart(product.id);
            alert('Product added to cart successfully!');
        } else {
            console.error('Product not found for ID:', productId);
            alert('Error: Product not found!');
        }
    } catch (error) {
        console.error('Error adding to cart from details:', error);
        alert('Error adding product to cart!');
    }
}

// Event listener untuk tombol checkout di cart.html
const checkoutButton = document.querySelector('button[onclick="window.location.href=\'success.html\'"]');
if (checkoutButton) {
    checkoutButton.onclick = function(e) {
        e.preventDefault();
        checkout();
    };
}

// Tambahkan fungsi ini di script.js
function addToCartConsole(consoleId) {
    // Definisikan produk konsol secara langsung untuk memastikan data selalu ada
    const consoleProducts = {
        'ps5': {
            id: 'ps5',
            name: "PlayStation 5",
            price: 499.99,
            image: "images/BACKGROUND/ps5-product-thumbnail-01-en-14sep21.webp",
            description: "Experience Next-Gen Gaming with PlayStation 5"
        },
        'psvr2': {
            id: 'psvr2',
            name: "PlayStation VR2",
            price: 549.99,
            image: "images/PSVR2-thumbnail-01-en-22feb22.webp",
            description: "Immersive Virtual Reality Gaming System"
        }
    };

    const product = consoleProducts[consoleId];
    
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if already in cart
    const existingItem = cart.find(item => item.id === consoleId);
    if (existingItem) {
        alert('This item is already in your cart!');
        return;
    }

    // Add to cart
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show success message
    alert('Item added to cart successfully!');
    
    // Redirect to cart
    window.location.href = 'cart.html';
}