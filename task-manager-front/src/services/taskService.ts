export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  position: number;
  comments?: Comment[];
}

export interface Column {
  id: string;
  title: string;
  position: number;
}

// Datos de ejemplo para columnas
export const getColumns = async (): Promise<Column[]> => {
  return [
    { id: "todo", title: "Por hacer", position: 0 },
    { id: "doing", title: "En progreso", position: 1 },
    { id: "done", title: "Completado", position: 2 },
  ];
};

export const getTasks = async (): Promise<Task[]> => {
  // Aquí normalmente harías una llamada a tu API
  // Por ahora retornamos datos de ejemplo
  return [
    {
      id: "1",
      title: "Implementar autenticación",
      description: "Agregar sistema de login y registro usando JWT y bcrypt para la seguridad",
      status: "todo",
      position: 0,
      comments: []
    },
    {
      id: "2",
      title: "Diseñar dashboard",
      description: "Crear un diseño moderno y responsive para el dashboard principal con estadísticas",
      status: "doing",
      position: 0,
      comments: []
    },
    {
      id: "3",
      title: "Optimizar rendimiento",
      description: "Implementar lazy loading y mejorar el tiempo de carga de la aplicación",
      status: "done",
      position: 0,
      comments: []
    },
    {
      id: "4",
      title: "Testing unitario",
      description: "Escribir tests unitarios para los componentes principales usando Jest",
      status: "todo",
      position: 1,
      comments: []
    },
    {
      id: "5",
      title: "Documentación API",
      description: "Documentar todos los endpoints de la API usando Swagger",
      status: "doing",
      position: 1,
      comments: []
    }
  ];
}; 