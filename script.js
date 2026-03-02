const foods = [
    { name: "Burger", price: 120, img: "https://source.unsplash.com/300x200/?burger" },
    { name: "Pizza", price: 250, img: "https://source.unsplash.com/300x200/?pizza" },
    { name: "Pasta", price: 180, img: "https://source.unsplash.com/300x200/?pasta" },
    { name: "Biryani", price: 220, img: "https://source.unsplash.com/300x200/?biryani" },
    { name: "Sandwich", price: 90, img: "https://source.unsplash.com/300x200/?sandwich" }
];

let cart = [];

const foodContainer = document.getElementById("foodContainer");
const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");
const searchInput = document.getElementById("search");

// Display Food Items
function displayFoods(foodList) {
    foodContainer.innerHTML = "";

    foodList.forEach((food, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${food.img}" alt="${food.name}">
            <div class="card-body">
                <h3>${food.name}</h3>
                <div class="price">₹${food.price}</div>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;

        foodContainer.appendChild(card);
    });
}

// Add to Cart
function addToCart(index) {
    cart.push(foods[index]);
    updateCart();
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerText = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(div);
    });

    totalElement.innerText = total;
}

// Search Function
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(value)
    );
    displayFoods(filtered);
});

// Initial Load
displayFoods(foods);
