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

## 📸 Screenshots
Add a screenshot of the panel running in Grafana here.

---

## 🎥 Demo Video
A short demo video (1–2 minutes) showing:
- Plugin loaded in Grafana
- Panel options
- Dynamic radius behavior
- Developer signature

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

---

## 🧑‍🎓 Author
**İlayda Kızılırmak**
