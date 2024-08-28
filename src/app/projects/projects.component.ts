import { Component, OnInit } from '@angular/core';
import { ApiService, Project } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  project: Project = { name: '', title: '', photo: {} as File, link: '' };
  editMode = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.apiService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.project.photo = file;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateProject(this.project).subscribe(
        (response: any) => {
          console.log('Project updated successfully:', response);
          this.fetchProjects();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      this.apiService.uploadProject(this.project).subscribe(
        (response: any) => {
          console.log('Project uploaded successfully:', response);
          this.fetchProjects();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error uploading project:', error);
        }
      );
    }
  }

  editProject(proj: Project): void {
    this.project = { ...proj };
    this.editMode = true;
  }

  deleteProject(projectId?: string): void { 
    if (projectId) {
      this.apiService.deleteProject(projectId).subscribe(
        () => {
          console.log('Project deleted successfully');
          this.fetchProjects();
        },
        (error: any) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.project = { name: '', title: '', photo: {} as File, link: '' };
    this.editMode = false;
  }
}
