'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <title>Error - Something went wrong</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="text-left bg-gray-100 p-4 rounded mb-6">
                <p className="text-sm text-gray-700 font-mono">
                  {error.message}
                </p>
              </div>
            )}
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}