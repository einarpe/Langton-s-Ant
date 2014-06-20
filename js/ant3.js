/**
 * @author kubap
 */

var directions = [
  [0, -1], // top
  [-1, 0], // left
  [0, 1], // bottom
  [1, 0] // right
];

directions.toString = function(d)
{
  switch(d)
  {
    case 0: return "top";
    case 1: return "left";
    case 2: return "bottom";
    case 3: return "right";
    default: return "?";
  }
};

/**
 * Ant object
 * Defines functions and variables useful to determine ant behaviour
 * 
 */
AntPrototype = {
  x: 2, // starting x position
  y: 3, // starting y position
  area: [],
  getPos : function()
  {
    return {x: this.x, y:this.y};
  },
  getNextDirection : function(type)
  {
    // type: -1 - left, +1 - right
    var dir = this.direction + type;
    
    if (dir > 3) dir = 0;
    else if (dir < 0) dir = 3;
    
    return dir;
  },
  direction: 0, // 0 - up, 1 - left, 2 - bottom, 3 - right
  getCell : function() 
  {
    return this.area[this.x][this.y];
  },
  setDirection : function(type)
  {
    return (this.direction = this.getNextDirection(type));
  },
  next : function()
  {
    // get the color on cell where ant is
    var cell = this.getCell(), 
        // delta and next ant position
        delta, nextX, nextY;
    
    // determine direction of ant
    delta = this.setDirection(cell.toDirection());
    
    // get delta from array of directions
    nextX = directions[delta][0];
    nextY = directions[delta][1];
    
    // set next position ( add delta )  
    nextX = this.x + nextX;
    nextY = this.y + nextY;
    
    // check if ant cross borders of area
    // X
    if (nextX > Area.width - 1)
      nextX = 0;
    else if (nextX < 0)
      nextX = Area.width - 1;
    
    // Y  
    if (nextY > Area.height - 1)
      nextY = 0;
    else if (nextY < 0)
      nextY = Area.height - 1;
    
    // if there is ant on next area
    // then wait
    if (this.area[nextX][nextY].getAnt()) 
      return;
    
    // save current position to variables  
    var prevX = this.x, prevY = this.y;  
    
    // inverse color on ACTUAL cell ( black -> white and vice versa )
    // ACTUAL cell is no longer ant
    this.area[prevX][prevY].inverse().ant(false);
    
    // go to NEXT position
    this.x = nextX;
    this.y = nextY;
    
    // NEXT position is ant
    this.area[this.x][this.y].ant(true);
    
    // call onchange event
    this.onchange(this.x, this.y, prevX, prevY, this);
    
  },
  
  // onchange event
  // here is empty function
  // in file scripting.js this function is replacing and it calls Table.render()
  onchange : function(px, py, nx, ny){}
};

Ants = [];
Ants.addAnt = function(x, y, d)
{
  var ant = $extend({}, AntPrototype);
  if (typeof x == "number" && typeof y == "number")
  {
    ant.x = x; 
    ant.y = y;
  }
  ant.direction = d;
  
  return (this[this.length] = ant);
};

Ants.clear = function()
{
  this.splice(0, this.length);
};

Ants.move = function()
{
  // make a copy of Area
  // all operations will be done on copy ( arr )
  var arr = [];
  for(var i = 0; i < Area.width; i++)
  {
    arr[i] = [];
    for(var j = 0; j < Area.height; j++)
    {
      arr[i][j] = Area[i][j];
    }
  }
  
  for(var i = 0, ant, pos; i < this.length; i++)
  {
    ant = this[i];
    ant.area = arr;
    
    pos = ant.getPos();
    Area.setAnt(pos.x, pos.y, ant); // connect Cell with Ant
    
    ant.next();
  }
  
  // refresh area
  // copy next generation to actual area
  Area.refresh(arr);
};
