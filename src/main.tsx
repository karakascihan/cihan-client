import { createRoot } from 'react-dom/client'
 import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { addLocale, PrimeReactProvider } from 'primereact/api'
import { GlobalNotification } from './components/GlobalNotification.tsx'
 import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { locale } from 'primereact/api';
import { GlobalSidebarProvider } from './context/GlobalSidebarContext.tsx'
       addLocale('tr', {
    firstDayOfWeek: 1,
    dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
    monthNames: [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ],
    monthNamesShort: [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ],
    today: 'Bugün',
    clear: 'Temizle',
    weekHeader: 'Hf',
    accept: 'Evet',
    reject: 'Hayır',
    choose: 'Seç',
    upload: 'Yükle',
    cancel: 'İptal',
  });

locale('tr');
createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
    {/* <ThemeProvider> */}
    <GlobalSidebarProvider>
        <PrimeReactProvider value={{ locale: "tr" }}>
        {/* <PrimeReactProvider> */}
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
     <GlobalNotification />
     
    </PrimeReactProvider>
    </GlobalSidebarProvider>
    {/* </ThemeProvider> */}
  </Provider>
)
