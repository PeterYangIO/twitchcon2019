import React from 'react'
import TRADING_MODE from '../../enums/TRADING_MODE';
import { Typography, TextField, Divider } from '@material-ui/core';
import "./StonkDialogContent.css";

export default class StonkDialogContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        if (this.props.tradingMode === TRADING_MODE.OFF) {
            return (
                <Typography>
                    You have <span style={{ fontWeight: 'bold' }}>6</span> shares at a value of <span style={{ fontWeight: 'bold' }}>420</span> each for a total of <span style={{ fontWeight: 'bold' }}>1000.</span>
                </Typography>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.BUY) {
            return (
                <div>
                    <div className="trade-row">
                        <div>Shares</div>
                        <div>
                            <TextField
                                id="shares"
                                margin="dense"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>Market price</div>
                        <div>430</div>
                    </div>
                    <div className="trade-row">
                        <div>Total cost</div>
                        <div>100</div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            marginTop: "1rem",
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            variant="caption"
                        >
                            300 points available
                        </Typography>
                    </div>
                </div>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.SELL) {
            return (
                <div>
                    <div className="trade-row">
                        <div>Shares</div>
                        <div>
                            <TextField
                                id="shares"
                                margin="dense"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>Market price</div>
                        <div>430</div>
                    </div>
                    <div className="trade-row">
                        <div>Total gain</div>
                        <div>100</div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            marginTop: "1rem",
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            variant="caption"
                        >
                            3 shares available
                        </Typography>
                    </div>
                </div>
            )
        }
        else {
            return <div>invalid</div>
        }
    }
}