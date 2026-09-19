let cart = [];
let total = 0;

// =========================
// SHOPPING CART
// =========================

function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

    total += price;
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${index + 1}. ${item.name} - ₹${item.price}</p>
        `;

        cartItems.appendChild(div);
    });

    totalElement.innerText = "Total: ₹" + total;
}

function showProducts() {
    const products = document.getElementById("products");

    if (products) {
        products.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// =========================
// LOGIN / REGISTER
// =========================

function openLogin() {
    const auth = document.getElementById("auth");
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");

    if (!auth) return;

    auth.style.display = "flex";

    if (loginBox) {
        loginBox.style.display = "block";
    }

    if (registerBox) {
        registerBox.style.display = "none";
    }
}

function openRegister() {
    const auth = document.getElementById("auth");
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");

    if (!auth) return;

    auth.style.display = "flex";

    if (loginBox) {
        loginBox.style.display = "none";
    }

    if (registerBox) {
        registerBox.style.display = "block";
    }
}

function showLogin() {
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");

    if (loginBox) {
        loginBox.style.display = "block";
    }

    if (registerBox) {
        registerBox.style.display = "none";
    }
}

function showRegister() {
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");

    if (loginBox) {
        loginBox.style.display = "none";
    }

    if (registerBox) {
        registerBox.style.display = "block";
    }
}

// =========================
// REGISTER
// =========================

function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("shopEasyUser", JSON.stringify(user));

    alert("Registration successful! Please login.");

    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPassword").value = "";

    showLogin();
}

// =========================
// LOGIN
// =========================

function loginUser() {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    const savedUserData = localStorage.getItem("shopEasyUser");

    if (!savedUserData) {
        alert("No account found. Please register first.");
        return;
    }

    try {
        const savedUser = JSON.parse(savedUserData);

        if (
            savedUser.email === email &&
            savedUser.password === password
        ) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loggedInUser", savedUser.name);

            alert("Login successful! Welcome to ShopEasy.");

            closeAuth();
        } else {
            alert("Invalid email or password.");
        }
    } catch (error) {
        alert("Account data is corrupted. Please register again.");
        localStorage.removeItem("shopEasyUser");
    }
}

// =========================
// CLOSE LOGIN POPUP
// =========================

function closeAuth() {
    const auth = document.getElementById("auth");

    if (auth) {
        auth.style.display = "none";
    }
}
// =========================
// BUY NOW
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        const buyButton = document.createElement("button");

        buyButton.innerText = "Buy Now";
        buyButton.className = "buy-btn";

        buyButton.onclick = function () {
            buyProduct(product);
        };

        product.appendChild(buyButton);
    });

    createBuyModal();
});

function buyProduct(product) {
    const productImage = product.querySelector(".product-image");
    const productName = product.querySelector("h3");
    const productPrice = product.querySelector("p");

    const modalImage = document.getElementById("buyProductImage");
    const modalName = document.getElementById("buyProductName");
    const modalPrice = document.getElementById("buyProductPrice");
    const buyModal = document.getElementById("buyModal");

    modalImage.innerHTML = productImage.innerHTML;
    modalName.innerText = productName.innerText;
    modalPrice.innerText = productPrice.innerText;

    const image = modalImage.querySelector("img");

    if (image) {
        image.style.width = "180px";
        image.style.height = "180px";
        image.style.objectFit = "contain";
    }

    buyModal.style.display = "flex";
}

function createBuyModal() {
    const modal = document.createElement("div");

    modal.id = "buyModal";
    modal.className = "buy-modal";
    modal.innerHTML = `
        <div class="buy-container">

            <button class="buy-close" onclick="closeBuyModal()">×</button>

            <div id="buyProductImage" class="buy-product-image"></div>

            <h2 id="buyProductName"></h2>

            <p id="buyProductPrice" class="buy-product-price"></p>

            <button class="confirm-buy-btn" onclick="confirmBuy()">
                Continue to Buy
            </button>

        </div>
    `;

    document.body.appendChild(modal);
}

function closeBuyModal() {
    document.getElementById("buyModal").style.display = "none";
}

function confirmBuy() {
    const name = document.getElementById("buyProductName").innerText;
    const price = document.getElementById("buyProductPrice").innerText;

    alert("Thank you for choosing " + name + " - " + price);
}