function sheet2jObject() {
  //  Info: Sheet
  var sheetId = '1M1ESyC-bp_yYNd-aOv1-XUMLZ8N2duVbO6W9k2QsU5s';
  var sheetName = 'New Library';
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  console.log('Sheet Name: ' + sheet.getSheetName());
  //  Info: Range
  var iCol = 1;
  var iRow = 1;
  var cntCol = sheet.getLastColumn();
  var cntRow = sheet.getLastRow();

  var titleRange = sheet.getRange(1, 1, 1, cntCol);
  var titleValues = titleRange.getValues();
  var titleColumns = titleValues[0];

  var libObj = new Object();
  for (var rowIndex = 2401; rowIndex <= cntRow; rowIndex++) {
    var range = sheet.getRange(rowIndex, iCol, iRow, cntCol);
    var values = range.getValues();
    var rowVals = values[0];

    var json = new Object();
    for (var j = 0; j < titleColumns.length; j++) {
      json[titleColumns[j]] = rowVals[j];
    }
    var trackNum = rowIndex - 1;
    libObj['TRK' + trackNum] = json;
    if (rowIndex % 50 == 0) {
      console.log('row: ' + rowIndex);
    }
  }
  return libObj;
}
