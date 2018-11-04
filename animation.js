var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c = canvas.getContext('2d');

var mouse={
	x:undefined,
	y:undefined

}

window.addEventListener('mousemove',function(event){
	 mouse.x=event.x;
	 mouse.y=event.y;
})
// var colorarray = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
//var colorarray=["orange","green","white"];
//var colorarray=["#69b418","#ffddac","#c9beaa","	#787987","#485c6e","#ff4949"];
var colorarray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
var minradius;
var maxradius=40;
function Circle(x,y,dx,dy,radius)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minradius=radius;
	this.color=colorarray[parseInt(Math.random()*colorarray.length)];

	 this.draw=function()
	  {
        	c.beginPath();
	        c.strokeStyle="white";
	        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    
	         c.stroke();
	         c.fillStyle=this.color;
	         c.fill();
	         
	    
	  }
	 this.update=function()
	 {
        
        if (this.x+this.radius>innerWidth || this.x-this.radius<0)
    	   {this.dx=-this.dx;
            }
        
           this.x+=this.dx;

         if(this.y+this.radius>innerHeight || this.y-this.radius<0)
         {
    	this.dy=-this.dy;
         } 
          this.y+=this.dy;

       //////interacting with canvas
         if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50)
         	 { if(this.radius<maxradius)
         	 	this.radius+=1;
         	 }
         
          else if(this.radius>this.minradius)
          	 {this.radius-=1;
                 }
         	 this.draw();
          	 
	} 

}
 var circlearray=[];

window.addEventListener('resize',function()
{ 
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
init();
	
})
function init()
{
	circlearray=[];

 for (var i = 0; i < 1000; i++) {
 	var radius = Math.random()*3+1;
 	 var x=Math.random()*(innerWidth-radius*2)+radius;
     var dx=Math.random()-0.5;
    var y=Math.random()*(innerHeight-radius*2)+radius;
    var dy=Math.random()-0.5;
    
 	circlearray.push(new Circle(x,y,dx,dy,radius));
 }

}
init();

function animate()
{  requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	 
         for (var i = 0; i < circlearray.length; i++) {
         	  circlearray[i].update();
         }
}
animate();
