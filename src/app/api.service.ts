import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService          
    ) { }

  baseUrl = "http://127.0.0.1:8000/";
  baseItemUrl = `${this.baseUrl}todoapi/item/`;
  baseCategoryUrl = `${this.baseUrl}todoapi/category/`;

  headers = new HttpHeaders({
    // 'Accept': 'application/json;odata=verbose',
    'Content-Type':'application/json',
    // 'Authorization' : 'Token 3bcf25b28c878613fdf2267f8a73ecf9ac9821fb',
  });

  // headers= new HttpHeaders({
  //   'Content-Type':  'application/json',
  //   'Access-Control-Allow-Credentials' : 'true',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
  //   'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  //   'Authorization' : 'Token 3bcf25b28c878613fdf2267f8a73ecf9ac9821fb'
  // });

  getCategories() {
    return this.httpClient.get(`${this.baseCategoryUrl}get_category/`, {headers: this.getAuthHeader()});
  }

  getItemsForCategory(id:number) {
    return this.httpClient.get(`${this.baseItemUrl}${id}/category_item/`, {headers: this.getAuthHeader()})
  }

  createCategory(name:string) {
    const body = JSON.stringify({'name':name});
    return this.httpClient.post(`${this.baseCategoryUrl}create_category/`, body, {headers: this.getAuthHeader()});
  }

  deleteCategory(id:number) {
    return this.httpClient.delete(`${this.baseCategoryUrl}${id}/delete_category/`, {headers: this.getAuthHeader()});
  }

  updateItemStatus(id:number, completed:string) {
    const body = JSON.stringify({'completed':completed});
    return this.httpClient.put(`${this.baseItemUrl}${id}/update_status/`, body,  {headers: this.getAuthHeader()});
  }

  updateItem(id:number, title: string, description: string, due_date: Date, completed: string) {
    const body = JSON.stringify({'title':title, 'description':description, 'due_date':due_date, 'completed':completed});
    return this.httpClient.post(`${this.baseItemUrl}${id}/update_item/`,body, {headers: this.headers});
  }

  createItem(title:string, description:string, due_date:Date, category, completed) {
    const body = JSON.stringify({'title':title, 'description':description, 'due_date':due_date, 'category':category, 'completed':completed});
    return this.httpClient.post(`${this.baseItemUrl}create_item/`, body, {headers: this.getAuthHeader()});
  }

  deleteItem(id:number) {
    return this.httpClient.delete(`${this.baseItemUrl}${id}/delete_item/`, {headers: this.getAuthHeader()});
  }

  loginUser(username:string, password:string) {
    const body = JSON.stringify({'username':username, 'password':password});
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }

  registerUser(username:string, password:string) {
    const body =  JSON.stringify({'username':username, 'password':password});
    return this.httpClient.post(`${this.baseUrl}/todoapi/user/`, body, {headers: this.headers});
  }

  getAuthHeader() {
    const token = this.cookieService.get('login_user_token');
    return new HttpHeaders({
      // 'Accept': 'application/json;odata=verbose',
      'Content-Type':'application/json',
      // application/json;odata=verbose
      Authorization : `Token ${token}`
    });
  }
}
