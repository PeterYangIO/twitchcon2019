import React from 'react'
import TRADING_MODE from '../../enums/TRADING_MODE';
import { Typography, TextField, Divider } from '@material-ui/core';
import "./StonkDialogContent.css";
import Emote from '../../util/Emote';

export default class StonkDialogContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shares: 1
        }
    }

    get totalValue() {
        return this.props.stonk.cost * this.props.stonk.numberofstocks;
    }

    render() {
        if (this.props.tradingMode === TRADING_MODE.OFF) {
            const emoteImage = this.props.emotes[this.props.stonk.emote] ? this.props.emotes[this.props.stonk.emote].id : "";
            return (
                <div>
                    <div className="stonk-img rotate">
                        <img
                            alt={this.props.stonk.emote}
                            src={Emote.getEmoteImage(emoteImage)}
                            title={this.props.stonk.emote}
                        />
                    </div>
                    <Typography>
                        You have <span style={{ fontWeight: 'bold' }}>{this.props.stonk.numberofstocks}</span> shares at a value of <span style={{ fontWeight: 'bold' }}>{this.props.stonk.cost}</span> each for a total of <span style={{ fontWeight: 'bold' }}>{this.totalValue}.</span>
                    </Typography>
                </div>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.BUY) {
            return (
                <div>
                    <div className="trade-row">
                        <div>
                            <Typography>Shares</Typography>
                        </div>
                        <div>
                            <TextField
                                id="shares"
                                margin="dense"
                                onChange={(e) => this.setState({shares: e.target.value})}
                                variant="outlined"
                                value={this.state.shares}
                            />
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>
                            <Typography>Market price</Typography>
                        </div>
                        <div>
                            <Typography>{this.props.stonk.cost}</Typography>
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>
                            <Typography>Total cost</Typography>
                        </div>
                        <div>
                            <Typography>{this.props.stonk.cost * this.state.shares}</Typography>
                        </div>
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
                            {this.props.points} points available
                        </Typography>
                    </div>
                </div>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.SELL) {
            return (
                <div>
                    <div className="trade-row">
                        <div>
                            <Typography>Shares</Typography>
                        </div>
                        <div>
                            <TextField
                                id="shares"
                                margin="dense"
                                onChange={(e) => this.setState({shares: e.target.value})}
                                variant="outlined"
                                value={this.state.shares}
                            />
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>
                            <Typography>Market price</Typography>
                        </div>
                        <div>
                            <Typography>{this.props.stonk.cost}</Typography>
                        </div>
                    </div>
                    <div className="trade-row">
                        <div>
                            <Typography>Total gain</Typography>
                        </div>
                        <div>
                            <Typography>{this.props.stonk.cost * this.state.shares}</Typography>
                        </div>
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
                            {this.props.stonk.numberofstocks} share{this.props.stonk.numberofstocks === 1 ? "" : "s"} available
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