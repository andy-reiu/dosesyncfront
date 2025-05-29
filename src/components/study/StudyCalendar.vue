<template>
  <div>
    <h5>See nädal</h5>
    <FullCalendar :options="calendarOptionsWeek1" />

    <h5 class="mt-4">Järgmine nädal</h5>
    <FullCalendar :options="calendarOptionsWeek2" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { startOfWeek, addDays, formatISO } from 'date-fns'

export default {
  components: { FullCalendar },
  props: {
    studies: Array
  },
  data() {
    // Get start of current week (e.g. Monday)
    const today = new Date()
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }) // Monday start
    const nextWeekStart = addDays(weekStart, 7)

    return {
      week1Start: weekStart,
      week2Start: nextWeekStart,
      isotopeColors: {
        'Tc-99m': '#81756d',   // Orange-red
        'F18': '#c11d1d',      // Lime green
        'I131': '#1bbb68',     // Dodger blue
        'FPyl': '#a170b1',     // Dark violet
      }
    }
  },
  computed: {
    eventsWeek1() {
      const startStr = formatISO(this.week1Start, { representation: 'date' })
      const endStr = formatISO(addDays(this.week1Start, 6), { representation: 'date' })
      return this.studies
          .filter(s => s.studyDate >= startStr && s.studyDate <= endStr)
          .map(s => ({
            title: s.isotopeName,
            date: s.studyDate,
            backgroundColor: this.isotopeColors[s.isotopeName] || '#3788d8',
            borderColor: this.isotopeColors[s.isotopeName] || '#3788d8',
          }))
    },
    eventsWeek2() {
      const startStr = formatISO(this.week2Start, { representation: 'date' })
      const endStr = formatISO(addDays(this.week2Start, 6), { representation: 'date' })
      return this.studies
          .filter(s => s.studyDate >= startStr && s.studyDate <= endStr)
          .map(s => ({
            title: s.isotopeName,
            date: s.studyDate,
            backgroundColor: this.isotopeColors[s.isotopeName] || '#3788d8',
            borderColor: this.isotopeColors[s.isotopeName] || '#3788d8',
          }))
    },
    calendarOptionsWeek1() {
      return {
        plugins: [dayGridPlugin],
        initialView: 'dayGridWeek',
        headerToolbar: false,
        events: this.eventsWeek1,
        locale: 'et',
        initialDate: this.week1Start,
        height: 200,
      }
    },
    calendarOptionsWeek2() {
      return {
        plugins: [dayGridPlugin],
        initialView: 'dayGridWeek',
        headerToolbar: false,
        events: this.eventsWeek2,
        locale: 'et',
        initialDate: this.week2Start,
        height: 200,
      }
    }
  }
}
</script>