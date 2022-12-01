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

  editPlaylist(playlistName: string, description: string, playlistId: any) {
    return this.http.post("http://localhost:3000/api/playlists", {name: playlistName, description: description ==="" ? null : description, playlistId: playlistId});
  }

  getUserPlaylists(uid: any) {
    return this.http.get("http://localhost:3000/api/playlists?uid=" + uid);
  }

  getGenres(){
    return this.http.get("http://localhost:3000/api/genres")
  }
  getArtists(artist:string){
    return this.http.get("http://localhost:3000/api/tracks/" + artist);
  }


  getPlaylistById(id: number) {
    return this.http.get("http://localhost:3000/api/playlists/" + id);
  }

  getNumberOfTracks(playlistId: any) {
    return this.http.get("http://localhost:3000/api/countTracks/" + playlistId);
  }

  deletePlaylist(id: number) {
    return this.http.delete("http://localhost:3000/api/playlists/" + id);
  }

  getPlaylistTracksById(id: number) {
    return this.http.get("http://localhost:3000/api/playlists/tracks/" + id);
  }

  addTrackToPlaylist(trackId: any, playlistId: any) {
    return this.http.put("http://localhost:3000/api/playlists/tracks/" + playlistId, {trackId: trackId});
  }

  deleteTrackFromPlaylist(trackId: any, playlistId: any) {
    return this.http.delete("http://localhost:3000/api/playlists/tracks/" + playlistId, {body: {trackId: trackId}});
  }

  changePlaylistPublic(id: number, isPublic: boolean) {
    return this.http.post("http://localhost:3000/api/playlists", {isPublic: isPublic, playlistId: id});
  }

  getPublicPlaylists() {
    return this.http.get("http://localhost:3000/api/publicPlaylists");
  }

  getPlaylistAllComments(playlistId: any) {
    return this.http.get("http://localhost:3000/api/comment/" + playlistId);
  }

  getPlaylistComments(playlistId: any) {
    return this.http.get("http://localhost:3000/api/publicComments/" + playlistId);
  }

  addPlaylistReview(playlistId: any, uid: string, username: string, review: string, rating: number) {
    return this.http.put("http://localhost:3000/api/comment/" + playlistId, {playlistId: playlistId, uid: uid, username: username, review: review, rating: rating})
  }

  hideReview(isHidden: any, reviewId: any) {
    return this.http.post("http://localhost:3000/api/comment", {isHidden: isHidden, reviewId: reviewId})
  }

  getTrackById(id: any) {
    return this.http.get("http://localhost:3000/api/track/" +id);
  }

}
