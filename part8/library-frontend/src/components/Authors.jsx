import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, setError }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const result = useQuery(ALL_AUTHORS)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors.map((e) => e.message).join('\n')
            setError(messages)
        },
    })

    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    const options = authors.map((a) => {
        return { value: a.name, label: a.name }
    })

    const submit = (e) => {
        e.preventDefault()
        editAuthor({ variables: { name, born: +born } })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Set birth year</h3>
            <form onSubmit={submit}>
                <div>
                    name
                    <Select options={options} onChange={({ value }) => setName(value)} />
                </div>
                <div>
                    born
                    <input
                        type="text"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">change</button>
            </form>
        </div>
    )
}

export default Authors
