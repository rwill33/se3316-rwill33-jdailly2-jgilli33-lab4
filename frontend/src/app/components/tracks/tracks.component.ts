import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Router } from '@angular/router';
import {Artist} from 'src/app/shared/services/artist'

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {


readonly ROOT_URL = 'localhost:3000/api'
artist: string = '';
track:string = '';
genre:string = '';
posts: any;
artists?:Artist[];
data:any =[];
obj:any = [];
isOn:boolean = false;
isHidden:boolean = true;
showMe:boolean= false;
p:any 
artistName? :any


search:any= [];

ngOnInit(): void {
  
}

getArtists(){

  this.search[0] = this.artist;
  if(this.search[0]){
    this.artist = "";
  }
  this.search[2]= this.genre;
  if(this.search[2]){
    this.genre = "";
  }
  this.search[1] = this.track;
  if(this.search[1]){
    this.track = "";
  }
 
let searchName = this.search.toString();
console.log(searchName[1])
  this.expressService.getArtists(searchName).subscribe(
    (response: any) => {
      this.artists = response;
    
     this.obj = this.artists;
 
console.log(this.search);

    this.search = [];


    },
    (error) => {
      console.log(error);
    });
}

getSearchArtist(){
  this.search[0] = this.artist;
  this.artist = "";
}
getSearchGenre(){
this.search[2]= this.genre;
this.artist = "";
}
getSearchTrack(){
this.search[1] = this.track;
this.artist = "";
}



  getPost(){
   
this.posts =this.http.get("http://localhost:3000/api/tracks/"+this.artist)

  }

  viewTrackDetails(trackId: any) {
    console.log(this.obj);
    this.router.navigate(['/tracks/' + trackId])
  }

  playSongOnyoutube(title:string){
    window.open("https://www.youtube.com/results?search_query="+ title)
  }

  constructor(private http:HttpClient,
    private expressService: ExpressService,
    private router: Router)
     {}

  

}
