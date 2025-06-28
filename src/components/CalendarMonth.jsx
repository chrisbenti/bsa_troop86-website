import React, { useState } from "react";

export default function CalendarMonth({ calendar }) {
  // Flatten months with year info
  const months = [];
  calendar.forEach(yearObj => {
    (yearObj.months || []).forEach(month => {
      months.push({
        ...month,
        year: yearObj.year
      });
    });
  });

  const [idx, setIdx] = useState(0);
  const month = months[idx];

  function getEventsForDay(events, day) {
    return (events || []).filter(e => Number(e.day) === day);
  }

  return (
    <div>
      <div className="calendar-selector" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setIdx(idx - 1)}
          disabled={idx === 0}
          aria-label="Previous Month"
        >&#8592;</button>
        <h2 style={{ margin: 0 }}>
          {month.month} {month.year}
        </h2>
        <button
          onClick={() => setIdx(idx + 1)}
          disabled={idx === months.length - 1}
          aria-label="Next Month"
        >&#8594;</button>
      </div>
      <div className="calendar-grid">
        {/* Weekday headers */}
        <div className="calendar-header">Sun</div>
        <div className="calendar-header">Mon</div>
        <div className="calendar-header">Tue</div>
        <div className="calendar-header">Wed</div>
        <div className="calendar-header">Thu</div>
        <div className="calendar-header">Fri</div>
        <div className="calendar-header">Sat</div>
        {/* Empty cells before 1st */}
        {Array.from({ length: month.start_day || 0 }).map((_, i) => (
          <div className="calendar-cell empty" key={"empty" + i} />
        ))}
        {/* Days */}
        {Array.from({ length: month.days || 0 }).map((_, i) => {
          const day = i + 1;
          const events = getEventsForDay(month.events, day);
          return (
            <div className="calendar-cell" key={day}>
              <div className="calendar-day">{day}</div>
              {events.map((ev, j) => (
                <div className="calendar-event" key={j}>{ev.event}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}