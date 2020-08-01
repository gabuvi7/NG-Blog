import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { error } from 'protractor';
/* Uso el template de '../post-new/post-new.component.html' para reutilizar el codigo html */
@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public globalURL;
  public is_edit: boolean;
  public froala_Options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "emoticons",
      "align",
    ],
    toolbarButtonsXS: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "emoticons",
      "align",
    ],
    toolbarButtonsSM: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "emoticons",
      "align",
    ],
    toolbarButtonsMD: [
      "bold",
      "italic",
      "underline",
      "paragraphFormat",
      "emoticons",
      "align",
    ],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + "post/upload",
      method: "POST",
      headers: {
        Authorization: this._userService.getToken(),
      },
      params: {
        page: "1",
      },
      responseType: "blob",
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: "Select Files",
      resetBtn: "Reset",
      uploadBtn: "Upload",
      attachPinBtn: "Upload your post image!",
      afterUploadMsg_success: "Successfully Uploaded !",
      afterUploadMsg_error: "Upload Failed !",
      sizeLimit: "Size Limit",
    },
  };

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Edit your post';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.globalURL = global.url;
    this.is_edit = true;
   }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '','','','');
    
    this.getPost();
  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          //this.post = response.post;
          this._router.navigate(['/post',this.post.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  btnCancel(){
    this._router.navigateByUrl('/home');
  }

  imageUpload(data) {
    let dataResponse = JSON.parse(data.response);
    this.post.image = dataResponse.filename;
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
              if(response.message.user_id != this.identity.sub){
                this._router.navigate(['/home']);
              }
              this.post = response.message;
              console.log(this.post);
              console.log(response.message);
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
