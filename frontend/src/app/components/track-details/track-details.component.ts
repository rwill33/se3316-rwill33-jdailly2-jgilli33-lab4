import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpressService } from 'src/app/shared/services/express.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.css']
})
export class TrackDetailsComponent implements OnInit {
  private routeSub: Subscription;
  id: number;
  track: any;
  genres?: any = [];

  constructor(
    private expressService: ExpressService,
    private route: ActivatedRoute,
    public router: Router,
    private location: Location
  ) {
    this.routeSub = Subscription.EMPTY;
    this.id = -1;
  }

  back(): void {
    this.location.back()
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
  });
    this.expressService.getTrackById(this.id).subscribe(
        (response: any) => {
          this.track = response[0];
          response[0].trackGenres.slice(1, response[0].trackGenres.length - 1).split('}, ').forEach((item: any) => {
            const genreObj: any = {}
            const tmpArray = item.replace(/\'/g, "").replace(/[{}]/g, "").split(', ');
            tmpArray.forEach((item: any) => {
              const tmp2Array = item.split(": ");
              genreObj[tmp2Array[0]] = tmp2Array[1]
            })
          this.genres.push(genreObj);
          console.log(this.genres);
        })
        },
        (error) => {
          console.log(error)
        });
  }
}
