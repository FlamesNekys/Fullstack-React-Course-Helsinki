import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRE_BOOKS } from './queries'
import { useState } from 'react'

const Books = (props) => {
    const [filter, setFilter] = useState('')
    const { data, loading } = useQuery(ALL_BOOKS)
    const result = useQuery(GENRE_BOOKS, {
        fetchPolicy: 'no-cache',
        variables: { genre: filter || null },
    })

    const bookWrapper = (b) => (
        <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
        </tr>
    )

    if (!props.show) {
        return null
    }

    if (result.loading || loading) {
        return <div>loading...</div>
    }

    const allBooks = data.allBooks
    const genredBooks = result.data.allBooks
    const genres = []

    if (allBooks) {
        allBooks.forEach((b) =>
            b.genres.forEach((g) => (genres.includes(g) ? false : genres.push(g)))
        )
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
                    {filter
                        ? genredBooks.map((b) => bookWrapper(b))
                        : allBooks.map((b) => bookWrapper(b))}
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
