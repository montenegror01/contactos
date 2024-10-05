import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://tu-url-api/api/contactos';

  constructor(private http: HttpClient) { }

  // Obtener todos los contactos
  getContacts(page: number = 1): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}?page=${page}`);
  }

  // Agregar un nuevo contacto
  addContact(contact: Contact): Observable<Contact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Contact>(this.apiUrl, contact, { headers });
  }

  // Editar un contacto existente
  editContact(contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/${contact.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Contact>(url, contact, { headers });
  }

  // Eliminar un contacto
  deleteContact(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  //Obtener contacto por id
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  //Actualizar contacto
  updateContact(id: number, contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
  }
}
