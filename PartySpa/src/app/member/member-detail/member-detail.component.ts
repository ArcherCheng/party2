import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_shared/interface/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ActivityService } from 'src/app/_shared/service/Activity.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  currentPartyId = 0;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe((data: {apiResult: User}) => this.user = data.apiResult);
    this.currentPartyId = this.route.snapshot.params.partyId;
    this.galleryOptions = [
      {
        width: '900px',
        height: '800px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 1000,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 500,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();

  }

  getImages() {
    const imageUrls = [];
    if (this.user.photos.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.user.photos.length; i++) {
        imageUrls.push({
          small: this.user.photos[i].photoUrl,
          medium: this.user.photos[i].photoUrl,
          big: this.user.photos[i].photoUrl,
          description: this.user.photos[i].descriptions
        });
      }
    }
    return imageUrls;
  }

  sendLike(likeId: number) {
    this.alertify.confirm('確定要投票給這個人嗎?', () => {
      this.activityService.sendActivityLike(this.authService.decodedToken.nameid, this.route.snapshot.params.partyId, likeId)
        .subscribe(() => {
          this.alertify.success('投票成功');
        }, error => {
          this.alertify.error(error.error);
        });
    });
  }

  // 直接在 init 中,下載主機端的資料,
  // 改成用 route resolver 下載主機端的資料 member-detail-resolver.service
  // loadUser() {
  //   this.userService.get(+this.route.snapshot.params.id).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error.error);
  //   });
  // }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
