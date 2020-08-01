import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/categories';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [ CategoryService, UserService, PostService ]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string; 
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) { 
    this.page_title = 'Category Detail';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(
      params => {
        let id = +params['id']; //obtengo el id de la categoria por la url.

        this._categoryService.getCategory(id).subscribe(
          response => {
            if(response.status == 'success'){
              this.category = response.category;
              this._categoryService.getPostsCategory(id).subscribe(
                response => {
                  if(response.status == 'success'){
                    this.posts = response.posts;
                    console.log(response);
                    console.log(this.posts);
                  }else{
                    this._router.navigate(['/home']);
                  }
                },
                error => {
                  console.log(<any>error);
                }
              );
            }else{
              this._router.navigate(['/home']);
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
