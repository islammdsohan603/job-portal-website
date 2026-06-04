

export const getData = async () => {

  const res = await fetch('http://localhost:5000/jobs', { cache: 'no-store' })
  const result = await res.json()
  return result

}


export const getSingleData = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/jobs/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};


export const getCompanyData = async () => {
  const res = await fetch('http://localhost:5000/company', { cache: 'no-store', headers: { 'Content-Type': 'application/json' } })
  const result = await res.json()
  return result
}


// applylist data

export const getApplyListData = async () => {
  const res = await fetch(`http://localhost:5000/job-seeker-data`, { cache: 'no-store', headers: { 'Content-Type': 'application/json' } })
  const result = await res.json()
  return result
}


