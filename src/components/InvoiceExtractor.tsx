import React, { useState } from 'react'

type Evaluation = {
  score?: number | string
  feedback?: string
}

type ExtractResult = {
  data?: unknown
  evaluation?: Evaluation
}

function parseStr(result: unknown): ExtractResult | null {
  if (typeof result !== 'string') return result as ExtractResult | null
  try {
    return JSON.parse(result) as ExtractResult
  } catch (err) {
    console.error('Failed to parse JSON:', err)
    return null
  }
}

const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) {
  throw new Error('VITE_API_URL is not set')
}

export default function InvoiceExtractor() {
  const [emailText, setEmailText] = useState<string>('')
  const [result, setResult] = useState<ExtractResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleExtract = async () => {
    setLoading(true)
    const res = await fetch(`${API_URL}/v1/prefill/ui`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_text: emailText }),
    })
    const data = await res.text()
    const parsedData = parseStr(data)
    setResult(parsedData)
    setLoading(false)
  }

  return (
    <div>
      <h2>Invoice Extractor</h2>
      <textarea
        rows={5}
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        placeholder='Paste invoice email text here...'
        style={{ width: '100%' }}
      />
      <button onClick={handleExtract} disabled={loading}>
        {loading ? 'Extracting...' : 'Extract Invoice'}
      </button>
      {result && (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <h3>Extracted Data</h3>
          <pre>{JSON.stringify(result?.data, null, 2)}</pre>
          <h3>Evaluation</h3>
          <p>
            <b>Score:</b> {result?.evaluation?.score}
          </p>
          <p>
            <b>Feedback:</b> {result?.evaluation?.feedback}
          </p>
        </div>
      )}
    </div>
  )
}


