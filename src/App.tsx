import React, { useEffect, useMemo, useRef, useState } from "react"
import usePagination from "./Pagination/Pagination"
import "./App.scss"
import { v1 } from "uuid"
import { getCurrentDateTime } from "./utils/getCurrentDateTime"
import { BasicTable } from "./Table/BasicTable"
import { Search } from "./Search/Search"
import { Pagination } from "@mui/material"
import { EventType } from "./types/types"
import { dataEvents, heightTrTbody, sumHeights } from "./data/data"


function App() {
    const [searchValue, setSearchValue] = useState("")
    const ref = useRef<HTMLDivElement>(null)
    const [events, setEvents] = useState<EventType[]>([])
    const [counter, setCounter] = useState(0)

    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [perPage, setPerPage] = useState(1)

    const searchValueHandler = (value: string) => setSearchValue(value)

    const eventsForRender = useMemo(() => {
        if (!searchValue) {
            return events
        } else {
            return events.filter((el) => el.message.includes(searchValue))
        }
    }, [events, searchValue])


    const count = useMemo(() => {
        return Math.ceil(eventsForRender.length / perPage)
    }, [eventsForRender, perPage])

    const _DATA = usePagination(eventsForRender, perPage)

    const handleChange = (e: any, p: number) => {
        _DATA.jump(p)
    }
    useEffect(() => {
        _DATA.jump(1)
    }, [searchValue])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener("resize", handleWindowResize)
        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            const event = dataEvents[counter]
            let eventForRender = { ...event, id: v1(), date: getCurrentDateTime() }
            setEvents([...events, eventForRender])
            if (counter < 2) setCounter((prevState) => prevState + 1)
            else setCounter(0)
        }, 1000)
        return () => clearInterval(timer)
    }, [counter])

    useEffect(() => {
        const heightTableBody = windowHeight - sumHeights
        setPerPage(Math.floor((heightTableBody) / heightTrTbody))
    }, [windowHeight])


    return (
        <div className="App" ref={ref}>
            <Search searchValue={searchValue} searchValueHandler={searchValueHandler} />
            <BasicTable events={_DATA.currentData()} />
            <div className="pagination">
                <Pagination
                    count={count}
                    size="small"
                    page={_DATA.currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default App
