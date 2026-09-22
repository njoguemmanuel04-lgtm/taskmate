
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
