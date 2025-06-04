☢️ DoseSync – Frontend v1

A user-friendly web interface for managing patient scheduling and dose planning in the Nuclear Department.

The frontend allows staff to plan today's or the week's schedule—when to inject, how much to inject, and monitor remaining doses after injections. It supports role-based access and interacts seamlessly with the backend system to ensure accurate, real-time data.

There are user interfaces for managing calculations, hospital data, and isotopes.  
DoseSync provides two user roles:  
- **Admins** (Doctors or Physicists) who can create and modify plans  
- **Technicians** who can view schedules and dose information only  

Schedules and data can also be exported as PDFs for reporting and offline use.

---
DoseSync Frontend is built with React and communicates with the backend via REST APIs.  
This repository contains the client-side codebase responsible for the user experience and UI interactions.

🚀 Features  
- Modern, responsive interface for daily/weekly injection planning  
- Secure login and role-based access  
- Real-time dose calculation feedback from backend  
- PDF export of schedules  
- Easy configuration of hospitals, isotopes, and user profiles  
- Seamless integration with the backend REST API  

🛠️ Tech Stack  
- React 18+  
- TypeScript  
- Axios for API communication  
- React Router  
- Material-UI (or Tailwind CSS)  
- Redux Toolkit or Context API  
- Vite / Webpack for bundling  

## 📝 Prerequisites

- Node.js 18+  
- npm or yarn  
- A running instance of the [DoseSync Backend](https://github.com/andy-reiu/dosesyncback)

### Getting Started
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 👤 Authors

- **Andy Reiu** – *El Capitan* – [andy-reiu](https://github.com/andy-reiu)
- **Kevin Kuusk** – *El Equipo* – [baluuba](https://github.com/baluuba)
- **Olga Kuvatova** – *El Equipo* – [apelsina365](https://github.com/Apelsinka365)
