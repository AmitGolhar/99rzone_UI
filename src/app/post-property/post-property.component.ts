import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-property',
  templateUrl: './post-property.component.html',
  styleUrls: ['./post-property.component.css']
})
export class PostPropertyComponent {
  cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
  formData = {
    name: '',
    email: '',
    mobile: '',
    city: '',
    adType: ''
  };
constructor(private router: Router, private route: ActivatedRoute) {}

    

  onSubmit() {
    console.log('Form Data:', this.formData);
  this.router.navigate(['post-property/details'], { relativeTo: this.route });
    
  }
}
