"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatePicker } from "@/components/ui/date-picker"
import { Spinner } from "@/components/ui/spinner"
import { useApp } from "@/context/AppContext"
import { Task } from "@/lib/types"
import { AlertCircle, Plus, Edit } from "lucide-react"

interface TaskFormProps {
  task?: Task
  trigger?: React.ReactNode
}

export function TaskForm({ task, trigger }: TaskFormProps) {
  const { state, dispatch } = useApp()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    projectId: task?.projectId || "",
    status: task?.status || "pending" as Task['status'],
    priority: task?.priority || "medium" as Task['priority'],
    userId: task?.userId || "",
    dateline: task?.dateline || undefined as Date | undefined,
  })

  const isEdit = !!task

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido"
    }
    if (!formData.projectId) {
      newErrors.projectId = "El proyecto es requerido"
    }
    if (!formData.userId) {
      newErrors.userId = "El asignado es requerido"
    }
    if (!formData.dateline) {
      newErrors.dateline = "La fecha límite es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500))

    const taskData: Task = {
      id: task?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      projectId: formData.projectId,
      status: formData.status,
      priority: formData.priority,
      userId: formData.userId,
      dateline: formData.dateline!,
      createdAt: task?.createdAt || new Date(),
      updatedAt: new Date()
    }

    if (isEdit) {
      dispatch({ type: 'UPDATE_TASK', payload: taskData })
    } else {
      dispatch({ type: 'ADD_TASK', payload: taskData })
    }
    
    // Limpiar y cerrar
    if (!isEdit) {
      setFormData({
        title: "",
        description: "",
        projectId: "",
        status: "pending",
        priority: "medium",
        userId: "",
        dateline: undefined,
      })
    }
    setErrors({})
    setLoading(false)
    setOpen(false)
  }

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nueva Tarea
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar Tarea" : "Crear Nueva Tarea"}
            </DialogTitle>
            <DialogDescription>
              {isEdit 
                ? "Modifica la información de la tarea."
                : "Completa la información de la nueva tarea. Los campos con (*) son obligatorios."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Título */}
            <div className="grid gap-2">
              <Label htmlFor="title">
                Título de la Tarea <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Implementar funcionalidad de login"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })
                  if (errors.title) setErrors({ ...errors, title: "" })
                }}
              />
              {errors.title && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.title}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Descripción detallada de la tarea..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Proyecto */}
            <div className="grid gap-2">
              <Label htmlFor="projectId">
                Proyecto <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.projectId}
                onValueChange={(value) => {
                  setFormData({ ...formData, projectId: value })
                  if (errors.projectId) setErrors({ ...errors, projectId: "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {state.projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectId && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.projectId}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Estado y Prioridad */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Task['status'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as Task['priority'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Asignado a */}
            <div className="grid gap-2">
              <Label htmlFor="userId">
                Asignado a <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.userId}
                onValueChange={(value) => {
                  setFormData({ ...formData, userId: value })
                  if (errors.userId) setErrors({ ...errors, userId: "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un miembro" />
                </SelectTrigger>
                <SelectContent>
                  {state.teamMembers.filter(member => member.isActive).map((member) => (
                    <SelectItem key={member.userId} value={member.userId}>
                      {member.name} - {member.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.userId && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.userId}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Fecha límite */}
            <div className="grid gap-2">
              <Label>
                Fecha Límite <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={formData.dateline}
                onDateChange={(date) => {
                  setFormData({ ...formData, dateline: date })
                  if (errors.dateline) setErrors({ ...errors, dateline: "" })
                }}
                placeholder="Selecciona fecha límite"
              />
              {errors.dateline && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.dateline}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  {isEdit ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                isEdit ? "Actualizar Tarea" : "Crear Tarea"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}