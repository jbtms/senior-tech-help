# Overview

This is a modern full-stack web application built with React and Express.js that features a newsletter subscription system and session request functionality. The application uses TypeScript throughout and implements a clean, component-based architecture with shadcn/ui components for the frontend and a RESTful API backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Sonner for user feedback

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints with JSON responses
- **Validation**: Zod schemas for request validation
- **Error Handling**: Centralized error middleware
- **Development**: Hot reload with tsx, production build with esbuild

## Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless driver
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Connection pooling with @neondatabase/serverless

## Project Structure
- **Monorepo Layout**: Shared schemas and types between frontend and backend
- **Client Directory**: React frontend application
- **Server Directory**: Express.js backend API
- **Shared Directory**: Common TypeScript schemas and types

## Data Models
- **Users**: Basic user authentication with username/password
- **Newsletter Subscriptions**: Email collection with optional first name
- **Session Requests**: Contact forms with name, email, phone, and details
- **User Roles**: Role-based access control with admin/moderator/user roles

## Development Workflow
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Code Quality**: Consistent imports and path aliases
- **Build Process**: Separate build commands for client and server
- **Environment**: Development and production configurations

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection Management**: WebSocket support for serverless connections

## UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

## Development Tools
- **Vite**: Frontend build tool and development server
- **ESBuild**: Production bundling for backend
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment plugins

## Form and Validation
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation and schema definition
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class management
- **nanoid**: Unique ID generation