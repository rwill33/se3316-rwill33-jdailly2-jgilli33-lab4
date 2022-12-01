import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Playlist } from 'src/app/shared/services/playlist';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-public-playlist-details',
  templateUrl: './public-playlist-details.component.html',
  styleUrls: ['./public-playlist-details.component.css']
})
export class PublicPlaylistDetailsComponent implements OnInit {
  modalRef?: BsModalRef;
  playlist?: Playlist;
  tracks?: any;
  username?: string;
  error?: boolean;
  errorMessage?: string;
  private routeSub: Subscription;
  id: number;
  isReviewsCollapsed = true;
  isTracksCollapsed = false;
  rating: number = 3;
  comments?: any[];
  selectedComment?: any;

    constructor(
      private route: ActivatedRoute,
      private expressService: ExpressService,
      private db: AngularFireDatabase,
      private modalService: BsModalService,
      private authService: AuthService
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
    this.getReviews(this.id);
}

ngOnDestroy(): void {
    if(this.routeSub) {
        this.routeSub.unsubscribe();
    }
}

getRole() {
  return this.authService.role.admin;
}
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  this.rating = 3;
}

closeModal() {
  this.modalRef?.hide();
}

handleRatingChange(data: any,) {
  console.log(data.target.valueAsNumber);
  this.rating = data.target.valueAsNumber;
}

confirmHide(template: TemplateRef<any>, review: any) {
  this.openModal(template);
  this.selectedComment = review;
}

hideComment() {
  this.expressService.hideReview(!this.selectedComment.isHidden, this.selectedComment.reviewId).subscribe(
    (response: any) => {
      console.log(response);
      this.getReviews(this.id);
      this.closeModal()
    },
    (error) => {
      console.log(error);
    });
}

formatDate(date: any) {
  const format = 'dd/MM/yyyy hh:mm a';
  const locale = 'en-US';
  return formatDate(date, format, locale);
}

inputValidation(rating: number, comment: string) {
  if (comment === "") {
    return;
  }
  this.expressService.addPlaylistReview(this.playlist?.playlistId, this.authService.user.uid, (this.authService.user.providerData[0].displayName === null) ? "Anonymous" : this.authService.user.providerData[0].displayName, comment, rating).subscribe(
    (response: any) => {
      console.log(response);
      this.getReviews(this.id);
      this.closeModal();
    },
    (error) => {
      console.log(error);
    });
}

getReviews(id: number) {
  console.log(this.authService.role.admin);
  if (this.authService.role.admin === true){
    this.expressService.getPlaylistAllComments(id).subscribe(
      (response: any) => {
        this.comments = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  } else {
    this.expressService.getPlaylistComments(id).subscribe(
      (response: any) => {
        this.comments = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  }
}

viewReviews(){
  this.isTracksCollapsed = true;
  this.isReviewsCollapsed = false;
}

viewTracks(){
  this.isReviewsCollapsed = true;
  this.isTracksCollapsed = false;
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


reportBtn(){



}


}
