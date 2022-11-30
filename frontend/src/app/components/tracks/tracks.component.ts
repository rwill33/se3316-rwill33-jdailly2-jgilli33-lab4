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
 
let searchName = this.search.toString();
console.log(searchName[1])
//this.expressService.getArtists(this.artist).subscribe(
  this.expressService.getArtists(searchName).subscribe(
    (response: any) => {
      this.artists = response;
    
     this.obj = this.artists;
 
console.log(this.search);
      //Need to parse the genres object but do that later

    if(this.isOn === true){
      this.showMe = true;
    }else{
      this.showMe = false;
    }
    this.search = [];


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

getSearchArtist(){
  this.search[0] = this.artist;
  this.artist = "";
}
getSearchGenre(){
this.search[2]= this.artist;
this.artist = "";
}
getSearchTrack(){
this.search[1] = this.artist;
this.artist = "";
}



  getPost(){
   // console.log('this is what you entered', this.artist)
   
this.posts =this.http.get("http://localhost:3000/api/tracks/"+this.artist)

  }

  showDetails(){
    console.log("made it to the function")
  }
  playSongOnyoutube(title:string){
    window.open("https://www.youtube.com/results?search_query="+ title)
  }

  constructor(private http:HttpClient,
    private expressService: ExpressService,
    private router: Router)
     {}

  

}
