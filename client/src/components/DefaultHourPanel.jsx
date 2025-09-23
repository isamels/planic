import { useState, useEffect } from 'react';
import { getDefaultHours, setDefaultHours } from '../api/availability';

export default function DefaultHourPanel() {
  const [defaults, setDefaults] = useState([]);
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const fetchDefaults = async () => {
      const defs = [];
      for (let i = 0; i < 9; i++) {
        const { data } = await getDefaultHours(i);
        if (i > 0 && data.day_of_week == 0) {
          defs.push(0);
        } else {
          defs.push(data.hours);
        }
      }
      setDefaults(defs);
      setHours(defs[0]);
    }

    fetchDefaults();
  }, []);

  const onDayChange = (e) => {
    const { value } = e.target;
    setDay(value);
    setHours(defaults[value]);
  };

  const onHoursChange = (e) => {
    const { value } = e.target;
    setHours(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDefaultHours(day, hours);
    const defs = defaults;
    defs[day] = hours;
    setDefaults(defs);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="day">Days:</label>
        <select name="day" onChange={onDayChange}>
          <option value="0" defaultValue="true">Every day</option>
          <option value="1">Every Monday</option>
          <option value="2">Every Tuesday</option>
          <option value="3">Every Wednesday</option>
          <option value="4">Every Thursday</option>
          <option value="5">Every Friday</option>
          <option value="6">Every Saturday</option>
          <option value="7">Every Sunday</option>
        </select>

        <label htmlFor="hours">{hours} hour{hours == 1 ? "" : "s"}</label>
        <input type="range" name="hours" id="hours" min="0" max="24" step="1" value={hours} onChange={onHoursChange} />
        <button type="submit">Save hours</button>
      </form>
    </div>
  );
}