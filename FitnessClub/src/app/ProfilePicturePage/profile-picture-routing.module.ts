import { Routes, RouterModule } from '@angular/router';
import { UploadComponent} from "../shared/profile-picture/upload.component";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'upload', component: UploadComponent }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfilePictureRoutingModule { }
