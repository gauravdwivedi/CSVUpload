var tableData;
$(document).ready(function () {
    tableData = undefined;
});

$('.search').each(function () {
    var elem = $(this);

    // Save current value of element
    elem.data('oldVal', elem.val());

    // Look for changes in the value
    elem.bind("propertychange change click keyup input paste", function (event) {
        // If value has changed...
        if (elem.data('oldVal') != elem.val()) {
            // Updated stored value
            elem.data('oldVal', elem.val());

            // Do action
            let query = elem.val().toLowerCase();
            console.log(query);

            //find the table using id
            var table = $('#data-table');
            //get table data if if table data is empty
            if (tableData === undefined)
                tableData = getTableData(table);

            //filter the data based on query
            let filteredData = getFilteredTableData(tableData, query);

            //update the table in DOM
            updateTableData(table, filteredData);
        }
    });
});

// filter table data based on the query string
function getFilteredTableData(tableData, query) {
    // loop trough each array and check if any of the columns have the query string
    // if found add the row to the result
    let data = [];
    for (let i = 0; i < tableData.length; i++) {
        let row = tableData[i];

        // if(row[1].toLowerCase().includes(query))
        //   data.push(row);

        // to search the entire document for the query string
        // we include the row even if one column value matches the query string  
        let found = false;
        for (let j = 0; j < row.length; j++) {
            if (row[j].toLowerCase().includes(query)) {
                found = true;
                break;
            }
        }

        if (found)
            data.push(row);

    }
    return data;
}

// loop through the table and push the data into an array
function getTableData(table) {
    let data = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('td').each(function (colIndex, c) {
            cols.push(c.textContent);
        });
        data.push(cols);
    });
    console.log(data);
    return data;
}

//update table data
function updateTableData(table, data) {
    //variable to hold the new table data
    let html = '<tbody>';
    //loop through the data, create rows and columns and append them
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        html += '<tr>';
        for (let j = 0; j < row.length; j++) {
            html += '<td>' + row[j] + '</td>';
        }
        html += '</tr>';
    }
    html += '</tbody>';

    //remove old tbody element
    table.find('tbody').detach();

    //append newly created tbody element
    table.append(html);
}

function sort(key) {
    // get table
    var table = $('#data-table');
    // get current table data
    let data = getTableData(table);
    // sort the data
    data = sortData(data, key);
    // update the table
    updateTableData(table, data);
}

//sort the data based on the key value
function sortData(data, key) {
    console.log(key);
    data.sort(function (a, b) {
        if (a[key] < b[key])
            return -1;
        if (b[key] < a[key])
            return 1;
        return 0;
    });
    return data;
}