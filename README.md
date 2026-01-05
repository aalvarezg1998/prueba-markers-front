# 🎨 Frontend - Loan Management System

Sistema de gestión de préstamos con **Arquitectura Hexagonal (Clean Architecture)** en React + TypeScript.

## 📐 Arquitectura

```
src/
├── domain/                 # 🟦 DOMAIN LAYER
│   ├── enums/             # Enumeraciones
│   ├── models/            # Modelos de dominio
│   └── validators/        # Validaciones de negocio
│
├── application/           # 🟩 APPLICATION LAYER
│   ├── ports/            # Puertos (interfaces)
│   ├── useCases/         # Casos de uso
│   └── context/          # Gestión de estado
│
├── infrastructure/        # 🟨 INFRASTRUCTURE LAYER
│   ├── adapters/         # Implementaciones de puertos
│   └── http/             # Cliente HTTP
│
└── ui/                    # 🟥 UI LAYER
    ├── components/        # Componentes reutilizables
    ├── pages/            # Páginas de la aplicación
    └── App.tsx           # Componente principal
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🔧 Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://localhost:7001/api
VITE_APP_NAME=Loan Management System
```

## 📱 Características

### Usuario Regular
- ✅ Registro e inicio de sesión
- ✅ Solicitar préstamos
- ✅ Ver mis préstamos
- ✅ Ver estado de solicitudes
- ✅ Ver razones de rechazo

### Administrador
- ✅ Ver todas las solicitudes
- ✅ Aprobar préstamos
- ✅ Rechazar préstamos con razón
- ✅ Dashboard administrativo

## 🎨 Tecnologías

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Material-UI** - Component Library
- **React Router** - Routing
- **Axios** - HTTP Client
- **React Hook Form** - Form Management

## 🏗️ Principios de Arquitectura

### 1. Separación de Responsabilidades
Cada capa tiene una responsabilidad clara y no depende de capas externas.

### 2. Inversión de Dependencias
La capa de aplicación define puertos (interfaces) que la infraestructura implementa.

### 3. Independencia de Frameworks
La lógica de negocio no depende de React, Material-UI o Axios.

### 4. Testabilidad
Los casos de uso pueden ser testeados sin UI ni HTTP.

## 📦 Estructura de Capas

### Domain Layer (Dominio)
- **Sin dependencias externas**
- Modelos de datos puros
- Validaciones de negocio
- Enumeraciones

### Application Layer (Aplicación)
- Casos de uso
- Puertos (interfaces)
- Gestión de estado
- Lógica de orquestación

### Infrastructure Layer (Infraestructura)
- Adaptadores HTTP
- Implementación de puertos
- Cliente Axios configurado
- Manejo de localStorage

### UI Layer (Interfaz)
- Componentes React
- Páginas
- Rutas protegidas
- Material-UI

## 🔐 Autenticación

El sistema usa JWT almacenado en localStorage:

```typescript
// Login
const response = await loginUseCase.execute({ email, password })
login(response) // Guarda en localStorage

// Logout
logout() // Limpia localStorage
```

## 🎯 Casos de Uso

### Autenticación
- `LoginUseCase` - Iniciar sesión
- `RegisterUseCase` - Registrar usuario

### Préstamos
- `RequestLoanUseCase` - Solicitar préstamo
- `GetMyLoansUseCase` - Obtener mis préstamos
- `GetAllLoansUseCase` - Obtener todos (Admin)
- `ApproveLoanUseCase` - Aprobar préstamo (Admin)
- `RejectLoanUseCase` - Rechazar préstamo (Admin)

## 🎨 Diseño

- **Gradientes modernos** en todas las páginas
- **Animaciones suaves** en interacciones
- **Responsive design** para móviles y desktop
- **Fuente Inter** de Google Fonts
- **Paleta de colores** consistente

## 📝 Ejemplo de Uso

```typescript
// 1. Crear instancia del adaptador
const authAdapter = new AuthAdapter()

// 2. Crear caso de uso
const loginUseCase = new LoginUseCase(authAdapter)

// 3. Ejecutar caso de uso
const response = await loginUseCase.execute({
  email: 'user@example.com',
  password: 'password123'
})

// 4. Usar respuesta
login(response)
navigate('/dashboard')
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Con cobertura
npm run test:coverage
```

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI](https://mui.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando Arquitectura Hexagonal**
# prueba-markers-front
