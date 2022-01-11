import { useState } from 'react'

export const useFormData = (intialFormData = {}) => {
  const [formData, setFormData] = useState(intialFormData)

  const handleInputChange = (evt) => {
    evt.preventDefault()

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  return {
    formData,
    handleInputChange,
  }
}
