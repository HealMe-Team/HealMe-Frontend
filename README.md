# Project Documentation: healme-app

## Overview

The `healme-app` is a web application developed using Vue 3 and Vite. It is designed to manage and display information about doctors, hospitals, and appointments. The project includes both frontend components and a backend setup using `json-server` for mock data.

## Project Structure

### Frontend

The frontend is built with Vue 3 and includes several components:

- **Doctors Component (`src/components/Doctors/Doctors.component.vue`)**: Displays a list of doctors with their details.
- **Doctor View Component (`src/components/Doctors/DoctorView.vue`)**: Shows scheduled appointments for a selected doctor.

#### Key Features

- **Doctor List**: Displays doctors with hover effects.
- **Appointments**: Lists scheduled appointments and allows clearing them from local storage.

### Backend

The backend is simulated using `json-server`, which serves mock data from `db.json` and routes defined in `routes.json`.

#### Key Features

- **Mock Data**: Provides endpoints for products and hospitals.
- **API Endpoints**: Allows CRUD operations on the mock data.

### Scripts

- **start.sh**: Script to start the `json-server`.

### Configuration

- **Vite Configuration**: The project uses Vite for development and build processes.

## Setup and Usage

### Recommended IDE Setup

- **VSCode**: Recommended with the Volar extension (disable Vetur).

### Project Setup

1. **Install Dependencies**:
    ```sh
    npm install
    ```

2. **Compile and Hot-Reload for Development**:
    ```sh
    npm run dev
    ```

3. **Compile and Minify for Production**:
    ```sh
    npm run build
    ```

4. **Start Backend Server**:
    ```sh
    ./start.sh
    ```

## File Descriptions

- **`src/components/Doctors/Doctors.component.vue`**: Contains the template, script, and styles for displaying doctors.
- **`src/components/Doctors/DoctorView.vue`**: Manages and displays scheduled appointments.
- **`start.sh`**: Shell script to start the `json-server`.
- **`README.md`**: Provides setup instructions and project overview.

## Conclusion

The `healme-app` is a comprehensive project that integrates a Vue 3 frontend with a mock backend using `json-server`. It is designed to be easily extendable and customizable for further development.
