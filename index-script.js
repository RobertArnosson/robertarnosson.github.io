var letterElements = document.querySelectorAll(".letter");
var spaceElements = document.querySelectorAll(".space");

var spaceElement;

spaceElements.forEach(function(spaceElementLoop) {
  spaceElement = spaceElementLoop
})

letterElements.forEach(function(letterElement) {
  letterElement.addEventListener("mouseover", function() {
    var hoverElement = this;
    var previousElement = letterElement.previousElementSibling;
    var nextElement = letterElement.nextElementSibling;
    if (nextElement == spaceElement) nextElement = spaceElement.nextElementSibling;
    if (previousElement == spaceElement) previousElement = spaceElement.previousElementSibling;
    if (hoverElement) hoverElement.classList.add("animate-hover");
    if (previousElement) previousElement.classList.add("animate-small-hover");
    if (nextElement) nextElement.classList.add("animate-small-hover");
  });
  letterElement.addEventListener("mouseout", function() {
    var hoverElement = this;
    var previousElement = letterElement.previousElementSibling;
    var nextElement = letterElement.nextElementSibling;
    if (nextElement == spaceElement) nextElement = spaceElement.nextElementSibling;
    if (previousElement == spaceElement) previousElement = spaceElement.previousElementSibling;
    if (hoverElement) hoverElement.classList.remove("animate-hover");
    if (previousElement) previousElement.classList.remove("animate-small-hover");
    if (nextElement) nextElement.classList.remove("animate-small-hover");
  });
});






/* 







@font-face {
	font-family: 'Jost-Bold';
	src: url('./fonts/Jost-Bold.ttf') format('truetype');
}

@font-face {
	font-family: 'Jost-Regular';
	src: url('./fonts/Jost-Regular.ttf') format('truetype');
}

body {
    font-family: Jost-Regular, sans-serif;
    background-color: #2A2A2A;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
	
}

header {
    background-color: #222222;
    color: #FFA12D;
    padding: 10px;
    text-align: center;
}

.letter-div {
    user-select: none;
    font-size: 0;
}

.letter {
    padding: 0;
	margin: 20px 0;
	font-family: Jost-Bold;
	font-size: 66px;
	font-weight: 800;
    display: inline-block;
    transition: all 0.3s;
}

.letter.animate-hover {
    color: #F5F5F5;
    transform: translateY(-10px);
}

.letter.animate-small-hover {
    color: #ffcb8b;
    transform: translateY(-5px);
}

.top-nav {
    background-color: #2A2A2A;
    color: #F5F5F5;
    display: flex;
    justify-content: center;
}

.top-nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.top-nav a {
    color: #F5F5F5;
    display: block;
    padding: 10px 15px;
	font-size: 18px;
    text-decoration: none;
	transition: all 0.2s ease;
}

.top-nav a:hover {
	color: #ffc278;
}

#current {
    color: #FFA12D;
}

main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
	background-color: #353535;
}

.center-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
	background-color: transparent;
}

.center-button ul {
    padding: 0;
    list-style-type: none;
}

.center-button li {
    font-size: 25px;
    width: 8em;
    height: 2em;
    color: #FFA12D;
    border-left: 0.08em solid;
    position: relative;
    margin-top: 0.8em;
    cursor: pointer;
}

.center-button li::before,
.center-button li::after
 {
    content: '';
    position: absolute;
    width: inherit;
    border-left: inherit;
    z-index: 1;
}

.center-button li::before {
    height: 80%;
    top: 10%;
    left: calc(-0.15em - 0.08em * 2);
	filter: brightness(80%);
}

.center-button li::after {
    height: 60%;
    top: 20%;
    left: calc(-0.15em * 2 - 0.08em * 3);
    filter: brightness(60%);
}

.center-button li span {
    position: relative;
    height: 120%;
    top: -10%;
    box-sizing: border-box;
    border: 0.08em solid;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    text-transform: capitalize;
    transform: translateX(calc(-0.15em * 3 - 0.08em * 2));
    transition: 0.3s;
	z-index: 2;
}

.center-button li:hover span {
    transform: translateX(0.15em);

}

footer {
	background-color: #222222;
	color: #F5F5F5;
	padding: 10px;
	text-align: center;
}











*/
