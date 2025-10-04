# Informe Detallado del Proyecto Web "Gestion_Documental"

---

## 1. Agrupación de archivos y carpetas por bloque funcional

### Frontend
- Archivos React y UI:  
  alert-dialog.tsx, submission-status.tsx, documents-table.tsx, calendar.tsx, button.tsx, recent-activity.tsx, accordion.tsx, header.tsx, scroll-area.tsx, compliance-chart.tsx, file-list.tsx, checkbox.tsx, tabs.tsx, form.tsx, dialog.tsx, alert.tsx, user-nav.tsx, sidebar.tsx, mobile-sidebar.tsx, switch.tsx, popover.tsx, dropdown-menu.tsx, add-teacher-form.tsx, edit-teacher-form.tsx, menubar.tsx, toaster.tsx, skeleton.tsx, label.tsx, use-toast.ts, radio-group.tsx, table.tsx, collapsible.tsx, chart.tsx, carousel.tsx, avatar.tsx, generate-report.tsx, generate-compliance-report.ts, compliance-by-type-chart.tsx, overview-cards.tsx, badge.tsx, input.tsx, textarea.tsx, slider.tsx, select.tsx, sheet.tsx, tooltip.tsx, page.tsx (varios), app-layout.tsx, layout.tsx, sidebar-nav.tsx, use-auth.ts, use-mobile.ts, auth-context.tsx, toast.tsx, use-compliance-report.ts, use-toast.ts.  
- CSS y estilos:  
  globals.css, tailwind.config.ts, postcss.config.mjs  
- JSON o assets estáticos:  
  placeholder-images.ts, placeholder-images.json, components.json, data.ts, icons.tsx, blueprint.md  

### Backend
- No se identifican archivos backend explícitos en el repositorio cargado.

### Base de datos
- Migraciones y esquema:  
  0001_initial_schema.sql  

### Configuración/Infraestructura
- Configuración general:  
  next.config.ts, next.config.mjs, tailwind.config.ts, postcss.config.mjs  
- Dependencias y paquetes:  
  package.json, package-lock.json  
- Infraestructura:  
  apphosting.yaml  
- TypeScript:  
  tsconfig.json  
- Documentación:  
  README.md, blueprint.md  

---

## 2. Descripción de carpetas y archivos importantes

### Frontend
- Componentes UI: Archivos `.tsx` que implementan botones, tablas, formularios, menús, gráficos y layouts.  
- Páginas: múltiples `page.tsx` que definen rutas de Next.js.  
- Hooks personalizados para lógica reusable (autenticación, reportes, etc.).  
- Estilos con Tailwind CSS configurados en archivos específicos.

### Backend
- No se encontraron archivos backend, se asume que la lógica backend está en otro repositorio o servicio.

### Base de datos
- Archivo SQL con esquema inicial para crear tablas y relaciones.

### Configuración/Infraestructura
- Configuraciones para Next.js, Tailwind y PostCSS.  
- Archivo para despliegue en Render (apphosting.yaml).  
- Gestión de dependencias y tipos con npm y TypeScript.

---

## 3. Arquitectura y stack tecnológico

- Arquitectura cliente-servidor con Next.js (React) como frontend.  
- Backend no presente o independiente.  
- Stack: TypeScript, React, Next.js, Tailwind CSS, PostgreSQL (SQL), Render para hosting.  
- Comunicación probable mediante APIs REST o GraphQL (no evidenciado en archivos).  

---

## 4. Conexión a la base de datos en Render

- Uso de variables de entorno para definir credenciales de la base de datos.  
- Configuración en `apphosting.yaml` para mapear variables desde servicio de base de datos en Render.  
- Uso de librerías como `pg` para conexión en backend (ejemplo de código en scripts).  
- Pruebas de conexión mediante scripts simples.  

---

## 5. Resumen visual