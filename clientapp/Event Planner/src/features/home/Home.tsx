export const Home = () => (
  <div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
    <div className="flex h-full bg-white rounded overflow-hidden">
      <div className="flex flex-wrap max-w-screen-xl mx-auto mb-10 shadow-2xl">
        <div className="w-full md:w-2/3 rounded-t">
          <img src="/images/home.jpg" className="h-full w-full shadow" />
        </div>

        <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink ">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg justify-center flex flex-col">
            <div className="w-full font-bold text-2xl text-gray-900 px-6 mb-11">
              👋 Welcome to Evento
            </div>
            <p className="text-gray-800  text-base px-6 mb-5">
              Welcome to the Event Planner! Are you ready to take your event planning and
              management to the next level? Whether you&lsquo;re organizing a conference,
              party, workshop, or any other type of event, our platform is here to make
              the process seamless and hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap justify-between pt-12 max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
          <a href="#" className="flex flex-wrap no-underline hover:no-underline">
            <img
              src="https://source.unsplash.com/collection/225/800x600"
              className="h-64 w-full rounded-t pb-6"
            />

            <p className="text-gray-800  text-base px-6 mb-5">
              With the Event Planner, you can create, manage, and track your events
              effortlessly. Our user-friendly interface allows you to set up event
              details, including the title, description, date, time, and location, all in
              one place. You can easily update event information as needed, ensuring your
              attendees have the latest details at their fingertips.
            </p>
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
          <a href="#" className="flex flex-wrap no-underline hover:no-underline">
            <img
              src="https://source.unsplash.com/collection/225/800x600"
              className="h-64 w-full rounded-t pb-6"
            />

            <p className="text-gray-800  text-base px-6 mb-5">
              But that&lsquo;s not all! The Event Planner offers powerful collaboration
              features too. Invite attendees and keep track of their RSVPs effortlessly.
              With our intuitive notification system, you&lsquo;ll never miss a beat when
              it comes to event updates, new invitations, or important discussions.
            </p>
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
          <a href="#" className="flex flex-wrap no-underline hover:no-underline">
            <img
              src="https://source.unsplash.com/collection/225/800x600"
              className="h-64 w-full rounded-t pb-6"
            />

            <p className="text-gray-800  text-base px-6 mb-5">
              Take charge of your events and create memorable experiences with the Event
              Planner. Sign up today and unlock a world of efficient event planning,
              seamless collaboration, and exceptional attendee management. Get started now
              and let&rsquo;s make your next event an absolute success!
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
);
