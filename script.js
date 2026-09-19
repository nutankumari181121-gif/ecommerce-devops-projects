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
// BUY NOW - PRODUCT DETAILS
// =========================

let selectedBuyProduct = {
    name: "",
    price: 0
};

let buyQuantity = 1;

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

    // Login check
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first to buy a product.");
        openLogin();
        return;
    }

    const productImage = product.querySelector(".product-image");
    const productName = product.querySelector("h3");
    const productPrice = product.querySelector("p");

    selectedBuyProduct.name = productName.innerText;
    selectedBuyProduct.price = Number(
        productPrice.innerText.replace(/[^\d]/g, "")
    );

    buyQuantity = 1;

    const modalImage = document.getElementById("buyProductImage");
    const modalName = document.getElementById("buyProductName");
    const modalPrice = document.getElementById("buyProductPrice");
    const quantityElement = document.getElementById("buyQuantity");

    modalImage.innerHTML = productImage.innerHTML;
    modalName.innerText = selectedBuyProduct.name;
    modalPrice.innerText = "₹" + selectedBuyProduct.price.toLocaleString("en-IN");
    quantityElement.innerText = buyQuantity;

    const image = modalImage.querySelector("img");

    if (image) {
        image.style.width = "260px";
        image.style.height = "260px";
        image.style.objectFit = "contain";
    }

    document.getElementById("deliveryAddress").value = "";

    updateBuyTotal();

    document.getElementById("buyModal").style.display = "flex";
}

function createBuyModal() {

    const modal = document.createElement("div");

    modal.id = "buyModal";
    modal.className = "buy-modal";

    modal.innerHTML = `
        <div class="buy-details-card">

            <button class="buy-close" onclick="closeBuyModal()">×</button>

            <div class="buy-details-content">

                <div class="buy-details-image" id="buyProductImage"></div>

                <div class="buy-details-info">

                    <span class="buy-brand">ShopEasy</span>

                    <h2 id="buyProductName"></h2>

                    <div class="buy-rating">
                        ★★★★★
                        <span>4.5</span>
                    </div>

                    <p id="buyProductPrice" class="buy-product-price"></p>

                    <p class="buy-delivery">
                        🚚 FREE Delivery
                    </p>

                    <hr>

                    <label class="quantity-label">
                        Quantity
                    </label>

                    <div class="quantity-box">

                        <button onclick="changeBuyQuantity(-1)">
                            −
                        </button>

                        <span id="buyQuantity">1</span>

                        <button onclick="changeBuyQuantity(1)">
                            +
                        </button>

                    </div>

                    <label class="address-label">
                        Delivery Address
                    </label>

                    <textarea
                        id="deliveryAddress"
                        placeholder="Enter your delivery address"
                        rows="3"
                    ></textarea>

                    <div class="buy-total-row">

                        <span>Total</span>

                        <strong id="buyTotal"></strong>

                    </div>

                    <button
                        class="confirm-buy-btn"
                        onclick="confirmBuy()"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);
}

function changeBuyQuantity(change) {

    buyQuantity += change;

    if (buyQuantity < 1) {
        buyQuantity = 1;
    }

    if (buyQuantity > 10) {
        buyQuantity = 10;
    }

    document.getElementById("buyQuantity").innerText = buyQuantity;

    updateBuyTotal();
}

function updateBuyTotal() {

    const total = selectedBuyProduct.price * buyQuantity;

    document.getElementById("buyTotal").innerText =
        "₹" + total.toLocaleString("en-IN");
}

function closeBuyModal() {

    const modal = document.getElementById("buyModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function confirmBuy() {

    const address = document
        .getElementById("deliveryAddress")
        .value
        .trim();

    if (!address) {
        alert("Please enter your delivery address.");
        return;
    }

    const total = selectedBuyProduct.price * buyQuantity;

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Product: " + selectedBuyProduct.name + "\n" +
        "Quantity: " + buyQuantity + "\n" +
        "Total: ₹" + total.toLocaleString("en-IN")
    );

    closeBuyModal();
}