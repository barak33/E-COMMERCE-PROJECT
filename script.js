// Countdown Timer for Sales
function countdownTimer(deadline) {
    let timer = setInterval(() => {
        let now = new Date().getTime();
        let timeLeft = deadline - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "Offer Expired!";
        }
    }, 1000);
}

let saleDeadline = new Date("May 15, 2025 23:59:59").getTime();
countdownTimer(saleDeadline);

// Search Bar
function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        product.style.display = product.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

// Shopping Cart
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        cartList.appendChild(li);
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Signup
document.getElementById("signupForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let newUser = document.getElementById("newUser").value;
    let newPass = document.getElementById("newPass").value;

    localStorage.setItem("username", newUser);
    localStorage.setItem("password", newPass);

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let loginUser = document.getElementById("loginUser").value;
    let loginPass = document.getElementById("loginPass").value;

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (loginUser === storedUser && loginPass === storedPass) {
        alert("Login successful! Welcome to HETGA SHOPEE.");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
});
