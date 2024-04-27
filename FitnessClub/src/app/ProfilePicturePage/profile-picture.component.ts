import { Component } from '@angular/core';
import { AvatarService} from "../core/service/avatar.service";
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private avatarService: AvatarService) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const fileName: string = 'photo_2023-12-20_00-07-20.jpg';
    this.avatarService.addAvatarPicture(file, fileName).subscribe(
      (response) => {
        console.log('Avatar uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading avatar:', error);
      }
    );
  }
}

