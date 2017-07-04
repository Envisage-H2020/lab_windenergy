/* -------------------------------------------------------------------- */
/* -------------------------- Core Variables -------------------------- */
/* -------------------------------------------------------------------- */
var singlePowerOutput = [0,0,50,100,200,400,700,1000,1500,2000,2300,2400,2450,2500,2500,2500,2500,2500,2500,2500];
var imageStaticArray = new Array();
var imageAnimatedArray = new Array();

var timerID;
var seconds = 0;
var loopCounter = 0;

var windspeedLow = 4;
var windspeedHigh = 16;
var currentWindSpeed = 10;
var windChangeDirection = 0;
var windChangeCounter = 2;

var numTurbinesLow = 1;
var numTurbinesHigh = 10;
var currentNumTurbines;

var powerRequirementsLow = 1000;
var powerRequirementsHigh = 24000;
var currentPowerReqs = 1000;
var currentSinglePower = 0;
var powerChangeDirection = 0;
var powerChangeCounter = 2;

var powerReqCtr = 0;
var totalPowerOutput = 0;

var powerDiff = "Correct power";
var tMins = 0;
var tHours = 6;
var simulationRunning = 0;
var simulationStatus = 0;
var simStatusText = "Idle";

var userSpeed = 100;
var userSpeedTxt = "";
var txtWind = "";

var reportIndex = 0;
var whichChart = 1;
var whichPie = 0;

/* -------------------------------------------------------------------- */
/* -------------------------- Load the images ------------------------- */
/* -------------------------------------------------------------------- */
function initialiseImages(){
	imageStaticArray[0] = new Image();
	imageStaticArray[0].src = "images/ag1-01.png";
	imageStaticArray[1] = new Image();
	imageStaticArray[1].src = "images/ag2-01.png";	
	imageStaticArray[2] = new Image();
	imageStaticArray[2].src = "images/ag3-01.png";
	imageStaticArray[3] = new Image();
	imageStaticArray[3].src = "images/ag4-01.png";
	imageStaticArray[4] = new Image();
	imageStaticArray[4].src = "images/ag5-01.png";
	imageStaticArray[5] = new Image();
	imageStaticArray[5].src = "images/ag6-01.png";
	imageStaticArray[6] = new Image();
	imageStaticArray[6].src = "images/ag7-01.png";
	imageStaticArray[7] = new Image();
	imageStaticArray[7].src = "images/ag8-01.png";
	imageStaticArray[8] = new Image();
	imageStaticArray[8].src = "images/ag10-01.png";
	imageStaticArray[9] = new Image();
	imageStaticArray[9].src = "images/ag10-01.png";
	
	imageAnimatedArray[0] = new Image();
	imageAnimatedArray[0].src = "images/ag1Main.gif";
	imageAnimatedArray[1] = new Image();
	imageAnimatedArray[1].src = "images/ag2Main.gif";	
	imageAnimatedArray[2] = new Image();
	imageAnimatedArray[2].src = "images/ag3Main.gif";
	imageAnimatedArray[3] = new Image();
	imageAnimatedArray[3].src = "images/ag4Main.gif";
	imageAnimatedArray[4] = new Image();
	imageAnimatedArray[4].src = "images/ag5Main.gif";
	imageAnimatedArray[5] = new Image();
	imageAnimatedArray[5].src = "images/ag6Main.gif";
	imageAnimatedArray[6] = new Image();
	imageAnimatedArray[6].src = "images/ag7Main.gif";
	imageAnimatedArray[7] = new Image();
	imageAnimatedArray[7].src = "images/ag8Main.gif";
	imageAnimatedArray[8] = new Image();
	imageAnimatedArray[8].src = "images/ag9Main.gif";
	imageAnimatedArray[9] = new Image();
	imageAnimatedArray[9].src = "images/ag10Main.gif";
}

/* -------------------------------------------------------------------- */
/* -------------------- Get values from config page ------------------- */
/* -------------------------------------------------------------------- */
function getValues()
{
	windspeedLow = $( "#sliderWindSpeed" ).slider( "values",0 );
	windspeedHigh = $( "#sliderWindSpeed" ).slider( "values",1 );
	currentWindSpeed = Math.floor(windspeedLow + ((windspeedHigh - windspeedLow)/2));
	
	numTurbinesLow = $( "#sliderNumTurbines" ).slider( "values",0 );
	numTurbinesHigh = $( "#sliderNumTurbines" ).slider( "values",1 );
	currentNumTurbines = Math.floor(numTurbinesLow + ((numTurbinesHigh - numTurbinesLow)/2));
	
	powerRequirementsLow = $( "#sliderPowerReqs2" ).slider( "values",0 );
	powerRequirementsHigh = $( "#sliderPowerReqs2" ).slider( "values",1 );
	currentPowerReqs = Math.floor(powerRequirementsLow + ((powerRequirementsHigh - powerRequirementsLow)/2));
	
	var buttonVal1 = $( "#radio :radio:checked").attr('id');
	if(buttonVal1 == "radio1"){
		userSpeed = 100;
		userSpeedTxt = "Normal speed";
	}else if(buttonVal1 == "radio2"){
		userSpeed = 50;
		userSpeedTxt = "Fast speed";
	}else{
		userSpeed = 30;
		userSpeedTxt = "Warp speed!";
	}
	calcPowerOutput();
	if(simulationRunning == 0){
		setStaticImage();
	}else{
		setAnimatedImage();
	}
	updateData();
}

/* -------------------------------------------------------------------- */
/* --------------------- Update the data displays --------------------- */
/* -------------------------------------------------------------------- */
function updateData(){
	document.getElementById("wConfig").innerHTML=windspeedLow+" - "+windspeedHigh+" m/s";
	document.getElementById("tConfig").innerHTML=numTurbinesLow+" - "+numTurbinesHigh;
	document.getElementById("pConfig").innerHTML=powerRequirementsLow+" - "+powerRequirementsHigh+" kw";
	document.getElementById("sConfig").innerHTML=userSpeedTxt;
	document.getElementById("wCurrent").innerHTML=currentWindSpeed+" m/s";
	document.getElementById("tCurrent").innerHTML=currentNumTurbines;
	document.getElementById("oCurrent").innerHTML=totalPowerOutput+" kw";
	document.getElementById("pCurrent").innerHTML=currentPowerReqs+" kw";
	document.getElementById("xCurrent").innerHTML=simStatusText;
	
	if(tHours<10){
		var dispHours = "0"+tHours;
	}else{
		var dispHours = tHours;
	}
	if(tMins<10){
		var dispMins = "0"+tMins;
	}else{
		var dispMins = tMins;
	}
	var dispTime = dispHours+":"+dispMins;
	document.getElementById("realTime").innerHTML=dispTime;

	showReportChart();
}


/* -------------------------------------------------------------------- */
/* ---------------------- Add and remove turbines --------------------- */
/* -------------------------------------------------------------------- */
function addTurbine()
{
	if(simulationRunning == 2)
	{
		if(currentNumTurbines < numTurbinesHigh)
		{
			currentNumTurbines++;
			totalPowerOutput = currentSinglePower * currentNumTurbines;
			setAnimatedImage();
			updateData();
		}
	}
}	
function removeTurbine()
{
	if(simulationRunning == 2)
	{
		if(currentNumTurbines > numTurbinesLow)
		{
			currentNumTurbines--;
			totalPowerOutput = currentSinglePower * currentNumTurbines;
			setAnimatedImage();
			updateData();
		}
	}
}

/* -------------------------------------------------------------------- */
/* ---------------------- Calculate the wind speed ---------------------*/
/* -------------------------------------------------------------------- */
function calcWindPower()
{
	var windAdjust;
	
	if(windChangeDirection == 0){
		/* decrease*/
		windAdjust = (Math.floor((Math.random() * 3)-3));
		if((currentWindSpeed+windAdjust) >= windspeedLow){
			currentWindSpeed+=windAdjust;
		}
		windChangeCounter--;
		if(windChangeCounter == 0){
			windChangeCounter = (Math.floor((Math.random() * 3)+2));
			windChangeDirection = 1;
		}
	}else{
		/* increase*/
		windAdjust = (Math.floor((Math.random() * 3)+1));
		if((currentWindSpeed+windAdjust) <= windspeedHigh){
			currentWindSpeed+=windAdjust;
		}
		windChangeCounter--;
		if(windChangeCounter == 0){
			windChangeCounter = (Math.floor((Math.random() * 3)+2));
			windChangeDirection = 0;
		}		
	}

	currentSinglePower = singlePowerOutput[currentWindSpeed];
	totalPowerOutput = currentSinglePower * currentNumTurbines;
	updateData();
}

/* -------------------------------------------------------------------- */
/* ------------------ Calculate the power requirements ---------------- */
/* -------------------------------------------------------------------- */

function calcPowerRequirements()
{
	var powerAdjust;
	var powerAdjustMultiplier = ((Math.floor((Math.random() * 3)+5))*100);
	var powerDirectionAmount = (Math.floor((Math.random() * 3)+6));
	
	if(powerChangeDirection == 0){
		/* decrease */
		powerAdjust = ((Math.floor((Math.random() * 3)-3))*powerAdjustMultiplier);
		if((currentPowerReqs+powerAdjust) >= powerRequirementsLow){
			currentPowerReqs+=powerAdjust;
		}
		powerChangeCounter--;
		if(powerChangeCounter==0){
			powerDirectionAmount = (Math.floor((Math.random() * 3)+3));
			powerChangeCounter = (Math.floor((Math.random() * 3)+powerDirectionAmount));
			powerChangeDirection = 1;
		}
	}else{
		/* increase */
		powerAdjust = ((Math.floor((Math.random() * 3)+1))*powerAdjustMultiplier);

		if((currentPowerReqs+powerAdjust) <= powerRequirementsHigh){
			currentPowerReqs+=powerAdjust;
		}
		powerChangeCounter--;
		if(powerChangeCounter==0){
			powerDirectionAmount = (Math.floor((Math.random() * 3)+3));
			powerChangeCounter = (Math.floor((Math.random() * 3)+powerDirectionAmount));
			powerChangeDirection = 0;
		}
	}
}

/* -------------------------------------------------------------------- */
/* --------------------- Calculate the output power ------------------- */
/* -------------------------------------------------------------------- */
function calcPowerOutput(){
	currentSinglePower = singlePowerOutput[currentWindSpeed];
	totalPowerOutput = currentSinglePower * currentNumTurbines;
}

/* -------------------------------------------------------------------- */
/* --------------------- Calculate the power diff --------------------- */
/* -------------------------------------------------------------------- */
function calcPowerDiff()
{
	calcPowerOutput();
	var localPowerDiff = totalPowerOutput - currentPowerReqs;
	if(localPowerDiff < 0)
	{
		powerDiff = "Under Power";
		simData[0]++;
		simDataHour[0]++;
		document.getElementById("powersignal").src = "images/nFlag1.png";
	}else if((totalPowerOutput - currentPowerReqs) > currentSinglePower)
	{
		powerDiff = "Over Power";
		simData[2]++;
		simDataHour[2]++;
		document.getElementById("powersignal").src = "images/nFlag3.png";
	}else{
		powerDiff = "Correct Power";
		simData[1]++;
		simDataHour[1]++;
		document.getElementById("powersignal").src = "images/nFlag2.png";
	}	
	document.getElementById("pStatus").innerHTML=powerDiff;

}

/* -------------------------------------------------------------------- */
/* ------------------ Set static and animated images ------------------ */
/* -------------------------------------------------------------------- */
function setStaticImage(){
	var imageIndex = currentNumTurbines - 1;
	document.getElementById("turbineimg").src = imageStaticArray[imageIndex].src;
}
function setAnimatedImage(){
	var imageIndex = currentNumTurbines - 1;
	document.getElementById("turbineimg").src = imageAnimatedArray[imageIndex].src;
}

/* -------------------------------------------------------------------- */
/* --------------- Calculate time and update chart data --------------- */
/* -------------------------------------------------------------------- */
function updateTime()
{
	tMins++;
	if(tMins>=60){
		tMins = 0;
		tHours++;
		powerReqsArray[reportIndex] = currentPowerReqs * 0.008;
		powerOutArray[reportIndex] = totalPowerOutput  * 0.008;
		reportIndex++;
		simDataHour = [1,1,1];
	}	
	updateData();
}

/* -------------------------------------------------------------------- */
/* ---------------------- Charting Functions -------------------------- */
/* -------------------------------------------------------------------- */
function swapReportChart(){
	if(whichChart==0){
		whichChart = 1;
	}else{
		whichChart = 0;
	}
	showReportChart();
}

function swapPieChart(){
	if(whichPie==0){
		whichPie = 1;
	}else{
		whichPie = 0;
	}
	showReportChart();

}

function showReportChart(){
	if(whichChart == 0){
		drawPieChart();	
		$( "input[id=pieselect]" ).show();
		$( "input[id=swapchart]" ).val("Show power output report");

		if(whichPie==0){
			$( "input[id=pieselect]" ).val("Show values for current hour");
		}else{
			$( "input[id=pieselect]" ).val("Show values for simulation");
		}

	}else{
		CanvasMaster1.showCanvas();
		$( "input[id=pieselect]" ).hide();
		$( "input[id=swapchart]" ).val("Show power pie chart(s)");
	}
}

/* -------------------------------------------------------------------- */
/* ------------------------- Main Loop -------------------------------- */
/* -------------------------------------------------------------------- */
function update()
{
	if(simulationRunning==2)
	{
		simStatusText = "Running"
		updateData();
		timerID = setTimeout(update, userSpeed);
		loopCounter++
		if(loopCounter%10 == 0)
		{
			seconds++;
			if(seconds%2 == 0) {updateTime();}
			/*
			if(seconds%5 == 0) {calcWindPower();}
			if(seconds%30 == 0) {calcPowerRequirements();}
			*/
			if(seconds%10 == 0) {calcWindPower();}
			if(seconds%30 == 0) {calcPowerRequirements();}
		}

		calcPowerDiff();
		if(seconds>=1800)
		{
			simulationRunning = 0;
			simStatusText = "Finished";
			setStaticImage();
		}
	}
}

/* -------------------------------------------------------------------- */
/* ---------------------- Start the simulation ------------------------ */
/* -------------------------------------------------------------------- */
function timeStart()
{
	if(simulationStatus == 0)
	{
		resetSimulation();
		getValues();
		simulationStatus = 1;
	}
	
	if(timerID) return;
	simulationRunning = 2;
	
	update();
	setAnimatedImage();
}

/* -------------------------------------------------------------------- */
/* ----------------------- Pause the simulation ----------------------- */
/* -------------------------------------------------------------------- */
function timeStop()
{
	if(simulationRunning == 2){
		clearTimeout(timerID);
		timerID = null;
		simulationRunning = 1;
		simStatusText = "Paused"
		updateData();
		setStaticImage();
	}
}

/* -------------------------------------------------------------------- */
/* ----------------------- Reset the simulation ----------------------- */
/* -------------------------------------------------------------------- */
function resetSimulation(){
		
	timerID = null;
	seconds = 0;
	loopCounter = 0;
	
	windspeedLow = 4;
	windspeedHigh = 16;
	currentWindSpeed = 10;
	windChangeDirection = 0;
	windChangeCounter = 2;
	
	numTurbinesLow = 1;
	numTurbinesHigh = 10;
	currentNumTurbines;
	
	powerRequirementsLow = 1000;
	powerRequirementsHigh = 24000;
	currentPowerReqs = 1000;
	currentSinglePower = 0;
	powerChangeDirection = 0;
	powerChangeCounter = 2;
	
	powerReqCtr = 0;
	totalPowerOutput = 0;

	powerDiff = "Correct power";
	tMins = 0;
	tHours = 6;
	simulationRunning = 0;
	simulationStatus = 0;
	simStatusText = "Reset";

	userSpeed = 100;
	userSpeedTxt = "";
	txtWind = "";
	
	powerReqsArray = [];
	powerOutArray = [];
	reportIndex = 0;
	whichChart = 0;
	simData = [1,1,1]
	simDataHour = [1,1,1];
	whichPie = 0;
	
	getValues();
	setStaticImage();
}
