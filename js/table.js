/**
 * @author kubarek
 */

Table = {
  el: null,
  initialize : function()
  {
  	this.el = $T.byId('tant');
  	
  	return this;
  },
  build: function()
  {
    var t = this.el, tr, td;
    for (var i = 0; i < Area.height; i++) 
    {
      tr = document.createElement('tr');
      for (var j = 0; j < Area.width; j++) 
      {
        td = document.createElement('td');
        td.id = 'pos_' + j + 'x' + i;
        td.className = '' + Area[j][i];
        
        tr.appendChild(td);
      }
      t.appendChild(tr);
      
    }
    return this;
  },
  clear: function()
  {
    var table = this.el, row;
    while (table.childNodes.length) 
    {
      row = table.firstChild;
      
      while (row.childNodes.length) 
        row.removeChild(row.firstChild);
      
      table.removeChild(row);
    }
    return this;
  },
  render: function(x, y, px, py, ant)
  {
    var area = ant.area;
    
    $T.byId('pos_' + x + 'x' + y).className = '' + area[x][y] + "_" + directions.toString(ant.direction);
    $T.byId('pos_' + px + 'x' + py).className = '' + area[px][py];
    
    //console.log("Next move: ", directions.toString(ant.getNextDirection(area[x][y].toDirection())));
    
    //console.log("ant = ", ant)
    //console.log("Direction of ant: dirs[", ant.direction, "] = ", directions[ant.direction]);
    
    
    
    return this;
  }
};


Cell.prototype.toString = function()
{
  var str = "";
  if (this.col == Cell.WHITE)
    str += "c_white ";
  else if (this.col == Cell.BLACK)
    str += "c_black ";
    
  if (this.isAnt) 
    str += "c_ant";
  
  return str;      
};
