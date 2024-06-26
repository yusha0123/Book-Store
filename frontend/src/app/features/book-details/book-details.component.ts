import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  @Input() id!: string;
  loading: boolean = false;
  book: Book | null = null;
  notFound: boolean = false;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookService.getSingleBook(this.id).subscribe({
      next: (response: Book | null) => {
        if (response) {
          this.book = response;
        } else {
          this.notFound = true;
        }
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      },
    });
  }

  onAddToCart(book: Book): void {
    this.cartService.addToCart(book);
  }
}
