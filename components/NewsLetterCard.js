import React, { useState } from 'react'
import useSWR from 'swr'
import { useFormData } from '../hooks/useFormData'
import { fetcher } from '../lib/swr'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const NewsLettersCard = () => {
  const [formState, setFormState] = useState({
    status: 'default',
    loading: false,
    message: '',
  })
  const { data } = useSWR('/api/newsletter/subscriptions', fetcher)
  const { formData, handleInputChange } = useFormData({
    email: '',
  })

  const subscribe = async (evt) => {
    evt.preventDefault()

    setFormState({
      ...formState,
      loading: true,
    })

    if (!formData.email) {
      return setFormState({
        status: 'error',
        loading: false,
        message: 'An email address is required!',
      })
    }

    const result = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: formData.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })

    const { error, message } = await result.json()

    if (error) {
      setFormState({
        status: 'error',
        loading: false,
        message,
      })
    } else {
      setFormState({
        status: 'success',
        loading: false,
        message,
      })
    }
  }

  return (
    <div className="p-4 md:p-8 rounded-md bg-zinc-900 mt-auto">
      <p className="text-xl text-white font-bold">Subscribe to the newsletter!</p>
      <p className="text-zinc-200 mt-2">
        Sign up for the news letter to receive updates about new posts and other content that won't
        be posted!
      </p>

      <form className="relative mt-4" onSubmit={subscribe}>
        <input
          aria-label="Enter your email address to subscribe to the newsletter"
          autoComplete="email"
          className={`w-full text-white border border-zinc-700 bg-zinc-800 py-3 pl-2 pr-32 rounded-md focus:outline-0`}
          name="email"
          onChange={handleInputChange}
          placeholder="email@example.com"
          type="email"
          value={formData.email}
        />
        <button
          className="absolute top-1 bottom-1 right-1 w-28 flex items-center justify-center text-white font-bold bg-blue-600 px-4 rounded-md"
          disabled={formState.status === 'loading' || formState.status === 'success'}
        >
          {formState.loading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>

      <div className="mt-4">
        {formState.status === 'default' && (
          <p className="text-zinc-200">{data?.subscriber_count} subscribers</p>
        )}

        {formState.status === 'success' && <p className="text-green-400">{formState.message}</p>}

        {formState.status === 'error' && <p className="text-red-400">{formState.message}</p>}
      </div>
    </div>
  )
}
