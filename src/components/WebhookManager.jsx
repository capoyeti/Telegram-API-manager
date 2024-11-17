import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

function WebhookManager({ apiKey, onLogout }) {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [currentWebhook, setCurrentWebhook] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCurrentWebhook = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.telegram.org/bot${apiKey}/getWebhookInfo`)
      const data = await response.json()
      
      if (data.ok) {
        setCurrentWebhook(data.result.url || null)
      } else {
        toast.error('Failed to fetch webhook info')
      }
    } catch (error) {
      toast.error('Error fetching webhook info')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentWebhook()
  }, [apiKey])

  const setWebhook = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.telegram.org/bot${apiKey}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: webhookUrl }),
      })
      const data = await response.json()
      
      if (data.ok) {
        toast.success('Webhook set successfully')
        setCurrentWebhook(webhookUrl)
        setWebhookUrl('')
      } else {
        toast.error('Failed to set webhook')
      }
    } catch (error) {
      toast.error('Error setting webhook')
    } finally {
      setLoading(false)
    }
  }

  const removeWebhook = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.telegram.org/bot${apiKey}/deleteWebhook`)
      const data = await response.json()
      
      if (data.ok) {
        toast.success('Webhook removed successfully')
        setCurrentWebhook(null)
      } else {
        toast.error('Failed to remove webhook')
      }
    } catch (error) {
      toast.error('Error removing webhook')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={onLogout} style={{ background: '#dc3545' }}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Current Webhook:</h3>
        <p>{currentWebhook || 'No webhook set'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="webhookUrl">New Webhook URL:</label>
        <input
          id="webhookUrl"
          type="url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="Enter webhook URL"
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={setWebhook}
            disabled={loading || !webhookUrl}
          >
            Set Webhook
          </button>
          <button
            onClick={removeWebhook}
            disabled={loading || !currentWebhook}
            style={{ background: '#dc3545' }}
          >
            Remove Webhook
          </button>
        </div>
      </div>
    </div>
  )
}

export default WebhookManager
