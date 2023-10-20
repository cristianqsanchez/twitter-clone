import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { FirebaseAuthProvider } from './context'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FirebaseAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseAuthProvider>
)
