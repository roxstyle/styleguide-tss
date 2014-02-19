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
				filmRenderContainer: '',
				companyListGenres: '',
				companyListValues: '',
				companyRenderContainer: '',
				isAjax: false
			}
		};

		var chartsReady = false;
		var drawItem0 = null;
		var drawItem1 = null;
		var drawItem2 = null;
		var drawed0 = false;
		var drawed1 = false;
		var drawed2 = false;
		var stateSliderWidthFilm = 0;
		var stateSliderWidthcompany = 0;

		function initResize() {
			$(window).unbind('resize', drawFunctions).bind('resize', resizeDrawFunctions);
		}

		function resizeDrawFunctions() {
			$(this).find(".state-industry-slider").cycle('pause');
			drawFunctions();
			$(this).find(".state-industry-slider").cycle('resume');

		}

		function drawFunctions() {



			if (initSettings.data.tvListGenres.length > 1) {
				drawed0 = false;
				if ($("#home-tabs-state-tv").css("opacity") == "1" && drawed0 == false) {
					tvDrawVisualizationChart();
					drawed0 = true;
				}
			}
			if (initSettings.data.filmListGenres.length > 1) {
				drawed1 = false;
				if ($("#home-tabs-state-film").css("opacity") == "1" && drawed1 == false) {
					filmDrawVisualizationChart();
					drawed1 = true;
				}
			}
			if (initSettings.data.companyListGenres.length > 1) {
				drawed2 = false;
				if ($("#home-tabs-state-company").css("opacity") == "1" && drawed2 == false) {
					companyDrawVisualizationChart();
					drawed2 = true;
				}
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

			$("#state-of-industry").bind("mouseenter", function () {
				if (chartsReady == true) {
					$(this).find(".state-industry-slider").cycle('pause');
				}
			}).bind("mouseleave", function () {
				if (chartsReady == true) {
					$(this).find(".state-industry-slider").cycle('resume');
				}
			});

			$('.state-industry-slider').on('cycle-after', function (event, opts) {
				if ($("#home-tabs-state-tv").css("opacity") == "1" && drawed0 == false) {
					tvDrawVisualizationChart();
					drawed0 = true;
				}
				if ($("#home-tabs-state-film").css("opacity") == "1" && (drawed1 == false || stateSliderWidthFilm <= 50)) {
					filmDrawVisualizationChart();
					drawed1 = true;
				}
				if ($("#home-tabs-state-company").css("opacity") == "1" && (drawed2 == false || stateSliderWidthcompany <= 50)) {
					companyDrawVisualizationChart();
					drawed2 = true;
				}

			});

		}

		function init(parameters) {
			if (google.hasOwnProperty("visualization")) {
				initSettings.data.tvListGenres = "";
				initSettings.data.tvListValues = "";
				initSettings.data.filmListGenres = "";
				initSettings.data.filmListValues = "";
				initSettings.data.companyListGenres = "";
				initSettings.data.companyListValues = "";
			}
			$.extend(true, initSettings, parameters);
			if (!google.hasOwnProperty("visualization")) {
				google.load('visualization', '1', { 'packages': ['geochart', 'corechart'] });
				if (initSettings.data.tvListGenres.length > 1) {
					google.setOnLoadCallback(tvDrawVisualizationChart);
					drawed0 = false;
				} else {
					$("#" + initSettings.data.tvRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.filmListGenres.length > 1) {
					//google.setOnLoadCallback(filmDrawVisualizationChart);
					drawed1 = false;
					chartsReady = false;
				} else {
					$("#" + initSettings.data.filmRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.companyListGenres.length > 1) {
					//google.setOnLoadCallback(filmDrawVisualizationChart);
					drawed2 = false;
					chartsReady = false;
				} else {
					$("#" + initSettings.data.companyRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
			} else {
				if (initSettings.data.tvListGenres.length > 1) {
					tvDrawVisualizationChart();
					drawed0 = false;
				} else {
					$("#" + initSettings.data.tvRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.filmListGenres.length > 1) {
					//filmDrawVisualizationChart();
					drawed1 = false;
				} else {
					$("#" + initSettings.data.filmRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
				if (initSettings.data.companyListGenres.length > 1) {
					//filmDrawVisualizationChart();
					drawed2 = false;
				} else {
					$("#" + initSettings.data.companyRenderContainer).html('<div style="color: #fff;font-size: 70px;vertical-align: middle;height: 100%;margin: 0 auto;text-align: center;padding-top: 60px;">No data available</div>');
				}
			}

		}

		function escapeHtml(text) {
			if (text == null)
				return '';
			return text.replace('&amp;', '&').replace('&#39;', "'").replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>');
		}

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
				var maxNumberY = 0;
				if (maxNumber < 5) {
					countLines = maxNumber + 1;
					maxNumberY = maxNumber;
				} else {
					countLines = 6;
					maxNumberY = maxNumber + (5 - maxNumber % 5) % 5;

				}

				var data = google.visualization.arrayToDataTable([
				initSettings.data.tvListGenres,
				initSettings.data.tvListValues
				]);

				var stateSliderWidth = $('#chart-state-tv-container').width();
				var options = {
					backgroundColor: "#0f1f2a",
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
						left: 40
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
						maxValue: maxNumberY,
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
				if (!drawItem0 || initSettings.data.isAjax) {
					drawItem0 = new google.visualization.ColumnChart(document.getElementById(initSettings.data.tvRenderContainer));
				}
				if (!!drawItem0) {
					drawItem0.draw(data, options);
				}
				if (initSettings.data.filmListGenres.length <= 1) {
					chartsReady = true;
				} else {
					if (drawed1) {
						chartsReady = true;
					}
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
				var maxNumberY = 0;
				if (maxNumber < 5) {
					countLines = maxNumber + 1;
					maxNumberY = maxNumber;
				} else {
					countLines = 6;
					maxNumberY = maxNumber + (5 - maxNumber % 5) % 5;

				}

				var data = google.visualization.arrayToDataTable([
					initSettings.data.filmListGenres,
					initSettings.data.filmListValues
				]);

				stateSliderWidthFilm = $('div#chart-state-film-container').width();
				var options = {
					backgroundColor: "#0f1f2a",
					width: stateSliderWidthFilm,
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
						left: 40
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
						maxValue: maxNumberY,
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
				if (!drawItem1) {
					drawItem1 = new google.visualization.ColumnChart(document.getElementById(initSettings.data.filmRenderContainer)).draw(data, options);
				}
				if (!!drawItem1) {
					drawItem1.draw(data, options);
				}
				if (drawed0) {
					chartsReady = true;
				}
			}
		}
		
		function companyDrawVisualizationChart() {
			if (typeof (google.visualization) != 'undefined' &&
				typeof (google.visualization.arrayToDataTable) != 'undefined') {

				var maxNumber = 0;

				for (var i = 0; i < initSettings.data.companyListValues.length; i++) {
					if (initSettings.data.companyListValues[i] > maxNumber) {
						maxNumber = initSettings.data.companyListValues[i];
					}
					initSettings.data.companyListGenres[i] = escapeHtml(initSettings.data.companyListGenres[i]);
				}

				var countLines = 1;
				var maxNumberY = 0;
				if (maxNumber < 5) {
					countLines = maxNumber + 1;
					maxNumberY = maxNumber;
				} else {
					countLines = 6;
					maxNumberY = maxNumber + (5 - maxNumber % 5) % 5;

				}

				var data = google.visualization.arrayToDataTable([
					initSettings.data.companyListGenres,
					initSettings.data.companyListValues
				]);

				stateSliderWidthcompany = $('div#chart-state-company-container').width();
				var options = {
					backgroundColor: "#0f1f2a",
					width: stateSliderWidthcompany,
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
						left: 40
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
						maxValue: maxNumberY,
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
				if (!drawItem2) {
					drawItem2 = new google.visualization.ColumnChart(document.getElementById(initSettings.data.companyRenderContainer)).draw(data, options);
				}
				if (!!drawItem2) {
					drawItem2.draw(data, options);
				}
				if (drawed0) {
					chartsReady = true;
				}
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