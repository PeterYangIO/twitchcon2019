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
    }

    async componentDidMount() {
        const channelId = window.localStorage.getItem("channelId");
        const userId = window.localStorage.getItem("userId");
        const promiseData = await Promise.all([
            Emote.getAllEmotes(channelId),
            Portfolio.getPoints(channelId, userId),
            Portfolio.getPortfolio(channelId, userId),
            Portfolio.getStocks(channelId)
        ]);

        const emotePriceMap = {};
        promiseData[3].forEach(price => {
            emotePriceMap[price.emote] = price.valueRate;
        });

        this.setState({
            emotes: promiseData[0],
            points: promiseData[1],
            portfolio: promiseData[2].map(item => {
                item.cost = Math.round(emotePriceMap[item.emote] * 100);
                return item;
            })
        })
    }

    render() {
        return (
            <main>
                <StonksHeader points={this.state.points}/>
                <StonksBody
                    emotes={this.state.emotes}
                    points={this.state.points}
                    portfolio={this.state.portfolio}
                />
            </main>
        )
    }
}