import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/modalContext.tsx'
import { store } from './store/store.tsx'
import { Provider } from 'react-redux'
import { PriceProvider } from './context/priceContext.tsx'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <PriceProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </PriceProvider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
