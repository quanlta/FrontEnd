import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
