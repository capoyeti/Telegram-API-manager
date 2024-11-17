import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import WebhookManager from './components/WebhookManager'
import ApiKeyForm from './components/ApiKeyForm'

function App() {
  const [apiKey, setApiKey] = useState('')

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Telegram Webhook Manager</h1>
      <Toaster position="top-right" />
      
      {!apiKey ? (
        <ApiKeyForm onSubmit={setApiKey} />
      ) : (
        <WebhookManager apiKey={apiKey} onLogout={() => setApiKey('')} />
      )}
    </div>
  )
}

export default App
