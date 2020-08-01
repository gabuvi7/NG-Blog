import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/users';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public url;
  public identity;
  public token;
  public posts: Array<Post>;
  public user: User;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();

  }

 ngOnInit() {
  this.getProfile();
  }

  getProfile(){
    this._route.params.subscribe(
      params => {
        let userId = +params['id'];
        this.getPosts(userId);
        this.getUser(userId);
      }
    );
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPosts(userId){
    this._userService.getPosts(userId).subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
