import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  contacts: any;
  currentPage: number = 1;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts(this.currentPage).subscribe(
      (response: any) => {
        console.log('Datos obtenidos:', response);
        this.contacts = response;
      },
      error => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.getContacts();
  }
  
  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
    this.contactService.deleteContact(id).subscribe(
      () => {

        console.log('Contacto eliminado',this.contacts);
        this.getContacts();
      },
      error => {
        console.error('Error deleting contact:', error);
      }
    );
  }
  }
}

