import React, { useEffect, useState } from "react"
import s from "./BasicTable.module.scss"
import { EventType } from "../types/types"
import { headersForTable } from "../data/data"


type Props = {
    events: EventType[]
}

export const BasicTable: React.FC<Props> = ({ events }) => {
    const [eventActiveId, setEventActiveId] = useState<string>("")

    const [eventsReadId, setEventsReadId] = useState<string[]>([])

    const readEvents = (id: string) => {
        setEventActiveId(id)
    }

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === " ") {
                if (eventsReadId.includes(eventActiveId)) {
                    const index = eventsReadId.findIndex((el) => el === eventActiveId)
                    eventsReadId.splice(index, 1)
                    setEventsReadId([...eventsReadId])
                    return
                }
                setEventsReadId([...eventsReadId, eventActiveId])
                setEventActiveId("")
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [eventActiveId])


    return (
        <table className={s.table}>
            <thead>
                <tr>
                    {headersForTable.map((h) => (
                        <th key={h.id}>
                            <div>{h.title}</div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {events.map((e, i) => {
                    const classActive = e.id === eventActiveId ? s.activeRow : ""
                    const classRead = eventsReadId.find((id) => id === e.id) ? s.readRow : ""
                    const classRow = i % 2 === 0 ? "" : s.row

                    const finalClass = `${classActive} ${classRow} ${classRead}`
                    return (
                        <tr key={e.id} className={finalClass} onClick={() => readEvents(e.id)}>
                            <td>
                                <div>{e.date}</div>
                            </td>
                            <td>
                                <div>{e.importance}</div>
                            </td>
                            <td>
                                <div>{e.equipment}</div>
                            </td>
                            <td>
                                <div>{e.message}</div>
                            </td>
                            <td>
                                <div>{e.contractor}</div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
