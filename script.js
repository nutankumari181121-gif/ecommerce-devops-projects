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
// BUY NOW - FLIPKART STYLE
// =========================

let selectedBuyProduct = {
    name: "",
    price: 0,
    image: ""
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

    selectedBuyProduct.image = productImage.innerHTML;

    buyQuantity = 1;

    document.getElementById("buyProductName").innerText =
        selectedBuyProduct.name;

    document.getElementById("buyProductPrice").innerText =
        "₹" + selectedBuyProduct.price.toLocaleString("en-IN");

    document.getElementById("buyQuantity").innerText = "1";

    document.getElementById("deliveryAddress").value = "";

    const imageBox = document.getElementById("buyProductImage");

    imageBox.innerHTML = selectedBuyProduct.image;

    const image = imageBox.querySelector("img");

    if (image) {
        image.style.width = "300px";
        image.style.height = "300px";
        image.style.objectFit = "contain";
    }

    updateBuyTotal();

    document.getElementById("buyModal").style.display = "flex";
}

function createBuyModal() {

    const modal = document.createElement("div");

    modal.id = "buyModal";
    modal.className = "buy-modal";

    modal.innerHTML = `
        <div class="flipkart-buy-card">

            <button
                class="buy-close"
                onclick="closeBuyModal()">
                ×
            </button>

            <div class="buy-left">

                <div
                    id="buyProductImage"
                    class="buy-product-image">
                </div>

                <div class="buy-action-buttons">

                    <button
                        class="add-cart-buy"
                        onclick="addSelectedToCart()">
                        🛒 Add to Cart
                    </button>

                    <button
                        class="main-buy-button"
                        onclick="confirmBuy()">
                        ⚡ Buy Now
                    </button>

                </div>

            </div>

            <div class="buy-right">

                <span class="buy-shop-name">
                    ShopEasy
                </span>

                <h2 id="buyProductName"></h2>

                <div class="buy-rating">
                    ★★★★★
                    <span>4.5</span>
                </div>

                <div
                    id="buyProductPrice"
                    class="buy-product-price">
                </div>

                <div class="special-offer">
                    🏷️ Special Price
                </div>

                <p class="offer-text">
                    ✓ Free Delivery
                    <br>
                    ✓ Easy Returns
                    <br>
                    ✓ Secure Shopping
                </p>

                <hr>

                <label class="quantity-label">
                    Quantity
                </label>

                <div class="quantity-box">

                    <button onclick="changeBuyQuantity(-1)">
                        −
                    </button>

                    <span id="buyQuantity">
                        1
                    </span>

                    <button onclick="changeBuyQuantity(1)">
                        +
                    </button>

                </div>

                <label class="address-label">
                    Delivery Address
                </label>

                <textarea
                    id="deliveryAddress"
                    placeholder="Enter your complete delivery address"
                    rows="3">
                </textarea>

                <div class="buy-total-row">

                    <span>
                        Total Amount
                    </span>

                    <strong id="buyTotal"></strong>

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

    document.getElementById("buyQuantity").innerText =
        buyQuantity;

    updateBuyTotal();
}

function updateBuyTotal() {

    const total =
        selectedBuyProduct.price * buyQuantity;

    document.getElementById("buyTotal").innerText =
        "₹" + total.toLocaleString("en-IN");
}

function addSelectedToCart() {

    addToCart(
        selectedBuyProduct.name,
        selectedBuyProduct.price
    );

    alert(
        selectedBuyProduct.name +
        " added to your cart."
    );
}

function confirmBuy() {

    const address =
        document.getElementById("deliveryAddress")
        .value
        .trim();

    if (!address) {
        alert("Please enter your delivery address.");
        return;
    }

    const total =
        selectedBuyProduct.price * buyQuantity;

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Product: " +
        selectedBuyProduct.name +
        "\nQuantity: " +
        buyQuantity +
        "\nTotal: ₹" +
        total.toLocaleString("en-IN") +
        "\n\nDelivery Address:\n" +
        address
    );

    closeBuyModal();
}

function closeBuyModal() {

    const modal =
        document.getElementById("buyModal");

    if (modal) {
        modal.style.display = "none";
    }
}