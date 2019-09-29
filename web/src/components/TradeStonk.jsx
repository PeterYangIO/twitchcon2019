import React from 'react'
import { Dialog, Button, DialogContent, DialogActions, TextField, IconButton, Typography } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import TRADING_MODE from '../enums/TRADING_MODE'
import StonkDialogContent from './StonkDialogContent/StonkDialogContent'
import StonkDialogAction from './StonkDialogAction'

export default class TradeStonk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tradingMode: TRADING_MODE.OFF
        }

        this._setTradingMode = this._setTradingMode.bind(this)
    }

    render() {
        return (
            <Dialog
                onClose={this.props.onClose}
                open={this.props.isOpen}
            >
                {
                    this.props.isOpen &&
                    <React.Fragment>
                        <MuiDialogTitle>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h6">{this.props.stonk.emote}</Typography>
                                <IconButton onClick={this.props.onClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </MuiDialogTitle>
                        <DialogContent>
                            <StonkDialogContent
                                emotes={this.props.emotes}
                                points={this.props.points}
                                setTradingMode={this._setTradingMode}
                                stonk={this.props.stonk}
                                tradingMode={this.state.tradingMode}
                            />
                        </DialogContent>
                        <DialogActions>
                            <StonkDialogAction
                                closeDialog={this.props.closeDialog}
                                setTradingMode={this._setTradingMode}
                                tradingMode={this.state.tradingMode}
                            />
                        </DialogActions>
                    </React.Fragment>
                }
            </Dialog>
        )
    }

    _setTradingMode(tradingMode) {
        this.setState({ tradingMode })
    }
}