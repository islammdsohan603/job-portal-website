export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/jobs/${id}`);

    if (!res.ok) {
      return Response.json(
        { error: 'Failed to fetch job details' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
