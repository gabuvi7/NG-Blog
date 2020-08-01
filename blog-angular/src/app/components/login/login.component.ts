import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/users";
import { UserService } from "../../services/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Login!";
    this.user = new User(1, "", "", "ROLE_USER", "", "", "", "");
  }

  ngOnInit(): void {
    //Se ejecuta cuando inicio el componente.
    this.logout();
  }

  onSubmit(form) {
    this._userService.signUp(this.user).subscribe(
      (response) => {
        //Obtengo el token.
        if (response.status != "error") {
          this.status = "success";
          this.token = response;
          //Obtengo el usuario identificado
          this._userService.signUp(this.user, true).subscribe(
            (response) => {
              this.identity = response;
              console.log(this.token);
              console.log(this.identity);
              //Con localStorage persisto los datos del usuario para poder navegar en toda la web, el usuario debe vaciar la cache del navegador.
              //Con sessionStorage los datos se mantienen mientras el navegador no se cierre.
              //  la diferencia entre éstas dos es que localStorage almacena la información de forma indefinida o hasta que se decida limpiar los datos del navegador y sessionStorage almacena información mientras la pestaña donde se esté utilizando siga abierta, una vez cerrada, la información se elimina.
              sessionStorage.setItem("token", JSON.stringify(this.token));
              sessionStorage.setItem("identity", JSON.stringify(this.identity));
              //Redireccion al inicio.
              this._router.navigate(["/home"]);
            },
            (error) => {
              this.status = "error";
            }
          );
        } else {
          this.status = "error";
        }
      },
      (error) => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params["sure"]; //Con el + delante de la variable lo convierto en un INT
      if (logout == 1) {
        //sessionStorage.removeItem('identity');
        //sessionStorage.removeItem('token');
        sessionStorage.clear();

        this.identity = null;
        this.token = null;
        //Redireccion al inicio.
        this._router.navigate(["/login"]);
      }
    });
  }
}
