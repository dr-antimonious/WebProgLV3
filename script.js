"use strict";

// Get elements
/** @type HTMLElement */
const cartButton = document.querySelector('.cart-button'),
    cartBadge = document.querySelector('.cart-badge'),
    modal = document.querySelector('.modal'),
    cartModal = document.getElementById('cartModal'),
    goodModal = document.getElementById('goodModal'),
    badModal = document.getElementById('badModal'),
    cartModalClose = document.getElementById('cart'),
    goodModalClose = document.getElementById('good'),
    badModalClose = document.getElementById('bad'),
    buyButton = document.querySelector('.buy-btn'),
    cartItemsList = document.querySelector('.cart-items'),
    cartTotal = document.querySelector('.cart-total'),
    itemsGrid = document.querySelector('.items-grid');

// Defining necessary types

/**
 * @typedef {Object} Type
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */

/**
 * @typedef {Type} Item
 * @property {number} amount
 */

/** @type Type[] */
const items = [
    { id: 1,    name: 'Apple',          price: 0.99, },
    { id: 2,    name: 'Banana',         price: 0.49, },
    { id: 3,    name: 'Orange',         price: 1.99, },
    { id: 4,    name: 'Lemon',          price: 0.99, },
    { id: 5,    name: 'Watermelon',     price: 2.99, },
    { id: 6,    name: 'Pomegranate',    price: 2.49, },
    { id: 7,    name: 'Peach',          price: 0.49, },
    { id: 8,    name: 'Pomelo',         price: 1.49, },
    { id: 9,    name: 'Quince',         price: 1.49, },
    { id: 10,   name: 'Nectarine',      price: 0.49, },
    { id: 11,   name: 'Kiwi',           price: 0.49, },
    { id: 12,   name: 'Mango',          price: 1.49, },
    { id: 13,   name: 'Avocado',        price: 0.99, },
    { id: 14,   name: 'Pear',           price: 0.49, },
    { id: 15,   name: 'Coconut',        price: 2.99, },
];

/** @type Item[] */
let cart = [];

/**
 * Attempts to find an item in an array using {@link Array#findIndex|Array.findIndex}.
 *
 * @param {Type[]} array - The array to be searched.
 * @param {number} itemId - The name of the item to be found.
 *
 * @returns {number} Index of the item in the array, `-1` if the item is not present in the array.
 */
function findItemInArray(array, itemId) {
    return array.findIndex(item => item.id === itemId);
}

/**
 * Checks if an `array` is empty.
 *
 * @param {Type[]} array - The array to be checked.
 *
 * @returns {boolean} `true` if the `array.length` is zero, `false` otherwise.
 */
function isArrayEmpty(array) { return array.length === 0; }

/**
 * @param {Event} event
 */
function addToCart(event) {
    /** @type string */
    const id = event.target.attributes.getNamedItem("data-id").value;

    /** @type number */
    const parsedId = parseInt(id);

    /** @type Type */
    const type = items[findItemInArray(items, parsedId)];

    /** @type number */
    const amount = parseInt(document.getElementById(id).value);

    let cartIndex;
    if ((cartIndex = findItemInArray(cart, parsedId)) !== -1) {
        cart[cartIndex].amount += amount;
    }
    else cart.push({id: parsedId, name: type.name, price: type.price, amount: amount});

    cartBadge.innerHTML = `${parseInt(cartBadge.innerHTML) + amount}`;
    document.getElementById(id).value = "1";

    let itemElement;
    if ((itemElement = document.getElementById(`cart-${parsedId}`)) !== null) {
        itemElement.value = cart[cartIndex].amount;
        document.getElementById(`itemTotal-${parsedId}`).innerHTML = `$${(cart[cartIndex].amount * cart[cartIndex].price).toFixed(2)}`;
    }

    else {
        itemElement = document.createElement('div');
        itemElement.id = `cartItem-${parsedId}`;
        itemElement.classList.add('row-container');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <p>${type.name} ($${type.price} each)</p>
            <input style="font-size: 1em; height: 5vh" type="number" id="cart-${parsedId}" name="Amount" min="1" max="1000" value="${amount}" />
            <button class="add-to-cart-btn" data-id="${parsedId}" onclick="updateCart(event)">Update amount</button>
            <p id="itemTotal-${parsedId}">$${(type.price * amount).toFixed(2)}</p>
            <span data-id="${parsedId}" class="close" onclick="removeFromCart(event)">&times;</span>
        `;
        cartItemsList.appendChild(itemElement);
    }
}

/**
 * @param {Event} event
 */
function removeFromCart(event) {
    /** @type string */
    const id = event.target.attributes.getNamedItem("data-id").value;

    /** @type number */
    const parsedId = parseInt(id);

    const remove = cart.splice(findItemInArray(cart, parsedId), 1);

    let sum = 0;
    cart.forEach(i => sum += i.price * i.amount);
    cartTotal.innerHTML = `$${sum.toFixed(2)}`;

    cartBadge.innerHTML = `${parseInt(cartBadge.innerHTML) - remove[0].amount}`;
    document.getElementById(`cartItem-${parsedId}`).remove();
}

/**
 * @param {Event} event
 */
function updateCart(event) {
    /** @type string */
    const id = event.target.attributes.getNamedItem("data-id").value;

    /** @type number */
    const parsedId = parseInt(id);

    /** @type number */
    const index = findItemInArray(cart, parsedId);
    cart[index].amount = parseInt(document.getElementById(`cart-${parsedId}`).value);

    let sum = 0, count = 0;
    cart.forEach(i => {
        sum += i.price * i.amount;
        count += i.amount;
    });
    cartTotal.innerHTML = `$${sum.toFixed(2)}`;
    cartBadge.innerHTML = `${count}`;

    document.getElementById(`itemTotal-${parsedId}`).innerHTML =
        `$${(cart[index].amount * cart[index].price).toFixed(2)}`;
}

function fillItemsGrid() {
    for (const item of items) {
        /** @type HTMLDivElement */
        let itemElement = document.createElement('div');

        itemElement.classList.add('item');
        itemElement.classList.add('card');
        itemElement.classList.add('card-dark-shadow');
        itemElement.innerHTML = `
            <img style="border-radius: 5px; margin: 0 0" loading="lazy" src="Assets/Items/${item.id}.webp" alt="${item.name}" />
            <div class="card-container">
              <h2>${item.name}</h2>
              <p>$${item.price.toFixed(2)}</p>
              <input style="font-size: 1em; height: 5vh" type="number" id="${item.id}" name="Amount" min="1" max="1000" value="1" />
              <button class="add-to-cart-btn" data-id="${item.id}" onclick="addToCart(event)">Add to cart</button>
            </div>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

/**
 * @param {Event} event
 */
function sort(event) {
    switch (event.target.value) {
        case "cheap":
            items.sort((a, b) => a.price - b.price);
            break;
        case "expensive":
            items.sort((b, a) => a.price - b.price);
            break;
        case "alpha":
            items.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            break;
        case "beta":
            items.sort(function (b, a) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            break;
    }
    itemsGrid.innerHTML = "";
    fillItemsGrid();
}

/**
 * @param {Event} event
 */
function buy(event) {
    if (isArrayEmpty(cart)) {
        badModal.style.visibility = 'visible';
    }
    else {
        cartItemsList.innerHTML = "";
        goodModal.style.visibility = 'visible';
        cartBadge.innerHTML = "0";
        cartTotal.innerHTML = "$0.00";
        cart = [];
    }
}

function toggleModal() {
    let sum = 0;
    cart.forEach(i => sum += i.price * i.amount);
    cartTotal.innerHTML = `$${sum.toFixed(2)}`;
    modal.classList.toggle('show-modal');
}

function dismissMessageModal(event) {
    document.getElementById(`${event.currentTarget.id}Modal`).style.visibility = 'hidden';
}

fillItemsGrid();

cartButton.addEventListener('click', toggleModal);
cartModalClose.addEventListener('click', toggleModal);
goodModalClose.addEventListener('click', dismissMessageModal);
badModalClose.addEventListener('click', dismissMessageModal);
buyButton.addEventListener('click', buy);