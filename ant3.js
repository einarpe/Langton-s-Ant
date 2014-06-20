/**
 * @author kubap
 */

rand = function(a, b) {
  return Math.floor(Math.random() * (a - b + 1) + b); 
}

areaWidth = 7; areaHeight = 7;

var directions = [
  [0, -1], // top
  [-1, 0], // right
  [0, 1], // bottom
  [1, 0] // left
];

directions.toString = function(i)
{
  switch(i)
  {
    case 0: return 'top';
    case 1: return 'rgt';
    case 2: return 'btm';
    case 3: return 'lft';
    default: return '-';
  }
}

Area = {
  a: [],
  width: areaWidth, height: areaHeight,
  html: "",
  init: function()
  {
    for (var i = 0; i < this.width; i++) 
      for (var j = 0; j < this.height; j++) 
      {
        if (!this.a[i]) 
          this.a[i] = [];
        
        this.a[i][j] = 0;
      }
      
    this.html = this.generateHTML(this.a);  
  },
  show : function(el)
  {
    el = dojo.byId(el);
    if (!el)
      return false;
      
    if (!el.innerHTML) 
      el.innerHTML = this.html;
      
    for (var i = 0; i < this.width; i++) 
      for (var j = 0; j < this.height; j++) 
      {
        dojo.byId('pos_'+i+'x'+j).className = "cell_"+this.a[i][j]
        
        if (Ant.getPos().x == i && Ant.getPos().y == j) 
        { 
          dojo.byId('pos_'+i+'x'+j).className += " cant"; // + Ant.getDirection();
          //dojo.byId('pos_' + i + 'x' + j).innerHTML = ""+directions.toString(Ant.direction) + '<br/>' + directions.toString( Ant.getNextDirection(this.a[i][j] == 0 ? -1 : 1))
        }  
          
      }
      
    return el;  
      
      
  },
  generateHTML: function(a)
  {
    var html = '<table border="0" cellpadding="3" cellspacing="0" id="tant">';
    for (var i = 0; i < a.length; i++) 
    {
      html += '<tr>';
      for (var j = 0; j < a[i].length; j++) 
      {
        html += '<td class="cell_'+a[i][j]+'" id="pos_'+i+"x"+j+'">&nbsp;</td>';
      }
      html += '</tr>';
    }  
    html += '</table>';
    return html;
  }
  
  
}

/**
 * Ant object
 * Defines functions and variables useful to determine ant behaviour
 * 
 */
Ant = {
  x: 2, // starting x position
  y: 3, // starting y position
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
  getColor : function() 
  {
    return Area.a[this.x][this.y];
  },
  setDirection : function(type)
  {
    return (this.direction = this.getNextDirection(type));
  },
  next : function()
  {
    // get the color on cell where ant is
    var color = this.getColor(), 
        // next ant position
        next = {x:-1, y:-1}, 
        
        delta, nextX, nextY;
    
    // determine direction of ant
    if (color == 0) // white
    {
      // turn left
      delta = this.setDirection(-1);
    }
    else if(color == 1) // black
    {
      // turn right
      delta = this.setDirection(1);
    }
    
    // get delta from array of directions
    var nextX = directions[delta][0];
    var nextY = directions[delta][1];
    
    // set next position ( add delta )  
    next.x = this.x + nextX;
    next.y = this.y + nextY;
    
    // check if ant cross borders of area
    // X
    if (next.x > areaWidth - 1)
      next.x = 0;
    else if (next.x < 0)
      next.x = areaWidth - 1;
    
    // Y  
    if (next.y > areaHeight - 1)
      next.y = 0;
    else if (next.y < 0)
      next.y = areaHeight - 1;
    
    // inverse color on ACTUAL cell ( black -> white and vice versa )
    Area.a[this.x][this.y] = Math.abs( color - 1 );
    
    // go to NEXT position
    this.x = next.x;
    this.y = next.y;
    
    // returning next position - it may be useful
    return next;
  }
}



init = function(){
  Area.init();
  
  dojo.connect(dojo.byId('delay'), 'change', function()
  {
    delaj = this.value;
  });
  
  dojo.connect(dojo.byId('ctrl'), 'click', function()
  {
    run = !run;
    render();
    
    this.value = run ? ' || ' : ' > ';
  });
  
  dojo.connect(dojo.byId('next'), 'click', function()
  {
    Ant.next(); Area.show('area');
  });
  
}



rtimer = null; iter = 0; delaj = 1000; run = false;
render = function()
{
  
  if (run)
  {
    Ant.next();
    Area.show("area");
    
    dojo.byId('iter').innerHTML = ++iter;
    
    rtimer = setTimeout(render, delaj);
  }
  
}



dojo.addOnLoad(init);

