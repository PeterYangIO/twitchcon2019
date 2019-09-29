import React from 'react'
import TRADING_MODE from '../enums/TRADING_MODE'
import { Button } from '@material-ui/core'
import Trade from "../api/Trade";

export default class StonkDialogAction extends React.Component {
    constructor(props) {
        super(props);

        this._confirmBuy = this._confirmBuy.bind(this);
        this._confirmSell = this._confirmSell.bind(this);
    }

    render() {
        if (this.props.tradingMode === TRADING_MODE.OFF) {
            return (
                <React.Fragment>
                    <Button
                        color="primary"
                        onClick={() => this.props.setTradingMode(TRADING_MODE.SELL)}
                    >
                        Sell
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => this.props.setTradingMode(TRADING_MODE.BUY)}
                    >
                        Buy
                    </Button>
                </React.Fragment>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.BUY) {
            return (
                <React.Fragment>
                    <Button
                        onClick={() => this.props.setTradingMode(TRADING_MODE.OFF)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={this._confirmBuy}
                    >
                        Buy
                    </Button>
                </React.Fragment>
            )
        }
        else if (this.props.tradingMode === TRADING_MODE.SELL) {
            return (
                <React.Fragment>
                    <Button
                        onClick={() => this.props.setTradingMode(TRADING_MODE.OFF)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={this._confirmSell}
                    >
                        Sell
                    </Button>
                </React.Fragment>
            )
        }
        else {
            return <div>invalid</div>
        }
    }

    async _confirmBuy() {
        await Trade.buyStocks(
            window.localStorage.getItem("channelId"),
            window.localStorage.getItem("userId"),
            this.props.dialog.current.state.shares,
            this.props.stonk.emote
        );
        await this.props.refreshData();
        this.props.setTradingMode(TRADING_MODE.OFF);
        this.props.closeDialog();
    }
    
    async _confirmSell() {
        await Trade.sellStocks(
            window.localStorage.getItem("channelId"),
            window.localStorage.getItem("userId"),
            this.props.dialog.current.state.shares,
            this.props.stonk.emote
        );
        await this.props.refreshData();
        this.props.setTradingMode(TRADING_MODE.OFF);
        this.props.closeDialog();
    }
}