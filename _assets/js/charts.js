var TssToolsChart = function () {
	var tssChart = function () {
		var initSettings =
		{
			data: {
				tvListGenres: '',
				tvListValues: '',
				tvRenderContainer: '',
				filmListGenres: '',
				filmListValues: '',
				filmRenderContainer: ''
			}
		};


		function initResize() {
			$(window).unbind('resize', drawFunctions).bind('resize', drawFunctions);
		}

		function drawFunctions() {
			if (initSettings.data.tvListGenres.length > 1) {
				tvDrawVisualizationChart();
			}
			if (initSettings.data.filmListGenres.length > 1) {
				filmDrawVisualizationChart();
			}
		}


		function initslider() {
			$('.state-industry-slider').cycle({
				fx: 'fade',
				timeout: 5000,
				speed: 300,
				next: '.nav-arrow-next a',
				prev: '.nav-arrow-prev a',
			});
			
			$(function () {
				$('ul.nf-slider').cycle({
					fx: 'fade',
					timeout: 5000,
					speed: 300,
					next: 'div.nf-arrow-next a',
					prev: 'div.nf-arrow-prev a'
				});
			});
			
			//setTimeout(function () { $(".notice").fadeOut(); }, 5000);
			//$('.state-industry-slider').cycle('next');
			
			$("#state-of-industry").bind("mouseenter", function () {
					if (chartsReady == true) {
						$(this).find(".state-industry-slider").cycle('pause');
					}
			}).bind("mouseleave", function () {
				if (chartsReady == true) {
					$(this).find(".state-industry-slider").cycle('resume');
				}
			});
			
		}

		function init(parameters) {

			//$(window).resize( function () {
			//	tvDrawVisualizationChart();
			//	if (initSettings.data.filmRenderContainer != '#') {
			//		filmDrawVisualizationChart();
			//	}
			//});
			//initResize();
			//$("#chartNavigationBar a").click(showSelectedChart);

			if (google.hasOwnProperty("visualization")) {
				initSettings.data.tvListGenres = "";
				initSettings.data.tvListValues= "";
				initSettings.data.filmListGenres = "";
				initSettings.data.filmListValues = "";
			}
			$.extend(true, initSettings, parameters);
			if (!google.hasOwnProperty("visualization")) {
				google.load('visualization', '1', { 'packages': ['geochart', 'corechart'] });
				if (initSettings.data.tvListGenres.length > 1) {
					google.setOnLoadCallback(tvDrawVisualizationChart);
				} else {
					$("#" + initSettings.data.tvRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.filmListGenres.length > 1) {
					google.setOnLoadCallback(filmDrawVisualizationChart);
				} else {
					$("#" + initSettings.data.filmRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
			} else {
				if (initSettings.data.tvListGenres.length > 1) {
					tvDrawVisualizationChart();
				} else {
					$("#" + initSettings.data.tvRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.filmListGenres.length > 1) {
					filmDrawVisualizationChart();
				} else {
					$("#" + initSettings.data.filmRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
			}
			
		}

		function showSelectedChart() {
			$(this).parent().closest("ul").find("a").each(function () {
				$(this).removeClass("active");
			});

			$("#chartsContent li").each(function () {
				$(this).removeClass("active");
			});
			$($(this).data("open")).addClass("active");
			$(this).addClass("active");
		}
		
		function escapeHtml(text) {
			if (text == null)
				return '';
			return text.replace('&amp;', '&').replace('&#39;', "'").replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>');
		}

		var chartsReady = false;
		function tvDrawVisualizationChart() {
			if (typeof (google.visualization) != 'undefined' &&
				typeof (google.visualization.arrayToDataTable) != 'undefined') {
				
				
				var maxNumber = 0;
				
				for (var i = 0; i < initSettings.data.tvListValues.length; i++) {
					if (initSettings.data.tvListValues[i] > maxNumber) {
						maxNumber = initSettings.data.tvListValues[i];
					}
					initSettings.data.tvListGenres[i] = escapeHtml(initSettings.data.tvListGenres[i]);
				}
				var countLines = 1;
				
				if (maxNumber < 5) {
					countLines = maxNumber + 1;
				} else {
					if ((maxNumber % 2) == 0) {
						countLines = 5;
					} else {
						countLines = 6;
					}
				}

				if (maxNumber > 4) {
					
				}


				var data = google.visualization.arrayToDataTable([
				initSettings.data.tvListGenres,
				initSettings.data.tvListValues
				]);
			
				var stateSliderWidth = $('.state-industry-slider .chart-graph').width();
				var options = {
					backgroundColor: "transparent",
					width: stateSliderWidth,
					height: 220,
					fontSize: 12,
					areaOpacity: 0,
					bar: {
						groupWidth: "95%"
					},
					chartArea: {
						width: "95%",
						height: 150,
						top: 30,
						right: 30,
						bottom: 30,
						left: 30
					},
					legend: {
						position: "none",
						alignment: "start"
					},
					hAxis: {
						textPosition: "none",
						viewWindowMode: "pretty",
						format: "#",
						minValue: 1,
					
						textStyle: {
							color: "#fff"
						}
					},
					vAxis: {
						textPosition: "out",
						baselineColor: "#7E8C96",
						minValue: 0,
						format: "#",

						gridlines: {
							color: "#353A42",
							count: countLines
						},
						
						textStyle: {
							color: "#fff"
						}
					},
					tooltip: {
						showColorCode: true,
						textStyle: {
							fontSize: 15
						},
						
					},
				};
				
				
				new google.visualization.ColumnChart(document.getElementById(initSettings.data.tvRenderContainer)).draw(data, options);
				if (initSettings.data.filmListGenres.length <= 1) {
					chartsReady = true;
				}
			}
		}

		function filmDrawVisualizationChart() {
			if (typeof (google.visualization) != 'undefined' &&
				typeof (google.visualization.arrayToDataTable) != 'undefined') {

				var maxNumber = 0;

				for (var i = 0; i < initSettings.data.filmListValues.length; i++) {
					if (initSettings.data.filmListValues[i] > maxNumber) {
						maxNumber = initSettings.data.filmListValues[i];
					}
					initSettings.data.filmListGenres[i] = escapeHtml(initSettings.data.filmListGenres[i]);
				}

				var countLines = 1;

				if (maxNumber < 5) {
					countLines = maxNumber + 1;
				} else {
					if ((maxNumber % 2) == 0) {
						countLines = 5;
					} else {
						countLines = 6;
					}
				}

				if (maxNumber > 4) {

				}

				var data = google.visualization.arrayToDataTable([
					initSettings.data.filmListGenres,
					initSettings.data.filmListValues
				]);

				var stateSliderWidth = $('.state-industry-slider .chart-graph').width();
				var options = {
					backgroundColor: "transparent",
					width: stateSliderWidth,
					height: 220,
					fontSize: 12,
					areaOpacity: 0,
					bar: {
						groupWidth: "95%"
					},
					chartArea: {
						width: "95%",
						height: 150,
						top: 30,
						right: 30,
						bottom: 30,
						left: 30
					},
					legend: {
						position: "none",
						alignment: "start"
					},
					hAxis: {
						textPosition: "none",
						viewWindowMode: "pretty",
						minValue: 1,
						
						
						textStyle: {
							color: "#fff"
						}
					},
					vAxis: {
						textPosition: "out",
						baselineColor: "#7E8C96",
						minValue: 0,
						format: "#",
						
						gridlines: {
							color: "#353A42",
							count: countLines
						},
						textStyle: {
							color: "#fff"
						}
					},
					tooltip: {
						showColorCode: true,
						textStyle: {
							fontSize: 15
						},

					}
				};

				

				new google.visualization.ColumnChart(document.getElementById(initSettings.data.filmRenderContainer)).draw(data, options);
				chartsReady = true;
			}
		}

		return {
			init: init,
			initResize: initResize,
			initslider: initslider

		};
	}();
	return {
		tssChart: tssChart
	};
}();





//$(window).bind('resize', function () {
//	drawVisualizationNewFilmProjects();
//	drawVisualizationNewTVProjects();
//});
//google.setOnLoadCallback(drawVisualizationNewTVProjects);

//function drawVisualizationNewFilmProjects() {
//  var data = google.visualization.arrayToDataTable([
//	['Genre', 'Adaptation', 'Drama', 'Thriller', 'Action', 'Comedy', 'Animated', 'Biopic', 'Sequel', 'Crime', 'Historical'],
//    ['Number of Films by Genre',   24, 13, 9, 9, 8, 5, 5, 5, 5, 5]
//  ]);
//	var options = {
//		backgroundColor: "transparent",
//		width:"100%",
//		height:220,
//		areaOpacity: 0,
//		bar: {
//			groupWidth:"95%"
//		},
//		chartArea: {
// 			top:30,
//			left:20,
//			width: "100%",
//			height: 150
//		},
//		legend:{
//			position:"none",
//			alignment:"start"
//		},
//		hAxis: {
//			textPosition:"none",
//			viewWindowMode: "pretty"
//		},
//		vAxis: {
//			textPosition:"out",
//			baselineColor: "#aaa",
//			gridlines:{
//				color: "#d3d3d3"
//			}
//		},
//		tooltip: {
//			showColorCode: true
//		}
//	}
//	new google.visualization.ColumnChart(document.getElementById('chart-state_film')).draw(data, options);
//	new google.visualization.ColumnChart(document.getElementById('chart-state_company')).draw(data, options);
//	new google.visualization.ColumnChart(document.getElementById('chart-state_people')).draw(data, options);
//	new google.visualization.ColumnChart(document.getElementById('chart-state_performance')).draw(data, options);
//}

//function drawVisualizationNewTVProjects() {
//  var data = google.visualization.arrayToDataTable([
//	['Genre', 'Adaptation', 'Drama', 'Thriller', 'Action', 'Comedy', 'Animated', 'Biopic', 'Sequel', 'Crime', 'Historical'],
//    ['Number of Films by Genre',   22, 11, 8, 8, 7, 5, 4, 3, 2, 1]
//  ]);
//	var options = {
//		backgroundColor: "transparent",
//		width:"100%",
//		height:220,
//		areaOpacity: 0,
//		bar: {
//			groupWidth:"95%"
//		},
//		chartArea: {
// 			top:30,
//			left:20,
//			width: "100%",
//			height: 150
//		},
//		legend:{
//			position:"none",
//			alignment:"start"
//		},
//		hAxis: {
//			textPosition:"none",
//			viewWindowMode: "pretty"
//		},
//		vAxis: {
//			textPosition:"out",
//			baselineColor: "#aaa",
//			gridlines:{
//				color: "#d3d3d3"
//			}
//		},
//		tooltip: {
//			showColorCode: true
//		}
//	}
//	new google.visualization.ColumnChart(document.getElementById('chart-state_tv')).draw(data, options);
//}


