<<<<<<< HEAD
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../app/api/models/auth.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8084/blogs'; // Define API base URL

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
<<<<<<< HEAD

=======
  createBlog(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }
>>>>>>> f587f1debac57a0fcc52981fb5c4efbecbff23d6
  // Method to fetch sorted blogs by date (old or new)
  getBlogsByDateOld(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/sort/old`);
  }

  getCoursesByDateNew(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/sort/new`);
  }
  // Method to fetch sorted blogs by category
  getBlogsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sort/${category}`);
  }

  findByTitle(title: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?title=${title}`);
  }
}
