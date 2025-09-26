# 🎯 Playwright Testing Project - Codere Login Functionality

This project is built using **[Playwright](https://playwright.dev/)** to automate and verify the **Login functionality** of the following website:

> 🔗 https://m.apuestas.codere.es/

The tests are structured following the **Page Object Model (POM)** architecture to improve maintainability, reusability, and clarity.

---

## Project Structure

### 📁 `pages/`
Contains all the **Page Object Model** classes representing different views and components of the application.

### 📁 `configs/`
Includes configuration files for different test environments:
- `dev`
- `pre`
- `prod`

### 📁 `tests/`
Contains all the test suites, grouped by type:
- `smoke`
- `regression`
- `e2e`

### 📁 `utils/`
Contains **reusable helper functions** and utilities used across the project.

---

## 🚀 Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) installed (LTS Version)

### 📦 Installation & Run

1. **Clone the repository**
1. **Enter in root folder of the repository**
1. **Scripts** 
   ```bash
   npm install
   npm run test
   npm run report


Note: by default npm run test start with dev environment.

**Extra Commands** 
   ```bash
   npm run test:smoke
   npm run test:regression