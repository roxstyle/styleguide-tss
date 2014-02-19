$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($(window).width() < 767) && !switched ){
      switched = true;
      $("table.display").each(function(i, element) {
        hideCol($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.display").each(function(i, element) {
        showCol($(element));
      });
    }
  };

  $(window).load(updateTables);
  $(window).bind("resize", updateTables);

	function hideCol(original) {
    $("table.display thead th:nth-child(2)").nextAll("th").hide();
    $("table.display tbody td:nth-child(2)").nextAll("td").hide();
    $("table.display").addClass("tbl-2");
	}

	function showCol(original) {
    $("table.display thead th:nth-child(2)").nextAll("th").show();
    $("table.display tbody td:nth-child(2)").nextAll("td").show();
    $("table.display").removeClass("tbl-2");
	}

});