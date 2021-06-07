var LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
var LOCAL_STORAGE_DELIMITER = ',';
var BUTTON_ACTIVE_CLASS = 'active';

var selectors = {
  button: '[button-wishlist]',
  grid: '[grid-wishlist]',
};

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) setupButtons(buttons);

  var grid = document.querySelector(selectors.grid) || false;
  if (grid) setupGrid(grid);

  
});

var setupGrid = function (grid) {
  var wishlist = getWishlist();
  var requests = wishlist.map(function (handle) {
    var productTileTemplateUrl = '/products/' + handle + '?view=card';
    return fetch(productTileTemplateUrl).then(function (res) {
      return res.text();
    });
  });
  Promise.all(requests).then(function (responses) {
    var wishlistProductCards = responses.join('');
    grid.innerHTML = wishlistProductCards;
    var buttons = grid.querySelectorAll(selectors.button) || [];
    if (buttons.length) setupButtons(buttons);
  });
};

var setupButtons = function (buttons) {
  buttons.forEach(function (button) {
    var productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
    button.addEventListener('click', function () {
      updateWishlist(productHandle);
      button.classList.toggle(BUTTON_ACTIVE_CLASS);

    });
  });
};

var getWishlist = function () {
  var wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

var setWishlist = function (array) {
  var wishlist = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
  else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);
  return wishlist;
};

var updateWishlist = function (handle) {
  var wishlist = getWishlist();
  var indexInWishlist = wishlist.indexOf(handle);
  if (indexInWishlist === -1) wishlist.push(handle);
  else wishlist.splice(indexInWishlist, 1);
  return setWishlist(wishlist);
};

var wishlistContains = function (handle) {
  var wishlist = getWishlist();
  return wishlist.indexOf(handle) !== -1;
};

var resetWishlist = function () {
  return setWishlist([]);
};

 /*close bar index*/
var closeSale = document.querySelector('.close_go');
var removeTagClose = document.querySelector('.off__headTop')
closeSale.addEventListener('click', function () {
  $(removeTagClose).addClass("fadeOut");
});
