import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(
    private http: HttpClient
  ) { }

  createPlaylist(playlistName: string, description: string, uid: any) {
    return this.http.put("http://localhost:3000/api/playlists", {name: playlistName, description: description, uid: uid});
  }

  getUserPlaylists() {
    return this.http.get("http://localhost:3000/api/playlists");
  }

  getPlaylistById(id: number) {
    return this.http.get("http://localhost:3000/api/playlists/" + id);
  }

  getPlaylistTracksById(id: number) {
    return this.http.get("http://localhost:3000/api/playlists/tracks/" + id);
  }

  changePlaylistPublic(id: number, isPublic: boolean) {
    return this.http.post("http://localhost:3000/api/playlists", {isPublic: isPublic, playlistId: id});
  }
}
