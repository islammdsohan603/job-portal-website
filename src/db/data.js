

export const getData = async () => {

  const res = await fetch('http://localhost:5000/jobs', { cache: 'no-store' })
  const result = await res.json()
  return result

}


export const getSingleData = async (id) => {
  const res = await fetch(`/api/jobs/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch job data')
  }
  const result = await res.json()
  return result
}
