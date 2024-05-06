import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  providers: [Router],
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}

  //TODO: we have no guarantee that user will notice and read the message in 1 second
  //it's better to leave him on this page an introduce a button that will take him to a main page instead
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate([' ']);
    }, 1000);
  }
}
