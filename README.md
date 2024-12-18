# Anaxer SaaS Portal

A modern SaaS portal built with Next.js 15, featuring client verification, AI-powered document processing, and integrated payment solutions.

## Features

- 🤖 AI-powered document verification engine
- 💳 Stripe payment integration
- 📄 Rich text editing with TipTap
- 🔐 Secure authentication
- 📱 Responsive dashboard
- 🎨 Modern UI with Tailwind CSS
- 🛠️ API configuration
- ✉️ Email configuration
- 🎯 Journey builder
- 🏢 Client management

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Payment Processing**: Stripe
- **Rich Text Editor**: TipTap
- **Icons**: Heroicons, React Icons
- **Charts**: ApexCharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd anaxer-saas-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

- `/app` - Next.js app directory containing routes and API endpoints
- `/components` - Reusable React components
- `/types` - TypeScript type definitions
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Key Components

- **Verification Engine**: AI-powered document verification system
- **Client Management**: Comprehensive client data management
- **Journey Builder**: Visual workflow builder for client journeys
- **Settings**: Configurable options for API, email, and branding
- **Billing**: Subscription and payment management

Test