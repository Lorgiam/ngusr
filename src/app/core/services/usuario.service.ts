import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Usuario } from '../../shared/models/usuario.model';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private headers: any;

  constructor(public http: HttpClient) {
    this.create_headers();
  }
  private create_headers() {
    this.headers = new HttpHeaders();
    this.headers.set('Content-type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  findAll(module: string) {
    this.create_headers();
    const url = `${environment.API_URL}/${module}/findAll`;
    return this.http
      .get<Usuario[]>(url, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  findById(module: string, id: any) {
    this.create_headers();
    const url = `${environment.API_URL}/${module}/findById/${id}`;
    return this.http
      .get<Usuario>(url, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  validate(module: string, query: any, param: any,param2:any) {
    this.create_headers();
    const url = `${environment.API_URL}/${module}/validate${query}/${param}/${param2}`;
    return this.http
      .get<Usuario>(url, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  exists(module: string, campo: string, id: any) {
    this.create_headers();
    const url = `${environment.API_URL}/${module}/exists${campo}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      tap((data) => data),
      catchError(this.handleError)
    );
  }

  save(module: string, object: any) {
    this.create_headers();
    const url = `${environment.API_URL}/usuario/create`;
    object.usucrea = 0;
    return this.http
      .post<Usuario>(url, object, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  update(module: string, object: any,id:any) {
    console.log(`${module} enviado`, object);
    this.create_headers();
    const url = `${environment.API_URL}/usuario/update/${id}`;
    return this.http
      .put<Usuario>(url, object, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  delete(module: string, id: any) {
    this.create_headers();
    const url = `${environment.API_URL}/${module}/delete/${id}`;
    return this.http
      .delete<Usuario>(url, { headers: this.headers })
      .pipe(
        tap((data) => data),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return observableThrowError(err.message);
  }
}
