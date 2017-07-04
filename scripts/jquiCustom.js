$(function() {

	/* -- Wind speed -- */
	$( "#sliderWindSpeed" ).slider({
		range: true,
		value:0,
		min: 0,
		max: 20,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val(ui.values[0]+" - "+ui.values[1]);
		}
		});
	$( "#sliderWindSpeed" ).slider('values',0,4);
	$( "#sliderWindSpeed" ).slider('values',1,16);
	$( "#amount" ).val( "" + $( "#sliderWindSpeed" ).slider( "values",0)+ " - " + $( "#sliderWindSpeed" ).slider( "values",1));

	/* -- Number of turbines -- */
	$( "#sliderNumTurbines" ).slider({
		range: true,
		value:0,
		min: 1,
		max: 10,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount1" ).val(ui.values[0]+" - "+ui.values[1]);
		}
		});
	$( "#sliderNumTurbines" ).slider('values',0,1);
	$( "#sliderNumTurbines" ).slider('values',1,10);
	$( "#amount1" ).val( "" + $( "#sliderNumTurbines" ).slider( "values",0)+ " - " + $( "#sliderNumTurbines" ).slider( "values",1));


/* -- Power requirements -- */
	$( "#sliderPowerReqs2" ).slider({
		range: true,
		value:0,
		min: 1000,
		max: 24000,
		step: 200,
		slide: function( event, ui ) {
			$( "#amount3" ).val(ui.values[0]+" - "+ui.values[1]);
		}
		});
	$( "#sliderPowerReqs2" ).slider('values',0,1000);
	$( "#sliderPowerReqs2" ).slider('values',1,24000);
	$( "#amount3" ).val( "" + $( "#sliderPowerReqs2" ).slider( "values",0)+ " - " + $( "#sliderPowerReqs2" ).slider( "values",1));
	

/* Call accordion functionality */
	$( "#accordion" ).accordion(
		{
			activate: function( event, ui)
			{
				if(ui.newHeader){
					if(simulationRunning == 0){getValues();}
				}
			}
	});
	
	/* $( "#accordion" ).accordion({event: 'mouseover'});*/

/* Call speed button selection functionality */
	$( "#radio" ).buttonset();

/* Buttons to control main simulation */
	$( "input[id=simcontrol1]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		timeStart();
	});

	$( "input[id=simcontrol2]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		timeStop();
	});
	

	$( "input[id=simcontrol3]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		resetSimulation();
	});


	$( "input[id=addturbine]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		addTurbine();
	});

	$( "input[id=removeturbine]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		removeTurbine();
	});
	
	$( "input[id=swapchart]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		swapReportChart();
	});
	
	$( "input[id=pieselect]" )
		.button()
		.click(function( event ) {
		event.preventDefault();
		swapPieChart();
	});
	
	$( "#tabs" ).tabs({ event: 'mouseover'});
});


