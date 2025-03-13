// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    // Function to add an item to the cart
    function addToCart(item) {
        // Retrieve cart items from localStorage or initialize an empty array if none exist
        let cartItems = JSON.parse(localStorage.getItem('productCartItems')) || [];

        // Check if the item already exists in the cart
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            // If the item exists, increment its quantity
            existingItem.quantity += 1;
        } else {
            // If the item doesn't exist, add it with a quantity of 1
            item.quantity = 1;
            cartItems.push(item);
        }

        // Save the updated cart items back to localStorage
        localStorage.setItem('productCartItems', JSON.stringify(cartItems));
        // Update the cart display to reflect the changes
        updateCartDisplay();
    }

    // Function to add a free snack to the cart
    function addFreeSnack(snack) {
        // Retrieve free snacks from localStorage or initialize an empty array if none exist
        let freeSnacks = JSON.parse(localStorage.getItem('freeSnacks')) || [];

        // Check if the free snack already exists in the cart
        const existingSnack = freeSnacks.find(freeSnack => freeSnack.name === snack.name);

        if (existingSnack) {
            // If the free snack exists, increment its quantity
            existingSnack.quantity += 1;
        } else {
            // If the free snack doesn't exist, add it with a quantity of 1
            snack.quantity = 1;
            freeSnacks.push(snack);
        }

        // Save the updated free snacks back to localStorage
        localStorage.setItem('freeSnacks', JSON.stringify(freeSnacks));
        // Update the cart display to reflect the changes
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        // Select the cart summary element
        const cartSummary = document.querySelector('.cart-summary');
        if (!cartSummary) return;

        // Select the container for cart items
        const cartItemsContainer = cartSummary.querySelector('.item-container');
        if (cartItemsContainer) {
            // Clear the current contents of the cart items container
            cartItemsContainer.innerHTML = '';

            // Display regular cart items
            const cartItems = JSON.parse(localStorage.getItem('productCartItems')) || [];
            cartItems.forEach(item => {
                // Create a new div for each item and populate it with item details
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <span>${item.name}</span>
                        <span class="price">$${item.price}</span>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                `;
                // Append the item div to the cart items container
                cartItemsContainer.appendChild(itemDiv);
            });

            // Display free snacks
            const freeSnacks = JSON.parse(localStorage.getItem('freeSnacks')) || [];
            freeSnacks.forEach(item => {
                // Create a new div for each free snack and populate it with snack details
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <img src="images/freesnack.png" alt="Love Bites">
                    <div class="item-details">
                        <span>${item.name}</span>
                        <span class="price">Free</span>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                `;
                // Append the snack div to the cart items container
                cartItemsContainer.appendChild(itemDiv);
            });
        }
    }

    // Handle "Checkout" button click for all snack pages
    const checkoutButton = document.querySelector('.checkoutbutton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Extract product details from the page
            const productName = document.querySelector('.product-info h2').textContent;
            const productImage = document.querySelector('.product-image img').src;

            // Extract the price from the <p> elements
            const productInfoParagraphs = document.querySelectorAll('.product-info p');
            let productPrice = '';

            // Loop through the <p> elements to find the one containing the price
            productInfoParagraphs.forEach(p => {
                const text = p.textContent.trim();
                // Use a regular expression to match the price format ($XX.XX USD)
                if (/\$\d+\.\d{2} USD/.test(text)) {
                    productPrice = text.replace('$', '').replace(' USD', ''); // Extract just the numeric value
                }
            });

            // Create the item object
            const item = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            // Add the item to the cart
            addToCart(item);

            // Logging for debugging
            console.log("Added item to cart:", item);
            console.log("Cart items:", JSON.parse(localStorage.getItem('productCartItems')));

            // Redirect to the payment page
            window.location.href = 'payment.html';
        });
    }

    // Payment page logic
    if (window.location.pathname.includes('payment.html')) {
        // Call the function to update the cart display when the page loads
        updateCartDisplay();

        // Handle the "Place Order" button click
        const placeOrderButton = document.querySelector('.place-order-button');
        const orderConfirmationPopup = document.getElementById('order-confirmation-popup');
        const closePopupButton = document.getElementById('close-payment-popup');

        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', () => {
                // Clear the cart
                localStorage.removeItem('productCartItems');
                localStorage.removeItem('freeSnacks');

                // Show the popup
                orderConfirmationPopup.style.display = 'flex';

                // Trigger confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {
                        y: 0.6
                    },
                    colors: ['#FF9500', '#2AAC7E', '#0D0D80', 'FF3B30']
                });

                // Update the cart display
                updateCartDisplay();
            });
        }

        // Close the popup when the "OK" button is clicked
        if (closePopupButton) {
            closePopupButton.addEventListener('click', () => {
                orderConfirmationPopup.style.display = 'none';
                window.location.href = 'index.html'; // Redirect to the home page
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
                <p id="snack-message">You got a free Love Bite!</p>
                <button id="close-snack-popup">OK</button>
            </div>
        `;
        document.body.appendChild(popup);

        const closeSnackPopupButton = popup.querySelector("#close-snack-popup");

        collectButton.addEventListener("click", () => {
            const snack = { name: "Love Bite" }; // Store free snacks as objects with a name and quantity
            addFreeSnack(snack);

            // Update the popup message
            document.getElementById("snack-message").textContent = `🎉 You got a free ${snack.name}! 🎉`;
            popup.style.display = "flex";

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.6
                },
                colors: ['#FF9500', '#2AAC7E', '#0D0D80', 'FF3B30']
            });
        });

        closeSnackPopupButton.addEventListener("click", () => {
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

    // Update cart display on all pages
    updateCartDisplay();
});