
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.de38363b98934e4a97de7a41242ad091',
  appName: 'balance-smart-calc-view',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
   // url: 'https://de38363b-9893-4e4a-97de-7a41242ad091.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    allowNavigation: ['*']
  },
  android: {
    allowMixedContent: true,  
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2e7d32',
      showSpinner: false
    }
  }
};

export default config;
