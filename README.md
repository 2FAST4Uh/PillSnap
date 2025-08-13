# PillSnap 💊

PillSnap is an AI-powered health companion designed to help you manage your medications and health with ease. Instantly identify pills, get detailed information, set reminders, and get answers to your health questions from an AI assistant.

> **Note:** This is a demo application built in Firebase Studio. It should not be used for actual medical diagnosis. Always consult a healthcare professional.

## ✨ Core Features

- **📸 Pill Identifier:** Snap a photo of a pill to instantly identify it. The app provides the medicine's name and a confidence score for the identification.
- **🤖 AI-Powered Summaries & Chatbot:** Get concise, AI-generated summaries for identified medications, including their uses and potential side effects. You can also ask the medical chatbot questions about symptoms or health topics.
- **📅 Medication Reminders:** Set up and manage daily reminders to ensure you never miss a dose.
- **⚕️ Health Dashboard:** Keep track of key health metrics like BMI, allergies, and medical conditions in one central place.
- **📍 Find Nearby:** Quickly locate nearby pharmacies and hospitals using your device's location.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (v15) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN/UI](https://ui.shadcn.com/)
- **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit) with Gemini models
- **Authentication:** Firebase (dummy implementation)
- **Deployment:** Firebase App Hosting

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/2FAST4Uh/PillSnap.git
   ```
2. Navigate to the project directory
   ```sh
   cd your-repository-name
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env.local` file in the root of the project and add your Firebase configuration keys if you are connecting to a real Firebase project.
   ```env
   # Example for Firebase Web SDK
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   # ...and so on
   ```

### Running the Development Server

You can run the application in development mode with:

```sh
npm run dev
```

This will start the Next.js development server, typically on [http://localhost:9002](http://localhost:9002). Open this URL in your browser to see the application.

### Running Genkit

The AI flows are powered by Genkit. To run the Genkit development server (for testing flows), use:
```sh
npm run genkit:dev
```
This will start the Genkit inspector, which you can use to view and test your AI flows.
