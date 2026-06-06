# HireLoop Job Portal

HireLoop is a modern job portal built with Next.js. It helps job seekers
discover companies, browse jobs, submit applications, track submitted
applications, and explore pricing plans. It also includes a recruiter dashboard
prototype for managing hiring activity and a Stripe Checkout flow for paid plans
or course-style purchases.

## Key Features

- **Modern landing page** with featured jobs, product sections, pricing, and
  call-to-action areas.
- **Job browsing** with search, category filtering, location filtering, and
  pagination.
- **Company directory** showing hiring companies with company detail pages.
- **Job detail pages** with company profile, contact information, benefits, and
  application form.
- **Application submission** with applicant details, resume URL, portfolio URL,
  salary expectation, availability, and cover message.
- **Application list page** where submitted applications can be reviewed.
- **Authentication** using Better Auth with email/password and Google provider
  support.
- **User profile page** showing account information from the authenticated
  session.
- **Recruiter dashboard** at `/dashboard/recuter` with local-state hiring
  metrics, jobs, applicants, interviews, activity, and job posting UI.
- **Pricing plans** with monthly/yearly toggle and Stripe Checkout integration.
- **Payment success and cancel pages** for Stripe redirect handling.
- **Responsive dark UI** built with Tailwind CSS, HeroUI, Lucide icons, React
  Icons, and Framer Motion.

## Live Demo Link : https://jobswebsite-sooty.vercel.app/

## User Guide

### For Job Seekers

1. Visit the homepage and explore featured jobs, companies, and platform
   benefits.
2. Open **Browse Jobs** from the navbar.
3. Search by job title, keyword, company, location, or category.
4. Open a job/company detail page to view company information, contact details,
   benefits, and rating.
5. Click **Apply Now** and complete the application form.
6. Submit your application with resume and optional portfolio links.
7. Visit **My Applications** at `/applylist` to review submitted applications.

### For Recruiters

1. Open the recruiter dashboard at `/dashboard/recuter`.
2. Review hiring metrics such as active jobs, applicants, interviews, and hired
   candidates.
3. Manage local job cards, pause or activate jobs, and search/filter open roles.
4. Review applicant cards and update candidate stages.
5. Check interview schedules and recent hiring activity.
6. Use the post job panel to add a new local job item to the dashboard.

The recruiter dashboard is currently a front-end workspace powered by
local/sample state. It does not persist recruiter changes to the database yet.

### For Paid Plans

1. Go to the pricing section on the homepage.
2. Choose monthly or yearly billing.
3. Select a paid plan.
4. The frontend sends product data to the Express backend.
5. The backend creates a Stripe Checkout session and redirects the user to
   Stripe.
6. After payment, Stripe redirects to `/success` or `/cancel`.

## Screenshot

## Home page

![alt text](<Screenshot 2026-06-06 082630.png>)

## Company Name Page

![alt text](<Screenshot 2026-06-06 082644.png>)

## Applications List Page

![alt text](<Screenshot 2026-06-06 082732.png>)

## Recuter Page

![alt text](<Screenshot 2026-06-06 082748.png>)

## Tech Stack

-Node.js -Express.js

- Next.js `16.2.6`
- React `19.2.4`
- Tailwind CSS
- HeroUI
- DaisyUI
- Better Auth
- MongoDB client
- Framer Motion
- Lucide React
- React Icons
- React Toastify

Create or update `.env` in the frontend project:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Important API Routes

### Frontend App Routes

- `/` - Homepage
- `/browsejobs` - Browse and filter jobs
- `/company` - Company list
- `/details/[id]` - Job/company details
- `/applylist` - Submitted applications
- `/profile` - User profile
- `/dashboard/recuter` - Recruiter dashboard
- `/success` - Stripe payment success page
- `/cancel` - Stripe payment cancel page
- `/login` - Login page
- `/signup` - Signup page

### Backend Routes

- `GET /` - Backend health check
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get single job
- `GET /company` - Get company list
- `POST /job-seeker` - Submit application
- `GET /job-seeker-data` - Get submitted applications
- `POST /checkout` - Create Stripe Checkout session

## Stripe Checkout Payload

The frontend sends this structure to the backend:

```json
{
  "product": {
    "name": "Growth Monthly",
    "price": 17,
    "image": "http://localhost:3000/logo.png"
  }
}
```

The backend validates the product name and price, creates a Stripe Checkout
session, and returns:

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

## Environment Notes

- Never expose `STRIPE_SECRET_KEY` in frontend code.
- Use only `NEXT_PUBLIC_*` variables for values that are safe to expose in the
  browser.
- If a Stripe secret key was shared publicly or pasted into chat, rotate it from
  the Stripe Dashboard immediately.
- Make sure the backend runs on port `5000` or update `NEXT_PUBLIC_API_URL`.
- Make sure `CLIENT_URL` in the backend matches the frontend URL.

## Current Limitations

- Recruiter dashboard changes are local-state only and are not saved to MongoDB
  yet.
- Some job data depends on the Express backend being available.
- Stripe Checkout requires a valid rotated Stripe secret key in the backend
  `.env`.
- Application submissions use the backend `/job-seeker` route and require
  MongoDB connectivity.

## Future Improvements

- Persist recruiter jobs, applicant stages, and interviews in MongoDB.
- Add role-based access for recruiters and job seekers.
- Add saved jobs and favorite companies.
- Add application status tracking for each user.
- Add Stripe webhook handling for verified payment records.
- Add dashboard analytics from real application data.
- Improve backend validation and add automated tests.

## Deployment Checklist

- Set frontend environment variables in the hosting platform.
- Set backend environment variables securely.
- Deploy backend first and confirm API availability.
- Update `NEXT_PUBLIC_API_URL` to the production backend URL.
- Update backend `CLIENT_URL` to the production frontend URL.
- Rotate and configure Stripe keys for the correct environment.
- Run `npm run build` before publishing the frontend.

## License

This project is private and intended for portfolio, learning, or product
development use.
