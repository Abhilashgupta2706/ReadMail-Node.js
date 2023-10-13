import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  query: any = '';

  mailData: any = {}
  show = false

  constructor(private apiService: ApiServiceService) { }
  onInit() {
  }

  readData() {

    this.apiService.getAllData(this.query).subscribe(
      res => {
        this.mailData = res
        const bufferData = this.mailData.attachments[0].content
        const decodedString = String.fromCharCode(...bufferData.data);
        this.mailData.attachmentData = decodedString

        if (this.mailData) {
          this.show = true
        }
      },
      error => {
        this.show = false
        console.log(error)
        alert.apply("Something went wrong. Please restart the server")
      }

    )
  }

}
