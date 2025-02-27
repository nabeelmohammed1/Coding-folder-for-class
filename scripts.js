 // Snack vending machine logic
 const collectButton = document.querySelector('.collect-button');
 const snacks = [
     "Granola Bar",
     "Fruit Snacks",
     "Nut Mix",
     "Protein Bar",
     "Dried Mango",
     "Popcorn",
     "Dark Chocolate Almonds"
 ];

 let collectedSnacks = []; // Array to store collected snacks

 // Create and append popup dynamically
 const popup = document.createElement('div');
 popup.id = "snack-popup";
 popup.classList.add("popup");
 popup.innerHTML = `
     <div class="popup-content">
         <p id="snack-message">🎉 You got a free snack! 🎉</p>
         <button id="close-popup">OK</button>
     </div>
 `;
 document.body.appendChild(popup);

 const closeButton = popup.querySelector("#close-popup");

 collectButton.addEventListener("click", () => {
     const randomSnack = snacks[Math.floor(Math.random() * snacks.length)]; // Pick a random snack
     collectedSnacks.push(randomSnack); // Store the collected snack
     document.getElementById("snack-message").textContent = `🎉 You got a free ${randomSnack}! 🎉`; // Update popup text
     popup.style.display = "flex"; // Show popup
     console.log("Collected Snacks:", collectedSnacks); // Log collected snacks
 });

 closeButton.addEventListener("click", () => {
     popup.style.display = "none"; // Hide popup
 });

//Filter Code
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filters button');
    const kitCards = document.querySelectorAll('.kit-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent.toLowerCase(); // Get filter name

            kitCards.forEach(card => {
                const cardFilters = card.dataset.filter.split(' '); // Get card's filters

                if (filter === 'all' || cardFilters.includes(filter)) { // Show if matches filter or 'all' is selected
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});