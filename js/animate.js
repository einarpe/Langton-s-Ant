/**
 * @author kubap
 */

Animate = function(options)
{
  if (typeof options == "object" && options != null)
  {
    for (var prop in options)
      this.options[prop] = options[prop];
      
    if (options.element)
      this.setElement(options.element);
  }
  
  
};
Animate.prototype.options = {
  duration: 100,
  css: {}
};
Animate.prototype.element = null;

Animate.prototype.setElement = function(el)
{
  if (typeof el == "object" && el != null && typeof el.nodeType != "undefined")
    this.element = el;
  else if ((el = document.getElementById(el)) != null)
    this.element = el;
  
  return this;
};

Animate.prototype.start = function()
{
  for (var style in this.options.css)
    if (style != "")
    {
      Animate.start(this.element, style, this.options.css[style][0], this.options.css[style][1], this.options.duration);
    };
    
  return this;  
}

Animate.start = function(el, style, start, end, dur)
{
  var timer = null, startTime = (new Date).getTime();
  var effect = function()
  {
    var currentTime = (new Date).getTime();
    if (currentTime < startTime + dur)
    {
      el.style[style] = Animate.transition();
    }
    else
    {
      el.style[style] = end;
      timer = clearInterval(timer);
    }
    
    
  };
  
  timer = setInterval(effect, 25);
  
}

Animate.transition = function()
{
  
}
