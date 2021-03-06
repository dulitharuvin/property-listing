import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Listing } from './../interfaces/listing'

@Injectable()
export class ListingService {

  listings: Observable<Listing[]>;

  constructor(private fireDb: AngularFireDatabase) {
  }

  getListings() {
    this.listings = this.fireDb.list('/listings').valueChanges() as Observable<Listing[]>;
    return this.listings;
  }
}

