import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  user?: User;
  constructor(
    private modalService: BsModalService,
    private expressService: ExpressService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
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
  inputValidation(playlistName: string, description: string) {
    if (playlistName === "") {
      this.error = true;
      this.errorMessage = "Please enter a playlist name.";
      return;
    }
    this.expressService.createPlaylist(playlistName, description, this.user?.uid).subscribe(
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
    this.router.navigate(["/dashboard/playlists/" +id]);
    console.log(id);
  }
}
