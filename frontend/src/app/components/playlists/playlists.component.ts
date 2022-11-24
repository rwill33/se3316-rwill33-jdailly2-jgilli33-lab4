import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, of } from 'rxjs';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from '../../shared/services/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  modalRef?: BsModalRef;
  error?: boolean;
  errorMessage?: string;
  playlists?: Playlist[];
  constructor(
    private modalService: BsModalService,
    private expressService: ExpressService
  ) {
    this.modalService.onHidden.subscribe(() => {
      this.error = false;
      this.errorMessage = "";
    })
   }

  ngOnInit(): void {
    this.expressService.getUserPlaylists().subscribe(
      (response: any) => {
        this.playlists = response;
      },
      (error) => {
        console.log(error);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
  inputValidation(playlistName: string) {
    this.expressService.createPlaylist(playlistName).subscribe(
    (response: any) => {
      this.playlists = response;
      this.closeModal();
    },
    (error) => {
      this.error = true;
      this.errorMessage = error.error;
    });
  }

  getPlaylist(id: number) {
    console.log(id);
  }
}
