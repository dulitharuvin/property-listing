import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Listing } from './../interfaces/listing'

@Injectable()
export class FirebaseService {

  listings: Observable<Listing[]>;

  constructor(private fireDb: AngularFireDatabase) {
  }

  getListings() {
    this.listings = this.fireDb.list('/listings').valueChanges() as Observable<Listing[]>;
    return this.listings;
  }

}

