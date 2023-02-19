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

    console.log("Hover element:", hoverElement);
    console.log("Previous element:", previousElement);
    console.log("Next element:", nextElement);
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