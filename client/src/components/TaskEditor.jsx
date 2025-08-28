import ErrorMessage from './ErrorMessage.jsx';

export default function TaskEditor({ input, onChange, onSubmit, onDelete, currentTask, error }) {

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {currentTask ? <h2>Edit task</h2> : <h2>Create new task</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={input.title} onChange={onChange} />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" value={input.description || ''} onChange={onChange} />
        {/* <input type="text" name="description" id="description" onChange={onChange} /> */}
        <label htmlFor="deadline">Deadline</label>
        <input type="date" name="deadline" id="deadline" value={input.deadline || ''} onChange={onChange} />
        <label htmlFor="minutes">Minutes</label>
        <input type="number" name="minutes" id="minutes" min="0" value={input.minutes} onChange={onChange} />
        <label htmlFor="priority">Priority</label>
        <input type="range" name="priority" id="priority" min="1" max="5" step="1" value={input.priority || 3} onChange={onChange} />
        <label htmlFor="difficulty">Difficulty</label>
        <input type="range" name="difficulty" id="difficulty" min="1" max="5" step="1" value={input.difficulty || 3} onChange={onChange} />
        {currentTask ? <button type="submit">Save task</button> : <button type="submit">Create task</button>}
      </form>
      {currentTask ? <button onClick={onDelete}>Delete</button> : null}
    </div>
  )
}