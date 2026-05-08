export function generateICS(blocks, weekNumber) {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ruled.Ink//EN'
  ];

  blocks.forEach(block => {
    // block format: { title, type, time, duration, date }
    const cleanDate = block.date.replace(/-/g, '');
    const [hours, minutes] = block.time.split(':');
    const startStr = `${cleanDate}T${hours}${minutes}00`;
    
    // Calculate end time
    const start = new Date(
      parseInt(cleanDate.substring(0, 4)),
      parseInt(cleanDate.substring(4, 6)) - 1,
      parseInt(cleanDate.substring(6, 8)),
      parseInt(hours),
      parseInt(minutes)
    );
    const duration = block.duration || 60;
    const end = new Date(start.getTime() + duration * 60000);
    const endStr = end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    // Actually the replacement above is a bit messy, let's do it cleaner
    const year = end.getFullYear();
    const month = (end.getMonth() + 1).toString().padStart(2, '0');
    const day = end.getDate().toString().padStart(2, '0');
    const h = end.getHours().toString().padStart(2, '0');
    const m = end.getMinutes().toString().padStart(2, '0');
    const endFormatted = `${year}${month}${day}T${h}${m}00`;

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
