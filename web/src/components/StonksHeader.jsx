import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default class StonksHeader extends React.Component {
    render() {
        return (
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography align='center' variant="h6" style={{width: "100%"}}>
                        {
                            this.props.points === undefined
                                ? "Loading stonks..."
                                : `${this.props.points} point${this.props.points === 1 ? "" : "s"}`
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}