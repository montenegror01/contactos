import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      notas: [''],
      fecha_cumpleanos: [''],
      pagina_web: [''],
      empresa: [''],
      telefonos: this.fb.array([]),  // Inicializa como un array
      emails: this.fb.array([])       // Inicializa como un array
    });
  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe(
      (contact) => {
        this.contactForm.patchValue(contact);
        // Inicializar los teléfonos
        contact.telefonos.forEach((telefono: any) => {
          this.telefonos.push(this.fb.group({
            numero: [telefono.numero, Validators.required],
            tipo: [telefono.tipo]
          }));
        });
        // Inicializar los emails
        contact.emails.forEach((email: any) => {
          this.emails.push(this.fb.group({
            direccion: [email.direccion, [Validators.required, Validators.email]]
          }));
        });
      },
      (error) => {
        console.error('Error fetching contact:', error);
      }
    );
  }

  editContact(): void {
    if (this.contactForm.valid) {
      const updatedContact: Contact = this.contactForm.value;
      this.contactService.updateContact(this.contactId, updatedContact).subscribe(
        () => {
          console.log('Contacto actualizado:', updatedContact);
          this.router.navigate(['/contacts']);  // Redirige después de actualizar
        },
        (error) => {
          console.error('Error updating contact:', error);
        }
      );
    }
  }

  get telefonos() {
    return this.contactForm.get('telefonos') as FormArray;
  }
  
  addTelefono() {
    this.telefonos.push(this.fb.group({
      numero: ['', Validators.required],
      tipo: ['']  // Puedes agregar más validaciones si lo necesitas
    }));
  }

  removeTelefono(index: number) {
    this.telefonos.removeAt(index);
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(this.fb.group({
      direccion: ['', [Validators.required, Validators.email]]
    }));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }
}
