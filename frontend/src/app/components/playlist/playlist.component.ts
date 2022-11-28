import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from 'src/app/shared/services/playlist';

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
  modalRef?: BsModalRef;
  error?: boolean;
  errorMessage?: string;

    constructor(
      private route: ActivatedRoute,
      private expressService: ExpressService,
      private db: AngularFireDatabase,
      private modalService: BsModalService,
      ) {
        this.routeSub = Subscription.EMPTY;
        this.id = -1;
        this.modalService.onHidden.subscribe(() => {
          this.error = false;
          this.errorMessage = "";
        })
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

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    closeModal() {
      this.modalRef?.hide();
    }

    inputValidation(playlistName: string, description: string) {
      if (playlistName === "") {
        this.error = true;
        this.errorMessage = "Please enter a playlist name.";
        return;
      }
      this.expressService.editPlaylist(playlistName, description, this.playlist?.playlistId).subscribe(
      (response: any) => {
        console.log(response);
        this.getPlaylist(this.id);
        this.closeModal();
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.error;
      });
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

    changePublic(data: any, id: any) {
      console.log(data.target.checked, id);
      this.expressService.changePlaylistPublic(id, data.target.checked).subscribe(
        (response: any) => {
          console.log(response);
          this.tracks = response;
        },
        (error) => {
          console.log(error);
        });
      this.getPlaylist(this.id);
    }


}
