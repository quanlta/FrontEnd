import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8084/api/user/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



const accessToken = localStorage.getItem('accessToken');

const httOptionsUploadVideo = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }),
}

const httpOptionsAuth = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }
  verifySignup(email: string, otp: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify',
      {
        otp,
        email,
      },
      httpOptions
    );
  }

  register(
    fullname: string,
    password: string,
    email: string,
    facebook: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        fullname,
        email,
        password,
        facebook,
      },
      httpOptions,

    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgetPassword',
      {
        email,
      },
      httpOptions
    );
  }
  verifyForgotPassword(
    email: string,
    otp: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'verifyForgetPassword',
      {
        email,
        otp,
        newPassword,
      },
      httpOptions
    );
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(AUTH_API + 'avatar', formData, httpOptionsAuth);
  }

  updateUserInfo(
    id: any,
    fullname: string,
    facebook: string,
    image: string,
    roleId?: 2,
    enable?: true
  ): Observable<any> {
    return this.http.put(
      AUTH_API + id,
      {
        fullname,
        facebook,
        image,
        roleId,
        enable,
      },
      httpOptionsAuth
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get(
      AUTH_API + 'info',
      httpOptionsAuth
    );
  }


  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
