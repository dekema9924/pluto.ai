import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/modalContext.tsx'
import { store } from './store/store.tsx'
import { Provider } from 'react-redux'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
