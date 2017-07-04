var chartData = [];
var chartPCT = [];
var simData = [1,1,1];
var simDataHour = [1,1,1];
var colors = ["#FF0000", "#00D600", "#00D6FF"];
var legendText = ["Under Power","Correct Power","Over Power"]
var pieXPos = 200;
var pieYPos = 220;
var pieRadius = 180;
var legendBoxX = 280;
var legendBoxY = 420;
var legendBoxSize = 30;
var legendTextX = 225;
var legendTextY = 444;
var legendGap = 40;

 
function drawSegment (canvas, context, i, centerX, centerY, radius){
    context.save();	
    var startingAngle = degreesToRadians(sumTo(chartData, i));
    var arcSize = degreesToRadians(chartData[i]);
    var endingAngle = startingAngle + arcSize;
	
    context.beginPath();
    context.moveTo(centerX, centerY);
	
    context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
    context.closePath();
    context.fillStyle = colors[i];
    context.fill();

    context.restore();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}
function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
}

function drawPieChart(){
	calculateSimData();
	canvas = document.getElementById("canvasmain");
	var context = canvas.getContext("2d");
	
	context.clearRect(0,0,800,600);
	clearCanvas(context,canvas);

	var centerX = pieXPos;
    var centerY = pieYPos;
    var radius = pieRadius;
	
	drawLegend(canvas, context);
	
	for (var i = 0; i < chartData.length; i++) {
		drawSegment(canvas, context, i, centerX, centerY, radius);
	}
}

function drawLegend(canvas, context){
	/* Legend */
	var localGap = 0
	for(var i=0;i<=2;i++){
		context.beginPath();
		context.rect(legendBoxX,legendBoxY+localGap,legendBoxSize,legendBoxSize);
		context.fillStyle = colors[i];
		context.fill();
		context.font = '14pt Arial';
		context.fillStyle = "blue";
		context.textAlign = "Left";
		context.fillText(legendText[i]+" "+chartPCT[i]+"%", legendTextX, legendTextY+localGap);
		localGap += legendGap
	}
}

function calculateSimData(){
	if(whichPie==0){
		var localLOW = simData[0]
		var localMID = simData[1]
		var localHGH = simData[2]
	}else{
		var localLOW = simDataHour[0]
		var localMID = simDataHour[1]
		var localHGH = simDataHour[2]	
	}
	var localTOT = localLOW+localMID+localHGH;
	
	var pctLOW = Math.floor((localLOW / localTOT) * 100);
	var pctMID = Math.floor((localMID / localTOT) * 100);
	var pctHGH = Math.floor((localHGH / localTOT) * 100);
	
	var pctTOT = pctLOW+pctMID+pctHGH;
	if(pctTOT < 100){
		pctHGH = pctHGH + (100 - pctTOT);
	}else if(pctTOT > 100){
		pctHGH = pctHGH - (pctTOT - 100);
	}else{
		pctHGH = pctHGH;
	}
	
	chartData[0] = pctLOW * 3.6;
	chartData[1] = pctMID * 3.6;
	chartData[2] = pctHGH * 3.6;
	chartPCT[0] = pctLOW;
	chartPCT[1] = pctMID;
	chartPCT[2] = pctHGH;
}

function clearCanvas(context,canvas){
		context.beginPath();
		context.rect(0,0,0,0);
		context.fillStyle = "white";
		context.fill();
}