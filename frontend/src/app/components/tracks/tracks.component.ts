import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {


readonly ROOT_URL = 'localhost:3000/api'
artist: string = '';


posts:any

  getPost(){
   // console.log('this is what you entered', this.artist)
this.posts =this.http.get("http://localhost:3000/api/tracks/"+this.artist)
console.log("made it here")
  }


  constructor(private http:HttpClient,
    private expressService: ExpressService,
    private router: Router) {}

  ngOnInit(): void {
  }

}
