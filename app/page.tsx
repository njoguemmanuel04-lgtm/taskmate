export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold">TaskMate</h1>
          <div className="flex gap-3">
            <button className="rounded-lg px-4 py-2 text-slate-300">
              Log in
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-5xl font-bold tracking-tight">
          Get tasks done. Find people who can help.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          TaskMate connects people who need jobs done with trusted service
          providers.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-blue-600 px-7 py-4 font-semibold">
            Post a Task
          </button>
          <button className="rounded-xl border border-slate-700 px-7 py-4 font-semibold">
            Find Tasks
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        {[
          ["Post a task", "Describe what you need and set your budget."],
          ["Find a provider", "Discover people ready to help with your task."],
          ["Get it done", "Work together and complete the job."],
        ].map(([title, text]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
