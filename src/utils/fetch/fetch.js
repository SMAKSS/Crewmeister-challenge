const errorHandler = async response => {
  const error = await response.json()
  error.status = response.status

  return Promise.reject(error)
}

const get = ({endpoint, abortController}) =>
  window
    .fetch(`${endpoint}`, {
      signal: abortController ? abortController.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })

export {get}
