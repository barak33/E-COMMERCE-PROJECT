// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Optionally store preference in localStorage
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('hetgaDarkMode', 'enabled');
    } else {
        localStorage.setItem('hetgaDarkMode', 'disabled');
    }
}

// Load dark mode preference on page load
window.onload = function() {
    if(localStorage.getItem('hetgaDarkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    startCountdown();
    renderCart();
}

// Countdown timer - counts down from a target date/time and shows alert on expiration
function startCountdown() {
    // Set the offer's end date/time - 9 days from page load
    const countDownDate = new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000).getTime();

    const countdownElement = document.getElementById('countdown');

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            countdownElement.innerText = "EXPIRED";
            alert("The limited-time offer has expired!");
            return;
        }

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((distance % (1000*60)) / 1000);

        // Display timer with days included
        countdownElement.innerText = 
            (days > 0 ? days + "d " : "") +
            (hours > 0 ? hours + "h " : "") +
            minutes + "m " + 
            seconds + "s";
    }, 1000);
}

// Products data with prices and images -- synchronize with HTML product list
const productsData = {
    'Laptop': { price: 999, image: 'images/Laptop.jpg' },
    'Smartphone': { price: 699, image: 'images/Mobile.jpg' },
    'Headphones': { price: 199, image: 'images/Headphones.jpg' },
    'Tablet': { price: 499, image: 'images/Tablet.jpg' },
    'Smartwatch': { price: 299, image: 'images/Smartwatch.jpg' },
    'Camera': { price: 799, image: 'images/Camera.jpg' },
    'Speaker': { price: 99, image: 'images/Speaker.jpg' },
    'Keyboard': { price: 49, image: 'images/Keyboard.jpg' },
    'Mouse': { price: 29, image: 'images/Mouse.jpg' },
    'Monitor': { price: 129, image: 'images/Monitor.jpg' },
    'Printer': { price: 79, image: 'images/Printer.jpg' },
    'Router': { price: 59, image: 'images/Router.jpg' },
    'External Hard Drive': { price: 99, image: 'images/ExternalHardDrive.jpg' },
};

// Search products filtering and highlight
function searchProducts() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const productList = document.getElementById('productList');
    const products = productList.getElementsByClassName('product');

    for (let product of products) {
        const text = product.textContent.toLowerCase();

        if (text.includes(query)) {
            product.style.display = "flex";

            // Highlight matching text (simple approach)
            const innerHTML = product.innerHTML;
            const regex = new RegExp(`(${query})`, 'gi');
            product.innerHTML = innerHTML.replace(/<mark>|<\/mark>/gi, ''); // Clear previous highlights
            if(query.length > 0) {
                product.innerHTML = product.innerHTML.replace(regex, '<mark>$1</mark>');
            }
        } else {
            product.style.display = "none";
        }
    }
}

// Shopping cart representation
let cartItems = [];

// Add product to cart
function addToCart(productName) {
    const product = productsData[productName];
    if (!product) return;

    // Check if already in cart; if so, increase quantity
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: product.price, quantity: 1 });
    }
    renderCart();
}

// Remove product from cart
function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    renderCart();
}

// Render cart items to the page
function renderCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    if (cartItems.length === 0) {
        cartElement.innerHTML = "<li>Your cart is empty.</li>";
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');

        li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(item.name);
        li.appendChild(removeBtn);

        cartElement.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    // Show total price below cart
    let totalLi = document.getElementById('cart-total');
    if (!totalLi) {
        totalLi = document.createElement('li');
        totalLi.id = 'cart-total';
        totalLi.style.fontWeight = '700';
        totalLi.style.marginTop = '10px';
        cartElement.appendChild(totalLi);
    }
    totalLi.textContent = `Total: $${totalPrice.toFixed(2)}`;
}
