import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from "ionic-angular";

// import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {
  onPc = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform,) { // private socialSharing: SocialSharing
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }




  shareMobile() {


    if (this.platform.is("cordova")) {
      // Mobile


      // Check if sharing via email is supported
      // this.socialSharing.canShareViaEmail().then(() => {
      //   // Sharing via email is possible
      //   // Share via email
      //   this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      //
      //     // Success!
      //   }).catch(() => {
      //     // Error!
      //   });
      // }).catch(() => {
      //   // Sharing via email is not possible
      //   console.log('share email not posible');
      // });



    } else {
      this.onPc = true;
      // navigator.share({
      //   'title': 'Optional title',
      //   'text': 'Optional message',
      //   'url': 'http://www.myurl.com'
      // }).then(function() {
      //   console.log('Successful share');
      // }).catch(function(error) {
      //   console.log('Error sharing:', error)
      // });
    }


  }





}
