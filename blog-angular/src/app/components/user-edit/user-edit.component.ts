import { Component, OnInit } from "@angular/core";
import { User } from "../../models/users";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public globalURL;
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
      url: global.url + "user/upload",
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
      attachPinBtn: "Upload your avatar!",
      afterUploadMsg_success: "Successfully Uploaded !",
      afterUploadMsg_error: "Upload Failed !",
      sizeLimit: "Size Limit",
    },
  };

  constructor(private _userService: UserService, private _router: Router) {
    this.page_title = "Settings";
    //this.user = new User(1, "", "", "ROLE_USER", "", "", "", "", "");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //Seteo la url para el avatar.
    this.globalURL = global.url;
    //Relleno los campos de usuario con los datos logueados.
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      "",
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        if (response && response.status == "success") {
          this.status = response.status;
          //Actualiza el usuario en session.
          switch (response.changes) {
            case response.changes.name:
              this.user.name = response.changes.name;
              break;

            case response.changes.surname:
              this.user.surname = response.changes.name;
              break;

            case response.changes.email:
              this.user.email = response.changes.email;
              break;

            case response.changes.description:
              this.user.description = response.changes.description;
              break;

            case response.changes.image:
              this.user.image = response.changes.image;
              break;
          }

          this.identity = this._userService.getIdentity();
          sessionStorage.setItem("identity", JSON.stringify(this.identity));
          console.log(response);
          console.log('this.identity: ' + this.identity);
          //Redireccion al inicio.
          setTimeout(() => {this._router.navigate(["/home"])},5000);
        } else {
        }
      },
      (error) => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

  btnCancel() {
    //Redireccion al inicio.
    this._router.navigate(["/home"]);
  }

  avatarUpload(data) {
    let dataResponse = JSON.parse(data.response);
    this.user.image = dataResponse.image;
    console.log(this.user.image);
  }
}
