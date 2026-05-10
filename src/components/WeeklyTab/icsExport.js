export function generateICS(blocks, weekNumber) {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ruled.Ink//EN'
  ];

  blocks.forEach(block => {
    // block format: { title, type, time, duration, date }
    // Create local date object then convert to UTC string
    const start = new Date(`${block.date}T${block.time}`);
    const duration = block.duration || 60;
    const end = new Date(start.getTime() + duration * 60000);

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startStr = formatICSDate(start);
    const endFormatted = formatICSDate(end);

    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`DTSTART:${startStr}`);
    icsContent.push(`DTEND:${endFormatted}`);
    icsContent.push(`SUMMARY:${block.type} — ${block.title}`);
    icsContent.push('DESCRIPTION:Added via Ruled.Ink Weekly Planner');
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `ruled-week-${weekNumber}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
