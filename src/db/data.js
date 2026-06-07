

export const getData = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, { cache: 'no-store' })
  const result = await res.json()
  return result

}


export const getSingleData = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};


export const getCompanyData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, { cache: 'no-store', headers: { 'Content-Type': 'application/json' } })
  const result = await res.json()
  return result
}


// applylist data

export const getApplyListData = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const res = await fetch(`${apiUrl}/job-seeker-data`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch applications: ${res.status}`);
    }

    const result = await res.json();
    return Array.isArray(result) ? result : result.applications || [];
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return [];
  }
}
