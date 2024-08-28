// import { Component, OnInit } from '@angular/core';
// import { ApiService, Skill } from '../api.service';

// @Component({
//   selector: 'app-skills',
//   templateUrl: './skills.component.html',
//   styleUrls: ['./skills.component.css']
// })
// export class SkillsComponent implements OnInit {
//   skills: Skill[] = [];
//   skill: Skill = { name: '', photo: {} as File };
//   editMode = false;

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.fetchSkills();
//   }

//   fetchSkills(): void {
//     this.apiService.getSkills().subscribe(
//       (skills: Skill[]) => {
//         this.skills = skills;
//       },
//       (error: any) => {
//         console.error('Error fetching skills:', error);
//       }
//     );
//   }

//   onFileChange(event: any): void {
//     const file = event.target.files[0];
//     this.skill.photo = file;
//   }

//   onSubmit(): void {
//     if (this.editMode) {
//       this.apiService.updateSkill(this.skill).subscribe(
//         (response: any) => {
//           console.log('Skill updated successfully:', response);
//           this.fetchSkills();
//           this.resetForm();
//         },
//         (error: any) => {
//           console.error('Error updating skill:', error);
//         }
//       );
//     } else {
//       this.apiService.uploadSkill(this.skill).subscribe(
//         (response: any) => {
//           console.log('Skill uploaded successfully:', response);
//           this.fetchSkills();
//           this.resetForm();
//         },
//         (error: any) => {
//           console.error('Error uploading skill:', error);
//         }
//       );
//     }
//   }

//   editSkill(skill: Skill): void {
//     this.skill = { ...skill };
//     this.editMode = true;
//   }

//   deleteSkill(id: string): void {  // Add this method
//     this.apiService.deleteSkill(id).subscribe(
//       (response: any) => {
//         console.log('Skill deleted successfully:', response);
//         this.fetchSkills();
//       },
//       (error: any) => {
//         console.error('Error deleting skill:', error);
//       }
//     );
//   }

//   resetForm(): void {
//     this.skill = { name: '', photo: {} as File };
//     this.editMode = false;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ApiService, Skill } from '../api.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skill: Skill = { name: '', photo: {} as File };
  editMode = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchSkills();
  }

  fetchSkills(): void {
    this.apiService.getSkills().subscribe(
      (skills: Skill[]) => {
        this.skills = skills;
      },
      (error: any) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.skill.photo = file;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateSkill(this.skill).subscribe(
        (response: any) => {
          console.log('Skill updated successfully:', response);
          this.fetchSkills();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating skill:', error);
        }
      );
    } else {
      this.apiService.uploadSkill(this.skill).subscribe(
        (response: any) => {
          console.log('Skill uploaded successfully:', response);
          this.fetchSkills();
          this.resetForm();
        },
        (error: any) => {
          console.error('Error uploading skill:', error);
        }
      );
    }
  }

  editSkill(skill: Skill): void {
    this.skill = { ...skill };
    this.editMode = true;
  }

  deleteSkill(id?: string): void {
    if (id) {
      this.apiService.deleteSkill(id).subscribe(
        () => {
          console.log('Skill deleted successfully');
          this.fetchSkills(); 
        },
        (error: any) => {
          console.error('Error deleting skill:', error);
        }
      );
    } else {
      console.error('Skill ID is undefined');
    }
  }


  resetForm(): void {
    this.skill = { name: '', photo: {} as File };
    this.editMode = false;
  }
}
