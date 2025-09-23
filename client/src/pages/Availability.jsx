import DefaultHourPanel from '../components/DefaultHourPanel';
import Calendar from '../components/Calendar';

export default function Availability() {
  return (
    <div>
      <DefaultHourPanel />
      <Calendar />
      <a href="/">Back to dashboard</a>
    </div>
  );
}