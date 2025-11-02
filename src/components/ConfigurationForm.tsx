"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { useApp } from "@/context/AppContext"
import { AlertCircle, CheckCircle, Save } from "lucide-react"

export function ConfigurationForm() {
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    siteName: state.config.siteName,
    companyName: state.config.companyName,
    theme: state.config.theme,
    language: state.config.language,
    timezone: state.config.timezone,
    emailNotifications: state.config.emailNotifications,
    slackIntegration: state.config.slackIntegration,
    autoBackup: state.config.autoBackup,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.siteName.trim()) {
      newErrors.siteName = "El nombre del sitio es requerido"
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "El nombre de la empresa es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setSuccess(false)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000))

    dispatch({ type: 'UPDATE_CONFIG', payload: formData })
    
    setLoading(false)
    setSuccess(true)
    setErrors({})

    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mensaje de éxito */}
      {success && (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Configuración guardada exitosamente
          </AlertDescription>
        </Alert>
      )}

      {/* Configuración General */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
          <CardDescription>
            Ajustes básicos de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">
                Nombre del Sitio <span className="text-red-500">*</span>
              </Label>
              <Input
                id="siteName"
                placeholder="Dashboard de Proyectos"
                value={formData.siteName}
                onChange={(e) => {
                  setFormData({ ...formData, siteName: e.target.value })
                  if (errors.siteName) setErrors({ ...errors, siteName: "" })
                }}
              />
              {errors.siteName && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.siteName}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="companyName">
                Nombre de la Empresa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="Mi Empresa Tech"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value })
                  if (errors.companyName) setErrors({ ...errors, companyName: "" })
                }}
              />
              {errors.companyName && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.companyName}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">Tema</Label>
              <Select
                value={formData.theme}
                onValueChange={(value) => setFormData({ ...formData, theme: value as typeof formData.theme })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Idioma</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">Zona Horaria</Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => setFormData({ ...formData, timezone: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Lima">América/Lima (UTC-5)</SelectItem>
                <SelectItem value="America/Mexico_City">América/Ciudad_de_México (UTC-6)</SelectItem>
                <SelectItem value="America/New_York">América/Nueva_York (UTC-5)</SelectItem>
                <SelectItem value="Europe/Madrid">Europa/Madrid (UTC+1)</SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokio (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones e Integraciones */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones e Integraciones</CardTitle>
          <CardDescription>
            Configura alertas y conexiones con servicios externos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe alertas de tareas y proyectos por correo electrónico
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={formData.emailNotifications}
              onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="slackIntegration">Integración con Slack</Label>
              <p className="text-sm text-muted-foreground">
                Conecta con tu workspace de Slack para notificaciones
              </p>
            </div>
            <Switch
              id="slackIntegration"
              checked={formData.slackIntegration}
              onCheckedChange={(checked) => setFormData({ ...formData, slackIntegration: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoBackup">Respaldo Automático</Label>
              <p className="text-sm text-muted-foreground">
                Realiza copias de seguridad automáticas de los datos
              </p>
            </div>
            <Switch
              id="autoBackup"
              checked={formData.autoBackup}
              onCheckedChange={(checked) => setFormData({ ...formData, autoBackup: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón de guardar */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="min-w-[150px]">
          {loading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </form>
  )
}