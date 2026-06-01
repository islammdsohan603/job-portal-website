import { MongoClient } from 'mongodb';

const requiredFields = ['name', 'email', 'phone', 'resumeUrl', 'message'];

let cachedClient;

const getClient = async () => {
  if (!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI is not configured');
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_DB_URI);
    await cachedClient.connect();
  }

  return cachedClient;
};

const isBlank = value => typeof value !== 'string' || !value.trim();

const isValidUrl = value => {
  if (isBlank(value)) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export async function POST(request) {
  try {
    const body = await request.json();
    const missingFields = requiredFields.filter(field => isBlank(body[field]));

    if (missingFields.length > 0) {
      return Response.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (!isValidUrl(body.resumeUrl)) {
      return Response.json(
        { error: 'Please provide a valid resume URL.' },
        { status: 400 }
      );
    }

    if (!isBlank(body.portfolioUrl) && !isValidUrl(body.portfolioUrl)) {
      return Response.json(
        { error: 'Please provide a valid portfolio or LinkedIn URL.' },
        { status: 400 }
      );
    }

    const now = new Date();
    const client = await getClient();
    const applications = client.db('jobprotal').collection('applications');

    await applications.insertOne({
      job: {
        id: body.jobId || null,
        name: body.jobName || null,
        industry: body.industry || null,
        location: body.location || null,
      },
      applicant: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        currentRole: body.currentRole?.trim() || '',
        expectedSalary: body.expectedSalary?.trim() || '',
        availability: body.availability?.trim() || '',
        resumeUrl: body.resumeUrl.trim(),
        portfolioUrl: body.portfolioUrl?.trim() || '',
        message: body.message.trim(),
      },
      status: 'new',
      createdAt: now,
      updatedAt: now,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Application API Error:', error);
    return Response.json(
      { error: 'Unable to submit application right now.' },
      { status: 500 }
    );
  }
}
