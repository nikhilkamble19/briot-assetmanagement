import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

import '../../assets/resources/js/BrowserPrint-1.0.4.min.js';
declare var BrowserPrint :any;

@Injectable()
export class UtilityService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  JSONtoArray(json_object: JSON) {
    var arr = [];
    for(var i in json_object){
      arr.push(i);
      arr.push(json_object[i]);
    }
    return arr;
  }

  private getZebraPrinterStringToPrint(part_json: JSON, partorlocation: string, partorlocationdes: string, partnumber: string, partdescription: string) {
    var barcodeTemplate = `^XA

^CFA,30
^FO50,50^FDNumber^FS
^FO340,50^FD:^FS
^FB380,3,,
^FO360,50^FDpartnumber^FS

^FB400,2,,
^FO50,130^FDDescription^FS
^FO340,130^FD:^FS
^FB380,3,,
^FO360,130^FDpartdescription^FS

^FO50,200^FDSerial Number^FS
^FO340,200^FD:^FS
^FO360,200^FDserialnumber^FS

^FX Third section with barcode.
^FX ^BY5,2,120
^FO220,220
^BY200,200^FT300,400^BXN,9,200,0,0,0,~
^FDXXXXXXXXXXXXX^FS

^XZ`;


    var barcodeVal: string = null;
    if (part_json != null) {
      var barcodeVal = barcodeTemplate.replace("SerialNumber", part_json["barcode"]);
      if (part_json["created"] != null) {
        var dateString = part_json["created"];
        //var dateFormat = new Date(dateString).toDateString();
        //barcodeVal = barcodeVal.replace("RecordDate", dateFormat);
      }

      var barcodeStr:string = "";
      if (part_json["barcode"] != undefined) {
        barcodeStr = part_json["barcode"];
      }
      barcodeVal = barcodeVal.replace("XXXXXXXXXXXXX", barcodeStr);

      var serialnumberStr:string = "";
      if (part_json["barcode"] != undefined) {
        serialnumberStr = part_json["barcode"];
      }
      barcodeVal = barcodeVal.replace("serialnumber", serialnumberStr);

      var NumberStr:string = "";
      barcodeVal = barcodeVal.replace("Number", partorlocation);

      var DescriptionStr:string = "";
      barcodeVal = barcodeVal.replace("Description", partorlocationdes);

      var partnumberStr:string = "";
      barcodeVal = barcodeVal.replace("partnumber", partnumber);

      var partdescriptionStr:string = "";
      barcodeVal = barcodeVal.replace("partdescription", partdescription);

      console.log("in getZebraPrinterStringToPrint ");
    }
    this.printIt(barcodeVal);
  }

  private printIt(barcodeVal: string) {
  console.log("In PrintIt");
    BrowserPrint.getDefaultDevice('printer', function(printer) {
      console.log("Printer status: ", printer, printer.connection);
      if((typeof printer != "undefined") && (printer.connection == null))
      {
        console.log("No Printer Found");
        // give option to choose printer
      }
      else {
        console.log(printer.name); // This alert does not pop - why???
        console.log("\nLABEL PRINT START \n");
        if (barcodeVal != null) {
          printer.send(barcodeVal);
        }
        console.log("\nLABEL PRINT END \n");
      }
    },
    function(error_response) {
      // This alert doesn't pop either
      console.log("An error occured while attempting to connect to your Zebra Printer. " +
        "You may not have Zebra Browser Print installed, or it may not be running. " +
        "Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again.");
    });
  }

  printOnZebraPrinterWithParams(part_json: JSON, partorlocation: string, partorlocationdes: string, partnumber: string, partdescription: string) {
    var barcodeVal = this.getZebraPrinterStringToPrint(part_json, partorlocation, partorlocationdes, partnumber, partdescription);

    if (barcodeVal == null) {
      return;
    }
  }

  printOnZebraPrinter(part_json: JSON) {
    //this.printOnZebraPrinterWithParams(part_json: JSON);
  }
}