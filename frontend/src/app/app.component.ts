import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query: any = '';

  mailData: any = {}
  show = false
  showReadData = false
  showReadSaveData = false

  constructor(private apiService: ApiServiceService) { }
  onInit() {
  }

  readData() {
    this.reset()
    this.apiService.readMail(this.query).subscribe(
      res => {
        if (res == "No mail found") {
          console.log(res)
          alert(res)
          return
        }
        this.mailData = res


        const bufferData = this.mailData.attachments[0].content
        const decodedString = String.fromCharCode(...bufferData.data);
        var result = decodedString
        this.mailData.attachmentData = result

        this.show = true
        this.showReadData = true
      },
      error => {
        this.show = false
        this.showReadData = false
        console.log(error)
        alert("Something went wrong. Please restart the server")
      }

    )
  }

  readSaveData() {
    this.reset()
    this.apiService.readSaveMail(this.query).subscribe(
      res => {
        console.log(res)
        if (res == "No mail found") {
          console.log(res)
          alert(res)
          return
        }
        this.mailData = res;


        const bufferData = this.mailData.attachments[0].content.data; // Extract the 'data' property from the content
        const arrayBuffer = new Uint8Array(bufferData); // Convert buffer data to Uint8Array
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);
        this.mailData.attachmentData = excelData;
        this.show = true;
        this.showReadSaveData = true;
        console.log('Excel Data:', excelData);
      },
      error => {
        this.show = false
        this.showReadSaveData = false
        console.log(error)
        alert("Something went wrong. Please restart the server")
      }

    )
  }

  convertExcelDate(serialNumber: number): Date {
    // Excel date serial number starts from January 1, 1900
    const excelDateBase = new Date('1900-01-01');
    const daysToAdd = serialNumber - 1; // Subtract 1 to account for the missing day (January 1, 1900)
    const resultDate = new Date(excelDateBase);
    resultDate.setDate(resultDate.getDate() + daysToAdd);
    return resultDate;
  }

  reset() {
    this.showReadSaveData = false
    this.show = false
    this.showReadData = false
  }
}
