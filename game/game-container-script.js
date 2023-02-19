const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shopPanel = document.querySelector('.shop-panel');
const minesPanel = document.querySelector('.mines-panel');
const smelteryPanel = document.querySelector('.smeltery-panel');

let current_panel;

function showShopPanel() {
  shopPanel.style.display = 'block';
  minesPanel.style.display = 'none';
  smelteryPanel.style.display = 'none';

  prevBtn.style.display = 'none';
  nextBtn.style.display = 'inline';

  current_panel = "shop"
}

function showMinesPanel() {
  shopPanel.style.display = 'none';
  minesPanel.style.display = 'block';
  smelteryPanel.style.display = 'none';

  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  
  current_panel = "mines"
}

function showSmelteryPanel() {
  shopPanel.style.display = 'none';
  minesPanel.style.display = 'none';
  smelteryPanel.style.display = 'block';
  
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'none';

  current_panel = "smelt"
}

prevBtn.addEventListener('click', function() {
    if(current_panel == "shop") {
        return
    } else if (current_panel == "mines") {
        showShopPanel();
    } else if (current_panel == "smelt") {
        showMinesPanel();
    }
});
nextBtn.addEventListener('click', function() {
    if(current_panel == "shop") {
        showMinesPanel();
    } else if (current_panel == "mines") {
        showSmelteryPanel();
    } else if (current_panel == "smelt") {
        return
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key == "ArrowLeft") {
        if(current_panel == "shop") {
            console.log("Can't go further left");
        } else if (current_panel == "mines") {
            showShopPanel();
        } else if (current_panel == "smelt") {
            showMinesPanel();
        }
    }

    if (event.key == "ArrowRight") {
        if(current_panel == "shop") {
            showMinesPanel();
        } else if (current_panel == "mines") {
            showSmelteryPanel();
        } else if (current_panel == "smelt") {
            console.log("Can't go further right");
        }
    }
});

showMinesPanel();