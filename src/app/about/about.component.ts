import { Component, OnInit } from '@angular/core';
import { ApiService, About } from '../api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about: About = { photo: {} as File, description: '' };
  editMode = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchAbout();
  }

  fetchAbout(): void {
    this.apiService.getAbout().subscribe(
      (about: About) => {
        this.about = about;
        this.editMode = true;
      },
      (error: any) => {
        console.error('Error fetching about:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.about.photo = file;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateAbout(this.about).subscribe(
        (response: any) => {
          console.log('About updated successfully:', response);
        },
        (error: any) => {
          console.error('Error updating about:', error);
        }
      );
    } else {
      this.apiService.uploadAbout(this.about).subscribe(
        (response: any) => {
          console.log('About uploaded successfully:', response);
          this.editMode = true;
        },
        (error: any) => {
          console.error('Error uploading about:', error);
        }
      );
    }
  }
}
