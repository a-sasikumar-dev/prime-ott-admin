import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  imageUrl: any = this.accessTokenObj['profilepicture'];

  constructor() { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('currentAdmin');
    location.replace("/auth/login");
  }

}
