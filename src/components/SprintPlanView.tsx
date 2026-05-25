import type { SprintPlan, SprintTask } from "@/types";

function TaskItem({ task }: { task: SprintTask }) {
  return (
    <li className="rounded-md border border-gray-800 bg-gray-900 p-3">
      <div className="text-sm font-medium text-gray-100">
        <span className="text-gray-500">#{task.issue_number}</span> {task.title}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
        <span className="rounded bg-blue-500/15 px-2 py-0.5 text-blue-300 ring-1 ring-blue-500/30">
          ~{task.estimated_hours}h
        </span>
        {task.reason && <span className="italic">{task.reason}</span>}
      </div>
    </li>
  );
}

function Column({ title, tasks }: { title: string; tasks: SprintTask[] }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
      <h4 className="mb-3 text-sm font-semibold text-gray-100">
        {title}{" "}
        <span className="text-xs font-normal text-gray-500">
          ({tasks.length})
        </span>
      </h4>
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-600">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TaskItem key={t.issue_number} task={t} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function SprintPlanView({ plan }: { plan: SprintPlan }) {
  return (
    <section className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <header className="mb-4">
        <h3 className="text-base font-semibold text-gray-100">
          🗓️ Sprint Plan
        </h3>
        <p className="mt-1 text-sm text-gray-300">{plan.sprint_goal}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-gray-200 ring-1 ring-gray-700">
            Total: {plan.total_estimated_hours}h
          </span>
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-gray-200 ring-1 ring-gray-700">
            Team size: {plan.team_size_recommended}
          </span>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Column title="Week 1" tasks={plan.week_1} />
        <Column title="Week 2" tasks={plan.week_2} />
      </div>
      <div className="mt-3">
        <Column title="Backlog" tasks={plan.backlog} />
      </div>
    </section>
  );
}