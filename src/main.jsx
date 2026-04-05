import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,
    style: {
      background: "#333",
      color: "#fff",
    },
  }}
/>
    </BrowserRouter>
  </Provider>
)
