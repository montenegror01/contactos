import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  contacts: any;
  currentPage: number = 1;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject();

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.getContacts();
    });
  }

  getContacts(): void {
    this.contactService.getContacts(this.currentPage, this.searchTerm).subscribe(
      (response: any) => {
        this.contacts = response;
      },
      error => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  onSearchTermChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement?.value || '';  // Verifica que haya un valor
    this.searchTerm = searchValue;
    this.searchSubject.next(searchValue);
}

  goToPage(page: number) {
    this.currentPage = page;
    this.getContacts();
  }

  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe(
        () => {
          this.getContacts();
        },
        error => {
          console.error('Error deleting contact:', error);
        }
      );
    }
  }
}
