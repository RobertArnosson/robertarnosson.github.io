let defaultGame = {
    money: 200,
    unit_display: "short",
    run_money_auto: true,
    mines: {
        coal_mine_1: {
            id: "coal_mine_1",
            type: "coal",
            base_price: 100,
            base_price_worker: 100,
            price: 100,
            mine_level: 0,
            workers: 0,
            base_production: 10,
            max_workers: 10,
            bought: false
        },
        coal_mine_2: {
            id: "coal_mine_2",
            type: "coal",
            base_price: 200,
            base_price_worker: 200,
            price: 200,
            mine_level: 0,
            workers: 0,
            base_production: 20,
            max_workers: 10,
            bought: false
        },
        coal_mine_3: {
            id: "coal_mine_3",
            type: "coal",
            base_price: 300,
            base_price_worker: 300,
            price: 300,
            mine_level: 0,
            workers: 0,
            base_production: 30,
            max_workers: 10,
            bought: false
        },
        coal_mine_4: {
            id: "coal_mine_4",
            type: "coal",
            base_price: 400,
            base_price_worker: 400,
            price: 400,
            mine_level: 0,
            workers: 0,
            base_production: 40,
            max_workers: 10,
            bought: false
        },
        coal_mine_5: {
            id: "coal_mine_5",
            type: "coal",
            base_price: 500,
            base_price_worker: 500,
            price: 500,
            mine_level: 0,
            workers: 0,
            base_production: 50,
            max_workers: 10,
            bought: false
        },
        coal_mine_6: {
            id: "coal_mine_6",
            type: "coal",
            base_price: 600,
            base_price_worker: 600,
            price: 600,
            mine_level: 0,
            workers: 0,
            base_production: 60,
            max_workers: 10,
            bought: false
        },
        coal_mine_7: {
            id: "coal_mine_7",
            type: "coal",
            base_price: 700,
            base_price_worker: 700,
            price: 700,
            mine_level: 0,
            workers: 0,
            base_production: 70,
            max_workers: 10,
            bought: false
        },
        coal_mine_8: {
            id: "coal_mine_8",
            type: "coal",
            base_price: 800,
            base_price_worker: 800,
            price: 800,
            mine_level: 0,
            workers: 0,
            base_production: 80,
            max_workers: 10,
            bought: false
        },
        coal_mine_9: {
            id: "coal_mine_9",
            type: "coal",
            base_price: 900,
            base_price_worker: 900,
            price: 900,
            mine_level: 0,
            workers: 0,
            base_production: 90,
            max_workers: 10,
            bought: false
        },
        coal_mine_10: {
            id: "coal_mine_10",
            type: "coal",
            base_price: 1000,
            base_price_worker: 1000,
            price: 1000,
            mine_level: 0,
            workers: 0,
            base_production: 100,
            max_workers: 10,
            bought: false
        },
    }
}



// Const Variables

const coalMine1 = document.getElementById('coal_mine_1');
const coalMine2 = document.getElementById('coal_mine_2');
const coalMine3 = document.getElementById('coal_mine_3');
const coalMine4 = document.getElementById('coal_mine_4');
const coalMine5 = document.getElementById('coal_mine_5');
const coalMine6 = document.getElementById('coal_mine_6');
const coalMine7 = document.getElementById('coal_mine_7');
const coalMine8 = document.getElementById('coal_mine_8');
const coalMine9 = document.getElementById('coal_mine_9');
const coalMine10 = document.getElementById('coal_mine_10');



// Event Lister Key Binds

document.addEventListener('keydown', function(event) {
    if (event.key == "Escape") {
        setTimeout(function(){document.location.href = "index.html"},100);
    }

    if (event.key == "c") {
        localStorage.clear();
        window.location.reload();
        console.log("Data Cleared");
    }
});



// Save / Load Function

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultValue) {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return defaultValue;
    }
}



// Update All Values On Screen

function updateAllScreenValues(game) {
    const updateWorkerCount = (mineId) => {
        const workers_elmt = document.getElementById(`${mineId}-total-miners`);
        workers_elmt.textContent = `Workers: ${game.mines[mineId].workers}`;
    };
  
    const money_elmt = document.getElementById('money');
    money_elmt.textContent = formatNumber(game.money, game.unit_display);
  
    for (let i = 1; i <= 10; i++) {
        updateWorkerCount(`coal_mine_${i}`);
    }
  
    checkBoughtMinesAndWorkers(game);
}



// Update Mine State

function updateState(game, element, state) {
    switch (state) {
    case 'hidden':
        element.style.display = 'none';
        break;
    case 'unbought':
        element.style.display = 'block';
        element.querySelector('.hidden').style.display = 'none';
        element.querySelector('.unbought').style.display = 'block';
        element.querySelector('.bought').style.display = 'none';
        game.mines[element.id].bought = false;
        break;
    case 'bought':
        element.style.display = 'block';
        element.querySelector('.hidden').style.display = 'none';
        element.querySelector('.unbought').style.display = 'none';
        element.querySelector('.bought').style.display = 'block';
        game.mines[element.id].bought = true;
        console.log("Bought: " + element.id + " - " + game.mines[element.id].bought);
        break;
    default:
        console.log('Invalid state');
    }
}



// Format Number

function formatNumber(num, unit_type) {
    var units_long = [
        '', ' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion',
        ' Sextillion', ' Septillion', ' Octillion', ' Nonillion', ' Decillion', ' Undecillion',
        ' Duodecillion', ' Tredecillion', ' Quattuordecillion', ' Quindecillion', ' Sedecillion',
        ' Septendecillion', ' Octodecillion', ' Novemdecillion'];
    var units_short = [
        '', ' k', ' M', ' B', ' T', ' Qa', ' Qi', ' Sx', ' Sp', ' Oc', ' No', ' D',
        ' Ud', ' Dd', ' Td', ' Qad', ' Qid', ' Sxd', ' Spd', ' Od', ' Nod'];
    var units;
    if (unit_type == "short") {
        units = units_short;
    } else if (unit_type == "long") {
        units = units_long;
    }
    var formatted = '';
    for (var i = 0; i < units.length; i++) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size > num) {
            if (i != 0) {
                if (i != 1) {
                    formatted = (num / Math.pow(10, i * 3)).toFixed(3) + units[i];
                    break;
                } else if (i == 1) {
                    formatted = (num / Math.pow(10, i * 3)).toFixed(2) + units[i];
                    break;
                }
            } else {
                formatted = (num / Math.pow(10, i * 3)).toFixed(0) + units[i];
                break;
            }
        }
    }
    if (formatted != "") {
        return "$ "+formatted;
    } else {
        return "$ "+(num / Math.pow(10, units.length * 3)).toFixed(3) + units.at(-1)
    } 
}



// Add New Workers To Mine

function addWorkerToMine(game, mineId, numWorkers) {
    const mine = Game.mines[mineId];

    if (game.money > mine.base_price) {
        if (!mine.bought) {
            console.log(`Mine with ID ${mineId} has not been bought yet.`);
            return;
            }
        
            const availableSlots = mine.max_workers - mine.workers;
        
            if (availableSlots < numWorkers) {
            console.log(`There are not enough slots for ${numWorkers} workers in mine with ID ${mineId}.`);
            return;
            }
        
            mine.workers += numWorkers;
            console.log(`${numWorkers} workers added to mine with ID ${mineId}.`);
    }
}



// Check And Update Mine And Worker State

function checkBoughtMinesAndWorkers(game) {
    // This flag is used to keep track of whether the first unbought mine has been found.
    let firstUnboughtMineFound = false;

    // Loop through all mines in the game object.
    for (const key in game.mines) {
        if (game.mines.hasOwnProperty(key)) {
            // Get the mine object and its corresponding HTML element.
            const mine = game.mines[key];
            let mine_element = document.getElementById(mine.id)

            // Check if the mine has been bought.
            let isBought = mine.bought;

            // Update the mine state based on whether it's bought or not.
            if (isBought) {
                updateState(game, mine_element, 'bought');
            } else if (!isBought && !firstUnboughtMineFound) {
                updateState(game, mine_element, 'unbought');
                firstUnboughtMineFound = true;
            } else {
                updateState(game, mine_element, 'hidden');
            }

            // Log the mine's attributes to the console.
            console.log(mine.id, mine.type, mine.base_price, mine.bought);
        }
    }
}



// Add Money

function updateMoney(game, isAutoAddingMoney) {
    // Set default value for game.money if it's not defined
    game.money = game.money || 0;
  
    // Calculate the amount of money to add based on the number of workers and mines
    let moneyToAdd = 0;
    for (const key in game.mines) {
        const mine = game.mines[key];
        moneyToAdd += (mine.workers * mine.base_production)*1.5;
    }
  
    // Add the calculated money to the Game.money variable
    game.money += moneyToAdd;
  
    // Update the money display on the screen
    const moneyElmt = document.getElementById('money');
    moneyElmt.textContent = formatNumber(game.money, game.unit_display);

    saveData("game_data_local", game);
  
    // If isAutoAddingMoney is true, set a timeout to call this function again in 1 second
    if (isAutoAddingMoney) {
      setTimeout(() => updateMoney(game, true), 1000);
    }
}

// Initialize Mines
function initializeMineControls(game, mineId) {
    const buyMineButton = document.getElementById(`unbought-mine-buy-${mineId}`);
    buyMineButton.addEventListener('click', function() {
    const mine = game.mines[mineId];
    if (!mine.bought) {
        console.log(game.money)
        console.log(mine.base_price)
        if (game.money >= mine.base_price) {
            game.money -= mine.base_price;
            console.log("Bought")
            mine.bought = true;
            updateState(game, document.getElementById(mineId), 'bought');
            const nextMine = mine.nextElementSibling;
            if (nextMine) {
                updateState(game, nextMine, 'unbought');
            }
        } else {
        alert("You don't have enough money to buy this mine!");
        }
    } else {
        alert("You've already bought this mine!");
    }
    saveData("game_data_local", game);
    });

  
    const hireWorkerButton = document.getElementById(`bought-mine-upg-${mineId}`);
    const hireWorkerTotal = document.getElementById(`${mineId}-total-miners`);
    hireWorkerButton.addEventListener('click', function() {
        addWorkerToMine(game, mineId, 1);
        hireWorkerTotal.textContent = `Workers: ${game.mines[mineId].workers}`;
        saveData("game_data_local", game);
    });
}

let Game;

// Run Commands On Window Load

window.addEventListener("load", function() {
    Game = loadData("game_data_local", defaultGame);
    console.log("Data Loaded: " + Game);
    updateAllScreenValues(Game);
    updateMoney(Game, Game.run_money_auto);
    initializeMineControls(Game, "coal_mine_1");
    initializeMineControls(Game, "coal_mine_2");
    initializeMineControls(Game, "coal_mine_3");
    initializeMineControls(Game, "coal_mine_4");
    initializeMineControls(Game, "coal_mine_5");
    initializeMineControls(Game, "coal_mine_6");
    initializeMineControls(Game, "coal_mine_7");
    initializeMineControls(Game, "coal_mine_8");
    initializeMineControls(Game, "coal_mine_9");
    initializeMineControls(Game, "coal_mine_10");
});



// Initialize All Mines

