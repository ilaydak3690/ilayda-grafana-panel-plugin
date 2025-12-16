# Ilayda Grafana Panel Plugin

## Overview
This project is a **custom Grafana panel plugin** developed as a **final project**.  
The plugin demonstrates how to build a React + TypeScript based Grafana panel that dynamically reacts to incoming data and user configuration options.

The panel visualizes data using a circular SVG element whose appearance changes based on:
- Query (series) count
- User-defined panel options
- Grafana theme (light / dark)

**Developed by:**  
**İlayda Kızılırmak**

---

## ✨ Features

### ✅ Core Requirements (Mandatory)
- Custom Grafana **panel plugin**
- Successfully builds and loads inside Grafana
- Displays the student’s name inside the plugin UI  
  *(“Developed by İlayda Kızılırmak”)*

---

## 🎁 Bonus Features

### 🔹 Bonus 1 – Custom Panel Options
- Editable text option
- Series counter display
- Adjustable base circle radius
- Custom circle color
- Toggleable developer signature

---

### 🔹 Bonus 2 – UI & Customization
- Panel options allow real-time customization
- Signature text can be changed dynamically
- Responsive SVG rendering

---

### 🔹 Bonus 3 – Theme-Aware Visualization
- Circle color automatically adapts to Grafana **light/dark theme**
- Optional override with a custom color picker

---

### 🔹 Bonus 4 – Data-Driven Dynamic Visualization
The panel dynamically reacts to incoming data:

- The number of query series is read from `data.series.length`
- Circle radius is calculated using the formula:

```
dynamicRadius = min(
  baseRadius + seriesCount × radiusPerSeries,
  maxRadius
)
```

- Users can control:
  - Growth per series
  - Maximum radius cap

The calculated radius is displayed directly on the panel for transparency.

### 🔹 Bonus 5 – Time-Series Data Awareness
The panel reads time-series query results from Grafana and extracts the latest numeric value along with its timestamp.  
This ensures the visualization reacts dynamically to the selected time range.

---

## 🧠 How It Works (Technical Summary)

- **Grafana queries** populate `data.series`
- The panel uses React and SVG to render visuals
- Panel options are defined via `setPanelOptions`
- Visualization updates automatically when:
  - Query count changes
  - Panel options are modified
  - Theme switches between light/dark mode

---

## 🛠 Installation & Development

### Prerequisites
- Node.js
- Docker
- Grafana

### Run in Development Mode
```bash
npm install
npm run build
docker compose up
```

Grafana will be available at:
```
http://localhost:3000
```

---

## 📸 Screenshot – Plugin Running in Grafana

The screenshot below shows the custom panel plugin running inside Grafana.
The developer name and dynamic panel options are clearly visible.

![Grafana Panel Screenshot](./img/grafana-panel.png)


---

## 📁 Repository
GitHub Repository:  
https://github.com/ilaydak3690/ilayda-grafana-panel-plugin

---

## ✅ Conclusion
This project successfully demonstrates:
- Custom Grafana plugin development
- React + TypeScript integration
- Dynamic, data-driven UI behavior
- Clean and configurable visualization design

##github: https://github.com/ilaydak3690/ilayda-grafana-panel-plugin

---

## 🧑‍🎓 Author
*İlayda Kızılırmak 2022502105*

# Ilayda Grafana Panel Plugin

## Overview
This project is a custom Grafana panel plugin developed as a final course project.  
The plugin demonstrates the design and implementation of a React and TypeScript based visualization that dynamically reacts to time-series data and user-defined configuration options.

The panel renders a custom SVG-based visualization and integrates directly with Grafana’s query and theming system.

**Author:** İlayda Kızılırmak

---

## Core Requirements
- Custom Grafana panel plugin implementation  
- Successful build and execution inside Grafana  
- Developer name displayed within the panel interface  

---

## Implemented Bonus Features
- Configurable panel options including editable text, series counter toggle, circle radius control, color selection, and signature visibility  
- Real-time UI updates without page reload  
- Theme-aware visualization supporting Grafana light and dark modes  
- Data-driven circle scaling based on the number of active query series with a maximum radius limit  
- Display of calculated radius value for transparency  
- Extraction and display of the latest numeric value from time-series query results  
- Display of the timestamp corresponding to the latest data point  
- Custom time-series visualization using TestData scenarios (USD, EUR, Gold, Silver in TRY)  
- Professional documentation and a short demo video  

---

## Technical Summary
- Query data is accessed via `data.series`  
- Visualization is rendered using React and SVG  
- Panel options are defined with `setPanelOptions`  
- The panel updates automatically when data, options, or theme settings change  

---

## Installation
```bash
npm install
npm run build
docker compose up
```

Grafana runs at:
```
http://localhost:3000
```

---

## Submission Materials
- GitHub repository link  
- Plugin source code  
- Screenshot of the plugin running inside Grafana with developer name visible  
- Short demo video demonstrating functionality  

---

## Conclusion
The project satisfies all mandatory requirements and includes multiple optional enhancements.  
It demonstrates practical knowledge of Grafana plugin development, dynamic data handling, and configurable UI design.

---

## Author
İlayda Kızılırmak (2022502105)