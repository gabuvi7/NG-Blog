import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from "../../services/global";

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService,PostService]
})
export class PostNewComponent implements OnInit {
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
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Create post';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.globalURL = global.url;
    this.is_edit = false;
   }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '','','','');
    
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/home']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
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
}
