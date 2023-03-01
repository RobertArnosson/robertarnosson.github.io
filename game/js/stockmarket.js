import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../js/storage.js';
import { playerDict } from '../data/playerdata.js';
import { stockmarketDict } from '../data/stockmarketdata.js';

//removeStorageItem("player_data")
//removeStorageItem("stockmarket_data")

console.log(playerDict)

const playerDictCheck = checkStorageItem("player_data", playerDict)
console.log(playerDictCheck)

let localPlayerDict;
if (playerDictCheck) {
    localPlayerDict = getStorageItem("player_data");
    console.log(localPlayerDict);
} else {
    setStorageItem("player_data", playerDict);
    localPlayerDict = getStorageItem("player_data");
    console.log(localPlayerDict);
}

console.log(playerDict)

const stockmarketDictCheck = checkStorageItem("stockmarket_data", stockmarketDict)
console.log(stockmarketDictCheck)

let localstockmarketDict;
if (stockmarketDictCheck) {
    localstockmarketDict = getStorageItem("stockmarket_data");
    console.log(localstockmarketDict);
} else {
    setStorageItem("stockmarket_data", stockmarketDict);
    localstockmarketDict = getStorageItem("stockmarket_data");
    console.log(localstockmarketDict);
}

// Stock data
const stocks = [
    {
    planet: "Novaria",
    company: "Frozen Frontier Resources (FFR)",
    name: "FFR",
    symbol: "◈",
    basePrice: 10,
    price: 10,
    changeList: [],
    volatility: 1.5,
    change: 0,
    shares: 0 
    },
    {
    planet: "Novaria",
    company: "CryoLife Technologies (CLT)",
    name: "CLT",
    symbol: "◈",
    basePrice: 10,
    price: 10,
    changeList: [],
    volatility: 1,
    change: 0,
    shares: 0
    },
    {
    planet: "Novaria",
    company: "Iceberg Innovations (II)",
    name: "II",
    symbol: "◈",
    basePrice: 10,
    price: 10,
    changeList: [],
    volatility: 1,
    change: 0,
    shares: 0
    },
    {
    planet: "Aethera",
    company: "SkyHarvest Mining (SHM)",
    name: "SHM",
    symbol: "◈",
    basePrice: 20,
    price: 20,
    changeList: [],
    volatility: 0.8,
    change: 0,
    shares: 0
    },
    {
    planet: "Aethera",
    company: "Airborne Adaptations Inc. (AAI)",
    name: "AAI",
    symbol: "◈",
    basePrice: 20,
    price: 20,
    changeList: [],
    volatility: 1,
    change: 0,
    shares: 0
    },
    {
    planet: "Aethera",
    company: "Cloud City Energy (CCE)",
    name: "CCE",
    symbol: "◈",
    basePrice: 20,
    price: 20,
    changeList: [],
    volatility: 1,
    change: 0,
    shares: 0
    },
    {
    planet: "Helion",
    company: "Desert Diggers Corp. (DDC)",
    name: "DDC",
    symbol: "◈",
    basePrice: 30,
    price: 30,
    changeList: [],
    volatility: 2,
    change: 0,
    shares: 0
    },
    {
    planet: "Helion",
    company: "SunStorm Solutions (SSS)",
    name: "SSS",
    symbol: "◈",
    basePrice: 30,
    price: 30,
    changeList: [],
    volatility: 1,
    change: 0,
    shares: 0
    },
    {
    planet: "Helion",
    company: "Oasis Outfitters Inc. (OOI)",
    name: "OOI",
    symbol: "◈",
    basePrice: 30,
    price: 30,
    changeList: [],
    volatility: 2,
    change: 0,
    shares: 0
    }
];

let perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();

function updatePrices() {
    let crashRiskStocks = []
    for (let i = 0; i < stocks.length; i++) {
        let stock = stocks[i];
        let basePrice = stock.basePrice;
        let volatility = perlin.get(i, Date.now() / 100000) * stock.volatility*10 * (Math.random() + 0.5); // Add randomness to volatility
        let movement = perlin.get(i, Date.now() / 50000) * volatility * (Math.random() + 0.5); // Add randomness to movement

        // Introduce crashChance variable
        let crashChance = crashRiskStocks.includes(stock.name) ? 0.1 : 0.01;
        if (crashRiskStocks) {
            if (Math.random() < crashChance) {
                movement *= 3;
                volatility *= 3 // If stock crashes, triple the movement
                console.log(`${stock.company} Crashed!`)
            }
        }

        let newPrice = Math.max(basePrice + movement, 1);
        stock.price = newPrice.toFixed(2);

        let priceElement = document.getElementById(stock.name.toLowerCase() + "-price");
        priceElement.innerHTML = stock.symbol + " " + stock.price;

        let changeElement = document.getElementById(stock.name.toLowerCase() + "-change");
        let change = ((stock.price - basePrice) / basePrice) * 100;
        let changeFormatted = change.toFixed(2) + "%";
        changeElement.innerHTML = changeFormatted;
        if (change > 0) {
            changeElement.classList.remove("negative");
            changeElement.classList.add("positive");
        } else {
            changeElement.classList.remove("positive"); 
            changeElement.classList.add("negative");
        }

        addTostockList(stock.changeList, stock.price);
        updateGraf(stock.name.toLowerCase(), i, stock.changeList, stock.planet);
        updateHoldings(i);
    }
}

function buyStock(stockIndex, shares) {
    let stock = stocks[stockIndex];
    const row = document.querySelector(`#${stock.name.toLowerCase()}-stock-row`);
    if (row.classList.contains('expanded') && shares != 0) {
        shares = parseInt(document.getElementById(stock.name.toLowerCase() + "-input-number-id").value);
    }
    let totalCost = stock.price * shares + 1;

    if (shares == 0) {
        let maxShares = Math.floor(balance / stock.price);
        if (maxShares > 0) {
        stock.shares += maxShares;
        balance -= maxShares * stock.price;
        updateBalance();
        updateStockShares(stockIndex);
        }
    } else if (totalCost > 0 && totalCost <= balance) {
        stock.shares += shares;
        balance -= totalCost;
        updateBalance();
        updateStockShares(stockIndex);
    } else {
        console.log(totalCost);
    }
}
  

function sellStock(stockIndex, shares) {
    let stock = stocks[stockIndex];
    const row = document.querySelector(`#${stock.name.toLowerCase()}-stock-row`);
    if (row.classList.contains('expanded') && shares != 0) {
        shares = parseInt(document.getElementById(stock.name.toLowerCase()+"-input-number-id").value);
    }
    if (shares > 0 && shares <= stock.shares) {
        let totalSale = stock.price * shares;
        stock.shares -= shares;
        balance += totalSale;
        updateBalance();
        updateStockShares(stockIndex);
    } else if (shares == 0 && shares <= stock.shares) {
        let totalSale = stock.price * stock.shares;
        stock.shares = 0;
        balance += totalSale;
        updateBalance();
        updateStockShares(stockIndex);
    }
}

function addTostockList(stockList, newValue) {
    newValue = parseFloat(newValue)
    stockList.unshift(newValue);  // Add new value to the front of the array
    if (stockList.length > 30) {
        stockList.pop();  // Remove last value from the array if it's longer than 30 elements
    }
}
  

function updateGraf(stockname, stockIndex, list, planet) {
    let stock = stocks[stockIndex];
    const data = localstockmarketDict[planet.toLowerCase()][stockname.toLowerCase()].change;
    
    localstockmarketDict[planet.toLowerCase()][stockname.toLowerCase()].change.unshift(parseFloat(parseFloat(stock.price).toFixed(2)));
    if (localstockmarketDict[planet.toLowerCase()][stockname.toLowerCase()].change.length > 50) {
        localstockmarketDict[planet.toLowerCase()][stockname.toLowerCase()].change.pop(0);
    }
    console.log(localstockmarketDict[planet.toLowerCase()][stockname.toLowerCase()].change)
    setStorageItem("stockmarket_data", localstockmarketDict)

    const WIDTH = 750
    const HEIGHT = 450

    const chartContainer = document.getElementById(stockname+"-chart");
    let chartCanvas = document.getElementById(stockname+"-canvas");
    if (chartCanvas == null) {
        chartCanvas = document.createElement("canvas");
        chartCanvas.className = "canvas";
        chartCanvas.id = stockname+"-canvas";
    }

    chartCanvas.width = WIDTH;
    chartCanvas.height = HEIGHT;
    chartContainer.appendChild(chartCanvas);

    const ctx = chartCanvas.getContext("2d");

    const xPadding = 50;
    const yPadding = 50;
    const xStep = (chartCanvas.width - xPadding) / (data.length - 1);
    const yStep = (chartCanvas.height - yPadding) / (Math.max(...data) - Math.min(...data));
    const xOffset = xPadding / 2;
    const yOffset = yPadding / 2;
    const basePriceIndex = Math.floor(data.length / 2); // Index of base price value

    // Draw line chart
    ctx.beginPath();
    ctx.moveTo(chartCanvas.width - xOffset, chartCanvas.height - (data[0] - Math.min(...data)) * yStep - yOffset);
    for (let i = 1; i < data.length; i++) {
        const x = chartCanvas.width - (i * xStep + xOffset);
        const y = chartCanvas.height - (data[i] - Math.min(...data)) * yStep - yOffset;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#FFA12D";
    ctx.stroke();
    
    // Display current price
    const currentPrice = data[0];
    const currentPriceY = chartCanvas.height - (currentPrice - Math.min(...data)) * yStep - yOffset;
    ctx.font = "bold 20px Arial";
    ctx.fillText("◈ " + currentPrice.toFixed(2), WIDTH - 80, currentPriceY - 10);
    ctx.beginPath();
    ctx.moveTo(WIDTH - 25, currentPriceY);
    ctx.lineTo(WIDTH - 25, chartCanvas.height - yOffset);
    ctx.strokeStyle = "#777";
    ctx.stroke();
}

function increaseValue(stockIndex) {
    const inputValueElement = document.getElementById(stocks[stockIndex].name.toLowerCase()+"-input-number-id")
    inputValueElement.value = parseInt(inputValueElement.value) + 1;
}

function decreaseValue(stockIndex) {
    const inputValueElement = document.getElementById(stocks[stockIndex].name.toLowerCase()+"-input-number-id")
    if (parseInt(inputValueElement.value) > 1) {
        inputValueElement.value = parseInt(inputValueElement.value) - 1;
    }
}

function updateStockShares(stockIndex) {
    let stock = stocks[stockIndex];
    let sharesElement = document.getElementById(stock.name.toLowerCase() + "-shares");
    sharesElement.innerHTML = stock.shares;
    updateHoldings(stockIndex);
}

function updateHoldings(stockIndex) {
    let stock = stocks[stockIndex];
    let holdingElement = document.getElementById(stock.name.toLowerCase() + "-holdings");
    holdingElement.innerHTML = (stock.shares * stock.price).toFixed(2);
}

function updateBalance() {
    let money = document.getElementById('money');
    money.textContent = "◈ "+balance.toFixed(2)
    localPlayerDict.money = parseFloat(balance.toFixed(2));
    setStorageItem("player_data", localPlayerDict);
}

let balance = parseFloat(localPlayerDict.money);
updateBalance();

updatePrices();
setInterval(updatePrices, 2000);

const backbutton = document.getElementById("back");

backbutton.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    const planetpage = `game/html/planets/map_${localPlayerDict.planet}.html`

    window.location.href = newUrl+planetpage;

});

function addNewEventListener(stockIndex) {
    let stock = stocks[stockIndex];
    const inputValueElement = document.getElementById(stock.name.toLowerCase()+"-input-number-id")
    const buyall = document.getElementById(stock.name.toLowerCase() + "-stock-button-all-buy")
    const sellall = document.getElementById(stock.name.toLowerCase() + "-stock-button-all-sell")
    const buy = document.getElementById(stock.name.toLowerCase() + "-stock-button-buy")
    const sell = document.getElementById(stock.name.toLowerCase() + "-stock-button-sell")
    const increase = document.getElementById(stock.name.toLowerCase() + "-input-number-increment-id")
    const decrease = document.getElementById(stock.name.toLowerCase() + "-input-number-decrement-id")

    buyall.addEventListener("click", () => {
        buyStock(stockIndex, 0);
    })

    sellall.addEventListener("click", () => {
        sellStock(stockIndex, 0);
    })

    buy.addEventListener("click", () => {
        buyStock(stockIndex, parseInt(inputValueElement.textContent));
    })

    sell.addEventListener("click", () => {
        sellStock(stockIndex, parseInt(inputValueElement.textContent));
    })

    increase.addEventListener("click", () => {
        increaseValue(stockIndex);
    })

    decrease.addEventListener("click", () => {
        decreaseValue(stockIndex);
    })
}

addNewEventListener(0);
addNewEventListener(1);
addNewEventListener(2);
addNewEventListener(3);
addNewEventListener(4);
addNewEventListener(5);
addNewEventListener(6);
addNewEventListener(7);
addNewEventListener(8);