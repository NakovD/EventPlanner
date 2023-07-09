export const endpoints = {
  events: {
    getAll: '/Event/All',
    getSingle: '/Event/:id',
    create: '/Event/Create',
    edit: '/Event/Edit/:id',
    getAllUserEvents: '/Event/User',
    attendeeOnly: '/Event/AttendeeOnly/:id',
  },
  user: {
    login: '/User/login',
    register: '/User/register',
    authenticate: '/User/authenticate/:id',
    getAll: '/User/All',
  },
  attendees: {
    allByEvent: '/Attendee/AllByEvent/:id',
    createNew: '/Attendee/Create',
    updateStatus: 'Attendee/UpdateStatus/:id',
  },
};
