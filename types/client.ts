export type Cliente = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  estado: 'Potencial' | 'Activo' | 'Inactivo';
  creado_por: string;
  creado_el: string;
};

export type Interaccion = {
  id: number;
  cliente_id: number;
  tipo: 'Llamada' | 'Email' | 'Reunión';
  descripcion: string;
  fecha: string;
  creado_por: string;
};

export type Oportunidad = {
  id: number;
  cliente_id: number;
  descripcion: string;
  valor: number;
  estado: 'Abierta' | 'Ganada' | 'Perdida';
  fecha_cierre: string;
  creado_por: string;
};