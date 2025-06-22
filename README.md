# React Scaffold 🚀

A modern React application scaffold built with the latest technologies and best practices. This interdimensional portal provides a robust foundation for building scalable React applications with TypeScript, Tailwind CSS, and React Router v7.

## ✨ Features

- **⚡ React 19** - Latest React with concurrent features
- **🛣️ React Router v7** - Modern file-based routing with data loading
- **🎨 Tailwind CSS v4** - Utility-first CSS framework with Vite plugin
- **📝 TypeScript** - Full type safety with strict configuration
- **🔧 Vite** - Lightning-fast build tool with HMR
- **📦 SVG Support** - SVG as React components with vite-plugin-svgr
- **🧹 ESLint + Prettier** - Code quality and formatting
- **🌍 Environment Variables** - Multi-environment configuration
- **🎯 Path Aliases** - Clean imports with `@/`, `@assets/`, `@routes/`
- **🛡️ Error Boundaries** - Comprehensive error handling
- **📱 Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Yarn (v4.9.1 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maadhav-codes/react-scaffold.git
   cd react-scaffold
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.sample .env.local
   ```

4. **Start the development server**
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

## 📚 Usage Examples

### Adding a New Route

Create a new route component in [`src/routes/`](src/routes/):

```tsx
// src/routes/about.tsx
export default function About() {
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-slate-100 mb-4'>About Us</h1>
      <p className='text-slate-200'>Welcome to our about page!</p>
    </div>
  );
}
```

Add the route to your router configuration in [`src/main.tsx`](src/main.tsx):

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    loader: loadRootData,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About }, // Add this line
    ],
  },
]);
```

### Using Path Aliases

Import components using the configured aliases:

```tsx
import Home from '@routes/home';
import Logo from '@assets/react-icon.svg?react';
import { SomeUtil } from '@/utils/helpers';
```

### Environment Variables

Access environment variables in your components:

```tsx
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;
```

### SVG as React Components

Import SVG files as React components:

```tsx
import ReactIcon from '@assets/react-icon.svg?react';

function MyComponent() {
  return <ReactIcon className='w-8 h-8 text-blue-400' />;
}
```

## ⚙️ Configuration

### Environment Variables

The project supports multiple environment files:

- [`.env.local`](.env.local) - Local development (gitignored)
- [`.env.development.local`](.env.development.local) - Development environment
- [`.env.production.local`](.env.production.local) - Production environment
- [`.env.sample`](.env.sample) - Template file

Available environment variables:

| Variable        | Description         | Default                     |
| --------------- | ------------------- | --------------------------- |
| `VITE_APP_NAME` | Application name    | "React Scaffold"            |
| `VITE_VERSION`  | Application version | "1.0.0"                     |
| `API_URL`       | API endpoint URL    | "http://localhost:3000/api" |

### Vite Configuration

The [`vite.config.ts`](vite.config.ts) file includes:

- **Plugins**: React, Tailwind CSS, SVGR
- **Path Aliases**: `@/`, `@assets/`, `@routes/`
- **Dev Server**: Port 3000, HMR enabled
- **Build Optimization**: Code splitting, chunk size limits
- **Preview Server**: Port 3002

### TypeScript Configuration

- [`tsconfig.json`](tsconfig.json) - Project references
- [`tsconfig.app.json`](tsconfig.app.json) - App-specific settings with path mapping
- [`tsconfig.node.json`](tsconfig.node.json) - Node.js environment settings

## 🛠️ Available Scripts

| Script                  | Description                            |
| ----------------------- | -------------------------------------- |
| `yarn dev`              | Start development server               |
| `yarn build`            | Build for production                   |
| `yarn preview`          | Preview production build               |
| `yarn lint`             | Run ESLint                             |
| `yarn lint:fix`         | Fix ESLint issues                      |
| `yarn format`           | Format code with Prettier              |
| `yarn format:check`     | Check code formatting                  |
| `yarn format:all`       | Format all project files               |
| `yarn code-quality`     | Run all quality checks                 |
| `yarn code-quality:fix` | Fix all quality issues                 |
| `yarn type-check`       | Run TypeScript type checking           |
| `yarn clean`            | Clean build artifacts and dependencies |
| `yarn analyze`          | Analyze bundle size                    |

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository** and create a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Run quality checks** before committing

   ```bash
   yarn code-quality
   ```

4. **Commit your changes** with a descriptive message

   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork** and create a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

### Coding Standards

- **TypeScript**: Use strict mode, define proper types
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes
- **Imports**: Use path aliases (`@/`, `@assets/`, `@routes/`)
- **File Naming**: Use kebab-case for files, PascalCase for components

### Code Quality

- **ESLint**: Follow the rules in [`eslint.config.js`](eslint.config.js)
- **Prettier**: Code formatting rules in [`.prettierrc`](.prettierrc)
- **TypeScript**: Strict type checking enabled
- **Testing**: Add tests for new features (when testing is set up)

### Pull Request Guidelines

- **Title**: Use conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
- **Description**: Clearly describe what your PR does and why
- **Testing**: Ensure all quality checks pass
- **Documentation**: Update README if needed
- **Breaking Changes**: Clearly document any breaking changes

### Commit Message Convention

Follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── routes/          # Route components
│   ├── root.tsx     # Root layout component
│   ├── home.tsx     # Home page component
│   └── error.tsx    # Error boundary component
├── index.css        # Global styles (Tailwind imports)
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite type definitions
```

## 🏗️ Architecture

This scaffold follows modern React patterns:

- **Component-Based**: Reusable, composable components
- **TypeScript-First**: Full type safety throughout the application
- **Route-Based Code Splitting**: Automatic code splitting by routes
- **Error Boundaries**: Graceful error handling at route level
- **Environment-Aware**: Different configurations per environment

## 📄 License

This project is private and not licensed for public use.

## 🙋 Support

If you have questions or need help:

1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy coding! 🚀✨**
