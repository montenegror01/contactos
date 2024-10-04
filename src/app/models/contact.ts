export class Contact {
    id?: number;
    nombre: string;  // Obligatorio
    notas?: string;  // Opcional
    fecha_cumpleanos?: Date;  // Opcional
    pagina_web?: string;  // Opcional
    empresa?: string;  // Opcional
    telefonos: { numero: string; tipo: string }[];  // Obligatorio
    emails: { email: string }[];  // Obligatorio
    direcciones?: { direccion: string; ciudad?: string; estado?: string; pais?: string }[];  // Opcional
  
    constructor() {
      // Inicializa las propiedades obligatorias
      this.nombre = '';
      this.telefonos = [];
      this.emails = [];
    }
  }