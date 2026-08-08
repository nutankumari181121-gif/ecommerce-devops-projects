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
                ${index + 1}. ${item.name} - ₹${item.price}
            </p>
        `;

        cartItems.appendChild(div);
    });

    totalElement.innerText = "Total: ₹" + total;
}

function showProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}