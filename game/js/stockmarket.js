

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
    volatility: 1,
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
    volatility: 1,
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
    volatility: 1,
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
    volatility: 1,
    change: 0,
    shares: 0
    }
];

function updatePrices() {
    for (let i = 0; i < stocks.length; i++) {
        let stock = stocks[i];
        let basePrice = stock.basePrice;
        let volatility;
        if (Math.floor(Math.random() * 100) + 1 == 100) {
            volatility = Math.floor(Math.random() * 10) + 1
        } else {
            volatility = stock.volatility + Math.random() - 0.5;
        }
        let movement = Math.random() * volatility * 2 - volatility;
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
        updateGraf(stock.name.toLowerCase(), stock.changeList, stock.basePrice);
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
  

function updateGraf(stockname, list, baseprice) {
    const data = list; // Your list of stock prices

    const chartContainer = document.getElementById(stockname+"-chart");
    let chartCanvas = document.getElementById(stockname+"-canvas");
    if (chartCanvas == null) {
    chartCanvas = document.createElement("canvas");
    chartCanvas.className = "canvas";
    chartCanvas.id = stockname+"-canvas";
    }
    chartCanvas.width = 750;
    chartCanvas.height = 450;
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
    ctx.moveTo(chartCanvas.width - xOffset, chartCanvas.height - (data[data.length - 1] - Math.min(...data)) * yStep - yOffset);
    for (let i = data.length - 2; i >= 0; i--) {
        const x = i * xStep + xOffset;
        const y = chartCanvas.height - (data[i] - Math.min(...data)) * yStep - yOffset;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#FFA12D";
    ctx.stroke();
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
    money.textContent = "◈ "+balance.toFixed(0)
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

let balance = 1000;
updateBalance();

updatePrices();
setInterval(updatePrices, 2500);
