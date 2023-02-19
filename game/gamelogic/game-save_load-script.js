const player_key = "oo_player_key"
const mine_depth_key = "oo_mine_depth_key"
const ore_amount_key = "oo_ore_amount_key"
const mine_amount_key = "oo_mine_amount_key"
const mine_workers_key = "oo_mine_worekers_key"


function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}