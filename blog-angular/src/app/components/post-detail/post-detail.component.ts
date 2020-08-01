import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import  {Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: any;
  public url;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    this._route.params.subscribe(
      params => {
        //Obtengo id del post
        let id = +params['id']; //El signo + lo transforma en entero.
        console.log(id);

        // Peticion ajax para sacar los datos del post

        this._postService.getPost(id).subscribe(
          response => {
            if(response.status == 'success'){
              this.post = response.message;
              console.log(this.post);
            }else{
              this._router.navigate(['/home']);
            }
          },
          error => {
            console.log(<any>error);
            this._router.navigate(['/home']);
          }
        );
      }
    );
  }

}
