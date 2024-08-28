import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id?: string;
  name: string;
  title: string;
  photo: File;
  link: string;
}

export interface Skill {
  _id?: string;
  name: string;
  photo: File;
}

export interface About {
  _id?: string;
  photo: File;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  loginAdmin(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/admin/login', { username, password });
  }



  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  }


  uploadProject(project: Project): Observable<any> {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('title', project.title);
    formData.append('photo', project.photo);
    formData.append('link', project.link);

    return this.http.post(`${this.apiUrl}/projects`, formData, this.getAuthHeaders());
  }


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, this.getAuthHeaders());
  }


  updateProject(project: Project): Observable<any> {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('title', project.title);
    formData.append('photo', project.photo);
    formData.append('link', project.link);

    return this.http.put(`${this.apiUrl}/projects/${project._id}`, formData, this.getAuthHeaders());
  }


  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${projectId}`, this.getAuthHeaders());
  }


  uploadSkill(skill: Skill): Observable<any> {
    const formData = new FormData();
    formData.append('name', skill.name);
    formData.append('photo', skill.photo);

    return this.http.post(`${this.apiUrl}/skills`, formData, this.getAuthHeaders());
  }


  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`, this.getAuthHeaders());
  }


  updateSkill(skill: Skill): Observable<any> {
    const formData = new FormData();
    formData.append('name', skill.name);
    formData.append('photo', skill.photo);

    return this.http.put(`${this.apiUrl}/skills/${skill._id}`, formData, this.getAuthHeaders());
  }


  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skills/${id}`, this.getAuthHeaders());
  }


  uploadAbout(about: About): Observable<any> {
    const formData = new FormData();
    formData.append('photo', about.photo);
    formData.append('description', about.description);

    return this.http.post(`${this.apiUrl}/about`, formData, this.getAuthHeaders());
  }


  getAbout(): Observable<About> {
    return this.http.get<About>(`${this.apiUrl}/about`, this.getAuthHeaders());
  }


  updateAbout(about: About): Observable<any> {
    const formData = new FormData();
    formData.append('photo', about.photo);
    formData.append('description', about.description);

    return this.http.put(`${this.apiUrl}/about/${about._id}`, formData, this.getAuthHeaders());
  }
}
