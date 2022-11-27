import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from 'src/app/shared/services/playlist';

@Component({
  selector: 'app-public-playlist',
  templateUrl: './public-playlist.component.html',
  styleUrls: ['./public-playlist.component.css']
})
export class PublicPlaylistComponent implements OnInit {
  playlists: Playlist[]| null = null;
  constructor(
    private expressService: ExpressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPublicPlaylists()
  }

  getPublicPlaylists() {
    this.expressService.getPublicPlaylists().subscribe(
      (response: any) => {
        console.log(response);
        this.playlists = response;
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
