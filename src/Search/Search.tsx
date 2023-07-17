import React, { ChangeEvent } from "react"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import s from "./Search.module.scss"

type Props = {
    searchValue: string
    searchValueHandler: (Value: string) => void
}
export const Search = ({ searchValue, searchValueHandler }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        searchValueHandler(e.currentTarget.value)
    }

    return (
        <div className={s.search}>
            <TextField
                onChange={handleChange}
                value={searchValue}
                sx={{ padding: "0" }}
                id="search"
                name="search"
                placeholder={"Поиск по сообщениям"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}
