# 🤝 Guía de Contribución – CLILTUTORS

Este documento define **cómo trabajar dentro del proyecto CLILTUTORS** y los lineamientos técnicos que deben seguir todos los colaboradores y practicantes.

Su objetivo es garantizar un código ordenado, mantenible y alineado con la identidad institucional.

---

## ❌ Reglas básicas

- No trabajar directamente sobre `main`.
- Todo cambio debe realizarse mediante **Pull Request**.
- No subir archivos sensibles (`.env`, credenciales, tokens).
- Un Pull Request debe representar **una sola tarea o mejora**.

---

## 🔁 Flujo de trabajo estándar

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-descriptivo
git add .
git commit -m "Agrega funcionalidad"
git push -u origin feature/nombre-descriptivo
```

Luego, abrir un **Pull Request** hacia la rama `develop` para revisión.

---

## 📝 Convenciones

### 📌 Nombres de ramas

- `feature/team-section`
- `feature/home-hero`
- `hotfix/navbar-mobile`

### 📌 Mensajes de commit

Usar mensajes claros, descriptivos y en presente.

✅ Correcto:
```
Agrega componente TeamSection
Corrige error en navbar móvil
```

❌ Incorrecto:
```
Cambios
Fix
Update
```

---

## 🧩 Estándares de código

### React / Next.js

- Usar **componentes funcionales**.
- Usar `use client` solo cuando sea estrictamente necesario.
- Mantener componentes pequeños y reutilizables.
- Evitar lógica compleja directamente en el JSX.

### Estilos y UI

- Usar **Tailwind CSS** como sistema de estilos principal.
- Mantener consistencia visual en todo el sitio.
- Evitar estilos inline innecesarios.

---

## 🎨 Sistema de colores (obligatorio)

El proyecto utiliza un sistema de colores basado en la identidad visual de **CLILTUTORS**.  
Estos colores deben usarse con intención y no de forma arbitraria.

### Uso recomendado de colores

- **`deep` (#34365b)**  
  Uso: estructura visual, títulos, textos principales y jerarquía.
  
- **`vitality` (#26d07c)**  
  Uso: acciones principales, botones, enlaces, tags y elementos interactivos.

- **`illumination` (#ffc800)**  
  Uso: micro-acentos visuales (puntos, separadores, detalles pequeños).  
  ⚠️ No usar como color dominante.

- **`human` (#e94f70)**  
  Uso: acentos emocionales sutiles (avatars, estados especiales, detalles puntuales).

> ⚠️ Importante: no utilizar más de **dos colores de acento** en un mismo componente.

---

## 🔍 Revisión de Pull Requests

Todo Pull Request debe:

- Compilar sin errores.
- No romper funcionalidades existentes.
- Mantener coherencia visual y de estilos.
- Incluir una descripción clara de los cambios realizados.

Se recomienda revisar la **vista previa de Vercel** antes de aprobar el merge.

---

## 🧪 Pruebas

Actualmente el proyecto no cuenta con pruebas automatizadas.

Por lo tanto, es obligatorio:

- Probar visualmente los cambios.
- Verificar responsive (desktop y mobile).
- Revisar la consola del navegador.

---

## 🏁 Cierre

Este es un proyecto **formativo y profesional** del **Centro de Prácticas CLILTUTORS**.

La calidad del código y el respeto por los lineamientos técnicos son clave para garantizar la continuidad del proyecto entre generaciones de practicantes.
