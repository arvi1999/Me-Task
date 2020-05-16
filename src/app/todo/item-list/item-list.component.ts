import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { faTasks, faThumbtack, faEdit, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { compileDirectiveFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() categories;
  @Output() selectedItem = new EventEmitter();
  category_items = null;

  @Output() itemStatus = new EventEmitter();

  @Output() selectedCategory = new EventEmitter();

  @Output() editedItem = new EventEmitter();

  @Output() createdCategory = new EventEmitter();

  @Output() addItem = new EventEmitter();

  @Output() deletedCategory = new EventEmitter();

  categoryForm = new FormGroup({
    name : new FormControl('')
  });



  constructor(private apiService:ApiService) { }
  faTasks = faTasks;
  faThumbtack = faThumbtack;
  faTrash = faTrash;
  faEdit = faEdit;
  faArrowRight = faArrowRight;

  ngOnInit(): void {
    
  }

  formDisable() {
    if(this.categoryForm.value.name.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  newCategory() {
    this.apiService.createCategory(this.categoryForm.value.name).subscribe(
      result => this.createdCategory.emit(result["result"]),
      error => console.log(error)
    );
    this.categoryForm = new FormGroup({
      name: new FormControl('')
    });
  }

  deleteCategory(id:number) {
    this.apiService.deleteCategory(id).subscribe(
      result => this.deletedCategory.emit(id),
      error => console.log(error)
    );
  }

  getItems(id:number, category:string) {
    this.selectedCategory.emit(category);
    this.apiService.getItemsForCategory(id).subscribe(
      data => this.category_items = data["result"],
      error => console.log(error)
    );
  }

  itemDetails(item, status) {
    this.selectedItem.emit(item);
    this.itemStatus.emit(status);
  }

  editItem(item) {
    this.editedItem.emit(item);
  }

  createTask() {
    this.addItem.emit();
  }

  deleteItem(item) {
    console.log("delete function called...");
    this.apiService.deleteItem(item.id).subscribe(
      result => this.category_items = this.category_items.filter(it => it.id !== item.id),
      error => console.log(error)
    );
  }

}

// this.movies = this.movies.filter(mov => mov.id !== movie.id),
