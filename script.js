const foods=[
{id:1,name:"Veg Biryani",price:180,category:"veg",img:"https://source.unsplash.com/300x200/?veg-biryani"},
{id:2,name:"Chicken Biryani",price:250,category:"nonveg",img:"https://source.unsplash.com/300x200/?chicken-biryani"},
{id:3,name:"Paneer Pizza",price:220,category:"veg",img:"https://source.unsplash.com/300x200/?pizza"},
{id:4,name:"Burger",price:150,category:"fastfood",img:"https://source.unsplash.com/300x200/?burger"},
{id:5,name:"Pasta",price:200,category:"fastfood",img:"https://source.unsplash.com/300x200/?pasta"}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const foodContainer=document.getElementById("foodContainer");
const cartItems=document.getElementById("cartItems");
const totalElement=document.getElementById("total");
const searchInput=document.getElementById("search");

/* DISPLAY */
function displayFoods(list){
    foodContainer.innerHTML="";
    list.forEach(food=>{
        foodContainer.innerHTML+=`
        <div class="card">
            <img src="${food.img}">
            <div class="card-body">
                <h3>${food.name}</h3>
                <div class="price">₹${food.price}</div>
                <button onclick="addToCart(${food.id})">Add to Cart</button>
            </div>
        </div>`;
    });
}

/* ADD */
function addToCart(id){
    const item=cart.find(i=>i.id===id);
    if(item){
        item.qty++;
    }else{
        const food=foods.find(f=>f.id===id);
        cart.push({...food,qty:1});
    }
    updateCart();
}

/* UPDATE CART */
function updateCart(){
    cartItems.innerHTML="";
    let total=0;
    cart.forEach(item=>{
        total+=item.price*item.qty;
        cartItems.innerHTML+=`
        <div class="cart-item">
            ${item.name}<br>
            <button class="qty-btn" onclick="decrease(${item.id})">-</button>
            ${item.qty}
            <button class="qty-btn" onclick="increase(${item.id})">+</button>
            ₹${item.price*item.qty}
            <button class="qty-btn" onclick="removeItem(${item.id})">X</button>
        </div>`;
    });
    totalElement.innerText=total;
    localStorage.setItem("cart",JSON.stringify(cart));
}

/* INCREASE */
function increase(id){
    cart.find(i=>i.id===id).qty++;
    updateCart();
}

/* DECREASE */
function decrease(id){
    const item=cart.find(i=>i.id===id);
    if(item.qty>1){
        item.qty--;
    }else{
        removeItem(id);
    }
    updateCart();
}

/* REMOVE */
function removeItem(id){
    cart=cart.filter(item=>item.id!==id);
    updateCart();
}

/* SEARCH */
searchInput.addEventListener("keyup",()=>{
    const value=searchInput.value.toLowerCase();
    const filtered=foods.filter(f=>f.name.toLowerCase().includes(value));
    displayFoods(filtered);
});

/* FILTER */
function filterCategory(category){
    if(category==="all"){
        displayFoods(foods);
    }else{
        displayFoods(foods.filter(f=>f.category===category));
    }
}

/* CHECKOUT */
function checkout(){
    if(cart.length===0){
        alert("Cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart=[];
    updateCart();
}

displayFoods(foods);
updateCart();
