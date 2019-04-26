class Line {
  constructor(){
    const negative = true;
    let indentX = 10;
    let indentY = 10;
    let tabY = 0;
    let line = [-80, -20, 0, 0, 100, 100, 130, -10];
    const arrowLength = 10;
    const arrowWidth = 5;
    const strokeWidth = 2;
    let lengthX = 400;
    let tabX = (negative)? lengthX / 2 : indentX;
    const lengthY = 400;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });
    var layer = new Konva.Layer();
    const arrowY = new Konva.Arrow({
      x: indentX,
      y: indentY,
      points: [ tabX, lengthX, tabX, tabY],
      pointerLength: arrowLength,
      pointerWidth: arrowWidth,
      fill: 'black',
      stroke: 'black',
      strokeWidth: strokeWidth
    });
    lengthX = (negative)? lengthX/2 : lengthX;
    this.nullX = tabX;
    this.nullY = lengthX;
    line = line.map((item, index) => {
      if (index === 0 || index % 2 === 0){
        return this.nullX + item + indentX;
      }
      else {
        return this.nullY - item + indentY;
      }
    });
    console.log(line)
    const vector = new Konva.Line({
      points: line,
      stroke: 'red',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    tabX = (negative)? 0 : tabX;
    const arrowX = new Konva.Arrow({
      x: indentX,
      y: indentY,
      points: [tabX, lengthX, lengthY, lengthX],
      pointerLength: arrowLength,
      pointerWidth: arrowWidth,
      fill: 'black',
      stroke: 'black',
      strokeWidth: strokeWidth
    });
    layer.add(arrowY);
    layer.add(vector);
    layer.add(arrowX);
    stage.add(layer);
  }
}

module.exports = { Line };