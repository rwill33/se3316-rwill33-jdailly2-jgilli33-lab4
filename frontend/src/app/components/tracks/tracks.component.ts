import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Router } from '@angular/router';
//import { Artist } from 'src/app/shared/services/Artist';
import { Observable } from '@firebase/util';
import {Artist} from 'src/app/shared/services/artist'
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {


readonly ROOT_URL = 'localhost:3000/api'
artist: string = '';
posts: any;
artists?:Artist[];
data:any =[];
ngOnInit(): void {

}

getArtists(){
  console.log(this.artist)
  this.expressService.getArtists(this.artist).subscribe(
    (response: any) => {
      this.artists = response;
     //console.log(this.artists);
      
console.log(this.artists?.[0].artistName)

//const artistnames = this.artists?.map(this.artists? => (this.artists?));


    },
    (error) => {
      console.log(error);
    });

//console.log(this.artists)
  //console.log("here1")
    // this.router.navigate(["/dashboard/tracks/" +this.artist])
    // console.log("here2")
//console.log(this.artists);
}

  getPost(){
   // console.log('this is what you entered', this.artist)
   
this.posts =this.http.get("http://localhost:3000/api/tracks/"+this.artist)

  }

  showDetails(){
    console.log("made it to the function")
  }
  playSongOnyoutube(){
    window.open("https://www.youtube.com/results?search_query=Electric Ave")
  }

  constructor(private http:HttpClient,
    private expressService: ExpressService,
    private router: Router)
     {}

  

}
