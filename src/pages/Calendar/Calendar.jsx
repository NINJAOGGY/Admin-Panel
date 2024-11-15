// src/pages/Calendar/Calendar.jsx
import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import useCalendar from '../../store/Calendar';
import api from '../../utils/axiosConfig';

const Calendar = () => {
  const { getToken } = useAuth();
  const { currentEvents, setCurrentEvents } = useCalendar();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await getToken();
        const response = await api.get('/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [getToken, setCurrentEvents]);

  const handleDateSelect = async (selectInfo) => {
    try {
      const token = await getToken();
      let title = prompt('Please enter a title for the event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();

      if (title) {
        const newEvent = {
          title,
          start: selectInfo.start,
          end: selectInfo.end,
          allDay: selectInfo.allDay,
        };

        const response = await api.post('/events', newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        calendarApi.addEvent(response.data);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    try {
      const token = await getToken();
      if (window.confirm('Are you sure you want to delete this event?')) {
        await api.delete(`/events/${clickInfo.event.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        clickInfo.event.remove();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEventChange = async (changeInfo) => {
    try {
      const token = await getToken();
      const eventData = {
        title: changeInfo.event.title,
        start: changeInfo.event.start,
        end: changeInfo.event.end,
        allDay: changeInfo.event.allDay,
      };
      
      await api.put(`/events/${changeInfo.event.id}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error updating event:', error);
      changeInfo.revert();
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        allDaySlot={false}
        initialView="timeGridWeek"
        slotDuration="01:00:00"
        editable
        selectable
        selectMirror
        dayMaxEvents
        weekends
        nowIndicator
        events={currentEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
      />
    </div>
  );
};

export default Calendar;