//discoverOre(Game.ores.coal);
//addMine(1, 50, 1);

const buy_mine_button = document.getElementById('buy-button-mine');

buy_mine_button.addEventListener("click", () => {
    addMine(1);
    showNotification("success", "New Mine Bought!", "Successfully bought new mine!", './game/textures/icons/success.png')
})