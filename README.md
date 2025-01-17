# Manual de Instalación de Angular 19 📚

<div align="center">

![Angular Logo](https://angular.io/assets/images/logos/angular/angular.png)

[![Version](https://img.shields.io/badge/version-19.0.0-blue.svg)](https://github.com/angular/angular)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://angular.io/docs)

</div>

## 📋 Tabla de Contenidos

- [Sobre este Manual](#-sobre-este-manual)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso](#-uso)
- [Configuración](#-configuración)
- [Pruebas](#-pruebas)
- [Depuración](#-depuración)
- [FAQ](#-faq)
- [Contribución](#-contribución)
- [Enlaces Útiles](#-enlaces-útiles)
- [Licencia](#-licencia)

## 📖 Sobre este Manual

Este manual proporciona una guía paso a paso para la instalación y configuración de Angular 19. Está diseñado para desarrolladores que desean comenzar con el desarrollo de aplicaciones web modernas utilizando Angular.

### 🎯 Objetivos

- Guiar en la instalación paso a paso de Angular 19
- Proporcionar mejores prácticas de configuración
- Explicar la estructura básica de un proyecto Angular
- Ofrecer soluciones a problemas comunes

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

### Hardware Recomendado

- Procesador: 2 núcleos o más
- RAM: 8GB mínimo (16GB recomendado)
- Espacio en Disco: 1GB mínimo

### Software Necesario

```bash
# Versiones mínimas requeridas
Node.js >= 18.13.0
npm >= 9.0.0
Git (última versión estable)
```

### Editor Recomendado

- Visual Studio Code con las siguientes extensiones:
  - Angular Language Service
  - Angular Snippets
  - ESLint
  - Prettier

## 🚀 Instalación

### 1. Instalación de Node.js

```bash
# Windows (usando chocolatey)
choco install nodejs

# macOS (usando homebrew)
brew install node

# Linux (usando apt)
sudo apt update
sudo apt install nodejs npm
```

### 2. Verificación de la Instalación

```bash
# Verificar versiones
node --version
npm --version
```

### 3. Instalación de Angular CLI

```bash
# Instalación global de Angular CLI
npm install -g @angular/cli@19

# Verificar instalación
ng version
```

### 4. Crear Nuevo Proyecto

```bash
# Crear nuevo proyecto
ng new mi-proyecto-angular

# Navegar al proyecto
cd mi-proyecto-angular

# Iniciar servidor de desarrollo
ng serve
```

## 📁 Estructura del Proyecto

```plaintext
mi-proyecto-angular/
├── src/                    # Código fuente
│   ├── app/               # Componentes
│   ├── assets/            # Recursos estáticos
│   └── environments/      # Configuraciones
├── node_modules/          # Dependencias
├── angular.json           # Configuración Angular
├── package.json           # Dependencias npm
└── tsconfig.json         # Configuración TypeScript
```

### Descripción de Carpetas Principales

#### `/src/app`
Contiene los componentes principales de la aplicación:
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: '<h1>¡Bienvenido a Angular!</h1>'
})
export class AppComponent {
  title = 'mi-proyecto-angular';
}
```

#### `/src/assets`
Almacena recursos estáticos como imágenes, fuentes y archivos JSON.

#### `/src/environments`
Configuraciones específicas para diferentes entornos:
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## 💻 Uso

### Comandos Principales

```bash
# Desarrollo
ng serve                # Iniciar servidor de desarrollo
ng serve --open         # Iniciar y abrir en navegador
ng serve --port 4201    # Cambiar puerto

# Construcción
ng build                # Construir proyecto
ng build --prod         # Construir para producción

# Generación de Código
ng generate component   # Generar nuevo componente
ng generate service     # Generar nuevo servicio
ng generate pipe        # Generar nuevo pipe
```

## ⚙️ Configuración

### Angular JSON

```json
{
  "projects": {
    "mi-proyecto": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true
            }
          }
        }
      }
    }
  }
}
```

### TypeScript

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2022",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 🧪 Pruebas

### Pruebas Unitarias

```bash
# Ejecutar pruebas
ng test

# Con cobertura
ng test --code-coverage
```

### Pruebas E2E

```bash
# Ejecutar pruebas e2e
ng e2e
```

## 🔍 Depuración

### Chrome DevTools

1. Abrir DevTools (F12)
2. Ir a Sources
3. Encontrar archivos .ts en webpack://

### VS Code

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Debug Angular",
  "url": "http://localhost:4200",
  "webRoot": "${workspaceFolder}"
}
```

## ❓ FAQ

### Problemas Comunes y Soluciones

1. **Error: Port 4200 is already in use**
   ```bash
   # Solución
   ng serve --port 4201
   ```

2. **Error: Node.js version is not compatible**
   ```bash
   # Solución
   nvm install 18.13.0
   nvm use 18.13.0
   ```

3. **Error: Cannot find module '@angular/compiler-cli'**
   ```bash
   # Solución
   npm install --save-dev @angular/compiler-cli
   ```



## 🔗 Enlaces Útiles

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Angular CLI Documentation](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Angular Blog](https://blog.angular.io/)



---

<div align="center">

**Universidad Tecnológica Metropolitana**  
División de Tecnologías de la Información y Comunicación  
Asignatura: Aplicaciones Web para I 4.0  
Enero 2025
Alejandro Alonso Arellano Madrigal

</div>
