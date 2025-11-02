# 🚀 Dashboard de Proyectos - DAWA Lab 11

Un dashboard completo para gestión de proyectos, tareas y equipos desarrollado con **Next.js 16**, **React 19**, **TypeScript** y **shadcn/ui**.

## ✨ Características Principales

### 🎨 **Componentes shadcn/ui Implementados**
- ✅ **Spinner** - Indicadores de carga realistas
- ✅ **Alert** - Notificaciones y validaciones
- ✅ **Calendar** - Selector de fechas interactivo
- ✅ **Pagination** - Navegación por páginas
- ✅ **Popover** - Contenedores flotantes

### 📊 **Funcionalidades del Dashboard**
- **📋 Gestión de Proyectos** - CRUD completo con validaciones
- **✅ Gestión de Tareas** - Asignación, estados y fechas límite
- **👥 Gestión de Equipos** - Miembros, roles y posiciones
- **⚙️ Configuración** - Personalización de la aplicación
- **📈 Métricas en Tiempo Real** - Dashboard con estadísticas dinámicas

### 🛠️ **Tecnologías Utilizadas**
- **Framework**: Next.js 16 con React 19
- **Lenguaje**: TypeScript 100%
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui + Radix UI
- **Estado**: React Context API
- **Fechas**: date-fns + react-day-picker

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd next-shadcn-ui
```

2. **Instalar dependencias**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

5. **Acceder al Dashboard**
```
http://localhost:3000/dashboard
```

## 📱 Navegación del Dashboard

### 🏠 **Resumen**
- Métricas en tiempo real
- Actividad reciente del equipo
- Estadísticas de proyectos y tareas

### 📁 **Proyectos**
- ➕ Crear nuevos proyectos
- 👁️ Ver detalles completos
- ✏️ Editar información
- 🗑️ Eliminar proyectos
- 👥 Asignar miembros del equipo

### ✅ **Tareas**
- 📋 Tabla paginada de tareas
- 🎯 Estados: Pendiente, En Progreso, Completado
- 🚨 Prioridades: Baja, Media, Alta, Urgente
- 📅 Fechas límite con indicadores de vencimiento
- 👤 Asignación a miembros del equipo

### 👥 **Equipo**
- 👤 CRUD completo de miembros
- 📋 Campos: nombre, email, rol, posición, teléfono, fecha nacimiento
- ✅ Estado activo/inactivo
- 🔗 Relación con proyectos

### ⚙️ **Configuración**
- 🏢 Información de la empresa
- 🎨 Configuración de tema
- 🌍 Idioma y zona horaria
- 📧 Notificaciones por email
- 🔗 Integración con Slack
- 💾 Respaldo automático

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/          # Página principal del dashboard
│   ├── globals.css         # Estilos globales
│   └── layout.tsx          # Layout principal
├── components/             # Componentes React
│   ├── ui/                 # Componentes shadcn/ui
│   ├── ConfigurationForm.tsx
│   ├── ProjectActions.tsx
│   ├── ProjectForm.tsx
│   ├── TaskActions.tsx
│   ├── TaskForm.tsx
│   ├── TaskTable.tsx
│   ├── TeamMemberActions.tsx
│   └── TeamMemberForm.tsx
├── context/                # Context API
│   └── AppContext.tsx      # Estado global
├── lib/                    # Utilidades
│   ├── translations.ts     # Traducciones ES
│   ├── types.ts           # Tipos TypeScript
│   └── utils.ts           # Utilidades generales
```

## 🎯 **Características Técnicas**

### 🔄 **Estado Global**
- React Context API para gestión centralizada
- Reducers para actualizaciones inmutables
- Funciones helper para cálculos y relaciones

### 🎨 **Diseño Responsivo**
- Mobile-first approach
- Breakpoints de Tailwind CSS
- Componentes adaptables

### ✅ **Validaciones**
- Validación en tiempo real
- Mensajes de error específicos
- Estados de carga con spinners

### 🔗 **Relaciones de Datos**
- Proyectos ↔ Tareas
- Proyectos ↔ Miembros del equipo
- Tareas ↔ Miembros (asignación)

### 🌐 **Internacionalización**
- Traducciones en español
- Formateo de fechas localizado
- Indicadores de tiempo relativo

## 📊 **Métricas del Dashboard**

- **Total de Proyectos**: Contador dinámico
- **Tareas Completadas**: Con porcentaje del total
- **Horas Trabajadas**: Promedio por miembro
- **Miembros Activos**: Con contador de inactivos

## 🧪 **Comandos Disponibles**

```bash
# Desarrollo
npm run dev

# Compilación de producción
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint
```

## 🚀 **Deploy en Vercel**

### 📋 **Preparación del Deploy**

1. **Asegurar que el build funcione correctamente**
```bash
npm run build
```

2. **Verificar que no hay errores**
```bash
npm run start
```

### 🌐 **Opción 1: CLI de Vercel (Recomendado)**

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Iniciar sesión**
```bash
vercel login
```

3. **Deploy desde el directorio del proyecto**
```bash
vercel
```

4. **Deploy a producción**
```bash
vercel --prod
```

### 🐙 **Opción 2: GitHub + Vercel Dashboard**

1. **Subir código a GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Configurar en Vercel**
- Ve a [vercel.com](https://vercel.com) e inicia sesión
- Click en "New Project"
- Importa tu repositorio de GitHub
- Vercel detectará automáticamente que es Next.js
- Click en "Deploy"

### 📁 **Opción 3: Manual (Drag & Drop)**

1. **Crear build de producción**
```bash
npm run build
```

2. **Deploy manual**
- Ve a [vercel.com/new](https://vercel.com/new)
- Arrastra y suelta la carpeta del proyecto
- Vercel se encargará del resto

### ⚙️ **Configuración de Vercel**

El proyecto incluye `vercel.json` con configuraciones optimizadas:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 🔐 **Variables de Entorno (Opcional)**

Si necesitas variables de entorno, agrégalas en el Dashboard de Vercel:

```bash
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
NEXT_PUBLIC_API_URL=https://api.tu-app.com
```

### ✅ **Verificación del Deploy**

Después del deploy, tu aplicación estará disponible en:
- **URL Principal**: `https://tu-proyecto.vercel.app`
- **Dashboard**: `https://tu-proyecto.vercel.app/dashboard`

### 🔧 **Dominios Personalizados**

1. Ve a tu proyecto en Vercel Dashboard
2. Click en "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Configura los registros DNS según las instrucciones

## 🎨 **Personalización del Tema**

El proyecto utiliza un tema personalizado con colores púrpura/índigo:
- Fondo: Gradiente `from-purple-50 to-indigo-100`
- Primary: Tono púrpura personalizado
- Componentes: Estilo shadcn/ui consistente

## 🤝 **Contribución**

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 **Autor**

Desarrollado para el curso DAWA - Lab 11
Universidad Tecsup

---

⭐ **¡Si te gustó el proyecto, dale una estrella!** ⭐
