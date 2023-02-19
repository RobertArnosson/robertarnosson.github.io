
//
//
//

//# - game-infobar-script.js

/// Player Data

const player = {
    money: 0,
}


/// Ore Data

const Game = {
    coal: {
      discovered: false,
      infoDiv: document.getElementById("coal-info-div"),
      img: document.getElementById("coal-info-img"),
      text: document.getElementById("coal-info"),
      shadowImgSrc: "./textures/ores/coal_shadow.png",
      regularImgSrc: "./textures/ores/coal.png",
      sellPrice: 25,
      amount: 0
    },
    iron: {
      discovered: false,
      infoDiv: document.getElementById("iron-info-div"),
      img: document.getElementById("iron-info-img"),
      text: document.getElementById("iron-info"),
      shadowImgSrc: "./textures/ores/iron_shadow.png",
      regularImgSrc: "./textures/ores/iron.png",
      sellPrice: 100,
      amount: 0
    },
    copper: {
      discovered: false,
      infoDiv: document.getElementById("copper-info-div"),
      img: document.getElementById("copper-info-img"),
      text: document.getElementById("copper-info"),
      shadowImgSrc: "./textures/ores/copper_shadow.png",
      regularImgSrc: "./textures/ores/copper.png",
      sellPrice: 1000,
      amount: 0
    },
    silver: {
      discovered: false,
      infoDiv: document.getElementById("silver-info-div"),
      img: document.getElementById("silver-img"),
      text: document.getElementById("silver-info"),
      shadowImgSrc: "./textures/ores/silver_shadow.png",
      regularImgSrc: "./textures/ores/silver.png",
      sellPrice: 4500,
      amount: 0
    },
    gold: {
      discovered: false,
      infoDiv: document.getElementById("gold-info-div"),
      img: document.getElementById("gold-img"),
      text: document.getElementById("gold-info"),
      shadowImgSrc: "./textures/ores/gold_shadow.png",
      regularImgSrc: "./textures/ores/gold.png",
      sellPrice: 7500,
      amount: 0
    },
    diamond: {
      discovered: false,
      infoDiv: document.getElementById("diamond-info-div"),
      img: document.getElementById("diamond-img"),
      text: document.getElementById("diamond-info"),
      shadowImgSrc: "./textures/ores/diamond_shadow.png",
      regularImgSrc: "./textures/ores/diamond.png",
      sellPrice: 10000,
      amount: 0
    }
};

/// Discover Ore

function discoverOre(ore) {
    ore.discovered = true;
    ore.img.src = ore.regularImgSrc;
    ore.text.style.color = "#FFA12D";
}
  
function hideOre(ore) {
    ore.discovered = false;
    ore.img.src = ore.shadowImgSrc;
    ore.text.style.color = "#000";
}


// --- //


//# - game-mines-script.js
/// Add Mine

function addMine(name, ore, amount, workers, workerPrice, workerSpeed) {

    const minesPanel = document.querySelector('.mines-panel');
    const mine = document.createElement('div');
    mine.className = 'mine';

    const mineName = document.createElement('h2');
    mineName.className = 'mine-title';
    mineName.textContent = `${name} mine`;
    mine.appendChild(mineName);

    const mineText = document.createElement('p');
    mineText.className = 'mine-text';
    mineText.textContent = `${amount} ${name.toLowerCase()} per sec`;
    mine.appendChild(mineText);

    const workersText = document.createElement('p');
    workersText.className = 'worker-text';
    workersText.textContent = `Workers - ${workers}`;
    mine.appendChild(workersText);

    const workerPriceText = document.createElement('p');
    workerPriceText.className = 'worker-price';
    workerPriceText.textContent = `Price per worker: $${workerPrice}`;
    mine.appendChild(workerPriceText);

    const hireButton = document.createElement('button');
    hireButton.className = 'hire-button';
    hireButton.textContent = 'Hire Worker';
    hireButton.addEventListener('click', createHireWorkerHandler(mineText, workersText, workerPriceText, amount, workers, workerPrice, workerSpeed));
    mine.appendChild(hireButton);

    minesPanel.appendChild(mine);

    let interval;
    let mineIsActive = false;

    function startMine(orePerSecond) {
        if (!mineIsActive) {
            mineIsActive = true;
            interval = setInterval(() => {
                const oreElement = document.getElementById(`${name.toLowerCase()}-info`);
                oreElement.textContent = parseInt(oreElement.textContent) + parseInt(orePerSecond);
                Game[name.toLowerCase()].amount = parseInt(oreElement.textContent);
                discoverOre(ore);
            }, 1000);
        }
    }

    function stopMine() {
        if (mineIsActive) {
            clearInterval(interval);
            mineIsActive = false;
        }
    }

    function createHireWorkerHandler(mineText, workersText, workerPriceText, amount, workers, workerPrice, workerSpeed) {
        return () => {
            workers += 1;
            const newOrePerSecond = (amount + (workers * workerSpeed)).toFixed(0);
            const newPrice = workerPrice*Math.pow(1.15, workers);
            mineText.textContent = `${newOrePerSecond} ${name.toLowerCase()} per sec`;
            workersText.textContent = `Workers: ${workers}`;
            workerPriceText.textContent = `Price per worker: $${Math.round(newPrice)}`;
            stopMine();
            startMine(newOrePerSecond);
        };
    }

    startMine(amount);
}

addMine("Coal", Game.coal, 1, 0, 100, 2);


const sellbuttoncoal = document.getElementById('sell-button-coal');

sellbuttoncoal.addEventListener("click", () => {
    const moneyElement = document.getElementById('money');
    let total_sell_price = Game.coal.amount * Game.coal.sellPrice
    player.money += total_sell_price
    moneyElement.textContent = `$ ${player.money}`
    Game.coal.amount = 0;
})