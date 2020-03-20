const container = document.getElementById("container");
const div = document.createElement('div');
let gridSize = 32;
let gridBoxSize = 100 / gridSize;
container.style.gridTemplateColumns = `repeat(${gridSize}, ${gridBoxSize}vmin)`
container.style.gridTemplateRows = `repeat(${gridSize}, ${gridBoxSize}vmin)`


//creates and appends Collumn and Row Divs
function createDivs() {
    //column divs
    for (var i = 1; i <= gridSize; i++) {
        const container = document.getElementById("container");
        const div = document.createElement('div');
        //row divs
        for (var j = 1; j < gridSize; j++) {
            const container = document.getElementById("container");
            const div = document.createElement('div');
            div.classList.add('item');
            div.setAttribute('id', `item:${i}-${j}`);
            container.appendChild(div);
        }
        div.classList.add('item');
        div.setAttribute('id', `item:${i}-${j}`);
        container.appendChild(div);
    }
}

var boxes = container.getElementsByClassName('item');

boxes.forEach((item) => {

    // and for each one we add a 'click' listener
    item.addEventListener('click', (e) => {
        e.target.style.background = 'blue';
      });
  });

createDivs();
console.log(boxes[3]);