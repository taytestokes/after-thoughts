/**
 * A wrapper function around the fetch api
 * that converts to response into json data and is
 * used as the fetcher function for swr calls
 */
export const fetcher = async (resource, options) => {
  const response = await fetch(resource, options)

  return response.json()
}
