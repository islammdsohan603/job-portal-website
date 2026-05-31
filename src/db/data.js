

export const getData = async () => {

  const res = await fetch('http://localhost:5000/jobs', { cache: 'no-store' })
  const result = await res.json()
  return result

}
