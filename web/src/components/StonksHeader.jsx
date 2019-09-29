import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default class StonksHeader extends React.Component {
    render() {
        return (
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant="h6">🦀📈 STONKS 📈🦀</Typography>
                </Toolbar>
            </AppBar>
        )
    }
}