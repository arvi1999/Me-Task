import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  categories: any = [];
  // categoryList: any = [];

  selectedItem = null;
  selectedCategory = null;
  itStatus = null;
  editedItem = null;

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data["result"];
        // this.categoryList = data["result"];
        // console.log(data);
      },
      error => console.log(error)
    );
  }

  createCategory(category) {
    this.categories.push(category);
    this.selectedItem = null;
    this.editedItem = null;
  }

  selectItem(item) {
    this.selectedItem = item;
    this.editedItem = null;
    console.log("selected Item : ", this.selectedItem);
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.selectedItem = null;
    console.log("seected Category:", this.selectedCategory);
  }

  itemStatus(status) {
    this.itStatus = status;
  }

  editItem(item) {
    this.editedItem = item;
    this.selectedItem = null;
    console.log("Edited Item:", this.editedItem);
  }

  createTask() {
    this.editedItem={title:'', description:'', due_date:'', category:'', status:''};
    this.selectedItem = null;
  }
}
