
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
      this[i][j] = new Cell; // defaults cell white, no ant on it
    }
  }
  return this;
};

Area.refresh = function(array)
{
  for (var i = 0; i < this.width; i++) 
    for (var j = 0; j < this.height; j++) 
    {
      this[i][j] = array[i][j];
      this[i][j]._oAnt = null;
    }
};

Area.setAnt = function(x, y, antObject)
{
  this[x][y]._oAnt = antObject;
}

Cell = function(col, isAnt)
{
  this.col = col ? Cell.BLACK : Cell.WHITE;
  this.isAnt = !!isAnt;
};

Cell.prototype.inverse = function()
{
  this.col = Math.abs( this.col - Cell.BLACK);
  return this;
};

Cell.prototype.ant = function(isAnt)
{
  this.isAnt = !!isAnt;
  return this;
};

Cell.prototype.getColor = function()
{
  return this.col;
};

Cell.prototype.getAnt = function()
{
  return this.isAnt;
};

Cell.prototype.toDirection = function()
{
  if (this.col == Cell.WHITE)
    return 1;
  else if (this.col == Cell.BLACK)
    return -1;
}

Cell.WHITE = 0;
Cell.BLACK = 1;



