import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FilterProvider } from './store/context.jsx'
import { AuthProvider } from './store/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <FilterProvider>
      <App />
      </FilterProvider>
    </AuthProvider>
  // <StrictMode>
  // </StrictMode>,
)
