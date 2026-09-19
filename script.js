let cart = [];
let total = 0;

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

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                ${index + 1}. ${item.name} - Rs.${item.price}
            </p>
        `;

        cartItems.appendChild(div);
    });

    totalElement.innerText = "Total: Rs." + total;
}

function showProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}
/* LOGIN / REGISTER */

function openLogin() {
    document.getElementById("auth").style.display = "block";
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";

    document.getElementById("auth").scrollIntoView({
        behavior: "smooth"
    });
}

function openRegister() {
    document.getElementById("auth").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";

    document.getElementById("auth").scrollIntoView({
        behavior: "smooth"
    });
}

function showLogin() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
}

function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

function registerUser() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    localStorage.setItem("shopEasyUser", JSON.stringify({
        name: name,
        email: email,
        password: password
    }));

    alert("Registration successful! Please login.");
    showLogin();
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("shopEasyUser"));

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    if (savedUser &&
        savedUser.email === email &&
        savedUser.password === password) {

        alert("Login successful! Welcome to ShopEasy.");
    } else {
        alert("Invalid email or password.");
    }
}