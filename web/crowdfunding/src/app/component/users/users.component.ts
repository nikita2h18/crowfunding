import { Component, OnInit } from '@angular/core';
import { User } from "../../dto/User";
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { AdminService } from "../../service/admin.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users: User[] = [];
  private checkedUsersId: bigint[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService,
  ) { }

  //TODO: locked, unlocked
  public ngOnInit(): void {
    this.userService
      .getAll(localStorage.getItem('token'))
      .subscribe(
        (users: User[]): User[] => {
          for (let user of users) {
            if (user.blocked === "true") {
              user.blocked = "locked"
            } else {
              user.blocked = "unlocked"
            }
          }
          return this.users = users;
        }
      ,
      () => {
          console.log("error`");
        }
      );
  }

  block() {
    this.checkedUsersId = [];
    for (let user of this.users) {
      if (user.checked) {
        this.checkedUsersId.push(user.id);
      }
    }

    this.adminService.block(localStorage.getItem('token'), this.checkedUsersId)
      .subscribe(
        () => {
          this.ngOnInit();
        },
        () => {
          console.log("loh");
        }
      )
  }

  unblock() {
    this.checkedUsersId = [];
    for (let user of this.users) {
      if (user.checked) {
        this.checkedUsersId.push(user.id);
      }
    }

    this.adminService.unblock(localStorage.getItem('token'), this.checkedUsersId)
      .subscribe(
        () => {
          this.ngOnInit();
        },
        () => {
          console.log("loh");
        }
      )
  }

  setAdminRole() {
    this.checkedUsersId = [];
    for (let user of this.users) {
      if (user.checked) {
        this.checkedUsersId.push(user.id);
      }
    }

    this.adminService.setAdminRole(localStorage.getItem('token'), this.checkedUsersId)
      .subscribe(
        () => {
          this.ngOnInit();
        },
        () => {
          console.log("loh");
        }
      )
  }

  setDefaultRole() {
    this.checkedUsersId = [];
    for (let user of this.users) {
      if (user.checked) {
        this.checkedUsersId.push(user.id);
      }
    }

    this.adminService.setDefaultRole(localStorage.getItem('token'), this.checkedUsersId)
      .subscribe(
        () => {
          this.ngOnInit();
        },
        () => {
          console.log("loh");
        }
      )
  }
}