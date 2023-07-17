export const dataEvents = [
    {
        importance: "критическая",
        equipment: "лвс",
        message: "обрыв кабеля",
        contractor: "Сидоров В.В.",
    },
    {
        importance: "низкая",
        equipment: "трансформатор",
        message: "недостаточно количества масла",
        contractor: "Петров В.В.",
    },
    {
        importance: "высокая",
        equipment: "люк",
        message: "открытая крышка",
        contractor: "Иванов В.В.",
    },
]
export const headersForTable = [
    { id: 1, title: "дата" },
    { id: 2, title: "важность" },
    { id: 3, title: "оборудование" },
    { id: 4, title: "сообщения" },
    { id: 5, title: "отвественный" },
]
// height of one row in table body
export const heightTrTbody=36

// heights elements from page except tbody
const searchHeight = 61
const paddingsApp = 40
const paginationHeight = 26
const theadHeight = 49
const gap = 10

//content height on page without table body
export const sumHeights = searchHeight + paddingsApp + paginationHeight + theadHeight + gap