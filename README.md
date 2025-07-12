
# Finance Calculator Web App

A modern, responsive finance calculator web application built with React, TypeScript, and Tailwind CSS. The app features a beautiful mobile-first design with customizable themes and advanced calculation capabilities.

![Finance Calculator Screenshot](https://via.placeholder.com/400x600?text=Finance+Calculator+Screenshot)

## 🚀 Features

### Core Calculator Functions
- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (*), Division (/)
- **Advanced Functions**: Parentheses grouping, percentage calculations, decimal support
- **Smart Parentheses**: Intelligent parentheses handling that automatically switches between opening "(" and closing ")" based on context
- **Percentage Quick Actions**: One-tap percentage calculations (25%, 50%, 75%, 100%) based on your balance
- **Real-time Formula Display**: Shows the current calculation formula above the result

### User Interface
- **Mobile-First Design**: Optimized for mobile devices with responsive desktop support
- **Beautiful Green Gradient**: Custom green gradient background matching modern finance app aesthetics
- **Customizable Themes**: Built-in color picker with preset color options and reset functionality
- **Touch-Friendly Buttons**: Large, well-spaced buttons with visual feedback and shadows
- **Clear Visual Hierarchy**: Different button styles for numbers, operators, and special functions

### Navigation & UX
- **Dummy Landing Page**: Professional starting page with app navigation
- **Seamless Navigation**: Smooth transitions between landing page and calculator
- **Balance Display**: Shows your available balance below the calculation result
- **Responsive Layout**: Maintains perfect proportions across all screen sizes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React icon library
- **Routing**: React Router DOM for navigation
- **Build Tool**: Vite for fast development and building
- **Mobile Support**: Capacitor for iOS/Android deployment

## 📱 Mobile Deployment

This app is configured for mobile deployment using Capacitor:

- **iOS Support**: Ready for App Store deployment
- **Android Support**: Ready for Google Play Store deployment
- **Native Features**: Camera, storage, and device API access
- **Offline Capability**: Works without internet connection

## 🎨 Design System

The app follows a carefully crafted design system:

- **Primary Colors**: Custom green gradient (`hsl(152, 76%, 36%)`)
- **Accent Colors**: White overlays with backdrop blur effects
- **Typography**: Clean, modern font hierarchy
- **Spacing**: Consistent 16px grid system
- **Shadows**: Subtle depth with modern shadow effects

## 🔧 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Development
```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Build the web app
npm run build

# Add mobile platforms
npx cap add ios
npx cap add android

# Sync changes to mobile platforms
npx cap sync

# Open in native IDEs
npx cap open ios
npx cap open android
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Calculator.tsx   # Main calculator component
│   ├── ColorPicker.tsx  # Theme customization component
│   └── ui/             # Shadcn/ui components
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   └── Index.tsx       # Main app entry
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
└── index.css          # Global styles and design tokens
```

## 🎯 Key Components

### Calculator Component
The main calculator component (`src/components/Calculator.tsx`) includes:
- State management for calculations and display
- Smart parentheses handling logic
- Percentage calculation functions
- Theme customization integration
- Responsive button grid layout

### Color Picker Component
Theme customization component (`src/components/ColorPicker.tsx`) featuring:
- Preset color palette
- Real-time background updates
- Reset to original theme option
- Smooth dropdown animations

### Home Page
Landing page (`src/pages/Home.tsx`) with:
- Professional app branding
- Clear call-to-action button
- Smooth navigation to calculator

## 🚀 Deployment Options

### Web Deployment (Lovable Platform)
1. Click the "Publish" button in Lovable
2. Your app will be deployed to `yourapp.lovable.app`
3. Optionally connect a custom domain in Project Settings

### Mobile App Deployment
1. Build the web app: `npm run build`
2. Sync with mobile platforms: `npx cap sync`
3. Open in Xcode (iOS) or Android Studio
4. Build and publish to respective app stores

### Custom Hosting
Deploy the built files to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🎨 Customization

### Changing Colors
Modify the color system in `src/index.css`:
```css
:root {
  --primary: your-color-here;
  --secondary: your-color-here;
}
```

### Adding New Functions
Extend the calculator by adding new operations in `Calculator.tsx`:
```typescript
const performCalculation = () => {
  // Add your custom calculation logic here
};
```

### Modifying Layout
Adjust the button grid or add new buttons in the Calculator component's JSX section.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Usage Tips

### Smart Parentheses
- Press the "( )" button to add opening parentheses
- Press again to automatically add closing parentheses when needed
- The button intelligently switches between "(" and ")" based on context

### Percentage Calculations
- Use the top row buttons (25%, 50%, 75%, 100%) for quick percentage calculations
- Results are calculated based on your displayed balance
- Perfect for calculating tips, discounts, or investment percentages

### Theme Customization
- Tap the settings gear icon (top-right) to access color options
- Choose from preset colors or reset to the original green theme
- Changes apply instantly across the entire app

## Screenshots 📷 (Android)
### Home Screen
![Home screen view](<img width="380" height="847" alt="image" src="https://github.com/user-attachments/assets/d2d68d23-0b7b-47bb-a5a9-cd090dcc5283" />)
### Calculator
![Calculator view](<img width="388" height="856" alt="image" src="https://github.com/user-attachments/assets/56e34045-1275-40b4-8456-1dfb87192e0f" />)
### Settings
![Settings](<img width="386" height="848" alt="image" src="https://github.com/user-attachments/assets/2b95feeb-02dc-4e0b-8ba1-47f97c3d713f" />)

## Screenshots 📷 (WebApp)
### Home Screen
![Home screen view](<img width="1918" height="916" alt="image" src="https://github.com/user-attachments/assets/63349531-1092-4fa7-8507-f8943764a223" />)
### Calculator
![Calculator view](<img width="1916" height="921" alt="image" src="https://github.com/user-attachments/assets/bc14364b-6b1f-4505-a440-9f0ab90e00d5" />)
### Settings
![Settings](<img width="1916" height="913" alt="image" src="https://github.com/user-attachments/assets/695c82bf-a66c-4eaf-9690-24f6c3478e62" />)
## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for troubleshooting tips

---

**Built using React, TypeScript, and Tailwind CSS**
