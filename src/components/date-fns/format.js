import format from 'date-fns/format'

export default function Format(time) {
    return format(time, "dd.MM.yyyy")
}