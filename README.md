☢️ DoseSync – Frontend v1

A user-friendly web interface for managing patient scheduling and dose planning in the Nuclear Department.

The frontend allows staff to plan today's or the week's schedule - when to inject, how much to inject, and monitor remaining doses after injections. 
Role-based access and interacts with the backend system to ensure accurate, real-time data.

There are user interfaces for managing calculations, hospital data, and isotopes.  
DoseSync provides two user roles:  
- **Admins** (Doctors or Physicists) who can create and modify plans  
- **Technicians** who can view schedules and dose information only  

Schedules and data can also be exported as PDFs for reporting and offline use.
[2025-06-03.FPyl study-29.pdf](https://github.com/user-attachments/files/20592239/2025-06-03.FPyl.study-29.pdf)

---
![HomeView](https://github.com/user-attachments/assets/86a24c2b-2685-4c47-ac35-814bc376de12)
![AdminView](https://github.com/user-attachments/assets/e242241c-c9d7-4019-96c2-98c4d80f5594)

DoseSync Frontend is built with Vue and communicates with the backend via REST APIs.  

🚀 Features  
- Responsive interface for daily/weekly injection planning  
- Real-time dose calculation feedback from backend  
- PDF export of schedules  
- Easy configuration of hospitals, isotopes, and user profiles  
- Seamless integration with the backend REST API
- Account management

🛠️ Tech Stack  
- Vue 3
- TypeScript  
- Axios for API communication  
- Vue Router  
- Bootstrap  

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
