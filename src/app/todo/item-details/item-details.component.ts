import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  @Input() item;
  @Input() category;
  @Input() status;

  faCheckCircle = faCheckCircle;

  ngOnInit(): void {

  }
  
  changeStatus() {
    this.apiService.updateItemStatus(this.item.id, this.status).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }
}
