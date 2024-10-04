import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router  
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      notas: [''],
      fecha_cumpleanos: [''],
      pagina_web: [''],
      empresa: [''],
      telefonos: this.fb.array([]), 
      emails: this.fb.array([])      
    });
  }

  ngOnInit(): void {}

  get telefonos() {
    return this.contactForm.get('telefonos') as FormArray;
  }

  get emails() {
    return this.contactForm.get('emails') as FormArray;
  }

  addTelefono() {
    this.telefonos.push(this.fb.group({
      numero: ['', Validators.required],
      tipo: ['']  
    }));
  }

  removeTelefono(index: number) {
    this.telefonos.removeAt(index);
  }

  addEmail() {
    this.emails.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  addContact(): void {
    if (this.contactForm.valid) {
      const newContact: Contact = this.contactForm.value;
      this.contactService.addContact(newContact).subscribe(
        (contact) => {
          console.log('Contacto agregado:', contact);
          this.router.navigate(['/contacts']);
        },
        error => {
          console.error('Error al agregar el contacto:', error);
        }
      );
    }
  }
}
