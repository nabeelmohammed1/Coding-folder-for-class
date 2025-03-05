document.addEventListener('DOMContentLoaded', () => {
    // Check if the current page is the payment page
    if (window.location.pathname.includes('payment.html')) {
        // Function to update the cart display on the payment page
        function updateCartDisplay() {
            const cartItems = JSON.parse(localStorage.getItem('productCartItems')) || [];
            const freeSnacks = JSON.parse(localStorage.getItem('freeSnacks')) || [];
            const cartItemsContainer = document.querySelector('.item-container');

            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '';

                // Display regular cart items
                cartItems.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    itemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <span>${item.name}</span>
                            <span class="price">$${item.price}</span>
                        </div>
                        <div class="quantity">1</div>
                    `;
                    cartItemsContainer.appendChild(itemDiv);
                });

                // Display free snacks
                freeSnacks.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    itemDiv.innerHTML = `
                        <img src="images/freesnack.png" alt="Love Bites">
                        <div class="item-details">
                            <span>${item}</span>
                            <span class="price">Free</span>
                        </div>
                        <div class="quantity">1</div>
                    `;
                    cartItemsContainer.appendChild(itemDiv);
                });
            }
        }

        // Call the function to update the cart display when the page loads
        updateCartDisplay();

        // Handle the "Place Order" button click
        const placeOrderButton = document.querySelector('.place-order-button');
        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', () => {
                localStorage.removeItem('productCartItems');
                localStorage.removeItem('freeSnacks');
                alert('Order placed successfully! Your cart has been cleared.');
                window.location.href = 'index.html'; // Redirect to the home page or confirmation page
            });
        }
    }

    // Snack vending machine logic (Love Bites)
    const collectButton = document.querySelector('.collect-button');
    if (collectButton) {
        const popup = document.createElement('div');
        popup.id = "snack-popup";
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-content">
                <img src="images/freesnack.png" alt="Free Snack">
                <p id="snack-message">🎉 You got a free Love Bite! 🎉</p>
                <button id="close-popup">OK</button>
            </div>
        `;
        document.body.appendChild(popup);

        const closeButton = popup.querySelector("#close-popup");

        let collectedSnacks = JSON.parse(localStorage.getItem('freeSnacks')) || [];

        function updateFreeSnackCartDisplay() {
            const cartSummary = document.querySelector('.cart-summary');
            if (cartSummary) {
                const cartItemsContainer = cartSummary.querySelector('.item-container');
                if (cartItemsContainer) {
                    cartItemsContainer.innerHTML = '';

                    collectedSnacks.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
                        itemDiv.innerHTML = `
                            <img src="images/freesnack.png" alt="Love Bites">
                            <div class="item-details">
                                <span>${item}</span>
                                <span class="price">Free</span>
                            </div>
                            <div class="quantity">1</div>
                        `;
                        cartItemsContainer.appendChild(itemDiv);
                    });
                }
            }
        }

        collectButton.addEventListener("click", () => {
            const snack = "Love Bite";
            collectedSnacks.push(snack);
            document.getElementById("snack-message").textContent = `🎉 You got a free ${snack}! 🎉`;
            popup.style.display = "flex";
            localStorage.setItem('freeSnacks', JSON.stringify(collectedSnacks));
            updateFreeSnackCartDisplay();
        });

        closeButton.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    // Filter Code (unchanged)
    const filterButtons = document.querySelectorAll('.filters button');
    const kitCards = document.querySelectorAll('.kit-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent.toLowerCase();

            kitCards.forEach(card => {
                const cardFilters = card.dataset.filter.split(' ');

                if (filter === 'all' || cardFilters.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Cart Code (Product Cart)
    let cartItems = JSON.parse(localStorage.getItem('productCartItems')) || [];

    function updateCartDisplay() {
        const cartSummary = document.querySelector('.cart-summary');
        if (!cartSummary) return;

        const cartItemsContainer = cartSummary.querySelector('.item-container');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';

            cartItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <span>${item.name}</span>
                        <span class="price">$${item.price}</span>
                    </div>
                    <div class="quantity">1</div>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }
    }

    updateCartDisplay();

    function addToCart(item) {
        cartItems.push(item);
        localStorage.setItem('productCartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }

    if (window.location.pathname.includes('snackpage_Able.html')) {
        const checkoutButton = document.querySelector('.checkoutbutton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                const item = {
                    name: 'Able Protein Bar Kit',
                    price: '35.00',
                    image: 'images/snack2.png'
                };
                addToCart(item);

                // Logging statements
                console.log("Added item to cart:", item);
                console.log("Cart items:", cartItems);
                console.log("Local storage:", localStorage.getItem('productCartItems'));

                window.location.href = 'payment.html';
            });
        }
    }

    const placeOrderButton = document.querySelector('.place-order-button');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', () => {
            cartItems = [];
            localStorage.removeItem('productCartItems');
            updateCartDisplay();
            alert("Order Placed! Cart has been cleared.");
        });
    }

    window.addEventListener('beforeunload', () => {
        setTimeout(() => {
            localStorage.setItem('productCartItems', JSON.stringify(cartItems));
            localStorage.setItem('freeSnacks', JSON.stringify(collectedSnacks));
        }, 100);
    });

    updateFreeSnackCartDisplay();
});