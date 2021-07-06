import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const calendar = new Calendar('#calendar', {
  defaultView: 'month',
  useCreationPopup: true,
  useDetailPopup: true
});

const calendarToast = () => {
  return (
    <div id="calendar">
    </div>
  );
}

export default calendarToast;
