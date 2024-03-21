import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/comments'; // Base URL of your backend API

  constructor(private http: HttpClient) { }

  // Method to create a new comment
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/create`, comment);
  }

  // Method to update an existing comment
  updateComment(id: number, updatedComment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/${id}`, updatedComment);
  }

  // Method to delete a comment by ID
  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Method to retrieve a comment by ID
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }
}
