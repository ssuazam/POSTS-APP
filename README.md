# 📝 Post Explorer - Angular + RxJS + TailwindCSS

Este proyecto es una aplicación desarrollada en **Angular 14** que permite explorar una lista de publicaciones (`posts`) obtenidas desde una API pública. Incluye funcionalidades de búsqueda, filtrado, ordenamiento, y diseño responsive con TailwindCSS.

---

## 🚀 Características principales

✅ Consumir una **API pública** (`https://jsonplaceholder.typicode.com/posts`)  
✅ Listar los posts en pantalla con diseño atractivo  
✅ Buscar por título con **input reactivo + RxJS + debounce**  
✅ Filtrar por `User ID`  
✅ Ordenar por `Título`, `ID` o `User ID`  
✅ **Pipe personalizado** para ordenamiento  
✅ **Spinner de carga** mientras se obtiene la información  
✅ Manejo de errores con mensajes descriptivos  
✅ Modal para mostrar detalles de cada post  
✅ Estilos responsivos con **TailwindCSS**

---

## 📦 Estructura del proyecto

```bash
src/
│
├── app/
│   ├── components/
│   │   └── post-list/
│   │       ├── post-list.component.ts        # Lógica principal del componente
│   │       └── post-list.component.html      # Plantilla con diseño responsive
│   │
│   ├── pipes/
│   │   └── order-by-pipe.ts                  # Pipe personalizado para ordenar los posts
│   │
│   └── services/
│       └── post.service.ts                   # Servicio para consumir la API
│
├── styles.scss                                # TailwindCSS
└── index.html
```

---

## ⚙️ Tecnologías utilizadas

- **Angular 14**
- **RxJS** (`BehaviorSubject`, `switchMap`, `debounceTime`, etc.)
- **TailwindCSS** para diseño responsive
- **TypeScript**
- **API pública**: `https://jsonplaceholder.typicode.com/posts`

---

## 🧑‍💻 Instalación y ejecución

1. Clona el repositorio

```bash
git clone https://github.com/ssuazam/POST-APP.git
cd POST-APP
```

2. Instala las dependencias

```bash
npm install
```

3. Ejecuta el proyecto en desarrollo

```bash
ng serve
```

4. Abre el navegador en `http://localhost:4200`

---

## 🧠 Notas técnicas

- El componente usa `BehaviorSubject` + `combineLatest` para combinar búsqueda y filtro de User ID.
- Las búsquedas se realizan en el servidor utilizando `switchMap`, y los filtros por `userId` se aplican localmente.
- El ordenamiento se implementa con un **pipe personalizado** reutilizable.
- La UI incluye un modal que muestra el post completo con animación.



## 🧑‍🏫 Autor

**Nombre**: Santiago Suaza  
**Correo**: santisu204@gmail.com 

---

