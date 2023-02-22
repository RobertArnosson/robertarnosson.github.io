

// Stock data
const stocks = [
    {
    planet: "Novaria",
    company: "Frozen Frontier Resources (FFR)",
    name: "FFR",
    symbol: "◈",
    basePrice: 10,
    price: 10,
    volatility: 1,
    change: 0,
    shares: 0  },

    {
    planet: "Novaria",
    company: "CryoLife Technologies (CLT)",
    name: "CLT",
    symbol: "◈",
    basePrice: 10,
    price: 10,
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
        console.log("------------------------------------------------------");
        console.log(stock.company + " - " + "High Volatility: " + volatility);
        console.log("------------------------------------------------------");
    } else {
        volatility = stock.volatility + Math.random() - 0.5;
        console.log(stock.company + " - " + "Normal Volatility: " + volatility);
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
    
    updateHoldings(i);
  }
}

function buyStock(stockIndex, shares) {
    let stock = stocks[stockIndex];
    let totalCost = stock.price * shares+1;
    if (totalCost > 0 && totalCost <= balance) {
        stock.shares += shares;
        balance -= totalCost;
        updateBalance();
        updateStockShares(stockIndex);
    } else {
        console.log(totalCost)
    }
}

function sellStock(stockIndex, shares) {
    let stock = stocks[stockIndex];
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

function updateHoldings(stockIndex) {
    let stock = stocks[stockIndex];
    let holdingsElement = document.getElementById(stock.name.toLowerCase() + "-holdings");
    holdingsElement.innerHTML = (stock.shares * stock.price).toFixed(2);
}

function updateStockShares(stockIndex) {
    let stock = stocks[stockIndex];
    let sharesElement = document.getElementById(stock.name.toLowerCase() + "-shares");
    sharesElement.innerHTML = stock.shares;
    updateHoldings(stockIndex);
}

function updateBalance() {
    let money = document.getElementById('money');
    money.textContent = "◈ "+balance.toFixed(0)
}

let balance = 1000;
updateBalance();

updatePrices();
setInterval(updatePrices, 2500);
