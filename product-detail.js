const params = new URLSearchParams(window.location.search);
let highlights = null;
try {
  highlights = JSON.parse(params.get("highlights") || "null");
} catch (error) {
  highlights = null;
}

const product = {
  name: params.get("name"),
  category: params.get("category"),
  price: Number(params.get("price")),
  rating: Number(params.get("rating")),
  stock: Number(params.get("stock")),
  description: params.get("description"),
  image: params.get("image"),
  highlights
};

const hasValidProduct = product.name
  && product.category
  && Number.isFinite(product.price)
  && Number.isFinite(product.rating)
  && product.rating >= 0
  && product.rating <= 5
  && Number.isFinite(product.stock)
  && product.stock >= 0
  && product.description
  && product.image
  && Array.isArray(product.highlights)
  && product.highlights.every((highlight) => typeof highlight === "string");

if (!hasValidProduct) {
  window.location.replace("index.html#products");
} else {
  document.title = `${product.name} | MylesMart`;
  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailCategory").textContent = product.category;
  document.getElementById("detailPrice").textContent = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(product.price);
  document.getElementById("detailDescription").textContent = product.description;
  document.getElementById("detailRating").setAttribute("aria-label", `Sample rating: ${product.rating.toFixed(1)} out of 5`);
  document.getElementById("detailRatingValue").textContent = product.rating.toFixed(1);
  document.getElementById("detailNote").textContent = `Demo stock: ${product.stock} available. Ratings and stock counts are sample values. Confirm exact specifications, sizes, included items, and availability with MylesMart before ordering.`;

  const image = document.getElementById("detailImage");
  image.src = product.image;
  image.alt = product.name;

  const starContainer = document.getElementById("detailStars");
  for (let index = 0; index < 5; index += 1) {
    const starRating = product.rating - index;
    const star = document.createElement("i");
    star.className = starRating >= 1
      ? "fa-solid fa-star"
      : starRating >= 0.5
        ? "fa-solid fa-star-half-stroke"
        : "fa-regular fa-star";
    starContainer.appendChild(star);
  }

  const highlightsList = document.getElementById("detailHighlights");
  product.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-check";
    icon.setAttribute("aria-hidden", "true");
    item.append(icon, document.createTextNode(` ${highlight}`));
    highlightsList.appendChild(item);
  });
}
