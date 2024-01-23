var _randNum = (size) => Math.random() * size;
var _zeroPad = (num) => (num < 10 ? "0" + num : num);

var _generateDate = () => {
  var day = Math.round(_randNum(27)) + 1;
  var month = Math.round(_randNum(11)) + 1;
  var year = Math.round(_randNum(70)) + 1950;
  return `${_zeroPad(day)}/${_zeroPad(month)}/${year}`;
};

function createRowData(maxRows) {
    let rowData = [];
    for (var i = 0; i < maxRows; i++) {
      var row = {
        date: _generateDate(),
      };
      rowData.push(row);
    }
    return rowData;
  }

   // DATE COMPARATOR FOR SORTING
   function dateComparator(date1, date2) {
    var date1Number = _monthToNum(date1);
    var date2Number = _monthToNum(date2);

    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }

    return date1Number - date2Number;
  }

  // HELPER FOR DATE COMPARISON
  function _monthToNum(date) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }

    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);

    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    // 29/08/2004 => 20040829
    return result;
  }

    // DATA FORMATTING
function dateFormatter(params) {
        var dateAsString = params.data.date;
        var dateParts = dateAsString.split("/");
        return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2]}`;
}

function onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
}