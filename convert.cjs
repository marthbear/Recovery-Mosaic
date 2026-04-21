const fs = require('fs');

// Simple CSV parser that handles quoted fields
function parseCSV(text) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      currentLine.push(currentField.trim());
      if (currentLine.some(f => f)) { // skip empty lines
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
      if (char === '\r') i++; // skip \n after \r
    } else if (char !== '\r') {
      currentField += char;
    }
  }

  // Don't forget the last line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(f => f)) {
      lines.push(currentLine);
    }
  }

  return lines;
}

const text = fs.readFileSync('Recover Mosaic Meetings.csv', 'utf8').replace(/^\uFEFF/, ''); // Remove BOM
const rows = parseCSV(text);

// Row 0 is a notice, row 1 is headers
const headers = rows[1];
const data = rows.slice(2);

const meetings = [];
let id = 1;

for (const row of data) {
  const day = row[0];
  const pacificTime = row[1];
  const fellowship = row[8];
  const name = row[9];
  const location = row[10];
  const zoomLink = row[11];
  const meetingId = row[12];
  const password = row[13];
  const contact = row[14];
  const notes = row[16];

  // Skip rows that don't have a valid day or are just notes
  const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Thursay', 'Friday', 'Saturday'];
  if (!validDays.some(d => day && day.includes(d))) continue;
  if (!name) continue;

  meetings.push({
    id: id++,
    day: day.replace('Thursay', 'Thursday'), // Fix typo in source
    time: pacificTime,
    fellowship: fellowship || '',
    name: name,
    location: location || 'Virtual',
    zoomLink: zoomLink || '',
    meetingId: meetingId || '',
    password: password || '',
    contact: contact || '',
    notes: notes || ''
  });
}

fs.writeFileSync('public/meetings.json', JSON.stringify(meetings, null, 2));
console.log(`Converted ${meetings.length} meetings to JSON`);
