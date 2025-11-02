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
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { useApp } from "@/context/AppContext"
import { TeamMember } from "@/lib/types"
import { AlertCircle, Plus, Edit } from "lucide-react"

interface TeamMemberFormProps {
  member?: TeamMember
  trigger?: React.ReactNode
}

export function TeamMemberForm({ member, trigger }: TeamMemberFormProps) {
  const { state, dispatch } = useApp()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    userId: member?.userId || "",
    role: member?.role || "",
    name: member?.name || "",
    email: member?.email || "",
    position: member?.position || "",
    birthdate: member?.birthdate || undefined as Date | undefined,
    phone: member?.phone || "",
    projectId: member?.projectId || [] as string[],
    isActive: member?.isActive ?? true,
  })

  const isEdit = !!member

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.role.trim()) {
      newErrors.role = "El rol es requerido"
    }
    if (!formData.position.trim()) {
      newErrors.position = "La posición es requerida"
    }
    if (!formData.birthdate) {
      newErrors.birthdate = "La fecha de nacimiento es requerida"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    // Validar email único
    const existingMember = state.teamMembers.find(m => 
      m.email === formData.email && m.userId !== formData.userId
    )
    if (existingMember) {
      newErrors.email = "Este email ya está en uso"
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

    const memberData: TeamMember = {
      userId: formData.userId || Date.now().toString(),
      role: formData.role,
      name: formData.name,
      email: formData.email,
      position: formData.position,
      birthdate: formData.birthdate!,
      phone: formData.phone,
      projectId: formData.projectId,
      isActive: formData.isActive,
      createdAt: member?.createdAt || new Date(),
      updatedAt: new Date()
    }

    if (isEdit) {
      dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: memberData })
    } else {
      dispatch({ type: 'ADD_TEAM_MEMBER', payload: memberData })
    }
    
    // Limpiar y cerrar
    if (!isEdit) {
      setFormData({ 
        userId: "",
        role: "",
        name: "",
        email: "",
        position: "",
        birthdate: undefined,
        phone: "",
        projectId: [],
        isActive: true
      })
    }
    setErrors({})
    setLoading(false)
    setOpen(false)
  }

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nuevo Miembro
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
              {isEdit ? "Editar Miembro" : "Agregar Nuevo Miembro"}
            </DialogTitle>
            <DialogDescription>
              {isEdit 
                ? "Modifica la información del miembro del equipo."
                : "Completa la información del nuevo miembro. Los campos con (*) son obligatorios."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nombre Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Juan Pérez García"
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

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="juan.perez@empresa.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: "" })
                }}
              />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Rol y Posición */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  placeholder="Frontend Developer"
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value })
                    if (errors.role) setErrors({ ...errors, role: "" })
                  }}
                />
                {errors.role && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.role}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">
                  Posición <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => {
                    setFormData({ ...formData, position: value })
                    if (errors.position) setErrors({ ...errors, position: "" })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior Developer">Junior Developer</SelectItem>
                    <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                    <SelectItem value="Lead Developer">Lead Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.position}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Fecha de nacimiento */}
            <div className="grid gap-2">
              <Label>
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={formData.birthdate}
                onDateChange={(date) => {
                  setFormData({ ...formData, birthdate: date })
                  if (errors.birthdate) setErrors({ ...errors, birthdate: "" })
                }}
                placeholder="Selecciona fecha de nacimiento"
              />
              {errors.birthdate && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.birthdate}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Teléfono */}
            <div className="grid gap-2">
              <Label htmlFor="phone">
                Teléfono <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="+51 999 888 777"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: "" })
                }}
              />
              {errors.phone && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.phone}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Estado activo */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Miembro activo</Label>
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
                isEdit ? "Actualizar Miembro" : "Crear Miembro"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}