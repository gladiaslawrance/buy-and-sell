
let products = JSON.parse(localStorage.getItem("products"));

if (!products) {
    products = [
        {
            id: 1,
            name: "Dell Laptop",
            price: 25000,
            category: "Laptop",
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
            description: "Used - Good Condition"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 2000,
            category: "Watch",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            description: "Used - Good Condition"
        },
        {
            id: 3,
            name: "Smart Phone",
            price: 8000,
            category: "Phone",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            description: "Used - Good Condition"
        },
        {
            id: 4,
            name: "Used Bike",
            price: 45000,
            category: "Bike",
            image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500",
            description: "Used - Good Condition"
        }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}

let selectedId = null;

// PAGE NAVIGATION

function showPage(page) {

    document.querySelectorAll(".page").forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById(page).style.display = "block";

    if (page === "buy") {
        displayProducts();
    }
}

// DISPLAY PRODUCTS

function displayProducts() {

    let list = document.getElementById("productList");
    let search = document.getElementById("searchBox").value.toLowerCase();

    list.innerHTML = "";

    products.forEach(function(product) {

        if (product.name.toLowerCase().includes(search)) {

            let card = document.createElement("div");
            card.className = "card";

            let img = document.createElement("img");
            img.src = product.image;

            let title = document.createElement("h3");
            title.innerText = product.name;

            let price = document.createElement("p");
            price.className = "price";
            price.innerText = "₹" + product.price;

            let desc = document.createElement("p");
            desc.innerText = product.description;

            let btn = document.createElement("button");
            btn.innerText = "Buy Now";

            btn.onclick = function() {
                buyProduct(product.id);
            };

            card.append(img, title, price, desc, btn);
            list.appendChild(card);
        }
    });
}

// BUY PRODUCT

function buyProduct(id) {

    let product = products.find(function(p) {
        return p.id === id;
    });

    if (!product) return;

    selectedId = id;

    document.getElementById("paymentSection").style.display = "block";

    document.getElementById("selectedProduct").innerText =
    "Product: " + product.name;

    document.getElementById("selectedPrice").innerText =
    "Price: ₹" + product.price;

    document.getElementById("paymentSection").scrollIntoView();
}

// PAYMENT

function placeOrder() {

    let name = document.getElementById("buyerName").value;
    let phone = document.getElementById("buyerPhone").value;
    let address = document.getElementById("buyerAddress").value;
    let payment = document.getElementById("paymentMethod").value;

    if (name === "" || phone === "" ||
        address === "" || payment === "") {

        alert("Please fill all details");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter valid 10 digit phone number");
        return;
    }

    let product = products.find(function(p) {
        return p.id === selectedId;
    });

    if (!product) return;

    alert("Order Placed Successfully!\nProduct: " +
    product.name + "\nAmount: ₹" + product.price);

    products = products.filter(function(p) {
        return p.id !== selectedId;
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("buyerName").value = "";
    document.getElementById("buyerPhone").value = "";
    document.getElementById("buyerAddress").value = "";
    document.getElementById("paymentMethod").value = "";

    closePayment();
    displayProducts();
}

// CLOSE PAYMENT

function closePayment() {
    document.getElementById("paymentSection").style.display = "none";
    selectedId = null;
}

// SELL PRODUCT

function addProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;
    let image = document.getElementById("productImage").value;
    let description = document.getElementById("productDescription").value;

    if (name === "" || price === "" ||
        category === "" || image === "") {

        alert("Please fill all required details");
        return;
    }

    if (Number(price) <= 0) {
        alert("Enter valid price");
        return;
    }

    let product = {
        id: Date.now(),
        name: name,
        price: Number(price),
        category: category,
        image: image,
        description: description || "Used Product"
    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    alert("Product Added Successfully!");

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productDescription").value = "";
}

// INITIAL DISPLAY

showPage("home");
