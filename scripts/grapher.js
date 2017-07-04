var powerReqsArray = [];
var powerOutArray = [];

var verticalLabelArray = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]

var verticalAixLabel = "Power in KW";
var horizAixLabel = "Time of Day";
var width = 0;
var xPos;
var yPos;

/* grid dimensions */
var powerMax = 200;
var barWidth = 16;
var barPadding = 4;
var xStart = 90;
var yStart = 20;
var numColumns = 15;
var numRows = 25;
var columnSpacing = (barWidth + barPadding) * 2;
var rowSpacing = 14;
var maxBarHeight = (numRows * rowSpacing);
var horizLabelEnd = 25000;
var horizLabelStep = 1000;

CanvasMaster1 = new Object();
CanvasMaster1.showCanvas = function()
{

	/* generateData(); */
	canvasNow = document.getElementById("canvasmain");
	contextNow = canvasNow.getContext('2d');
	contextNow.clearRect(0,0,800,600);
	clearCanvas(contextNow,canvasNow);
	
	/* draw the grid */
	drawGrid2(contextNow,canvasNow,xStart,yStart,numColumns,numRows,columnSpacing,rowSpacing,horizLabelEnd,horizLabelStep,verticalAixLabel,horizAixLabel);
	
	xPos = xStart+barPadding;
	for(var i=0;i<numColumns;i++)
	{
		var powerBarHeight1 = (((powerReqsArray[i] / powerMax ) * 100) * maxBarHeight) / 100;
		var powerBarHeight2 = (((powerOutArray[i] / powerMax) * 100) * maxBarHeight) / 100;
		
		
      var grd1 = contextNow.createLinearGradient(0, 0, barWidth,800);
      grd1.addColorStop(0, '#00D600');   
      grd1.addColorStop(1, '#000000');
	  
	  var grd2 = contextNow.createLinearGradient(0, 0, barWidth,800);
      grd2.addColorStop(0, '#00D6FF');   
      grd2.addColorStop(1, '#777777');
		
		yPos = yStart + (maxBarHeight - powerBarHeight1);
		contextNow.beginPath();
		contextNow.rect(xPos,yPos,barWidth,powerBarHeight1);
		/*contextNow.fillStyle = "#00D600";*/
		contextNow.fillStyle = grd1;
		contextNow.fill();
		contextNow.save();
		xPos+=barWidth;

		yPos = yStart + (maxBarHeight - powerBarHeight2);
		contextNow.beginPath();
		contextNow.rect(xPos,yPos,barWidth,powerBarHeight2);
		/* contextNow.fillStyle = "#00D6FF"; */
		contextNow.fillStyle = grd2;
		contextNow.fill();	
		contextNow.restore();
		xPos+=barWidth + (barPadding * 2);
	}
	
	/* Legend */
	contextNow.beginPath();
	contextNow.rect(180,460,30,30);
	contextNow.fillStyle = "#00D600";
	contextNow.fill();	
	contextNow.font = '14pt Arial';
	contextNow.fillStyle = "blue";
	contextNow.textAlign = "Left";
	contextNow.fillText("Power Requirements", 390, 480);
	
	contextNow.beginPath();
	contextNow.rect(430,460,30,30);
	contextNow.fillStyle = "#00D6FF";
	contextNow.fill();	
	contextNow.font = '14pt Arial';
	contextNow.fillStyle = "blue";
	contextNow.textAlign = "Left";
	contextNow.fillText("Output Power", 580, 480);
}

function clearCanvas(context,canvas){
		context.beginPath();
		context.rect(0,0,0,0);
		context.fillStyle = "white";
		context.fill();
}

function drawGrid2(context,canvas,xStart,yStart,numColumns,numRows,columnSpacing,rowSpacing,horizLabelEnd,horizLabelStep,verticalAixLabel,horizAixLabel){
	context.lineWidth = 1;
	context.strokeStyle = "grey";
	/* plot the verticals */
	var lXpos = xStart;
	var lYposStart = yStart;
	var lYposEnd = yStart + (rowSpacing * numRows);
	for(var i=0;i<=numColumns;i++){
		context.moveTo(lXpos,lYposStart);
		context.lineTo(lXpos,lYposEnd);
		lXpos+=columnSpacing;
	}
	/* plot the horizontals */
	var lXposStart = xStart;
	var lXposEnd = xStart + (columnSpacing * numColumns);
	var lYpos = yStart;
	for(var i=0;i<=numRows;i++){
		context.moveTo(lXposStart,lYpos);
		context.lineTo(lXposEnd,lYpos);
		lYpos+=rowSpacing;
	}
	/* draw the grid */
	context.stroke();
	
	/* draw the horizontal labels */
	context.font = '10pt Arial';
	context.fillStyle = "black";
	context.textAlign = "right";
	var labPosX = xStart-10;
	var labPosY = yStart+5;
	for(var i=0;i<=numRows;i++){
		context.fillText(horizLabelEnd, labPosX, labPosY);
		labPosY+=rowSpacing;
		horizLabelEnd-=horizLabelStep;
	}
	context.fillText(horizAixLabel, 400, 440);
	
	/* draw the vertical labels */
	context.save(); 
	context.font = '10pt Arial';
	context.fillStyle = "black";
	context.translate(xStart+20,yStart+360); 
	context.rotate(-1 * Math.PI / 2);
	var dPos = 0;
	for (var i=0;i<numColumns;i++){
		var labelDisplay = verticalLabelArray[i];
		context.fillText(labelDisplay , 0, dPos);
		dPos += columnSpacing;
	}
	context.fillText(verticalAixLabel , 260, -80);
	context.restore(); 
}

function generateData(){
	var i
	for(i=0; i<15;i++){
		powerReqsArray[i] = Math.floor((Math.random() * 200)+1);
		powerOutArray[i] = Math.floor((Math.random() * 200)+1);
	}
}



