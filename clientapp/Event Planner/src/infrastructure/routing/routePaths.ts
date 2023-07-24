export const routePaths = {
  index: '/',
  allEvents: {
    path: '/all-events',
    name: 'All Events',
  },
  userEvents: {
    path: '/my-events',
    name: 'My Events',
  },
  eventCreate: {
    path: '/event-create',
    name: 'Create Event',
  },
  eventEdit: {
    path: '/event-edit/:id',
    name: 'Edit Event',
  },
  eventDetailsInvitedAttendee: {
    path: '/event-attendee-only/:id',
    name: 'Event page',
  },
  eventDetails: {
    path: '/event/:id',
    name: 'Event Page',
  },
  login: {
    path: '/login',
    name: 'Login',
  },
  signup: {
    path: '/signup',
    name: 'Sign Up',
  },
  manageAttendees: {
    path: '/manage-attendees/:id',
    name: 'Event Attendees',
  },
  notifications: {
    path: '/notifications',
    name: 'Notifications',
  },
  administration: {
    path: '/administration',
    name: 'Administration',
  },
  administrationCategories: {
    path: '/administration/categories',
    name: 'Categories',
  },
  administrationEvents: {
    path: '/administration/events',
    name: 'Events',
  },
  administrationUsers: {
    path: '/administration/users',
    name: 'Users',
  },
};
