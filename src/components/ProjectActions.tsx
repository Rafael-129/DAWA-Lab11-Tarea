"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useApp } from "@/context/AppContext"
import { Project } from "@/lib/types"
import { translateStatus, translatePriority, formatDate } from "@/lib/translations"
import { Eye, Edit, Trash2, Users, Calendar, AlertTriangle } from "lucide-react"

interface ProjectActionsProps {
  project: Project
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const { getTeamMembersByProject, getTasksByProject, dispatch } = useApp()
  const [viewOpen, setViewOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const teamMembers = getTeamMembersByProject(project.id)
  const tasks = getTasksByProject(project.id)

  const statusVariant = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "in-progress": return "secondary"
      case "review": return "outline"
      case "planning": return "outline"
      default: return "outline"
    }
  }

  const priorityVariant = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive"
      case "high": return "default"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    dispatch({ type: 'DELETE_PROJECT', payload: project.id })
    setLoading(false)
    setDeleteOpen(false)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setViewOpen(true)}>
          <Eye className="h-4 w-4 mr-1" />
          Ver detalles
        </Button>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setDeleteOpen(true)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </div>

      {/* Modal de detalles */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {project.name}
              <Badge variant={statusVariant(project.status)}>
                {translateStatus(project.status)}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Detalles completos del proyecto
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información general */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Descripción</h4>
                  <p className="text-sm">{project.description || "Sin descripción"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Categoría</h4>
                    <p className="text-sm capitalize">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Prioridad</h4>
                    <Badge variant={priorityVariant(project.priority)}>
                      {translatePriority(project.priority)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Progreso</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Fecha de creación</h4>
                    <p className="text-sm">{formatDate(project.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Equipo ({teamMembers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teamMembers.length > 0 ? (
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.userId} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.position}</p>
                        </div>
                        <Badge variant={member.isActive ? "default" : "secondary"}>
                          {member.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No hay miembros asignados</p>
                )}
              </CardContent>
            </Card>

            {/* Tareas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Tareas ({tasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Vence: {formatDate(task.dateline)}
                          </p>
                        </div>
                        <Badge variant={statusVariant(task.status)}>
                          {translateStatus(task.status)}
                        </Badge>
                      </div>
                    ))}
                    {tasks.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        Y {tasks.length - 5} tareas más...
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No hay tareas asignadas</p>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Confirmar Eliminación
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              ¿Estás seguro de que quieres eliminar el proyecto "{project.name}"?
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Eliminando...
                </>
              ) : (
                "Eliminar Proyecto"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}