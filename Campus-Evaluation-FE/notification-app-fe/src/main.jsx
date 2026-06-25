import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Import Log and setup token
import { setLogToken } from '../../logging-middleware/index.js'

// ── Set the Log API bearer token for frontend logging ───────────────────────
// Replace 'YOUR_BEARER_TOKEN_HERE' with your actual evaluation portal token
setLogToken(import.meta.env.VITE_LOG_AUTH_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzIxMWE2NzI5QGJ2cml0LmFjLmluIiwiZXhwIjoxNzgyMzc4MjMyLCJpYXQiOjE3ODIzNzczMzIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4OTVjMmY2MC05MWY1LTQ5NDUtYTUxYS03ZGViNWQ1M2Q1ZDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYWkgYW5pbCBrdW1hciIsInN1YiI6ImFhZjdjMjFlLTMzNGQtNGUzNy1iODRjLWQ4NjlkMjIxYTY5MSJ9LCJlbWFpbCI6IjIzMjExYTY3MjlAYnZyaXQuYWMuaW4iLCJuYW1lIjoic2FpIGFuaWwga3VtYXIiLCJyb2xsTm8iOiIyMzIxMWE2NzI5IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiYWFmN2MyMWUtMzM0ZC00ZTM3LWI4NGMtZDg2OWQyMjFhNjkxIiwiY2xpZW50U2VjcmV0IjoiRmZyY3V4QWZzbm15UVlOWCJ9.ovTeBeFy3VPALA5TzBNIyH1EARZOTgRQcdW87YMWNHo')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
