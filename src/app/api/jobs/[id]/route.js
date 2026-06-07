export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

    if (!apiUrl) {
      return Response.json(
        { error: 'Backend API URL is not configured' },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiUrl}/jobs/${id}`);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json(
        data?.error ? data : { error: 'Failed to fetch job details' },
        { status: res.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
