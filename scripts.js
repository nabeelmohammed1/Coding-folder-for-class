document.addEventListener('DOMContentLoaded', () => {
    // Snack vending machine logic
    const collectButton = document.querySelector('.collect-button');
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
    console.log("Popup appended to the DOM:", popup);

    const closeButton = popup.querySelector("#close-popup");

    let collectedSnacks = JSON.parse(localStorage.getItem('cartItems')) || []; // Initialize collectedSnacks

    function updateCartDisplay() {
        const cartSummary = document.querySelector('.cart-summary');
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

    if (collectButton) {
        console.log("Collect button found!");
        collectButton.addEventListener("click", () => {
            const snack = "Love Bite";
            collectedSnacks.push(snack);
            document.getElementById("snack-message").textContent = `🎉 You got a free ${snack}! �`;
            popup.style.display = "flex";
            console.log("Collected Snacks:", collectedSnacks);
            localStorage.setItem('cartItems', JSON.stringify(collectedSnacks));
            updateCartDisplay();
        });
    } else {
        console.error("Collect button not found!");
    }

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

    //Filter Code
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

    //Cart Code
    updateCartDisplay();

    // Clear cart on page unload with a slight delay
    window.addEventListener('beforeunload', () => {
        setTimeout(() => {
            localStorage.removeItem('cartItems');
        }, 100);
    });
});