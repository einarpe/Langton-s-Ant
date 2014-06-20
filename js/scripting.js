/**
 * @author kubap
 */

/**
 * Global config object
 * 
 */
Config = new function()
{
  // default config data
  var _data = {
    ants: [ [2, 3, 0] ],
    width: 10,
    height: 10
  };
  
  this.set = function(name, value)
  {
    if (name == "width" || name == "height")
      value = Number(value);
      
    _data[ name ] = value;
    
    return this;
  };
  
  this.get = function(name)
  {
    var data = $extend({}, _data);
    if (typeof name != "string")
      return data;
    else
      return data[name];
  }
  
  this.apply = function()
  {
    Ants.clear();
    
    for (var i = 0, a; i < _data.ants.length; i++) 
    {
      a = _data.ants[i];
      Ants.addAnt( Number(a[0]), Number(a[1]), Number(a[2]) );
    }
    
    Area.width = _data.width;
    Area.height = _data.height;
    Area.init();
    
    Table.clear();
    Table.build();
    
    iter = 0;
  }
}

AntPrototype.onchange = function()
{
  Table.render.apply(Table, arguments);
}


init = function(){
  
  $T.byId('frmconfig').onsubmit = function(event)
  {
    event = new Event(event);
    event.stop();
    
    var ants = $$(this.ants.options).map(function(opt)
    {
      return opt.value.split("x");
    });
    
    var width = this.width.value, height = this.height.value;
    
    Config.set('ants', ants).set('width', width).set('height', height).apply();
    
    $T.byId('frmwrapper').style.display = "none";
    
    return false;
  };
  
  $T.byId('addant').onclick = $T.byId('addantcancel').onclick = function()
  {
    $T.byId('fdsaddant').toggleDisplay();
  }
  
  $T.byId('addantsubmit').onclick = function()
  {
    var x, y, d;
    x = parseInt($T.byId('antposx').value);
    if (isNaN(x) || x < 0) 
    {
      alert("Bad X position! It must be integer larger than 0.");
      return;
    }
      
    y = parseInt($T.byId('antposy').value);
    if (isNaN(y) || y < 0)
    {
      alert("Bad Y position! It must be integer larger than 0.");
      return;      
    }
    
    var ants = $T.byId('ants').options;
    for(var i = 0, re = new RegExp("^"+x+"x"+y); i < ants.length; i++)
    {
      if (ants[i].value.match(re))
        return alert('There is ant on given position!');
      
    }
    
    d = parseInt($T.byId('antdir').value);
    
    var opt = document.createElement('option');
    opt.value = x+"x"+y+"x"+d;
    
    opt.innerHTML = '('+x+','+y+') '+ directions.toString(d);
    
    $T.byId('ants').appendChild(opt);
    
    
    
    return false;
  };
  
  $T.byId('removeant').onclick = function()
  {
    var selected = $T.byId('ants').selectedIndex;
    if (selected < 0)
      return;
      
    selected = $T.byId('ants').options[ selected ];
    selected.parentNode.removeChild(selected);  
  };
  
  $T.byId('next').onclick = function()
  {
    render();
  };
  
  $T.byId('ctrl').onclick = function()
  {
    delaj = Number($T.byId('delay').value);
    
    run = !run;
    
    this.value = run ? ' □ ' : ' > ';
    
    play();
  };
  
  $T.byId('delay').onchange = function()
  {
    delaj = this.value;
  };
  
  $T.byId('showcloseform').onclick = function()
  {
    $T.byId('frmwrapper').toggleDisplay();
  };
  
  Table.initialize();
  Config.apply();
}



rtimer = null; iter = 0; delaj = 500; run = false;
render = function(play)
{
  Ants.move();
    
  $T.byId('iter').innerHTML = ++iter;
};

play = function()
{
  if (run)
  {
    render();
    
    rtimer = setTimeout(play, delaj);
  }
};


onload = init;
