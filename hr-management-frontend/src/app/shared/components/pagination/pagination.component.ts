import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: false
})
export class PaginationComponent {
  /** Page courante (index 0) */
  @Input() page = 0;
  @Input() totalPages = 0;
  @Input() totalElements = 0;
  @Input() size = 10;
  @Input() sizeOptions: number[] = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() sizeChange = new EventEmitter<number>();

  get from(): number {
    return this.totalElements === 0 ? 0 : this.page * this.size + 1;
  }

  get to(): number {
    return Math.min((this.page + 1) * this.size, this.totalElements);
  }

  get isFirst(): boolean {
    return this.page <= 0;
  }

  get isLast(): boolean {
    return this.page >= this.totalPages - 1;
  }

  go(page: number): void {
    if (page < 0 || page > this.totalPages - 1 || page === this.page) return;
    this.pageChange.emit(page);
  }

  onSizeChange(event: Event): void {
    this.sizeChange.emit(Number((event.target as HTMLSelectElement).value));
  }
}
