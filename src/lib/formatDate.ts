import { format as formato, parseISO } from 'date-fns'

export const formatDate = (date: string, format: string = 'dd-MM-yyyy') => {
  return formato(parseISO(date), format)
}
