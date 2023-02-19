function addOre(mineType, amount) {
    const oreInfo = document.getElementById(mineType+"-info");
    let totalOre = parseInt(oreInfo.textContent);

    oreInfo.textContent = totalOre += amount;
}   