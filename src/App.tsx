import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import AppRouter from './routes/router'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  )
}

export default App
