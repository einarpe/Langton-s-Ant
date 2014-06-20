/**
 * Simple DOM Tools
 * 
 * It is simple framwework.
 * 
 * @author kubap
 */

$T = function(a){}

$T.byClass = function(c) 
{
  var e = document.getElementsByTagName('*'), found = [], re = new RegExp('[\s]*'+c.replace(/^\./, '')+'[\s]*', "i");
  for(var i = 0; i < e.length; i++)
    if (e[i].className.match(re))
      found.push(e[i]);
  return found;  
}

$T.byId = function(id)
{
  el = document.getElementById(id);
  if (!el)
    return null;
    
  return $T.byId.fn.apply(el, []);
}

$T.byId.fn = function()
{
  
  this.toggleDisplay = function()
  {
    this.style.display = this.style.display == "block" ? "none" : "block";
    return this;
  }
  
  this.getStyle = function(style)
  {
    
  }
  
  return this;
}

$T.ie = !!(window.ActiveXObject);

