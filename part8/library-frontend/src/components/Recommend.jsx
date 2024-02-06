import { useQuery } from '@apollo/client'
import React from 'react'
import { GENRE_BOOKS, ME } from './queries'

const Recommend = ({ show }) => {
    const { data, loading } = useQuery(ME)
    const genre = data ? data.me.favoriteGenre : null
    const result = useQuery(GENRE_BOOKS, {
        variables: { genre },
    })

    if (!show) {
        return null
    }

    if (result.loading || loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks
    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre <strong>{genre}</strong>
            </p>
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
        </div>
    )
}

export default Recommend
