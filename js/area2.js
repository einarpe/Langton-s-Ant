/**
 * @author kubarek
 */

Area = [];
Area.width = 10;
Area.height = 10;

Area.clear = function()
{
  this.splice(0, this.length);
}

Area.init = function()
{
  this.clear();
  
  for (var i = 0; i < this.width; i++) 
  {
    this[i] = [];
    for (var j = 0; j < this.height; j++) 
    {
      this[i][j] = this.CELL_WHITE;
    }
  }
  return this;
};

Area.set = function(x, y, v)
{
  this[x][y] = v;
};

Area.get = function(x, y)
{
  return this[x][y];
};

Area.setInverse = function(cell)
{
  // if cell is alive, make it dead
  // if cell is dead, make it alive
  var pos = cell;
  if ( (pos & this.CELL_WHITE) == this.CELL_WHITE )
  {
    pos = ~this.CELL_WHITE;
    pos |= this.CELL_BLACK;
  }
  else if( (pos & this.CELL_BLACK) == this.CELL_BLACK )
  {
    pos = ~this.CELL_BLACK;
    pos |= this.CELL_WHITE;
  }
  return pos;
  //return this[x][y] = ((this[x][y] & this.CELL_ALIVE) == this.CELL_ALIVE ? this.CELL_DEAD : ((this[x][y] & this.CELL_DEAD) == this.CELL_DEAD ? this.CELL_ALIVE : this.CELL_DEAD));
};

Area.getColor = function(cell, toString)
{
  if ((cell & this.CELL_WHITE) == this.CELL_WHITE)
    return toString ? "white" : this.CELL_WHITE;
  if ((cell & this.CELL_BLACK) == this.CELL_BLACK)
    return toString ? "black" : this.CELL_BLACK;
    
  return 0;    
}

Area.isAnt = function(cell)
{
  return ((cell & this.CELL_ANT) == this.CELL_ANT)
}

Area.setAnt = function(cell, set)
{
  if (this.isAnt(cell))
    return cell;
    
  if (!!set) 
  {
    if (this.isAnt(cell)) 
      return cell;
    
    return (cell |= this.CELL_ANT);
  }
  else 
  {
    if (this.isAnt(cell)) 
      return (cell = ~ this.CELL_ANT);
      
    return cell;
  }
}

Area.refresh = function(array)
{
  for (var i = 0; i < this.width; i++) 
    for (var j = 0; j < this.height; j++) 
    {
      this[i][j] = array[i][j];
    }
}

Area.setAnts = function(ants)
{
  for(var i = 0, a; i < ants.length; i++)
  {
    a = ants[i];
    this[ a[0] ][ a[1] ] |= this.CELL_ANT;
  }
}

Area.CELL_WHITE = 2;
Area.CELL_BLACK = 1;
Area.CELL_ANT = 4;

Cell = function(type, isAnt)
{
  this.type = !!type;
  this.isAnt = !!isAnt;
  this._antObj = null;
}

Cell.inverse = function()
{
  this.type = Math.abs( this.type - Cell.BLACK);
}

Cell.WHITE = 0;
Cell.BLACK = 1;




