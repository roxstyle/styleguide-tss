/********LIST FUNCTIONALITY ON MY LISTS PAGES******************/
function loadLists(listType, target) {
    ShowProgress(null);
    $.ajax({
        async: false,
        dataType: "html",
        type: "GET",
        url: "/ControlRequestServer/ControlRequestServer.aspx?control_name=Common/Lists.ascx&list_type=" + listType,
        success: function(data) {
            $("#" + target).html(data);
            HideProgress(null);
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            alert(xmlHttpRequest.Message);
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
}
function loadListTemplate(templateAndTableName, listId) {
    ShowProgress(null);
    var splitFilter = templateAndTableName.split(",");
    var template = splitFilter[0];
    var tableName = splitFilter[1];
    var templateType = splitFilter[2];
    // only used for Participant/DAWTemplate and Organization/RecentTemplate
    var templateURL;
    if (templateType == undefined)
    {
        templateURL = "/ControlRequestServer/ControlRequestServer.aspx?control_name=" + template + "&list_id=" + listId;
    }
    else
    {
        templateURL = "/ControlRequestServer/ControlRequestServer.aspx?control_name=" + template + "&list_id=" + listId + "&template_type=" + templateType;
    }
    $.ajax({
        async: false,
        dataType: "html",
        type: "GET",
        url: templateURL,
        success: function(data) {
            $("#templateTarget").html(data);
            applyCellWidths(tableName);
            uniTbl();
            HideProgress(null);
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            alert(xmlHttpRequest.Message);
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
}
function loadListEdit(control, target, listId, listType, recordId) {
    if (EditListForm == true) {
        ShowProgress(null);
        $.ajax({
            async: false,
            dataType: "html",
            type: "GET",
            url: "/ControlRequestServer/ControlRequestServerForm.aspx?control_name=" + control + "&list_id=" + listId + "&list_type=" + listType + "&record_id=" + recordId,
            success: function(data) {
                $("#" + target).after(data);
                $(".itemeditor").show();
                HideProgress(null);
            },
            error: function(xmlHttpRequest, status, errorThrown) {
                alert(xmlHttpRequest.Message);
                redirectOnTimeout(xmlHttpRequest.responseText);
            }
        });
    }
    // reset session timer
    resetTimer();
    EditListForm = false;
}
function newListEdit() {}
function saveListEdit(listId, listType) {
    var title = $("#ctl00_txtListTitle").val();
    var description = $("#ctl00_txtListDescription").val();
    title = stripHTML(title);
    description = stripHTML(description);
    var l = new newListEdit();
    l.Id = listId;
    l.Name = title;
    l.Description = description;
    var stringified = JSON.stringify({
        "listInfo": l
    });
    $.ajax({
        type: "POST",
        async: false,
        url: "../Service/CommonService.asmx/UpdateRecordList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: stringified,
        success: function(data, status) {
            saveListHandler(listType);
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            savedId = 0;
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
    AutoSubmitOnEnter = true;
}
function saveListHandler(listType) {
    closeEditList();
    if (listType == "person") {
        $("#tabPeople").html("");
        loadLists('person', 'tabPeople');
    }
    if (listType == "project") {
        $("#tabProjects").html("");
        loadLists('project', 'tabProjects');
    }
    if (listType == "company") {
        $("#tabCompany").html("");
        loadLists('company', 'tabCompany');
    }
    if (listType == "custom") {
        $("#tabCustom").html("");
        loadLists('custom', 'tabCustom');
    }
}
function newDeleteList() {}
function deleteList(listId) {
    if (confirm("Are you sure you want to delete Item?")) {
        var l = new newDeleteList();
        l.Id = listId;
        var stringified = JSON.stringify({
            "listInfo": l
        });
        $.ajax({
            type: "POST",
            async: false,
            url: "../Service/CommonService.asmx/DeleteRecordList",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: stringified,
            success: function(data, status) {
                $("#li_" + listId).remove();
            },
            error: function(xmlHttpRequest, status, errorThrown) {
                savedId = 0;
                redirectOnTimeout(xmlHttpRequest.responseText);
            }
        });
    }
    // reset session timer
    resetTimer();
}
function newListItemEdit() {}
function saveListItemEdit(listId, recordId) {
    var nextstepId = $("#ctl00_ddlNextSteps").val();
    var nextstepText = $("#ctl00_ddlNextSteps option:selected").text();
    var comment = $("#ctl00_txtListItemComment").val();
    comment = stripHTML(comment);
    var l = new newListItemEdit();
    l.ListId = listId;
    l.RecordId = recordId;
    l.NextStepTypeId = nextstepId;
    l.Comment = comment;
    var stringified = JSON.stringify({
        "listItem": l
    });
    $.ajax({
        type: "POST",
        async: false,
        url: "../Service/CommonService.asmx/UpdateRecordListItem",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: stringified,
        success: function(data, status) {
            closeEditList();
            $("#s_" + recordId).html("<span>Next Step:</span>" + nextstepText);
            $("#p_" + recordId).html("<span>Comment:</span>" + comment);
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            savedId = 0;
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
    AutoSubmitOnEnter = false;
}
function newListItemDelete() {}
function deleteListItem(listId, recordId) {
    if (confirm("Are you sure you want to delete Item?")) {
        var l = new newListItemDelete();
        l.ListId = listId;
        l.RecordId = recordId;
        var stringified = JSON.stringify({
            "listItem": l
        });
        $.ajax({
            type: "POST",
            async: false,
            url: "../Service/CommonService.asmx/DeleteRecordListItem",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: stringified,
            success: function(data, status) {
                $("#li_" + recordId).remove();
                updateListCount();
            },
            error: function(xmlHttpRequest, status, errorThrown) {
                savedId = 0;
                redirectOnTimeout(xmlHttpRequest.responseText);
            }
        });
    }
    // reset session timer
    resetTimer();
}
function updateListCount() {
    var stringified = JSON.stringify({
        "itemType": listType,
        "productId": 6
    });
    var lists;
    $.ajax({
        type: "POST",
        async: false,
        url: "/Service/CommonService.asmx/GetRecordLists",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: stringified,
        success: function(data, status) {
            var i = 0;
            for (i = 0; i < data.d.length; i++) {
                $('#listCount_' + data.d[i].Id).html('(' + data.d[i].NoOfItems + ')');
            }
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            alert(SERVER_ERROR_MESSAGE);
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
}
function closeEditList()
 {
    //$(".itemeditor").remove();
    $("#crsform").remove();
    AddToListForm = true;
    EditListForm = true;
    UpdateRecordForm = true;
    EmailForm = true;
    $("#divHeaderTools li").removeClass("state-active");
    $("#divHeaderTools li").removeClass("state-hover");
}
/********LIST FUNCTIONALITY ON SEARCH RESULTS******************/
var _personIds = "";
var _projectIds = "";
var _companyIds = "";
function populateCheckBoxes(target, status, checkboxId) {
    if (target.id == "cbPerson") {
        if ($(target).is(":checked")) {
            $("#ulPerson input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
        else {
            $("#ulPerson input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
    }
    if (target.id == "cbProject") {
        if ($(target).is(":checked")) {
            $("#ulProject input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
        else {
            $("#ulProject input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
    }
    if (target.id == "cbCompany") {
        if ($(target).is(":checked")) {
            $("#ulCompany input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
        else {
            $("#ulCompany input[type=checkbox]").each(function() {
                $(this).attr("checked", status);
                $(this).attr("disabled", status);
            });
        }
    }
}
function setCheckedValues(type, typeId) {
    _personIds = "";
    _projectIds = "";
    _companyIds = "";
    // check if all people checked
    if (type == "person") {
        if ($("#cbPerson").is(":checked")) {
            $("#ulPerson input[type=checkbox]:checked:disabled").each(function() {
                _personIds = _personIds + "," + $(this).val();
            });
        }
        //individually checked people
        $("#ulPerson input[type=checkbox]:checked:enabled").each(function() {
            _personIds = _personIds + "," + $(this).val();
        });
        validateCheckBoxes(formatCommaSeparatedValues(_personIds), typeId, type);
    }
    // check if all project checked
    if (type == "project") {
        if ($("#cbProject").is(":checked")) {
            $("#ulProject input[type=checkbox]:checked:disabled").each(function() {
                _projectIds = _projectIds + "," + $(this).val();
            });
        }
        //individually checked projects
        $("#ulProject input[type=checkbox]:checked:enabled").each(function() {
            _projectIds = _projectIds + "," + $(this).val();
        });
        validateCheckBoxes(formatCommaSeparatedValues(_projectIds), typeId, type);
    }
    // check if all company checked
    if (type == "company") {
        if ($("#cbCompany").is(":checked")) {
            $("#ulCompany input[type=checkbox]:checked:disabled").each(function() {
                _companyIds = _companyIds + "," + $(this).val();
            });
        }
        //individually checked projects
        $("#ulCompany input[type=checkbox]:checked:enabled").each(function() {
            _companyIds = _companyIds + "," + $(this).val();
        });
        validateCheckBoxes(formatCommaSeparatedValues(_companyIds), typeId, type);
    }
}
function validateCheckBoxes(recordIds, recordGroupTypeId, recordType) {
    if (recordIds == "" || recordIds == null) {
        alert("You must select items to add to your " + recordType + " list");
    }
    else {
        addItemsCreateList(recordIds, recordGroupTypeId, recordType);
    }
}
function addItemsCreateList(recordIds, recordGroupTypeId, recordType) {
    var listId = $("#ddlSelectList_" + recordType).val();
    var listName = $("#txtNewListName_" + recordType).val();
    if ((listId == "0" || listId == "new") && (listName == "Create New List" || listName == "" || listName == null)) {
        alert("Please create a name for your list or choose from an existing list");
        return false;
    }
    if (listId == "new") {
        listId = parseFloat(0);
    }
    var stringified = JSON.stringify({
        "recordIds": formatCommaSeparatedValues(recordIds),
        "recordGroupTypeId": recordGroupTypeId,
        "listId": parseFloat(listId),
        "listName": listName,
        "description": "",
        "comment": "",
        "listToolTypeId": 0
    });
    $.ajax({
        type: "POST",
        async: false,
        url: "../Service/CommonService.asmx/AddRecordListItems",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: stringified,
        success: function(data, status) {
            alert("Your Items have been successfully added");
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            savedId = 0;
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
}
function selectExistingList(listId, textboxId) {
    var splitFilter = textboxId.split("_");
    var txtBox = splitFilter[0];
    if (listId == "0" || listId == null) {
        $("#txtNewListName_" + txtBox).val("Create New List");
    }
    else {
        $("#txtNewListName_" + txtBox).val("");
    }
}
/********LIST FUNCTIONALITY ON RECORD PAGES******************/
function loadHeaderTool(formName, recordGroupTypeId, recordId) {
    if (AddToListForm == true || UpdateRecordForm == true || EmailForm == true) {
        ShowProgress(null);
        $.ajax({
            async: false,
            dataType: "html",
            type: "GET",
            url: "/ControlRequestServer/ControlRequestServerForm.aspx?control_name=" + formName + "&record_group_type_id=" + recordGroupTypeId + "&record_id=" + recordId,
            success: function(data) {
                $("#divHeaderTools").after(data);
                $(".atl").show();
                $(".eaf").show();
                $(".ucc").show();
                HideProgress(null);
            },
            error: function(xmlHttpRequest, status, errorThrown) {
                alert(xmlHttpRequest.Message);
                redirectOnTimeout(xmlHttpRequest.responseText);
            }
        });
    }
    // reset session timer
    resetTimer();
    AddToListForm = false;
    UpdateRecordForm = false;
    EmailForm = false;
}
function newAddRecordToList() {}
function addRecordToList(recordGroupTypeId) {
    var listId = $("#ddlExistingList").val();
    var comment = $("#txtExistingComment").val();
    var listName = $("#txtNewListName").val();
    var listDescription = $("#txtNewListDescription").val();
    listName = stripHTML(listName);
    comment = stripHTML(comment);
    listDescription = stripHTML(listDescription);
    var stringified;
    if ((listId == "new" || listId == "0") && (listName == "" || listName == null)) {
        alert("Please create a name for your list or choose from an existing list");
        return false;
    }
    if (listId == "new") {
        listId = parseFloat(0);
    }
    stringified = JSON.stringify({
        "recordIds": tmpRecordId,
        "recordGroupTypeId": recordGroupTypeId,
        "listId": parseFloat(listId),
        "listName": listName,
        "description": listDescription,
        "comment": comment,
        "listToolTypeId": 0
    });
    $.ajax({
        type: "POST",
        async: false,
        url: "../Service/CommonService.asmx/AddRecordListItems",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: stringified,
        success: function(data, status) {
            alert("Your Item has been successfully added");
            closeEditList();
        },
        error: function(xmlHttpRequest, status, errorThrown) {
            alert("A list with this name already exists");
            redirectOnTimeout(xmlHttpRequest.responseText);
        }
    });
    // reset session timer
    resetTimer();
}
function showAddList(newvalue) {
    if (newvalue == "new") {
        $("#pNewListName").show();
        $("#pNewListDescription").show();
    }
    else {
        $("#pNewListName").hide();
        $("#pNewListDescription").hide();
        $("#txtNewListName").val("");
        $("#txtNewListDescription").val("");
    }
}
