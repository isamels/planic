import { useState, useEffect } from 'react';
import { getDateHours, setDateHours } from '../api/availability';

export default function HoursEditor({ date, onClose }) {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await getDateHours(date);
      const { hours } = response.data;
      setHours(hours);
    };

    fetchHours();
  }, []);

  const onChange = (e) => {
    const {value } = e.target;
    setHours(value);
  };

  const onSubmit = async (e) => {
    setDateHours(date, hours);
    alert("Hours on " + date.toDateString() + " set to " + availability);
  };

  return (
    <div className="hours-popup">
      <button onClick={onClose}>X</button>
      {date.toDateString()}
      <form onSubmit={onSubmit}>
        <label htmlFor="hours">{hours} hour{hours == 1 ? "" : "s"}</label>
        <input type="range" name="hours" id="hours" min="0" max="24" step="1" value={hours} onChange={onChange} />
        <button type="submit">Save hours</button>
      </form>
    </div>
  );
}