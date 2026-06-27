import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { I18nProvider } from '@/providers/I18nProvider.jsx';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <I18nProvider>
      <App />
    </I18nProvider>
  </>
);