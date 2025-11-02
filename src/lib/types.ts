export interface Project {
  id: string
  name: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  teamMembers: string[] // Array de IDs de miembros
  createdAt: Date
  updatedAt: Date
  progress: number
}

export interface TeamMember {
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: Date
  phone: string
  projectId: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  userId: string
  dateline: Date
  createdAt: Date
  updatedAt: Date
}

export interface AppConfig {
  siteName: string
  companyName: string
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  emailNotifications: boolean
  slackIntegration: boolean
  autoBackup: boolean
}

export interface DashboardMetrics {
  totalProjects: number
  completedTasks: number
  workedHours: number
  activeMembers: number
}