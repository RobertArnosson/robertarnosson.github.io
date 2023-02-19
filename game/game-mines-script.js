// WORK ON SAVE AND LOADING OD DATA

function addMine(workers) {
    // Get the ore type based on the player's mine depth
    let mineType = "";
    const mineDepth = Game.player.mineDepth;
    const buyminetext = document.getElementById('start-buy-mine-text');
    buyminetext.textContent = "";
    
    if (mineDepth >= Game.ores.coal.minFindRange && mineDepth <= Game.ores.coal.maxFindRange) {
      mineType = "coal";
    } else if (mineDepth >= Game.ores.iron.minFindRange && mineDepth <= Game.ores.iron.maxFindRange) {
      mineType = "iron";
    } else if (mineDepth >= Game.ores.copper.minFindRange && mineDepth <= Game.ores.copper.maxFindRange) {
      mineType = "copper";
    } else if (mineDepth >= Game.ores.silver.minFindRange && mineDepth <= Game.ores.silver.maxFindRange) {
      mineType = "silver";
    } else if (mineDepth >= Game.ores.gold.minFindRange && mineDepth <= Game.ores.gold.maxFindRange) {
      mineType = "gold";
    } else if (mineDepth >= Game.ores.diamond.minFindRange && mineDepth <= Game.ores.diamond.maxFindRange) {
      mineType = "diamond";
    } else {
      showNotification("warning", `Bottom reached`, `You have reached the bottom of the world`, "./game/textures/icons/warning.png")
    }

    const ore = Game.ores[mineType];

    Game.mine_amount[ore.name.toLowerCase()] += 1;

    const name = mineType.charAt(0).toUpperCase() + mineType.slice(1); // capitalize first letter of ore name
    const mineData = MineData[ore.name.toLowerCase()+"_mine_"+Game.mine_amount.coal];

    let amountPerSec = Math.round(((ore.baseWorkerPrice * (workers * 1.15)/6)/6)+Game.player.mineDepth/40);
    let amountPerMin = Math.round(amountPerSec * 60);
    let amountPerHour = Math.round(amountPerMin * 60);
  
    // Add the mine container to the mines panel
    const minesPanel = document.querySelector('.mines-panel');
    const mine = document.createElement('div');
    mine.className = 'mine';
  
    // Create and append the mine title
    const title = document.createElement('h2');
    title.className = 'mine-title';
    title.textContent = `${name} Mine`;
    mine.appendChild(title);
  
    // Create and append the mine image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'mine-image-container';
    mine.appendChild(imageContainer);

    // Define constants
    const imageContainer_elm = imageContainer;
    const imageWidth = 0;
    const imageHeight = 0;
    const minDistance = 1000;

    // Generate non-overlapping images
    for (let i = 0; i < 25; i++) {
        const image = document.createElement('img');
        image.className = 'mine-image';
        const randomRotation = Math.floor(Math.random() * 360);
        const randomScale = (Math.floor(Math.random() * 32) + 32) * 3;

        // Generate random positions until a non-overlapping position is found
        let randomPosX, randomPosY, distance;
        do {
            randomPosX = Math.floor(Math.random() * (91 - imageWidth / 2)) + 5;
            randomPosY = Math.floor(Math.random() * (91 - imageHeight / 2)) + 5;
            distance = getDistanceToNearestImage(randomPosX, randomPosY);
        } while (distance < minDistance);

        image.style.transform = `rotate(${randomRotation}deg) scale(${randomScale / 100})`;
        image.style.top = `${randomPosY}%`;
        image.style.left = `${randomPosX}%`;
        image.src = `./game/textures/ores/${mineType}.png`;
        imageContainer_elm.appendChild(image);
    }

    // Calculate the distance from the given position to the nearest image in the container
    function getDistanceToNearestImage(posX, posY) {
        const images = imageContainer_elm.getElementsByClassName('mine-image-container');
        let minDistance = Infinity;
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const rect = image.getBoundingClientRect();
            const imageX = rect.left + imageWidth / 2;
            const imageY = rect.top + imageHeight / 2;
            const distance = Math.sqrt(Math.pow(posX - imageX, 2) + Math.pow(posY - imageY, 2));
            minDistance = Math.min(minDistance, distance);
        }
        return minDistance;
    }

    let interval;
    let mineIsActive = false;

    function startMine(orePerSecond) {
        if (!mineIsActive) {
            mineIsActive = true;
            interval = setInterval(() => {
                addOre(mineType, amountPerSec)
            }, 1000);
        }
    }

    function stopMine() {
        if (mineIsActive) {
            clearInterval(interval);
            mineIsActive = false;
        }
    }
      
    // Create and append the mine stats
    const statsContainer = document.createElement('div');
    statsContainer.className = 'mine-stats-container';
    mine.appendChild(statsContainer);

    const orePerSecText = document.createElement('p');
    orePerSecText.className = 'mine-stat-text';
    orePerSecText.textContent = `${amountPerSec} per sec | Workers: ${workers}`;
    statsContainer.appendChild(orePerSecText);

    // If the ore is not discovered, discover it
    if (ore.discovered == false) {
        discoverOre(ore);
        showNotification("notify", `New ore discoverd: ${ore.name}`, `You have discoverd brand new ore ${ore.name}`, ore.discoveredImg)
    }

    console.log(Game.player.mineDepth)

    const hireButton = document.createElement('button');
    hireButton.className = 'hire-button';
    hireButton.textContent = `Hire - $${((workers * ore.baseWorkerPrice * 1.15)*Game.player.mineDepth/50).toFixed(0)}`;
    hireButton.addEventListener('click', () => {
        const newWorkerPrice = (workers * ore.baseWorkerPrice * 1.15).toFixed(0);
        if (Game.player.money != newWorkerPrice) {
            workers += 1;
            Game.player.money -= newWorkerPrice;
            console.log(((ore.baseWorkerPrice * (workers * 1.15)/6)/6)+Game.player.mineDepth/40)
            amountPerSec = Math.round(((ore.baseWorkerPrice * (workers * 1.15)/6)/6)+Game.player.mineDepth/40);
            amountPerMin = Math.round(amountPerSec * 60);
            amountPerHour = Math.round(amountPerMin * 60);
            orePerSecText.textContent = `${amountPerSec} per sec | Workers: ${workers}`;
            hireButton.textContent = `Hire - $${((workers * ore.baseWorkerPrice * 1.15)*Game.player.mineDepth/50).toFixed(0)}`;
            
        } else {
            alert("You don't have enough money to hire a new worker!");
        }
    });

    startMine()
    Game.player.mineDepth += 20;
    mine.appendChild(hireButton);
    minesPanel.appendChild(mine);
}