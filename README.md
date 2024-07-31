# U-SH (url shortner)

A powerful URL shortening service built with modern technologies including Next.js, MongoDB, Shadcn/UI, and Clerk for authentication. The project features a user dashboard for managing links and comprehensive analytics.

![preview](/public/preview-dark.png)

## Features

- **Next.js**: React framework for server-side rendering and static site generation.
- **MongoDB**: NoSQL database for storing shortened URLs and user data.
- **Shadcn/UI**: Component library for building user interfaces.
- **Clerk Auth**: User authentication and management.
- **User Dashboard**: Manage your shortened links, view analytics, and track performance.
- **Analytics**: Get insights into link usage, clicks, and more.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Yarn or npm

### Installation

1. Fork the repository
 
2. Clone the repository:

   ```bash
   git clone https://github.com/[username]/u-sh.git
   cd u-sh
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:

go to  `.env.example` file in the root of the project and add your values and rename it to `.env.local`:
   
### Running the Project

1. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Authentication

Sign up or log in using the authentication provided by Clerk. This will give you access to the user dashboard.

### Dashboard

Once authenticated, you can access your dashboard to:

- **Create Short URLs**: Enter the long URL you want to shorten.
- **Manage Links**: View, edit, or delete your shortened URLs.
- **View Analytics**: Track the number of clicks, referrers, and more.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
