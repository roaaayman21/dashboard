import { Component, OnInit } from '@angular/core';
import { ApiService, Experience } from '../api.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  experiences: Experience[] = [];
  experience: Experience = { title: '', company: '', from: '' };
  editMode = false;
  currentDate = new Date().toISOString().split('T')[0];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchExperiences();
  }

  fetchExperiences(): void {
    this.apiService.getExperiences().subscribe(
      (experiences: Experience[]) => {
        this.experiences = experiences;
      },
      (error: any) => {
        console.error('Error fetching experiences:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateExperience(this.experience).subscribe(
        () => {
          console.log('Experience updated successfully');
          this.fetchExperiences();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating experience:', error);
        }
      );
    } else {
      this.apiService.uploadExperience(this.experience).subscribe(
        () => {
          console.log('Experience added successfully');
          this.fetchExperiences();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding experience:', error);
        }
      );
    }
  }

  editExperience(exp: Experience): void {
    // Create a copy of the experience
    this.experience = { ...exp };

    // Format dates for date input fields if they exist
    if (this.experience.from) {
      this.experience.from = new Date(this.experience.from).toISOString().split('T')[0];
    }
    if (this.experience.to) {
      this.experience.to = new Date(this.experience.to).toISOString().split('T')[0];
    }

    this.editMode = true;
  }

  deleteExperience(id?: string): void {
    if (id) {
      this.apiService.deleteExperience(id).subscribe(
        () => {
          console.log('Experience deleted successfully');
          this.fetchExperiences();
        },
        (error: any) => {
          console.error('Error deleting experience:', error);
        }
      );
    } else {
      console.error('Experience ID is undefined');
    }
  }

  resetForm(): void {
    this.experience = { title: '', company: '', from: '' };
    this.editMode = false;
  }
}

