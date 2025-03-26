export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-white w-screen h-screen">
      <h1 className="text-black font-bold text-3xl">
        New Project: Steam Tracker (pls kill me)
      </h1>
      <h1 className="text-black font-medium text-xl">
        This thing uses Steam Web API to retrieve user data from their steamId,
        which is the hard part of this project
      </h1>
      <h2 className="text-gray-400 font-medium text-lg">
        If you dont see anything its because there is nothing here to see!!
        (idiot)
      </h2>
    </main>
  );
}
