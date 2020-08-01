import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/users";
import { global } from "./global";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public url: string;
  public identity;
  public token;
  public user: User;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user); // Convierto el json del user en string.
    let params = "json=" + json;

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this._http.post(this.url + "register", params, { headers: headers });
  }

  signUp(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = "true";
    }
    let json = JSON.stringify(user);
    let params = "json=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this._http.post(this.url + "login", params, { headers: headers });
  }

  getIdentity() {
    //Como el item identity es un string, necesito parsearlo a un JSON.
    let identity = JSON.parse(sessionStorage.getItem("identity"));
    if (identity && identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    //Como el item token es un string, necesito parsearlo a un JSON.
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token && token != undefined) {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  update(token, user): Observable<any>  {
    user.description = global.htmlEntities(user.description); //Limpio el campo content de las html entities. Las pasa a utf8
    let json = JSON.stringify(user);
    let params = "json=" + json;

    let headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);
    
    return this._http.put(this.url + 'user/update',params,{headers:headers});
  }

  getPosts(id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post/user/' + id, {headers: headers});
  }

  getUser(id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'user/userDetail/' + id, {headers: headers});
  }
}
