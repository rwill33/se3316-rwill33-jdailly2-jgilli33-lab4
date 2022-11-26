import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from 'src/app/shared/services/playlist';
import { PlaylistsComponent } from '../playlists/playlists.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlist?: Playlist;
  tracks?: any;
  username?: string;
  private routeSub: Subscription;
  id: number;

    constructor(
      private route: ActivatedRoute,
      private expressService: ExpressService,
      private db: AngularFireDatabase,
      ) {
        this.routeSub = Subscription.EMPTY;
        this.id = -1;
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.getPlaylist(this.id);
        this.getPlaylistTracks(this.id);
    }

    ngOnDestroy(): void {
        if(this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    getPlaylist(id: number) {
      this.expressService.getPlaylistById(id).subscribe(
        (response: any) => {
          console.log(response);
          const ref = this.db.object('users/' + response.uid);
          ref.query.ref.on('value', (snapshot) => {
            this.username = snapshot.val().username;
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
          this.playlist = response;
        },
        (error) => {
          console.log(error);
        });
    }

    getPlaylistTracks(id: number) {
      this.expressService.getPlaylistTracksById(id).subscribe(
        (response: any) => {
          console.log(response);
          this.tracks = response;
        },
        (error) => {
          console.log(error);
        });
    }


}
