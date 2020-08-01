import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  //Recojo las variables que envio por el input en otros componentes.
  @Input() posts;
  @Input() identity;
  @Input() url;

  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deletePost(postId){
    this.delete.emit(postId);
  }

}
