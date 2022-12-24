// URLs
const ABSENCES = process.env.REACT_APP_ABSENCES
const MEMBERS = process.env.REACT_APP_MEMBERS

// Strings
const REQUESTED = 'Requested'
const CONFIRMED = 'Confirmed'
const REJECTED = 'Rejected'
const MEMBER = 'Member'
const TYPE = 'Type'
const PERIOD = 'Period'
const MEMBER_NOTE = 'Member note'
const ADMITTER_NOTE = 'Admitter note'
const STATUS = 'Status'
const NUMBER = '#'

// Numbers
const MINIMUM_PERIOD = 1
const DAY_IN_MS = 1000 * 60 * 60 * 24

// Errors
const NO_RECORD =
  'No record found with current settings! Try to change the filters and try again in few minutes.'
const API_ERROR =
  'There was a error fetching the data! Try again in few minutes.'

export {
  ABSENCES,
  MEMBERS,
  REQUESTED,
  CONFIRMED,
  REJECTED,
  MINIMUM_PERIOD,
  DAY_IN_MS,
  MEMBER,
  TYPE,
  PERIOD,
  MEMBER_NOTE,
  ADMITTER_NOTE,
  STATUS,
  NUMBER,
  NO_RECORD,
  API_ERROR,
}
