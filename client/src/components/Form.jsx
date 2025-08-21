import ErrorMessage from './ErrorMessage.jsx';

export default function Form({ onSubmit, error }) {
  return (
    <div>
      <ErrorMessage message={error} />
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}