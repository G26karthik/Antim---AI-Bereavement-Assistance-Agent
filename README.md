# Antim — AI Bereavement Assistance Agent

> Compassionate AI-powered guidance through the legal and procedural aspects of bereavement in India.

## Overview

Antim is a web-based tool that helps individuals navigate the complex legal and administrative procedures that follow the loss of a loved one. It collects key details through a simple form and uses an AI workflow agent to generate personalised, step-by-step guidance.

## Features

- Clean, professional UI designed with empathy and accessibility in mind
- Collects relevant information: deceased details, assets, legal heirs, will status
- Streams AI-generated guidance in real-time from Supervity's workflow engine
- Fully client-side — no backend required; deploys on GitHub Pages
- API token stored securely in browser `localStorage` (never committed to code)

## Getting Started

### 1. Visit the Live Site

Open the deployed GitHub Pages URL (see the repository's **About** section).

### 2. Configure Your API Key

Click the **Settings** icon (☀) in the top-right corner and paste your Supervity API Bearer token. The token is saved in your browser's local storage and is only sent to the Supervity API.

### 3. Fill the Form & Submit

Provide the requested details and click **Generate Guidance**. The AI agent will process your request and stream the response directly on the page.

## Local Development

Simply open `index.html` in any browser, or use a local server:

```bash
npx serve .
```

## Project Structure

```
├── index.html          # Main page
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── app.js          # Application logic
├── .gitignore
└── README.md
```

## Disclaimer

This tool provides general informational guidance and is **not** a substitute for professional legal advice. Always consult a qualified legal professional for matters related to succession, inheritance, and estate planning.
