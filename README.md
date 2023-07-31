# Event Planner

Welcome to the Event Planner project! This web application provides a user-friendly platform for planning, managing, and collaborating on various events. Whether you're organizing a conference, party, workshop, or any other type of event, the Event Planner has got you covered.

## Table of Contents

- [Introduction](#Introduction)
- [Features](#Features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Event Planner is built with ASP.NET Core API for the backend and React for the frontend. It allows users to create events, invite attendees, track RSVPs, and manage event details seamlessly. The application supports user authentication, real-time notifications, event comments, and more, making event planning a breeze.

## Features

- User registration, login, and authentication.
- Event creation, update, and deletion with a detailed description, date, time, and location.
- Attendee management with email invitations and RSVP tracking.
- Notifications for event updates, new invitations, RSVP responses, and comments.
- Event comments to facilitate communication among organizers and attendees.
- Search and filter events based on keywords and categories.

## Technologies Used

- Backend: ASP.NET Core API, Entity Framework Core, ASP.NET Core Identity
- Frontend: React, Axios, Tailwind
- Database: SQL Server (can be changed to MySQL, PostgreSQL, etc.)
- Unit Testing: NUnit

## Getting Started

To get started with the Event Planner project, follow the steps below:

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies for both the backend and frontend.

## Configuration

1. Set up your database connection string in the `appsettings.json` and `secrets.json` file.
2. Configure any necessary API keys for services like email service.

## Running the Application

1. Start the backend ASP.NET Core API.
2. Start the frontend React application.

## API Endpoints

The backend API provides the following endpoints:

- `GET /api/events`: Get a list of all events.
- `GET /api/events/{eventId}`: Get details of a specific event.
- `POST /api/events`: Create a new event.
- `PUT /api/events/{eventId}`: Update an existing event.
- `DELETE /api/events/{eventId}`: Delete an event.
- ... (add other endpoints as needed)

For more details on API usage, check the API documentation (if available).

## Contributing

We welcome contributions to the Event Planner project. To contribute, follow these steps:

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Submit a pull request describing your changes and why they should be merged.

## License

The Event Planner project is open-source and distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the project as per the license terms.

---
