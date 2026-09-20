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
// PRODUCT DETAILS + BUY FLOW
// =========================

let selectedBuyProduct = {
    name: "",
    price: 0,
    image: ""
};

let buyQuantity = 1;
let selectedSize = "";

document.addEventListener("DOMContentLoaded", function () {

    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {

        // Product card click
        product.addEventListener("click", function (event) {

            // Button par click ho to product card open na ho
            if (event.target.closest("button")) {
                return;
            }

            openProductDetails(product);
        });

        // Buy Now button
        const buyButton = document.createElement("button");

        buyButton.innerText = "Buy Now";
        buyButton.className = "buy-btn";

        buyButton.onclick = function (event) {
            event.stopPropagation();
            openProductDetails(product);
        };

        product.appendChild(buyButton);
    });

    createShopModal();
});


// =========================
// OPEN PRODUCT DETAILS
// =========================

function openProductDetails(product) {

    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first.");
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
    selectedSize = "";

    document.getElementById("detailImage").innerHTML =
        selectedBuyProduct.image;

    document.getElementById("detailName").innerText =
        selectedBuyProduct.name;

    document.getElementById("detailPrice").innerText =
        "₹" + selectedBuyProduct.price.toLocaleString("en-IN");

    const image = document
        .getElementById("detailImage")
        .querySelector("img");

    if (image) {
        image.style.width = "320px";
        image.style.height = "320px";
        image.style.objectFit = "contain";
    }

    showShopStep("details");

    document.getElementById("shopModal").style.display = "flex";
}


// =========================
// CREATE SHOP MODAL
// =========================

function createShopModal() {

    const modal = document.createElement("div");

    modal.id = "shopModal";
    modal.className = "shop-modal";

    modal.innerHTML = `

        <div class="shop-modal-card">

            <button
                class="shop-close"
                onclick="closeShopModal()">
                ×
            </button>


            <!-- PRODUCT DETAILS -->

            <div id="detailsStep" class="shop-step">

                <div class="shop-product-layout">

                    <div
                        id="detailImage"
                        class="detail-image">
                    </div>

                    <div class="detail-information">

                        <span class="shop-brand">
                            ShopEasy
                        </span>

                        <h2 id="detailName"></h2>

                        <div class="detail-rating">
                            ★★★★★
                            <span>4.5</span>
                        </div>

                        <div
                            id="detailPrice"
                            class="detail-price">
                        </div>

                        <p class="delivery-info">
                            ✓ Free Delivery
                            <br>
                            ✓ Easy Returns
                            <br>
                            ✓ Secure Shopping
                        </p>

                        <div class="detail-buttons">

                            <button
                                class="detail-cart-btn"
                                onclick="addSelectedProductToCart()">
                                🛒 Add to Cart
                            </button>

                            <button
                                class="detail-buy-btn"
                                onclick="startBuyFlow()">
                                ⚡ Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <!-- SIZE + ADDRESS -->

            <div
                id="buyStep"
                class="shop-step"
                style="display:none;">

                <div class="checkout-header">
                    <h2>Buy Now</h2>
                    <p>Enter delivery details</p>
                </div>

                <div class="checkout-product">

                    <div
                        id="checkoutImage"
                        class="checkout-image">
                    </div>

                    <div>
                        <h3 id="checkoutName"></h3>

                        <p
                            id="checkoutPrice"
                            class="checkout-price">
                        </p>
                    </div>

                </div>


                <label class="checkout-label">
                    Select Size
                </label>

                <div class="size-options">

                    <button
                        type="button"
                        onclick="selectSize(this, 'S')">
                        S
                    </button>

                    <button
                        type="button"
                        onclick="selectSize(this, 'M')">
                        M
                    </button>

                    <button
                        type="button"
                        onclick="selectSize(this, 'L')">
                        L
                    </button>

                    <button
                        type="button"
                        onclick="selectSize(this, 'XL')">
                        XL
                    </button>

                </div>


                <label class="checkout-label">
                    Quantity
                </label>

                <div class="checkout-quantity">

                    <button
                        type="button"
                        onclick="changeBuyQuantity(-1)">
                        −
                    </button>

                    <span id="checkoutQuantity">
                        1
                    </span>

                    <button
                        type="button"
                        onclick="changeBuyQuantity(1)">
                        +
                    </button>

                </div>


                <label class="checkout-label">
                    Delivery Address
                </label>

                <textarea
                    id="deliveryAddress"
                    placeholder="Enter your complete delivery address"
                    rows="4">
                </textarea>


                <button
                    class="continue-btn"
                    onclick="showOrderSummary()">
                    Continue
                </button>

            </div>


            <!-- ORDER SUMMARY -->

            <div
                id="summaryStep"
                class="shop-step"
                style="display:none;">

                <div class="checkout-header">
                    <h2>Order Summary</h2>
                    <p>Check your order details</p>
                </div>


                <div class="summary-product">

                    <div
                        id="summaryImage"
                        class="summary-image">
                    </div>

                    <div>

                        <h3 id="summaryName"></h3>

                        <p>
                            Size:
                            <strong id="summarySize"></strong>
                        </p>

                        <p>
                            Quantity:
                            <strong id="summaryQuantity"></strong>
                        </p>

                    </div>

                </div>


                <div class="price-summary">

                    <div>
                        <span>Product Price</span>
                        <span id="summaryProductPrice"></span>
                    </div>

                    <div>
                        <span>Delivery</span>
                        <span class="free-text">
                            FREE
                        </span>
                    </div>

                    <hr>

                    <div class="summary-total">
                        <strong>Total Amount</strong>
                        <strong id="summaryTotal"></strong>
                    </div>

                </div>


                <div class="address-summary">

                    <strong>
                        Delivery Address
                    </strong>

                    <p id="summaryAddress"></p>

                </div>


                <button
                    class="continue-btn"
                    onclick="placeOrder()">
                    Continue & Place Order
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);
}


// =========================
// SHOW STEP
// =========================

function showShopStep(step) {

    document.getElementById("detailsStep").style.display =
        step === "details" ? "block" : "none";

    document.getElementById("buyStep").style.display =
        step === "buy" ? "block" : "none";

    document.getElementById("summaryStep").style.display =
        step === "summary" ? "block" : "none";
}


// =========================
// ADD TO CART
// =========================

function addSelectedProductToCart() {

    addToCart(
        selectedBuyProduct.name,
        selectedBuyProduct.price
    );

    alert(
        selectedBuyProduct.name +
        " added to your cart."
    );

    closeShopModal();
}


// =========================
// START BUY
// =========================

function startBuyFlow() {

    buyQuantity = 1;
    selectedSize = "";

    document.getElementById("checkoutName").innerText =
        selectedBuyProduct.name;

    document.getElementById("checkoutPrice").innerText =
        "₹" +
        selectedBuyProduct.price.toLocaleString("en-IN");

    document.getElementById("checkoutQuantity").innerText =
        "1";

    document.getElementById("checkoutImage").innerHTML =
        selectedBuyProduct.image;

    document.getElementById("deliveryAddress").value = "";

    document.querySelectorAll(".size-options button")
        .forEach(function (button) {
            button.classList.remove("selected-size");
        });

    const image = document
        .getElementById("checkoutImage")
        .querySelector("img");

    if (image) {
        image.style.width = "180px";
        image.style.height = "180px";
        image.style.objectFit = "contain";
    }

    showShopStep("buy");
}


// =========================
// SELECT SIZE
// =========================

function selectSize(button, size) {

    selectedSize = size;

    document.querySelectorAll(".size-options button")
        .forEach(function (item) {
            item.classList.remove("selected-size");
        });

    button.classList.add("selected-size");
}


// =========================
// QUANTITY
// =========================

function changeBuyQuantity(change) {

    buyQuantity += change;

    if (buyQuantity < 1) {
        buyQuantity = 1;
    }

    if (buyQuantity > 10) {
        buyQuantity = 10;
    }

    const quantity = document.getElementById("checkoutQuantity");

    if (quantity) {
        quantity.innerText = buyQuantity;
    }
}


// =========================
// ORDER SUMMARY
// =========================

function showOrderSummary() {

    const address = document
        .getElementById("deliveryAddress")
        .value
        .trim();

    if (!selectedSize) {
        alert("Please select a size.");
        return;
    }

    if (!address) {
        alert("Please enter your delivery address.");
        return;
    }

    const totalPrice =
        selectedBuyProduct.price * buyQuantity;


    document.getElementById("summaryName").innerText =
        selectedBuyProduct.name;

    document.getElementById("summarySize").innerText =
        selectedSize;

    document.getElementById("summaryQuantity").innerText =
        buyQuantity;

    document.getElementById("summaryProductPrice").innerText =
        "₹" +
        selectedBuyProduct.price.toLocaleString("en-IN");

    document.getElementById("summaryTotal").innerText =
        "₹" +
        totalPrice.toLocaleString("en-IN");

    document.getElementById("summaryAddress").innerText =
        address;

    document.getElementById("summaryImage").innerHTML =
        selectedBuyProduct.image;

    const image = document
        .getElementById("summaryImage")
        .querySelector("img");

    if (image) {
        image.style.width = "100px";
        image.style.height = "100px";
        image.style.objectFit = "contain";
    }

    showShopStep("summary");
}


// =========================
// PLACE ORDER
// =========================

function placeOrder() {

    const totalPrice =
        selectedBuyProduct.price * buyQuantity;

    alert(
        "🎉 Order placed successfully!\n\n" +
        "Product: " +
        selectedBuyProduct.name +
        "\nSize: " +
        selectedSize +
        "\nQuantity: " +
        buyQuantity +
        "\nTotal: ₹" +
        totalPrice.toLocaleString("en-IN")
    );

    closeShopModal();
}


// =========================
// CLOSE MODAL
// =========================

function closeShopModal() {

    const modal =
        document.getElementById("shopModal");

    if (modal) {
        modal.style.display = "none";
    }
}
// =========================
// PRODUCT SEARCH
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-box input");
    const products = document.querySelectorAll(".product");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value
            .trim()
            .toLowerCase();

        products.forEach(function (product) {

            const productName =
                product.querySelector("h3");

            if (!productName) return;

            const name =
                productName.innerText.toLowerCase();

            if (name.includes(searchText)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
});
// =========================
// GO TO HOME
// =========================

function goHome() {

    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {
        searchInput.value = "";
    }

    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        product.style.display = "";
    });

    const shopModal = document.getElementById("shopModal");

    if (shopModal) {
        shopModal.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}