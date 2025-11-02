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
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { useApp } from "@/context/AppContext"
import { Project } from "@/lib/types"
import { AlertCircle, Plus } from "lucide-react"

export function ProjectForm() {
  const { state, dispatch } = useApp()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
    teamMembers: [] as string[],
    startDate: undefined as Date | undefined,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre del proyecto es requerido"
    }
    if (!formData.category) {
      newErrors.category = "La categoría es requerida"
    }
    if (!formData.priority) {
      newErrors.priority = "La prioridad es requerida"
    }
    if (!formData.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida"
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

    const newProject: Project = {
      id: (state.projects.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      priority: formData.priority as Project['priority'],
      status: 'planning',
      teamMembers: formData.teamMembers,
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0
    }

    dispatch({ type: 'ADD_PROJECT', payload: newProject })
    
    // Limpiar y cerrar
    setFormData({ 
      name: "", 
      description: "", 
      category: "", 
      priority: "", 
      teamMembers: [],
      startDate: undefined 
    })
    setErrors({})
    setLoading(false)
    setOpen(false)
  }

  const handleTeamMemberToggle = (memberId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: checked 
        ? [...prev.teamMembers, memberId]
        : prev.teamMembers.filter(id => id !== memberId)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Completa la información del proyecto. Los campos con (*) son obligatorios.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nombre del proyecto */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nombre del Proyecto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Mi Proyecto Increíble"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: "" })
                }}
              />
              {errors.name && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.name}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Breve descripción del proyecto..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Categoría */}
            <div className="grid gap-2">
              <Label htmlFor="category">
                Categoría <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  setFormData({ ...formData, category: value })
                  if (errors.category) setErrors({ ...errors, category: "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Desarrollo Web</SelectItem>
                  <SelectItem value="mobile">Desarrollo Mobile</SelectItem>
                  <SelectItem value="design">Diseño</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.category}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Prioridad */}
            <div className="grid gap-2">
              <Label htmlFor="priority">
                Prioridad <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => {
                  setFormData({ ...formData, priority: value })
                  if (errors.priority) setErrors({ ...errors, priority: "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.priority}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Fecha de inicio */}
            <div className="grid gap-2">
              <Label>
                Fecha de Inicio <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={formData.startDate}
                onDateChange={(date) => {
                  setFormData({ ...formData, startDate: date })
                  if (errors.startDate) setErrors({ ...errors, startDate: "" })
                }}
                placeholder="Selecciona fecha de inicio"
              />
              {errors.startDate && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.startDate}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Miembros del equipo */}
            <div className="grid gap-2">
              <Label>Miembros del Equipo</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-3">
                {state.teamMembers.filter(member => member.isActive).map((member) => (
                  <div key={member.userId} className="flex items-center space-x-2">
                    <Checkbox
                      id={member.userId}
                      checked={formData.teamMembers.includes(member.userId)}
                      onCheckedChange={(checked) => 
                        handleTeamMemberToggle(member.userId, !!checked)
                      }
                    />
                    <Label htmlFor={member.userId} className="text-sm font-normal">
                      {member.name} - {member.position}
                    </Label>
                  </div>
                ))}
                {state.teamMembers.filter(member => member.isActive).length === 0 && (
                  <p className="text-sm text-muted-foreground">No hay miembros activos disponibles</p>
                )}
              </div>
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
                  Creando...
                </>
              ) : (
                "Crear Proyecto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
