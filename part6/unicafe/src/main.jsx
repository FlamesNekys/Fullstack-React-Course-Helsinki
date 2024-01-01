import React from 'react'
import ReactDOM from 'react-dom/client'
import Button from './components/Button'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'
import Statistics from './components/Statistics'

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <h1>Give feedback</h1>
            <div style={{ display: 'flex' }}>
                <Button onClick={() => store.dispatch({ type: 'GOOD' })} text={'Good'} />
                <Button onClick={() => store.dispatch({ type: 'OK' })} text={'Ok'} />
                <Button onClick={() => store.dispatch({ type: 'BAD' })} text={'Bad'} />
                <Button onClick={() => store.dispatch({ type: 'ZERO' })} text={'Reset'} />
            </div>

            <h2>Statistics</h2>
            <Statistics
                good={store.getState().good}
                ok={store.getState().ok}
                bad={store.getState().bad}
            />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

