// Traducciones para los estados y prioridades
export const statusTranslations = {
  'planning': 'Planificación',
  'in-progress': 'En Progreso',
  'review': 'En Revisión',
  'completed': 'Completado',
  'pending': 'Pendiente'
} as const

export const priorityTranslations = {
  'low': 'Baja',
  'medium': 'Media',
  'high': 'Alta',
  'urgent': 'Urgente'
} as const

export const categoryTranslations = {
  'web': 'Desarrollo Web',
  'mobile': 'Desarrollo Mobile',
  'design': 'Diseño',
  'marketing': 'Marketing',
  'other': 'Otro'
} as const

export const positionTranslations = {
  'Junior Developer': 'Desarrollador Junior',
  'Senior Developer': 'Desarrollador Senior',
  'Lead Developer': 'Desarrollador Líder',
  'Designer': 'Diseñador',
  'Project Manager': 'Gerente de Proyecto',
  'QA Engineer': 'Ingeniero QA',
  'DevOps Engineer': 'Ingeniero DevOps'
} as const

// Función para traducir estado
export function translateStatus(status: string): string {
  return statusTranslations[status as keyof typeof statusTranslations] || status
}

// Función para traducir prioridad
export function translatePriority(priority: string): string {
  return priorityTranslations[priority as keyof typeof priorityTranslations] || priority
}

// Función para traducir categoría
export function translateCategory(category: string): string {
  return categoryTranslations[category as keyof typeof categoryTranslations] || category
}

// Función para formatear fecha
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

// Función para calcular días restantes
export function getDaysRemaining(deadline: Date): { days: number; isOverdue: boolean } {
  const today = new Date()
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return {
    days: Math.abs(diffDays),
    isOverdue: diffDays < 0
  }
}