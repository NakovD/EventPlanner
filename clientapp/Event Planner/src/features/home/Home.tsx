export const Home = () => {
  return (
    <div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
      <div className="flex h-full bg-white rounded overflow-hidden shadow-2xl">
        <div className="flex flex-wrap max-w-screen-xl mx-auto mb-10">
          <div className="w-full md:w-2/3 rounded-t">
            <img src="/images/home.jpg" className="h-full w-full shadow" />
          </div>

          <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink ">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg justify-center flex flex-col">
              <div className="w-full font-bold text-2xl text-gray-900 px-6 mb-11">
                👋 Welcome to Evento
              </div>
              <p className="text-gray-800 font-serif text-base px-6 mb-5">
                Here you can plan and organize all your events!
              </p>
              <ul className="px-6 text-lg">
                <li>Your events when you relax.</li>
                <li>Your events when you work.</li>
                <li>Your events when you practive your hobby.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
