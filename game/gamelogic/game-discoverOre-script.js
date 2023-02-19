function discoverOre(ore) {
    ore.discovered = true;
    ore.info_img.src = ore.discoveredImg;
    ore.shop_img.src = ore.discoveredImg;
    ore.info_text.style.color = "#FFA12D";
    ore.shop_title.textContent = ore.discoveredTitle;
    ore.shop_price.textContent = "$"+ore.valueSell+ore.discoveredPrice;
    openPopup(ore.name, "You have discoverd "+ore.name, ore.discoveredImg);
}
  
function hideOre(ore) {
    ore.discovered = false;
    ore.info_img.src = ore.undiscoveredImg;
    ore.shop_img.src = ore.undiscoveredImg;
    ore.info_text.style.color = "#000";
    ore.shop_title.textContent = ore.undiscoveredTitle;
    ore.shop_price.textContent = ore.undiscoveredPrice;
}