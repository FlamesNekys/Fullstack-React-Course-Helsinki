import { useQuery } from '@apollo/client'
import { GENRE_BOOKS } from './queries'
import { useState } from 'react'

const Books = (props) => {
    const [filter, setFilter] = useState('')
    const result = useQuery(GENRE_BOOKS, {
        fetchPolicy: 'no-cache',
        variables: { genre: filter || null },
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks
    const genres = []

    if (books) {
        books.forEach((b) => b.genres.forEach((g) => (genres.includes(g) ? false : genres.push(g))))
    }

    return (
        <div>
            <h2>books</h2>
            {filter ? (
                <p>
                    books in genre <strong>{filter}</strong>
                </p>
            ) : null}
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {genres.map((g) => (
                <button onClick={() => setFilter(g)} key={g}>
                    {g}
                </button>
            ))}
            <button onClick={() => setFilter('')}>all genres</button>
        </div>
    )
}

export default Books
