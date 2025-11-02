"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Project, TeamMember, Task, AppConfig, DashboardMetrics } from '@/lib/types'

// Estado inicial
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con Next.js',
    category: 'web',
    priority: 'high',
    status: 'in-progress',
    teamMembers: ['1', '2'],
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-11-01'),
    progress: 65
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Aplicación móvil con React Native',
    category: 'mobile',
    priority: 'medium',
    status: 'review',
    teamMembers: ['3', '4'],
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2025-10-30'),
    progress: 90
  }
]

const initialTeamMembers: TeamMember[] = [
  {
    userId: '1',
    role: 'Frontend Developer',
    name: 'María García',
    email: 'maria@example.com',
    position: 'Senior Developer',
    birthdate: new Date('1990-05-15'),
    phone: '+51 999 888 777',
    projectId: ['1'],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-11-01')
  },
  {
    userId: '2',
    role: 'Backend Developer',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    position: 'Senior Developer',
    birthdate: new Date('1985-03-22'),
    phone: '+51 888 777 666',
    projectId: ['1'],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-11-01')
  },
  {
    userId: '3',
    role: 'UI/UX Designer',
    name: 'Ana López',
    email: 'ana@example.com',
    position: 'Design Lead',
    birthdate: new Date('1992-08-10'),
    phone: '+51 777 666 555',
    projectId: ['2'],
    isActive: false,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-11-01')
  }
]

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticación',
    description: 'Sistema de login y registro de usuarios',
    projectId: '1',
    status: 'in-progress',
    priority: 'high',
    userId: '1',
    dateline: new Date('2025-11-15'),
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-11-01')
  },
  {
    id: '2',
    title: 'Diseñar pantalla de perfil',
    description: 'Interfaz de usuario para gestión de perfil',
    projectId: '2',
    status: 'pending',
    priority: 'medium',
    userId: '3',
    dateline: new Date('2025-11-20'),
    createdAt: new Date('2025-10-05'),
    updatedAt: new Date('2025-10-05')
  }
]

const initialConfig: AppConfig = {
  siteName: 'Dashboard de Proyectos',
  companyName: 'Mi Empresa Tech',
  theme: 'light',
  language: 'es',
  timezone: 'America/Lima',
  emailNotifications: true,
  slackIntegration: false,
  autoBackup: true
}

interface AppState {
  projects: Project[]
  teamMembers: TeamMember[]
  tasks: Task[]
  config: AppConfig
  loading: boolean
}

const initialState: AppState = {
  projects: initialProjects,
  teamMembers: initialTeamMembers,
  tasks: initialTasks,
  config: initialConfig,
  loading: false
}

// Tipos de acciones
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  // Proyectos
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  // Miembros del equipo
  | { type: 'ADD_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'UPDATE_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'DELETE_TEAM_MEMBER'; payload: string }
  // Tareas
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  // Configuración
  | { type: 'UPDATE_CONFIG'; payload: Partial<AppConfig> }

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    // Proyectos
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload)
      }
    
    // Miembros del equipo
    case 'ADD_TEAM_MEMBER':
      return { ...state, teamMembers: [...state.teamMembers, action.payload] }
    case 'UPDATE_TEAM_MEMBER':
      return {
        ...state,
        teamMembers: state.teamMembers.map(m => 
          m.userId === action.payload.userId ? action.payload : m
        )
      }
    case 'DELETE_TEAM_MEMBER':
      return {
        ...state,
        teamMembers: state.teamMembers.filter(m => m.userId !== action.payload)
      }
    
    // Tareas
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? action.payload : t
        )
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      }
    
    // Configuración
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      }
    
    default:
      return state
  }
}

// Contexto
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Funciones helper
  getDashboardMetrics: () => DashboardMetrics
  getProjectById: (id: string) => Project | undefined
  getTeamMemberById: (id: string) => TeamMember | undefined
  getTaskById: (id: string) => Task | undefined
  getTasksByProject: (projectId: string) => Task[]
  getTeamMembersByProject: (projectId: string) => TeamMember[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const getDashboardMetrics = (): DashboardMetrics => {
    const totalProjects = state.projects.length
    const completedTasks = state.tasks.filter(t => t.status === 'completed').length
    const workedHours = Math.floor(Math.random() * 400) + 300 // Mock data
    const activeMembers = state.teamMembers.filter(m => m.isActive).length

    return {
      totalProjects,
      completedTasks,
      workedHours,
      activeMembers
    }
  }

  const getProjectById = (id: string) => state.projects.find(p => p.id === id)
  const getTeamMemberById = (id: string) => state.teamMembers.find(m => m.userId === id)
  const getTaskById = (id: string) => state.tasks.find(t => t.id === id)
  const getTasksByProject = (projectId: string) => state.tasks.filter(t => t.projectId === projectId)
  const getTeamMembersByProject = (projectId: string) => 
    state.teamMembers.filter(m => m.projectId.includes(projectId))

  const value: AppContextType = {
    state,
    dispatch,
    getDashboardMetrics,
    getProjectById,
    getTeamMemberById,
    getTaskById,
    getTasksByProject,
    getTeamMembersByProject
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizado
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp debe ser usado dentro de un AppProvider')
  }
  return context
}