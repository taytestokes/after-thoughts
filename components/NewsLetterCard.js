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
    <div className="p-4 md:p-8 rounded-md bg-zinc-100 border border-zinc-200 mt-auto">
      <p className="text-xl text-zinc-900 font-bold">Subscribe to the newsletter!</p>
      <p className="text-zinc-700 mt-2">
        Sign up for the news letter to receive updates about new posts and other content that won't
        be posted!
      </p>

      <div className="text-sm font-bold text-zinc-700 mt-2">
        {formState.status === 'default' && <p>{data?.subscriber_count} subscribers</p>}

        {formState.status === 'success' && <p className="text-green-600">{formState.message}</p>}

        {formState.status === 'error' && <p className="text-red-600">{formState.message}</p>}
      </div>

      <form className="relative mt-2" onSubmit={subscribe}>
        <input
          aria-label="Enter your email address to subscribe to the newsletter"
          autoComplete="email"
          className="w-full text-zinc-900 border border-zinc-200 py-3 pl-2 pr-32 rounded-md focus:outline-0"
          name="email"
          onChange={handleInputChange}
          placeholder="email@example.com"
          type="email"
          value={formData.email}
        />
        <button
          className="absolute top-1 bottom-1 right-1 w-28 flex items-center justify-center text-white font-bold bg-zinc-900 px-4 rounded-md"
          disabled={formState.status === 'loading'}
        >
          {formState.loading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}
