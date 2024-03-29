import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'; 

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  updateCartQuantity();

  let timeoutId = {};

  
// Delegate the click event handling for add to cart buttons
document.querySelector('.main').addEventListener('click', function(event) {
  if (event.target.classList.contains('js-add-to-cart')) {
      const button = event.target;
      const productId = button.dataset.productId;
      const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      addToCart(productId, selectedQuantity);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('added-to-cart-visible');

      if (timeoutId[productId]) {
          clearTimeout(timeoutId[productId]);
      }

      timeoutId[productId] = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);
  }
});

// Delegate the change event handling for quantity selectors
document.querySelector('.main').addEventListener('change', function(event) {
  if (event.target.classList.contains('js-quantity-selector')) {
      updateCartQuantity();
  }
});


document.querySelector('.search-bar').addEventListener('keyup', function(event) {
  // Check if the key pressed is Enter
  if (event.keyCode === 13) {
    // Trigger the search functionality
    performSearch();
  }
});

  
document.querySelector('.search-button').addEventListener('click', function() {
  // Trigger the search functionality when the button is clicked
  performSearch();
});



 // Function to perform search
function performSearch() {
  const searchTerm = document.querySelector('.search-bar').value.trim().toLowerCase();

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
  );

   // Check if any products were found
   if (filteredProducts.length === 0) {
    // Create a container for the image and apply CSS to center it
    const noProductFoundContainer = `
    <div class="not-found-container">
      <img src="images/error_404.jpeg" alt="No Product Found">
    </div>
`;

   // Update the products grid with the centered container
   document.querySelector('.js-products-grid').innerHTML = noProductFoundContainer;
   }else {
    
  // Generate HTML for filtered products
  let filteredProductsHTML = '';
  filteredProducts.forEach(product => {
      filteredProductsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
      `;
  });

  // Update the products grid with filtered products
  document.querySelector('.js-products-grid').innerHTML = filteredProductsHTML;
   }
}