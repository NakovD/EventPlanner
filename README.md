# Event Planner

Welcome to the Event Planner project! This web application provides a user-friendly platform for planning, managing, and collaborating on various events. Whether you're organizing a conference, party, workshop, or any other type of event, the Event Planner has got you covered.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
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

For the Front End:
1. Run `npm install` in the Event Planner Folder(not in the client app folder).
2. In the same folder create a file with a name: `.env.local` (its ignored by git) and it you should paste the following(without quotes around the keys or values):
   + VITE_API_KEY=https://... - the path which the API is listening for requests
   + VITE_FACEBOOK_APP_ID=123456 - Facebook Id for developer app
   + VITE_CLOUDINARY_UPLOAD_PRESET=preset - Cloudinary Developer Account upload preset
   + VITE_CLOUDINARY_CLOUD_NAME=cloud name - Your cloudinary cloud name
   + VITE_CLOUDINARY_API_KEY=api key = Your cloudinary API-KEY
3. Run `npm start` so the FE should start and open the app on `https://localhost:5173`

For the Back end:
1. Run build so the nuget manager restores all nuget packages.
2. In `secrets.json` you should add
    + `FacebookConfiguration` section which includes the followind properties `AppId` and `AppSecret`
    + `Jwt` section which should include the following properties: `Key`, `Issuer`, `Audience`, `Subject`
    + `ConnectionStrings` section with properties `DefaultConnection`
3. Press Ctrl + F5 to start the application.

## Running the Application

1. Start the backend ASP.NET Core API.
2. Start the frontend React application.

## API Endpoints

The backend API provides the following endpoints:

# EventPlanner API Documentation

This repository contains the documentation for the EventPlanner API, which provides endpoints for managing events, attendees, categories, comments, notifications, and users.

## API Endpoints

### Attendee

- `GET /api/Attendee/AllByEvent/{id}`: Retrieve all attendees by event ID.
- `POST /api/Attendee/Create`: Create a new attendee.
- `POST /api/Attendee/Delete/{id}`: Delete an attendee by ID.
- `POST /api/Attendee/UpdateStatus/{id}`: Update the status of an attendee.
- `POST /api/Attendee/UpdateExternalStatus/{encryptedData}`: Update the status of an external attendee using encrypted data.
- `GET /api/Attendee/ExternalStatus/{encryptedData}`: Retrieve the status of an external attendee using encrypted data.

### Category

- `GET /api/Category/All`: Retrieve all categories.
- `GET /api/Category/Categories`: Retrieve categories.
- `POST /api/Category/Add`: Add a new category.
- `POST /api/Category/Edit`: Edit an existing category.
- `POST /api/Category/Delete/{id}`: Delete a category by ID.

### Comment

- `GET /api/Comment/All/{eventId}`: Retrieve all comments by event ID.
- `POST /api/Comment/Create`: Create a new comment.
- `POST /api/Comment/Edit/{id}`: Edit a comment by ID.
- `POST /api/Comment/Delete/{id}`: Delete a comment by ID.

### Event

- `GET /api/Event/All`: Retrieve all events with optional search parameters.
- `GET /api/Event/All-Administration`: Retrieve all events for administration.
- `GET /api/Event/User`: Retrieve events for the current user.
- `GET /api/Event/{id}`: Retrieve an event by ID.
- `POST /api/Event/Create`: Create a new event.
- `POST /api/Event/Edit/{id}`: Edit an existing event by ID.
- `GET /api/Event/AttendeeOnly/{encryptedData}`: Retrieve events for attendee-only access using encrypted data.
- `POST /api/Event/Delete/{id}`: Delete an event by ID.
- `POST /api/Event/Restore/{id}`: Restore a previously deleted event.

### Notification

- `GET /api/Notification/UnreadCount`: Get the count of unread notifications.
- `GET /api/Notification/All`: Retrieve all notifications.
- `POST /api/Notification/MarkSingleAsRead/{id}`: Mark a single notification as read by ID.
- `POST /api/Notification/DeleteNotification/{id}`: Delete a notification by ID.

### User

- `POST /api/User/Register`: Register a new user.
- `POST /api/User/Login`: Authenticate a user login.
- `GET /api/User/Authenticate/{token}`: Authenticate a user using a token.
- `POST /api/User/LoginWithFacebook`: Login using Facebook credentials.
- `GET /api/User/Attendee-Users`: Get attendee users.
- `GET /api/User/All`: Retrieve all users.
- `POST /api/User/Delete/{id}`: Delete a user by ID.

## Data Models

The API uses the following data models:

- `AttendeeFormDto`: Represents attendee form data.
- `AttendeeStatusDto`: Represents attendee status data.
- `CategoryFormDto`: Represents category form data.
- `CommentFormDto`: Represents comment form data.
- `EventFormDto`: Represents event form data.
- `EventTitleSortType`: Represents event title sort type.
- `FacebookDto`: Represents Facebook login data.
- `LoginDto`: Represents login data.
- `RegisterDto`: Represents registration data.

## License

The Event Planner project is open-source and distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the project as per the license terms.

---
