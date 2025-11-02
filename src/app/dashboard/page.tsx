"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectForm } from "@/components/ProjectForm"
import { ProjectActions } from "@/components/ProjectActions"
import { TasksTable } from "@/components/TaskTable"
import { TeamMemberForm } from "@/components/TeamMemberForm"
import { TeamMemberActions } from "@/components/TeamMemberActions"
import { ConfigurationForm } from "@/components/ConfigurationForm"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useApp } from "@/context/AppContext"
import { translateStatus } from "@/lib/translations"

export default function DashboardPage() {
  const { state, getDashboardMetrics, getTeamMembersByProject } = useApp()
  const metrics = getDashboardMetrics()

  const statusVariant = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "in-progress": return "secondary"
      case "review": return "outline"
      case "planning": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
    <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Dashboard de Proyectos
            </h1>
            <p className="text-slate-600">
                Gestiona tus proyectos y tareas con shadcn/ui
            </p>
                <div className="pt-4">
                    <ProjectForm />
                </div>
            </div>


        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Tab: Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Stat Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Proyectos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalProjects}</div>
                  <p className="text-xs text-muted-foreground">
                    +{state.projects.filter(p => new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tareas Completadas
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.completedTasks}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((metrics.completedTasks / (state.tasks.length || 1)) * 100)}% del total de tareas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Horas Trabajadas
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.workedHours}h</div>
                  <p className="text-xs text-muted-foreground">
                    Promedio {Math.round(metrics.workedHours / (metrics.activeMembers || 1))}h por miembro
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Miembros Activos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.activeMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    {state.teamMembers.length - metrics.activeMembers} inactivos
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas actualizaciones de tus proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.tasks.slice(0, 4).map((task, i) => {
                    const member = state.teamMembers.find(m => m.userId === task.userId)
                    const project = state.projects.find(p => p.id === task.projectId)
                    return (
                      <div key={task.id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{member?.name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none">
                            {member?.name || 'Usuario desconocido'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            trabajó en <span className="font-medium">{task.title}</span> en {project?.name}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(task.updatedAt).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                    )
                  })}
                  {state.tasks.length === 0 && (
                    <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {state.projects.map((project) => {
                const teamMembers = getTeamMembersByProject(project.id)
                return (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <Badge variant={statusVariant(project.status)}>
                          {translateStatus(project.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            {teamMembers.length} miembros
                          </div>
                        </div>
                        <ProjectActions project={project} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              {state.projects.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No hay proyectos aún. ¡Crea tu primer proyecto!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Tasks */}
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tareas</CardTitle>
                <CardDescription>
                  Administra todas las tareas de tus proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TasksTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Miembros del Equipo</CardTitle>
                  <CardDescription>
                    Gestiona los miembros de tu equipo y sus roles
                  </CardDescription>
                </div>
                <TeamMemberForm />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.teamMembers.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.isActive ? "default" : "secondary"}>
                          {member.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        <TeamMemberActions member={member} />
                      </div>
                    </div>
                  ))}
                  {state.teamMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No hay miembros del equipo registrados. ¡Agrega el primer miembro!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Administra las preferencias de tu cuenta y la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConfigurationForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
