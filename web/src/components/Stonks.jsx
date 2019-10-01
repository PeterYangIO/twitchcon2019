import React from 'react'
import StonksHeader from './StonksHeader'
import StonksBody from './StonksBody'
import Emote from "../util/Emote";
import Portfolio from "../api/Portfolio";

export default class Stonks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emotes: {},
            points: undefined,
            portfolio: undefined
        };

        this.getData = this.getData.bind(this);
        this._updateStonks = this._updateStonks.bind(this);

        this.interval = null;
    }

    async componentDidMount() {
        await this.getData();
        this.interval = window.setInterval(this._updateStonks, 500);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <main>
                <StonksHeader points={this.state.points}/>
                <StonksBody
                    emotes={this.state.emotes}
                    points={this.state.points}
                    portfolio={this.state.portfolio}
                    refreshData={this.getData}
                />
            </main>
        )
    }

    async getData() {
        const channelId = window.localStorage.getItem("channelId");
        const userId = window.localStorage.getItem("userId");
        const promiseData = await Promise.all([
            Emote.getAllEmotes(channelId),
            Portfolio.getPoints(channelId, userId),
            Portfolio.getPortfolio(channelId, userId),
            Portfolio.getStocks(channelId)
        ]);

        const portfolioMap = {};
        promiseData[2].forEach(p => {
            portfolioMap[p.emote] = p
        });

        this.setState({
            emotes: promiseData[0],
            points: promiseData[1],
            portfolio: promiseData[3]
                .map(item => {
                    item.cost = Math.round(item.valueRate * 100);
                    item.numberofstocks = portfolioMap[item.emote] ? portfolioMap[item.emote].numberofstocks : 0;
                    return item;
                })
                .sort((a, b) => b.cost - a.cost)
        });
    }

    async _updateStonks() {
        const channelId = window.localStorage.getItem("channelId");
        const prices = await Portfolio.getStocks(channelId);

        const priceMap = {};
        prices.forEach(p => {
            priceMap[p.emote] = Math.round(p.valueRate * 100)
        });

        this.setState((prevState) => {
            return {
                portfolio: prevState.portfolio
                    .map(item => {
                        item.cost = priceMap[item.emote];
                        return item;
                    })
                    .sort((a, b) => b.cost - a.cost)
            }
        });
    }
}