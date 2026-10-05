const products = [
  { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: 2500, rating: 4.8, stock: 18, description: "Wireless Bluetooth headphones for listening to audio without a wired connection.", highlights: ["Wireless audio", "Bluetooth"], icon: "fa-headphones", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Smartphone 128GB", category: "Electronics", price: 28500, rating: 4.7, stock: 9, description: "A smartphone with 128GB of storage for apps, photos, and other files.", highlights: ["128GB storage", "Smartphone"], icon: "fa-mobile-screen", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Men's Casual Sneakers", category: "Fashion", price: 3500, rating: 4.6, stock: 14, description: "Casual sneakers to pair with everyday outfits.", highlights: ["Casual footwear", "Everyday style"], icon: "fa-shoe-prints", image: "mens sneakers.jpg" },
  { id: 4, name: "Women's Handbag", category: "Fashion", price: 2800, rating: 4.5, stock: 11, description: "A fashion handbag for carrying personal essentials.", highlights: ["Personal carry", "Fashion accessory"], icon: "fa-bag-shopping", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Modern Table Lamp", category: "Home", price: 1800, rating: 4.4, stock: 16, description: "A modern table lamp for adding light and decor to a room.", highlights: ["Table lighting", "Home decor"], icon: "fa-lightbulb", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Electric Blender", category: "Home", price: 4500, rating: 4.7, stock: 8, description: "An electric blender for kitchen preparation and blending tasks.", highlights: ["Electric appliance", "Kitchen prep"], icon: "fa-blender", image: "electric blender.jpg" },
  { id: 7, name: "Face Care Set", category: "Beauty", price: 2200, rating: 4.6, stock: 20, description: "A face care set for a skincare routine. Check the product packaging for included items and ingredients.", highlights: ["Skincare routine", "Beauty care"], icon: "fa-spa", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Smart Watch", category: "Accessories", price: 4200, rating: 4.5, stock: 12, description: "A smartwatch worn on the wrist as a technology accessory. Please confirm its functions and compatibility before ordering.", highlights: ["Wearable tech", "Wrist accessory"], icon: "fa-clock", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Laptop Backpack", category: "Accessories", price: 3200, rating: 4.4, stock: 10, description: "A backpack designed for carrying a laptop and everyday items. Confirm laptop fit and dimensions before ordering.", highlights: ["Laptop carry", "On-the-go storage"], icon: "fa-briefcase", image: "laptop bagpack.jpg" },
  { id: 10, name: "Portable Power Bank", category: "Electronics", price: 1800, rating: 4.6, stock: 22, description: "A portable power bank for charging devices when away from a fixed power source. Confirm capacity and compatibility before ordering.", highlights: ["Portable charging", "On-the-go power"], icon: "fa-battery-full", image: "power bank.jpg" },
  { id: 11, name: "Men's Polo Shirt", category: "Fashion", price: 1600, rating: 4.5, stock: 17, description: "A men's polo shirt for casual, everyday wear. Confirm available sizes and colors before ordering.", highlights: ["Polo style", "Everyday wear"], icon: "fa-shirt", image: "polo t-shirt.jpg" },
  { id: 12, name: "Kitchen Storage Set", category: "Home", price: 2400, rating: 4.3, stock: 13, description: "A storage set to help organize kitchen items. Check the product packaging for the pieces included.", highlights: ["Kitchen organization", "Storage set"], icon: "fa-kitchen-set", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const productGrid = document.getElementById("productGrid");
const productImageDialog = document.getElementById("productImageDialog");
const productImagePreview = document.getElementById("productImagePreview");
const productImageCaption = document.getElementById("productImageCaption");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const sortProducts = document.getElementById("sortProducts");
const accountButton = document.getElementById("accountButton");
const accountLabel = document.getElementById("accountLabel");
const accountOverlay = document.getElementById("accountOverlay");
const accountModal = document.getElementById("accountModal");
const closeAccountBtn = document.getElementById("closeAccount");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const resetPasswordForm = document.getElementById("resetPasswordForm");
const accountMessage = document.getElementById("accountMessage");
const logoutBtn = document.getElementById("logoutBtn");
const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");
const resetPasswordPanel = document.getElementById("resetPasswordPanel");
const accountModalTitle = document.getElementById("accountModalTitle");
const loginTabButton = document.querySelector('.tab-btn[data-tab="login"]');

function productDetailsUrl(product) {
  const params = new URLSearchParams({
    name: product.name,
    category: product.category,
    price: String(product.price),
    rating: String(product.rating),
    stock: String(product.stock),
    description: product.description,
    highlights: JSON.stringify(product.highlights),
    image: product.image
  });

  return `product-detail.html?${params}`;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(price);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function setAccountMessage(text = "", type = "") {
  accountMessage.textContent = text;
  accountMessage.classList.toggle("show", Boolean(text));
  accountMessage.classList.remove("error", "success");
  if (type) {
    accountMessage.classList.add(type);
  }
}

function setActiveAccountTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  loginPanel.classList.toggle("active", tab === "login");
  signupPanel.classList.toggle("active", tab === "signup");
  resetPasswordPanel.classList.toggle("active", tab === "reset");
}

function updateAccountUI() {
  loginTabButton.disabled = accounts.length === 0;
  loginTabButton.title = accounts.length === 0 ? "Create an account before logging in." : "";

  if (currentUser) {
    const firstName = currentUser.name.split(" ")[0];
    accountLabel.textContent = `Hi, ${firstName}`;
    accountModalTitle.textContent = `Welcome, ${firstName}`;
    logoutBtn.hidden = false;
    return;
  }

  accountLabel.textContent = "Account";
  accountModalTitle.textContent = "Account";
  logoutBtn.hidden = true;
}

function openAccountModal() {
  accountModal.classList.add("active");
  accountOverlay.classList.add("active");

  if (currentUser) {
    setAccountMessage(`Logged in as ${currentUser.name}.`, "success");
    updateAccountUI();
    return;
  }

  setActiveAccountTab(accounts.length ? "login" : "signup");
  setAccountMessage(accounts.length ? "" : "Create an account before logging in.");
  accountModalTitle.textContent = "Account";
}

function closeAccountModal() {
  accountModal.classList.remove("active");
  accountOverlay.classList.remove("active");
  setAccountMessage("", "");
}

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function saveCurrentUser() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function accountCreate(name, email, password) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    setAccountMessage("Please fill in all fields.", "error");
    return;
  }

  if (trimmedPassword.length < 6) {
    setAccountMessage("Password must be at least 6 characters long.", "error");
    return;
  }

  if (accounts.some((account) => account.email === trimmedEmail)) {
    setAccountMessage("An account with this email already exists.", "error");
    return;
  }

  const newUser = {
    id: Date.now(),
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword
  };

  accounts.push(newUser);
  saveAccounts();
  updateAccountUI();
  signupForm.reset();
  document.getElementById("loginEmail").value = trimmedEmail;
  document.getElementById("loginPassword").value = "";
  setActiveAccountTab("login");
  setAccountMessage("Account created. Log in using the email and password you just created.", "success");
}

function accountLogin(email, password) {
  if (!accounts.length) {
    setActiveAccountTab("signup");
    setAccountMessage("Create an account before logging in.", "error");
    return;
  }

  const trimmedEmail = email.trim().toLowerCase();
  const user = accounts.find((account) => account.email === trimmedEmail && account.password === password);

  if (!user) {
    setAccountMessage("Incorrect email or password.", "error");
    return;
  }

  currentUser = user;
  saveCurrentUser();
  updateAccountUI();
  loginForm.reset();
  setAccountMessage(`Welcome back, ${user.name.split(" ")[0]}!`, "success");

  setTimeout(() => {
    closeAccountModal();
  }, 1000);
}

function resetAccountPassword(email, password, confirmPassword) {
  const trimmedEmail = email.trim().toLowerCase();

  if (password !== confirmPassword) {
    setAccountMessage("The new passwords do not match.", "error");
    return;
  }

  if (password.trim().length < 6) {
    setAccountMessage("Password must be at least 6 characters long.", "error");
    return;
  }

  const account = accounts.find((entry) => entry.email === trimmedEmail);
  if (!account) {
    setAccountMessage("No account was found with that email address.", "error");
    return;
  }

  account.password = password.trim();
  saveAccounts();
  resetPasswordForm.reset();
  document.getElementById("loginEmail").value = trimmedEmail;
  document.getElementById("loginPassword").value = "";
  setActiveAccountTab("login");
  setAccountMessage("Password updated. Log in with your new password.", "success");
}

function logoutAccount() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateAccountUI();
  setAccountMessage("You have been logged out.", "success");

  setTimeout(() => {
    closeAccountModal();
  }, 700);
}

function displayProducts(items = products) {
  productGrid.innerHTML = "";

  if (!items.length) {
    productGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:50px"><h3>No products found</h3><p>Try another search.</p></div>';
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <button class="product-image" type="button" aria-label="View larger image: ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
        <i class="fa-solid ${product.icon} fallback-icon"></i>
      </button>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name"><a class="product-detail-link" href="${productDetailsUrl(product)}">${product.name}</a></h3>
        <ul class="product-highlights" aria-label="Product highlights">
          ${product.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
        </ul>
        <div class="product-rating" aria-label="Sample rating: ${product.rating} out of 5">
          <span class="rating-stars" aria-hidden="true">${Array.from({ length: 5 }, (_, index) => {
            const starRating = product.rating - index;
            const starClass = starRating >= 1 ? "fa-solid fa-star" : starRating >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star";
            return `<i class="${starClass}"></i>`;
          }).join("")}</span>
          <span class="rating-value">${product.rating.toFixed(1)}</span>
          <span class="rating-label">Sample</span>
        </div>
        <p class="product-stock"><i class="fa-solid fa-boxes-stacked" aria-hidden="true"></i> Demo stock: ${product.stock} available</p>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="add-cart" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((entry) => entry.id === id);
  const existing = cart.find((entry) => entry.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((entry) => entry.id !== id);
  saveCart();
  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find((entry) => entry.id === id);

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";

  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart"><i class="fa-solid fa-cart-shopping" style="font-size:45px;margin-bottom:15px"></i><h3>Your cart is empty</h3><p>Add some products to get started.</p></div>';
    cartCount.textContent = 0;
    cartTotal.textContent = formatPrice(0);
    return;
  }

  cart.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "cart-item";
    entry.innerHTML = `
      <div class="cart-item-icon">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
        <i class="fa-solid ${item.icon} cart-fallback-icon"></i>
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id},-1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id},1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    cartItems.appendChild(entry);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = formatPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function searchProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
  );

  displayProducts(filtered);
}

function submitProductSearch() {
  searchProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function showCategoryProducts(category) {
  searchInput.value = "";
  sortProducts.value = "default";
  const filtered = category === "All"
    ? products
    : products.filter((product) => product.category === category);

  displayProducts(filtered);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    showCategoryProducts(button.dataset.category);
  });
});

document.querySelectorAll(".footer-grid [data-category]").forEach((link) => {
  link.addEventListener("click", () => {
    showCategoryProducts(link.dataset.category);
  });
});

sortProducts.addEventListener("change", () => {
  let sorted = [...products];

  if (sortProducts.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortProducts.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sortProducts.value === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  displayProducts(sorted);
});

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("closeProductImage").addEventListener("click", () => productImageDialog.close());
productGrid.addEventListener("click", (event) => {
  const imageButton = event.target.closest(".product-image");
  const image = imageButton?.querySelector("img");

  if (!image || !image.naturalWidth) {
    return;
  }

  productImagePreview.src = image.src;
  productImagePreview.alt = image.alt;
  productImageCaption.textContent = image.alt;
  productImageDialog.showModal();
});
productImageDialog.addEventListener("click", (event) => {
  if (event.target === productImageDialog) {
    productImageDialog.close();
  }
});
cartOverlay.addEventListener("click", () => {
  closeCart();
  closeAccountModal();
});
searchInput.addEventListener("input", searchProducts);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitProductSearch();
  }
});
document.getElementById("searchButton").addEventListener("click", submitProductSearch);
accountButton.addEventListener("click", openAccountModal);
closeAccountBtn.addEventListener("click", closeAccountModal);
accountOverlay.addEventListener("click", closeAccountModal);

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveAccountTab(button.dataset.tab);
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  accountLogin(email, password);
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  accountCreate(name, email, password);
});

document.getElementById("forgotPasswordButton").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  document.getElementById("resetEmail").value = email;
  setActiveAccountTab("reset");
  setAccountMessage("Demo reset: this page does not verify email ownership.", "error");
});

document.getElementById("backToLoginButton").addEventListener("click", () => {
  setActiveAccountTab("login");
  setAccountMessage("");
});

resetPasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  resetAccountPassword(
    document.getElementById("resetEmail").value,
    document.getElementById("newPassword").value,
    document.getElementById("confirmNewPassword").value
  );
});

logoutBtn.addEventListener("click", logoutAccount);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  alert("Checkout system ready. Connect M-Pesa or your preferred payment gateway here.");
});

document.getElementById("whatsappBtn").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const phone = "254700000000";
  let message = "Hello MylesMart, I would like to order:%0A%0A";

  cart.forEach((item) => {
    message += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `%0ATotal: ${formatPrice(total)}`;

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});

displayProducts();
updateAccountUI();
updateCart();
