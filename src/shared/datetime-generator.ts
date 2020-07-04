import { format } from 'date-fns';

export default function generateDateTime() {
  const dateTimeCreated = new Date();
  
  return {
    timeCreated: format(dateTimeCreated, 'hh:mm:ss a'),
    dateCreated: format(dateTimeCreated, 'dd.MM.yyyy')
  }
}