// import ics from 'ics'

function convertToICalEvent(data) {
  return {
    start: data.startDate.split('-').map(date => Number(date)),
    duration: {days: data.period},
    description: data.type,
    organizer: {name: data.name},
  }
}

export {convertToICalEvent}
