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
      telefonos: this.fb.array([]),  
      emails: this.fb.array([]),
      direcciones: this.fb.array([])    
    });
  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe(
      (contact: Contact) => {
        console.log(contact);
        if (contact) {
          this.contactForm.patchValue({
            nombre: contact.nombre,
            notas: contact.notas,
            fecha_cumpleanos: contact.fecha_cumpleanos,
            pagina_web: contact.pagina_web,
            empresa: contact.empresa
          });
          
          // Inicializa los teléfonos solo si existen
          if (contact.telefonos && contact.telefonos.length > 0) {
            contact.telefonos.forEach((telefono: any) => {
              this.telefonos.push(this.fb.group({
                numero: [telefono.numero, Validators.required],
                tipo: [telefono.tipo]
              }));
            });
          }
  
          // Inicializa los correos solo si existen
          if (contact.emails && contact.emails.length > 0) {
            contact.emails.forEach((email: any) => {
              this.emails.push(this.fb.group({
                email: [email.email, [Validators.required, Validators.email]]
              }));
            });
          }

          // Inicializar las direcciones
          if (contact.direcciones && contact.direcciones.length > 0) {
            contact.direcciones.forEach((direccion: any) => {
              this.direcciones.push(this.fb.group({
                direccion: [direccion.direccion, Validators.required],
                ciudad: [direccion.ciudad, Validators.required],
                estado: [direccion.estado, Validators.required],
                codigo_postal: [direccion.codigo_postal, Validators.required]
              }));
            });
          }
        } else {
          console.error('No contact found.');
        }
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
      tipo: ['']  
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
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  get direcciones(): FormArray {
    return this.contactForm.get('direcciones') as FormArray;
  }

  addDireccion() {
    this.direcciones.push(this.fb.group({
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      estado: ['', Validators.required],
      codigo_postal: ['', Validators.required]
    }));
  }

  removeDireccion(index: number) {
    this.direcciones.removeAt(index);
  }
}
