var find = [];
var findUrl;
var retrieveUrl;
var currResponse = '';
var prevResponse = '';
var gloCount = 0;
window.onload = function () {
    document.getElementById("select").addEventListener("click", function () {
        retrieveExe();
    });
    document.getElementById("search").addEventListener("keyup", function () {
        if (this.value !== "") {
            Capture_Interactive_Find_v1_00Begin(this.value, '');
            document.getElementById("select").className = "form-control";
        }
        if (document.getElementById("infoToggle").className === "btn btn-default" || document.getElementById("fulldump").className === "") {
            document.getElementById("infoToggle").className = "btn btn-default visibliltyToggle";
            document.getElementById("fulldump").className = "visibliltyToggle";
        }
    });
    document.getElementById("infoToggle").addEventListener("click", function () {
        if (document.getElementById("fulldump").className == "visibliltyToggle") {
            document.getElementById("fulldump").className = "";
        } else {
            document.getElementById("fulldump").className = "visibliltyToggle";
        }
    });
};

function Capture_Interactive_Find_v1_00Begin(Text, container) {
    destTab();
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0],
        url = "http://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3.ws?";
    // Build the query string
    url += "&Key=" + document.getElementById("key").value;
    url += "&Text=" + encodeURIComponent(Text);
    url += "&Method=" + document.getElementById("Method").value;
    url += "&Container=" + container;
    url += "&Origin=" + document.getElementById("Origin").value;
    url += "&Filter=" + document.getElementById("Filter").value;
    url += "&Limit=" + document.getElementById("Limit").value;
    url += "&Language=" + document.getElementById("Limit").value;
    url += "&Countries=" + document.getElementById("Countries").value;
    findUrl = url;
    url += "&callback=Capture_Interactive_Find_v1_00End";


    script.src = url;
    // Make the request
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode)
                head.removeChild(script);
        }
    };
    head.insertBefore(script, head.firstChild);
}

function Capture_Interactive_Find_v1_00End(response) {
    destTab();
    find = response.Items;
    // Test for an error
    if (response.Items.length == 1 && typeof (response.Items[0].Error) != "undefined") {
        // Show the error message
        alert(response.Items[0].Description);
    } else {
        // Check if there were any items found
        if (response.Items.length === 0)
            alert("Sorry, there were no results");
        else {
            if (document.getElementById("select").getAttribute("style") == "visibility: hidden;") {
                document.getElementById("select").style = "visibility: visible;";
            }
            //body reference 
            var finddump = document.getElementById("finddump");
            // create elements <table> and a <tbody>
            var tbl = document.createElement("table");
            tbl.id = "myTable";
            var tblBody = document.createElement("tbody");
            var row = document.createElement("tr");
            var keys = Object.keys(response.Items[0]);
            for (var i = 0; i < keys.length; i++) {
                // create element <td> and text node 
                //Make text node the contents of <td> element
                // put <td> at end of the table row
                var cell = document.createElement("td");
                var cellText = keys[i];
                cell.innerHTML = cellText;
                cell.style = 'font-weight: bold;';
                row.appendChild(cell);
            }
            //row added to end of table body
            tblBody.appendChild(row);
        }
        // append the <tbody> inside the <table>
        tbl.appendChild(tblBody);
        // put <table> in the <body>
        finddump.appendChild(tbl);
        // tbl border attribute to 
        tbl.setAttribute("border", "2");
        var selectOptions = document.getElementById("select");
        var lengthOf = selectOptions.options.length;

        if (lengthOf != Object.keys(response.Items).length) {
            selectOptions.options.length = null;
        }
        var table = document.getElementById("myTable");

        for (i = 0; i < Object.keys(response.Items).length; i++) {
            var rowNum = i + 1;
            var header = Object.keys(response.Items[0]);
            var row = table.insertRow(rowNum);
            rowNum++;
            for (z = 0; header.length > z; z++) {
                var cell = row.insertCell(z);
                cell.innerHTML = response.Items[i][header[z]];
            }
            selectOptions.options[i] = new Option(response.Items[i].Text + ", " + response.Items[i].Description, response.Items[i].Id + ',' + response.Items[i].Type);
        }
    }
    dropdownExp();
    document.getElementById("findURL").innerHTML = findUrl
}

function Capture_Interactive_Retrieve_v1_00Begin(Id, selectText) {
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0],
        url = "http://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws?";
    if (Id[1] === "Address") {
        // Build the query string
        url += "&Key=" + document.getElementById("key").value;
        url += "&Id=" + encodeURIComponent(Id[0]);
        url += "&Field1Format=" + document.getElementById("Field1Format").value;
        url += "&Field2Format=" + document.getElementById("Field2Format").value;
        url += "&Field3Format=" + document.getElementById("Field3Format").value;
        url += "&Field4Format=" + document.getElementById("Field4Format").value;
        url += "&Field5Format=" + document.getElementById("Field5Format").value;
        url += "&Field6Format=" + document.getElementById("Field6Format").value;
        url += "&Field7Format=" + document.getElementById("Field7Format").value;
        url += "&Field8Format=" + document.getElementById("Field8Format").value;
        url += "&Field9Format=" + document.getElementById("Field9Format").value;
        url += "&Field10Format=" + document.getElementById("Field10Format").value;
        retrieveUrl = url;
        url += "&callback=Capture_Interactive_Retrieve_v1_00End";


        script.src = url;

        // Make the request
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode)
                    head.removeChild(script);
            }
        }

        head.insertBefore(script, head.firstChild);

    } else {
        dropdownDest();
        Capture_Interactive_Find_v1_00Begin(document.getElementById("search").value, Id[0])
    }
}

function Capture_Interactive_Retrieve_v1_00End(response) {
    // Test for an error
    if (response.Items.length == 1 && typeof (response.Items[0].Error) != "undefined") {
        // Show the error message
        alert(response.Items[0].Description);
    } else {
        // Check if there were any items found
        if (response.Items.length == 0)
            alert("Sorry, there were no results");
        else {
            var addressElem = ["Line1", "Line2", "Line3", "City", "Province", "PostalCode"]
            var selectOptions = document.getElementById("select");

            document.getElementById("output").innerHTML = null
            // document.getElementById("fulldump").innerHTML = JSON.stringify(response);

            var fulldunp = document.getElementById("fulldump");
            // create elements <table> and a <tbody>
            var tbl = document.createElement("table");
            tbl.id = "myTable";
            var tblBody = document.createElement("tbody");
            var row = document.createElement("tr");
            var keys = Object.keys(response.Items[0])
            for (var i = 0; i < keys.length; i++) {
                // create element <td> and text node 
                //Make text node the contents of <td> element
                // put <td> at end of the table row
                var cell = document.createElement("td");
                var cellText = keys[i];
                cell.innerHTML = cellText;
                cell.style = 'font-weight: bold;'
                row.appendChild(cell);
            }
            //row added to end of table body
            tblBody.appendChild(row);

            // append the <tbody> inside the <table>
            tbl.appendChild(tblBody);
            // put <table> in the <body>
            fulldunp.appendChild(tbl);
            // tbl border attribute to 
            tbl.setAttribute("border", "2");
            var selectOptions = document.getElementById("select");
            var lengthOf = selectOptions.options.length;

            if (lengthOf != Object.keys(response.Items).length) {
                selectOptions.options.length = null;
            };
            var table = document.getElementById("myTable");

            for (i = 0; i < Object.keys(response.Items).length; i++) {
                var rowNum = i + 1;
                var header = Object.keys(response.Items[0]);
                var row = table.insertRow(rowNum);
                rowNum++;
                for (z = 0; header.length > z; z++) {
                    var cell = row.insertCell(z);
                    cell.innerHTML = response.Items[i][header[z]];
                }
            }
        }
        for (i = 0; i < addressElem.length; i++) {
            var newElem = document.createElement("P");
            t = document.createTextNode(response.Items[0][addressElem[i]])
            newElem.appendChild(t);
            document.getElementById("output").appendChild(newElem);
        }

        selectOptions.options.length = null;
        selectOptions.style = "visibility:hidden;";
        buttonvis();
    }
    dropdownDest();
    document.getElementById("retrieveURL").innerHTML = retrieveUrl;
}

function destTab() {
    var table = document.getElementById("myTable");
    if (table) table.parentNode.removeChild(table)
}

function retrieveExe() {
    //Gets address ID and Type from option, passes both of them through to Retrieve Call
    var selectOptions = document.getElementById("select");
    var selectValue = selectOptions.options[selectOptions.selectedIndex].value;
    var selectText = selectOptions.options[selectOptions.selectedIndex].innerHTML;
    var addId = selectValue.split(',');
    Capture_Interactive_Retrieve_v1_00Begin(addId, selectText);
};

function buttonvis() {
    //controls visibility of button when called
    if (document.getElementById("infoToggle").className == "btn btn-default visibliltyToggle") {
        document.getElementById("infoToggle").className = "btn btn-default"
    } else {
        document.getElementById("infoToggle").className = "btn btn-default visibliltyToggle"
    }
}

function dropdownDest() {
    var dropdown = document.getElementById('select');
    var length = dropdown.length
    dropdown.size = 0;
}

function dropdownExp() {
    var dropdown = document.getElementById('select');
    var length = dropdown.length
    dropdown.size = length;
}

function differenceCheck() {
    if (findUrl != null) {
        for (q = 0; q < 20; q++) {
            console.log
            $.ajax({
                type: "GET",
                url: findUrl,
                dataType: "jsonp",
                async: false,
                success: function (data) {
                    processResp(data, q)
                }
            });
        };
    };
}

function processResp(data, q) {
    prevResponse = currResponse;
    currResponse = data.Items.length;
    if (prevResponse != '' && currResponse != prevResponse) {
        gloCount++;
    }
    if (gloCount > 0 && q === 20) {
        debugger;
        alert(gloCount + "Differences Detected!");
    }
}