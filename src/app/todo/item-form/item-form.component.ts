import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  @Input() categories;

  @Input() selectedCategory;

  @Input() set editedItem(val) {
    this.id = val.id;
    this.cat = val.category;
    this.status = val.completed;
    this.itemForm = new FormGroup({
      title : new FormControl(val.title),
      description : new FormControl(val.description),
      due_date: new FormControl(val.due_date, [Validators.required]),
      category: new FormControl(''),
      status: new FormControl('')
    });
  };

  id = null;

  cat;

  ngOnInit(): void {
  }

  status = null;

  itemForm;

  formDisabled() {
    if(
      this.itemForm.value.title.length && 
      this.itemForm.value.description.length && 
      this.itemForm.value.due_date.length && 
      this.cat && 
      this.status
      ) {
        return false;
      } else {
        return true;
      }
  }

  saveForm() {
    this.itemForm.value.category=this.cat; 
    this.itemForm.value.status=this.status;
    
    if(this.id) {
      this.apiService.updateItem(
        this.id, 
        this.itemForm.value.title, 
        this.itemForm.value.description, 
        this.itemForm.value.due_date, 
        this.itemForm.value.status
      ).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
    } else {
      this.apiService.createItem(
        this.itemForm.value.title,
        this.itemForm.value.description,
        this.itemForm.value.due_date,
        this.itemForm.value.category,
        this.itemForm.value.status
      ).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
    }
    
    
  }

}
