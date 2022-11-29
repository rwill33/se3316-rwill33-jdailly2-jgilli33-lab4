import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPlaylistDetailsComponent } from './public-playlist-details.component';

describe('PublicPlaylistDetailsComponent', () => {
  let component: PublicPlaylistDetailsComponent;
  let fixture: ComponentFixture<PublicPlaylistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPlaylistDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPlaylistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
