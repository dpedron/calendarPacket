// import type { DateSelectArg } from '@fullcalendar/react'
import { useRef, useState } from 'react'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
// import type { RefObject } from 'react'
// import type { TimeTracking } from '~/api/types/timetracking'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

// type Props = {
//   onPeriodChange: any
//   displayedEvents: any
//   initialView: string
//   onEventSelected: (date: any) => void
//   clientName?: string | null
//   projectName?: any
// }

// type Event = {
//   title: string
//   comment: string | undefined
//   startTime: string
//   endTime: string
//   display: string
//   start: string | undefined
//   end: string | undefined
// }

const transformEvent = (events) => {
  return events.map((timetracking) => {
    return {
      title: `${timetracking.client}, ${timetracking.product}, ${timetracking.project},${timetracking.task}`,
      comment: timetracking.comment,
      startTime: '',
      endTime: '',
      display: '',
      start: timetracking.date?.begin_at,
      end: timetracking.date?.end_at
    }
  })
}

const Calend = ({ displayedEvents, onPeriodChange, initialView, onEventSelected, clientName, projectName }) => {
  const calendarRef = useRef(null)
  function renderEventContent(eventInfo) {
    const projectNameFromEvent = eventInfo?.event?._def.title?.split(',')[2]?.trim()
    const projectNameFromData = projectName?.replaceAll(' ', '')
    let fontColor
    let styledClass
    if (
      (!projectName && !clientName) ||
      clientName === eventInfo.event._def.title.split(',')[0] ||
      projectNameFromEvent?.replaceAll(' ', '') === projectNameFromData
    ) {
      styledClass = 'fc-event-main bg-[#63CEE9]'
      fontColor = 'text-white'
    } else {
      styledClass = 'fc-event-main bg-white border-[0.5px] border-dashed border-black '
      fontColor = 'text-black'
    }
    return (
      <div className={styledClass}>
        <b className={fontColor}>{eventInfo.timeText}</b>
        <i className={fontColor}>{eventInfo.event.title}</i>
        <p className={fontColor}>{eventInfo.event.comment}</p>
      </div>
    )
  }

  return (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={'timeGridWeek'}
          // events={transformEvent(displayedEvents)}
          editable={false}
          selectable
          timeZone="UTC+1"
          unselectAuto={false}
          allDaySlot={false}
          locale="fr"
          eventColor="transparent"
          selectMirror={true}
          eventBackgroundColor="transparent"
          weekNumberFormat={{week: 'short'}}
          weekText='Semaine'
          // eventContent={renderEventContent}
          slotDuration={'00:15::00'}
          slotLabelInterval={'01:00'}
          // ref={calendarRef}
          height="100%"
          dayHeaders={true}
          // select={onEventSelected}
          slotMinTime="07:00:00"
          slotMaxTime="21:00:00"
          titleFormat={{ weekday: 'long', year: '2-digit', month: '2-digit', day: '2-digit', week: 'short' }}
          headerToolbar={{
            left: 'today',
            center: 'prev,title,next',
            right: ''
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            list: 'Liste'
          }}
          nowIndicator={true}
          firstDay={1}
          weekends={false}
          dragScroll={false}
          dayHeaderFormat={{ weekday: 'long' }}
          slotLabelFormat={{ hour: 'numeric', minute: '2-digit' }}
          weekNumbers={true}
          // datesSet={onPeriodChange}
        />
  )
}

export default Calend
