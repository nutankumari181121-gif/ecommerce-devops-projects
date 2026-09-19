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