export const endpoints = {
  events: {
    getAll: '/Event/All',
    getSingle: '/Event/:id',
    create: '/Event/Create',
    edit: '/Event/Edit/:id',
    getAllUserEvents: '/Event/User',
    attendeeOnly: '/Event/AttendeeOnly/:id',
    getAllAdmin: '/Event/All-Administration',
    delete: '/Event/Delete/:id',
    restore: '/Event/Restore/:id',
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
    updateStatus: '/Attendee/UpdateStatus/:id',
    updateExternalStatus: '/Attendee/UpdateExternalStatus/:id',
    status: '/Attendee/ExternalStatus/:id',
  },
  categories: {
    getAll: '/Category/All',
    update: '/Category/Edit',
    delete: '/Category/Delete/:id',
    add: '/Category/Add',
  },
  notifications: {
    unreadCount: '/Notification/UnreadCount',
    getAll: '/Notification/All',
    markSingleAsReaded: '/Notification/MarkSingleAsRead/:id',
    delete: 'Notification/DeleteNotification/:id',
  },
  administration: {},
};
