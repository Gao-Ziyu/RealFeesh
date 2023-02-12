// Retrieve all elements needed
const cartBtn = document.getElementById("cart-btn");
const removeCartItemsBtn = document.getElementById("delete-btn");

const decreaseBtn = document.getElementById("decrease-btn");
const increaseBtn = document.getElementById("increase-btn");
const addQuantity = document.getElementById("add-quantity");
let value = 0;

const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartContainer = document.getElementById("cart-container");
const productQuantity = document.getElementById("product-quantity");
const total = document.getElementById("total");
const emptyCart = document.getElementById("empty-cart");
const cartContents = document.getElementById("cart-contents");
const cartQuantity = document.getElementById("cart-quantity");

const lightbox = document.getElementById("lightbox");
const productContainer = document.getElementById("product-container");
const close = document.getElementById("close-icon-container");

// Open cart
cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

// Remove items
removeCartItemsBtn.addEventListener("click", (e) => {
  cartContents.classList.remove("active");
  //x = e.target.parentElement.parentElement.parentElement;
  //x.remove();
  cartQuantity.classList.remove("active");
  emptyCart.classList.remove("active");
});

// Decrease/increase quantity
decreaseBtn.addEventListener("click", () => {
  if (value > 0) {
    value--;
    addQuantity.innerHTML = value;
  } else {
    addQuantity.innerHTML = 0;
  }
});

increaseBtn.addEventListener("click", () => {
  if (value < 99) {
    value++;
    addQuantity.innerHTML = value;
  }
});

// Add product and quantity to cart
addToCartBtn.addEventListener("click", () => {
  // Show cart contents on add
  cartContainer.classList.add("active");

  // Prevent negative quantity
  if (value > 0) {
    // Set quantity chosen as the value to be displayed
    productQuantity.innerHTML = value;
    total.innerHTML = `$${(value * 125.0).toFixed(2)}`;

    // Remove the empty cart html and replace with product details
    emptyCart.classList.add("active");
    cartContents.classList.add("active");
    cartQuantity.classList.add("active");
    cartQuantity.innerHTML = value;
  } else {
    emptyCart.classList.remove("active");
    cartContents.classList.remove("active");
    cartQuantity.classList.remove("active");
  }
});

// Product slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var product = document.getElementsByClassName("product-image");
  var thumbnail = document.getElementsByClassName("thumbnail-image");
  var productLB = document.getElementsByClassName("product-image-lb");
  var thumbnailLB = document.getElementsByClassName("thumbnail-image-lb");

  if (n > product.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = product.length;
  }

  for (i = 0; i < product.length; i++) {
    product[i].style.display = "none";
    productLB[i].style.display = "none";
  }

  for (i = 0; i < thumbnail.length; i++) {
    thumbnail[i].className = thumbnail[i].className.replace(" active", "");
    thumbnailLB[i].className = thumbnailLB[i].className.replace(" active", "");
  }

  product[slideIndex - 1].style.display = "block";
  thumbnail[slideIndex - 1].className += " active";
  productLB[slideIndex - 1].style.display = "block";
  thumbnailLB[slideIndex - 1].className += " active";
}

// Open the lightbox
productContainer.addEventListener("click", () => {
  lightbox.classList.add("active");
});

// Close the lightbox
close.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Click anywhere outside to close the lightbox
window.onclick = function (event) {
  if (event.target == lightbox) {
    lightbox.classList.remove("active");
  }
};
