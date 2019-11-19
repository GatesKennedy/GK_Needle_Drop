function doGet(e) {
  console.log('FXN doGet()');
  
  var jArray = false;
  
  var payLoad;
  if (jArray) {
    var jsonArray = sheet2jArray();
    console.log("convert DONE");
    payLoad = JSON.stringify(jsonArray);
    }
  else {
    var libObject = sheet2jObject();
    console.log("convert DONE");
    payLoad = JSON.stringify(libObject);
    }
  console.log("Fully Converted");
  var output = ContentService.createTextOutput(payLoad)
    .setMimeType(ContentService.MimeType.JSON)
    .downloadAsFile("NDS_LibraryJSON_2400-end.txt");
  return output;
}