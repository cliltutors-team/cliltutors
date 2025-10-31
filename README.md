# 💼 CLILTUTORS – Plataforma Web del Centro de Prácticas

¡Bienvenido/a al repositorio oficial de **CLILTUTORS**!  
Este proyecto fue desarrollado por estudiantes del programa de Ingeniería Informática como parte del Centro de Prácticas.  
Su propósito es ofrecer una base sólida para el desarrollo, mantenimiento y mejora continua del sitio web institucional.

---

## 🧭 Propósito del repositorio

Este repositorio contiene el código fuente del sitio web **CLILTUTORS**, construido con **Next.js** y administrado bajo un flujo de trabajo colaborativo en **GitHub**.

Está diseñado para que los nuevos ingenieros y practicantes puedan continuar con su mantenimiento sin dificultades, siguiendo buenas prácticas de control de versiones, documentación y despliegue.

---

## 🧱 Tecnologías principales

- **Next.js 15** — Framework principal para el frontend.
- **React** — Biblioteca base para la interfaz.
- **Bun** — Gestor de paquetes y entorno de ejecución.
- **Git y GitHub** — Control de versiones y colaboración.
- **Vercel** — Plataforma de despliegue automático.

---

## 🚀 Estructura de ramas y flujo de trabajo

Para mantener un trabajo ordenado y evitar conflictos, el repositorio utiliza una estructura de ramas inspirada en el modelo **Git Flow**:

| Rama                           | Propósito                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `main`                         | Contiene la versión **estable** del sitio web (en producción).                                 |
| `develop`                      | Rama de **desarrollo**, donde se integran las nuevas funciones antes de pasarlas a producción. |
| `feature/nombre-funcionalidad` | Ramas individuales para desarrollar nuevas páginas, componentes o mejoras.                     |
| `hotfix/nombre-corrección`     | Ramas para corregir errores críticos detectados en producción.                                 |

### 🔧 Ejemplo de flujo de trabajo

1. Actualiza la rama principal:

   ```bash
   git checkout develop
   git pull
   ```

2. Crea una nueva rama para tu tarea:

   ```bash
   git checkout -b feature/nueva-pagina
   ```

3. Realiza los cambios y guárdalos:

   ```bash
   git add .
   git commit -m "Agrega nueva página de contacto"
   ```

4. Sube tu rama al repositorio remoto:

   ```bash
   git push -u origin feature/nueva-pagina
   ```

5. En GitHub, crea un **Pull Request (PR)** hacia la rama `develop`.  
   Cuando el código sea revisado y aprobado, se integrará.

---

## 🧑‍💻 Cómo ejecutar el proyecto localmente

1. Clona este repositorio:

   ```bash
   git clone https://github.com/cliltutors-team/cliltutors
   ```

2. Entra a la carpeta del proyecto:

   ```bash
   cd cliltutors
   ```

3. Instala las dependencias:

   ```bash
   bun install
   ```

4. Ejecuta el servidor de desarrollo:

   ```bash
   bun dev
   ```

5. Abre tu navegador en:
   ```
   http://localhost:3000
   ```

---

## ☁️ Despliegue (Vercel)

El sitio está configurado para desplegar automáticamente con **Vercel**:

- La rama `main` se publica en el dominio oficial:  
  👉 [https://cliltutors.com](https://cliltutors.com)

- La rama `develop` genera una **vista previa automática**, accesible mediante una URL de prueba como:  
  👉 `https://cliltutors-git-develop.vercel.app`

Cada **Pull Request** genera una vista previa temporal, lo que permite revisar los cambios antes de integrarlos.

---

## 🔐 Permisos y roles en GitHub

Los administradores del centro son los encargados de gestionar los permisos.

### Para agregar nuevos colaboradores:

1. En el repositorio, ir a **Settings → Collaborators**.
2. Seleccionar **Add people** e ingresar el nombre de usuario de GitHub.
3. Asignar el nivel de acceso:
   - **Read** → solo lectura.
   - **Write** → puede subir ramas y commits.
   - **Admin** → gestiona configuración, ramas protegidas y despliegues.

### Recomendaciones:

- Los nuevos ingenieros deben iniciar con acceso **Write**.
- Solo el responsable técnico debe tener **Admin**.

---

## 🧠 Buenas prácticas del equipo

1. Nunca trabajar directamente sobre `main`.
2. Crear una rama **feature/** para cada tarea.
3. Antes de comenzar, ejecutar:
   ```bash
   git pull origin develop
   ```
   para actualizar la base de trabajo.
4. Mantener mensajes de commits claros y descriptivos.
5. Usar **Pull Requests** para todo cambio.
6. Solicitar revisión de otro integrante antes del merge.
7. No subir archivos personales, `.env` ni dependencias externas al repositorio.

---

## 🔍 Verificación de ramas

Para comprobar en qué rama estás trabajando:

```bash
git branch
```

Para comparar con `main`:

```bash
git diff main
```

Si no hay diferencias, significa que ambas ramas están sincronizadas.

---

## 📦 Mantenimiento

- **Actualizar dependencias:**
  ```bash
  bun update
  ```
- **Eliminar ramas locales antiguas:**
  ```bash
  git branch -d nombre-rama
  ```
- **Ver historial de commits:**
  ```bash
  git log --oneline --graph --all
  ```

---

## 🏛️ Créditos institucionales

Desarrollado inicialmente por estudiantes en práctica del **Centro de Prácticas CLILTUTORS**, como parte del programa de Ingeniería Informática.

Este repositorio está destinado a mantenerse y ampliarse con cada nueva cohorte de practicantes, bajo los lineamientos técnicos establecidos en este documento.

📅 Año de inicio: 2025  
👨‍💻 Responsable técnico: Coordinador del Centro de Prácticas  
🌐 Sitio oficial: [https://cliltutors.com](https://cliltutors.com)
