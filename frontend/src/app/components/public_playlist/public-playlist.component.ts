import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from 'src/app/shared/services/playlist';

@Component({
  selector: 'app-public-playlist',
  templateUrl: './public-playlist.component.html',
  styleUrls: ['./public-playlist.component.css']
})
export class PublicPlaylistComponent implements OnInit {
  playlists: any[]| null = null;
  constructor(
    private expressService: ExpressService,
    private router: Router,
    private db: AngularFireDatabase,
  ) {}

  ngOnInit(): void {
    this.getPublicPlaylists()
  }

  getPublicPlaylists() {
    this.expressService.getPublicPlaylists().subscribe(
      (response: any) => {
        const playlists = response.splice(0,10);
        console.log(playlists);
        playlists.forEach((data: any) => {
          this.expressService.getNumberOfTracks(data.playlistId).subscribe(
          (r: any) => {
            data['trackCount'] = r.count;
            data['duration'] = r.duration;
            data['rating'] = r.rating;
          }, (e) => {
            console.log(e);
          })
          const ref = this.db.object('users/' + data.uid);
          ref.query.ref.on('value', (snapshot:any) => {
            data['username'] = snapshot.val().username;
          }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
          });
        })
        this.playlists = playlists;
      },
      (error) => {
        console.log(error);
      });
  }

  getPlaylist(id: number) {
    this.router.navigate(["/playlists/" +id]);
    console.log(id);
  }

}
