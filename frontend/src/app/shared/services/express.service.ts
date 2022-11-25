import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(
    private http: HttpClient
  ) { }

  createPlaylist(playlistName: string) {
    return this.http.put("http://localhost:3000/api/playlists", {name: playlistName});
  }

  getUserPlaylists() {
    return this.http.get("http://localhost:3000/api/playlists");
  }
}
