import ErrorMessage from './ErrorMessage.jsx';

export default function Form({ onChange, onSubmit, error }) {
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" onChange={onChange} />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}