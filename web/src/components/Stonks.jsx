import React from 'react'
import StonksHeader from './StonksHeader'
import StonksBody from './StonksBody'

export default class Stonks extends React.Component {
    render() {
        return (
            <main>
                <StonksHeader/>
                <StonksBody/>
            </main>
        )
    }
}