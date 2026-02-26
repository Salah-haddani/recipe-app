import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  @Input() title: string = 'Collection';
  @Input() items: any[] = [];
  @Input() totalCount: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 3;
  @Input() sortOrder: string = 'desc';

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onSortToggle = new EventEmitter<void>();
  @Output() onPageChange = new EventEmitter<number>();
}
