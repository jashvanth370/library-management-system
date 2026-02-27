# Library Management System

##  Project Overview

The Library Management System is a full-stack web application that allows users to register, log in, and manage books securely.

Users can:
- Register and log in (JWT Authentication)
- Create books
- View books
- Update books
- Delete books

The backend is built using **ASP.NET Core Web API** with **Entity Framework Core** and **SQLite**.  
The frontend is built using **React + TypeScript**.

---

# Technology Stack

## Backend
- ASP.NET Core Web API (.NET 7/8)
- Entity Framework Core
- SQLite
- JWT Authentication

## Frontend
- React
- TypeScript
- Axios
- React Router

---

# Backend Setup & Run Guide

## Prerequisites

Make sure you have installed:

- .NET SDK (7.0 or later)
- Visual Studio or VS Code
- EF Core CLI Tools (if not installed):

```bash
dotnet tool install --global dotnet-ef