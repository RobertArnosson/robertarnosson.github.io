const wheelspin = document.getElementById("wheel-spin");
const tripplespin = document.getElementById("tripple-spin");
const gridguess = document.getElementById("grid-guess");

wheelspin.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/html/casino_games/casino_wheelspin.html"
});

tripplespin.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/html/casino_games/casino_tripplespin.html"
});

gridguess.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/html/casino_games/casino_gridguess.html"
});