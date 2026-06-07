const getBackendApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }

  return apiUrl;
};

const toBackendApplicationPayload = body => ({
  candidateName: body.name || body.candidateName,
  email: body.email,
  phone: body.phone,
  currentRole: body.currentRole,
  expectedSalary: body.expectedSalary,
  availability: body.availability,
  resumeUrl: body.resumeUrl,
  portfolioUrl: body.portfolioUrl,
  message: body.message,
  jobId: body.jobId,
  jobName: body.jobName,
  industry: body.industry,
  location: body.location,
});

export async function GET() {
  try {
    const res = await fetch(`${getBackendApiUrl()}/job-seeker-data`, {
      cache: 'no-store',
    });
    const data = await res.json().catch(() => []);

    if (!res.ok) {
      return Response.json(
        { error: data?.error || 'Unable to fetch applications right now.' },
        { status: res.status }
      );
    }

    return Response.json(
      { applications: Array.isArray(data) ? data : data.applications || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get Applications API Error:', error);
    return Response.json(
      { error: 'Unable to fetch applications right now.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${getBackendApiUrl()}/job-seeker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toBackendApplicationPayload(body)),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json(
        { error: data?.error || 'Unable to submit application right now.' },
        { status: res.status }
      );
    }

    return Response.json(data || { success: true }, { status: res.status });
  } catch (error) {
    console.error('Application API Error:', error);
    return Response.json(
      { error: 'Unable to submit application right now.' },
      { status: 500 }
    );
  }
}
