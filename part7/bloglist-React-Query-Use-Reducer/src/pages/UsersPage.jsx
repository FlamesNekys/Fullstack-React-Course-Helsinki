import { useQuery } from '@tanstack/react-query'
import React from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const UsersPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAll,
        refetchOnWindowFocus: false,
    })

    const users = data

    if (isLoading) {
        return <div>loading data...</div>
    }

    return (
        <div>
            <h1 className="text-center text-4xl">Users</h1>
            <div className="mt-7 flex justify-center">
                <table className="w-5/12 border border-indigo-400 border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blogs created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="hover:underline">
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersPage
