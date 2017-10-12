import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseService } from './../../services/firebase.service'
import { Listing } from './../../interfaces/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings: Listing[];

  constructor(private firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this.getAllThePropertyListings();
  }

  getAllThePropertyListings() {
    this.firebaseService.getListings().subscribe(listings => {
      console.log(listings);
      this.listings = listings;
    });
  }
}
