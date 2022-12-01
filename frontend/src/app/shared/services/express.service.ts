import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  constructor(
    private http: HttpClient
  ) { }

  hostName: string = 'http://ronin.software:3000';

  createPlaylist(playlistName: string, description: string, uid: any) {
    return this.http.put(`${this.hostName}/api/playlists`, {name: playlistName, description: description, uid: uid});
  }

  editPlaylist(playlistName: string, description: string, playlistId: any) {
    return this.http.post(`${this.hostName}/api/playlists`, {name: playlistName, description: description ==="" ? null : description, playlistId: playlistId});
  }

  getUserPlaylists(uid: any) {
    return this.http.get(`${this.hostName}/api/playlists?uid=` + uid);
  }

  getGenres(){
    return this.http.get(`${this.hostName}/api/genres`)
  }
  getArtists(artist:string){
    return this.http.get(`${this.hostName}/api/tracks/` + artist);
  }


  getPlaylistById(id: number) {
    return this.http.get(`${this.hostName}/api/playlists/` + id);
  }

  getNumberOfTracks(playlistId: any) {
    return this.http.get(`${this.hostName}/api/countTracks/` + playlistId);
  }

  deletePlaylist(id: number) {
    return this.http.delete(`${this.hostName}/api/playlists/` + id);
  }

  getPlaylistTracksById(id: number) {
    return this.http.get(`${this.hostName}/api/playlists/tracks/` + id);
  }

  addTrackToPlaylist(trackId: any, playlistId: any) {
    return this.http.put(`${this.hostName}/api/playlists/tracks/` + playlistId, {trackId: trackId});
  }

  deleteTrackFromPlaylist(trackId: any, playlistId: any) {
    return this.http.delete(`${this.hostName}/api/playlists/tracks/` + playlistId, {body: {trackId: trackId}});
  }

  changePlaylistPublic(id: number, isPublic: boolean) {
    return this.http.post(`${this.hostName}/api/playlists`, {isPublic: isPublic, playlistId: id});
  }

  getPublicPlaylists() {
    return this.http.get(`${this.hostName}/api/publicPlaylists`);
  }

  getPlaylistAllComments(playlistId: any) {
    return this.http.get(`${this.hostName}/api/comment/` + playlistId);
  }

  getPlaylistComments(playlistId: any) {
    return this.http.get(`${this.hostName}/api/publicComments/` + playlistId);
  }

  addPlaylistReview(playlistId: any, uid: string, username: string, review: string, rating: number) {
    return this.http.put(`${this.hostName}/api/comment/` + playlistId, {playlistId: playlistId, uid: uid, username: username, review: review, rating: rating})
  }

  hideReview(isHidden: any, reviewId: any) {
    return this.http.post(`${this.hostName}/api/comment`, {isHidden: isHidden, reviewId: reviewId})
  }






}
