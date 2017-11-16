import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<any[]>;

  constructor(private userService: UserService) {
    this.getAllTheActiveUsers();
  }

  ngOnInit() {
  }

  private getAllTheActiveUsers() {
    this.users = this.userService.getAllUsers();
  }

}
