import React, { useState } from 'react'

function ApiKeyForm({ onSubmit }) {
  const [key, setKey] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!key.trim()) return
    onSubmit(key.trim())
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="apiKey">Telegram Bot API Key:</label>
        <input
          id="apiKey"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Telegram Bot API key"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ApiKeyForm
