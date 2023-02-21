let container = document.getElementById("container");
let map = document.getElementById("map");

let marker1 = document.getElementById("marker-1");
let marker1_pos = marker1.getBoundingClientRect();

let marker2 = document.getElementById("marker-2");
let marker2_pos = marker2.getBoundingClientRect();

let marker3 = document.getElementById("marker-3");
let marker3_pos = marker3.getBoundingClientRect();

let marker4 = document.getElementById("marker-4");
let marker4_pos = marker4.getBoundingClientRect();

let dragging = false;
let lastX;
let lastY;
let mapX = 0;
let mapY = 0;



container.addEventListener("mousedown", function(e) {
  if (e.target === container || container.contains(e.target)) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    map.style.cursor = "grabbing";
  }
});

container.addEventListener("mousemove", function(e) {
  if (dragging) {
    
    let deltaX = e.clientX - lastX;
    let deltaY = e.clientY - lastY;

    mapX = parseInt(map.style.left) || 0;
    mapY = parseInt(map.style.top) || 0;

    maxX = 100; // maximum x scroll value (you can change this to your desired value)
    maxY = 100; // maximum y scroll value (you can change this to your desired value)
    minX = -(map.offsetWidth - container.offsetWidth + 100); // minimum x scroll value (you can change this to your desired value)
    minY = -(map.offsetHeight - container.offsetHeight + 100); // minimum y scroll value (you can change this to your desired value)

    // Adjust the deltaX and/or deltaY if it would move the map outside of the allowed scroll range
    if (mapX + deltaX > maxX) {
      deltaX = maxX - mapX;
    } else if (mapX + deltaX < minX) {
      deltaX = minX - mapX;
    }
    if (mapY + deltaY > maxY) {
      deltaY = maxY - mapY;
    } else if (mapY + deltaY < minY) {
      deltaY = minY - mapY;
    }

    map.style.left = (mapX + deltaX) + "px";
    map.style.top = (mapY + deltaY) + "px";

    
    marker1.style.top = marker1_pos.top + (mapY + deltaY) + "px";
    marker1.style.left = marker1_pos.left + (mapX + deltaX) + "px";

    marker2.style.top = marker2_pos.top + (mapY + deltaY) + "px";
    marker2.style.left = marker2_pos.left + (mapX + deltaX) + "px";

    marker3.style.top = marker3_pos.top + (mapY + deltaY) + "px";
    marker3.style.left = marker3_pos.left + (mapX + deltaX) + "px";
    
    marker4.style.top = marker4_pos.top + (mapY + deltaY) + "px";
    marker4.style.left = marker4_pos.left + (mapX + deltaX) + "px";

    lastX = e.clientX;
    lastY = e.clientY;
  }
});

container.addEventListener("mouseup", function(e) {
  dragging = false;
  map.style.cursor = "grab";
});

container.addEventListener("mouseleave", function(e) {
  if (dragging) {
    dragging = false;
    map.style.cursor = "grab";
  }
});

/*
function scrollHandler() {
  const distanceFromTop = window.pageYOffset + element.getBoundingClientRect().top;
  if (distanceFromTop > 0 && distanceFromTop < window.innerHeight) {
    let scale = 0.5 + (window.innerHeight - distanceFromTop) / (window.innerHeight * 2);
    element.style.transform = `scale(${scale})`;
  }
}

*/