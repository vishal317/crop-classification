# � Crop Classification & Yield Analysis

A modern, industrial-themed React application built with Vite for professional crop detection, health assessment, and yield prediction.

## ✨ Features

- **📊 Comprehensive Analysis**: Integrated flow for imagery upload, crop identification, health assessment, and yield estimation.
- **🏗️ Industrial Aesthetic**: High-fidelity wireframe design with bold typography, heavy borders, and a clean grayscale-inspired palette.
- **�️ Spatial Visualization**: Interactive field maps using Leaflet for precise location-based data.
- **� Advanced Reporting**: Dynamic charts with Recharts and PDF export capabilities with `jspdf` and `html2canvas`.
- **🧭 Robust Routing**: Built-in support for multiple routes:
  - `/analysis`: Main data entry and upload module.
  - `/progress`: View real-time simulation of analysis tasks (supports `/analysis/progress/:id`).
  - `/result`: Detailed yield analysis and recommendations (supports `/analysis/result/:id`).

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 14 or higher (v18+ recommended)
- **npm**: v6 or higher

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/).

## 📁 Project Structure

The project follows a modular React architecture:

```text
src/
  ├── api/             # API services and data fetching (e.g., yieldApi.js)
  ├── components/      # Functional UI components
  │   ├── analysis/    # Progress bars, timelines, and analysis cards
  │   ├── common/      # Reusable form elements, buttons, and maps
  │   └── layout/      # Sidebar, top navigation, and main layout structure
  ├── config/          # Application-wide settings (e.g., apiEndpoints.js)
  ├── constants/       # Global constants, labels, and string templates
  ├── hooks/           # Custom React hooks (form management, file upload)
  ├── pages/           # High-level page components (CropAnalysisPage, YieldResults)
  ├── services/        # Business logic and cross-cutting concerns
  ├── utils/           # Helper functions (e.g., PDF export logic)
  ├── App.jsx          # Main routing and entry point
  └── index.css        # Global styles and design system tokens
```

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build and development tool
- **React Router 7** - Declarative routing
- **Lucide React** - High-quality icon library
- **Leaflet & React Leaflet** - Interactive maps
- **Recharts** - Composable charting library
- **ESLint** - Code quality and consistency enforcement

## � How to Use

1. **Upload Imagery**: Drag and drop or browse to select field imagery on the `/analysis` page.
2. **Input Data**: Provide target yield, location IDs, and soil categories.
3. **Start Analysis**: Click the "START ANALYSIS" button to begin processing.
4. **Monitor Progress**: View real-time simulations of spectral signatures and ML model execution.
5. **Review Results**: Export reports as PDF and analyze system-generated recommendations on the `/result` page.

> [!NOTE]
> The application currently operates in "Lo-Fi Wireframe" mode. Data shown is simulated for prototyping and demonstration purposes.
