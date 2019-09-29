import React from 'react'
import { Paper, Table, TableRow, TableCell, TableHead, TableBody, Dialog, DialogTitle, Typography } from '@material-ui/core'
import TradeStonk from './TradeStonk'
import Emote from '../util/Emote';

export default class StonksBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emotes: {},
            selectedStonk: null
        }

        this._handleClose = this._handleClose.bind(this)
        this._selectRow = this._selectRow.bind(this)
    }

    async componentDidMount() {
        this.setState({
            emotes: await Emote.getAllEmotes(window.localStorage.getItem("channelId"))
        })
    }

    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableBody>
                            {
                                [
                                    {
                                        emote: "LUL",
                                        owned: 10,
                                        cost: 300
                                    },
                                    {
                                        emote: "PogChamp",
                                        owned: 3,
                                        cost: 156
                                    },
                                    {
                                        emote: "4Head",
                                        owned: 4,
                                        cost: 444
                                    },
                                    {
                                        emote: "Kappa",
                                        owned: 6,
                                        cost: 341
                                    },
                                    {
                                        emote: "TriHard",
                                        owned: 1,
                                        cost: 2
                                    }
                                ].map((item, index) => {
                                    const emoteImage = this.state.emotes[item.emote] ? this.state.emotes[item.emote].id : "";

                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                            onClick={() => this._selectRow(item)}
                                        >
                                            <TableCell>
                                                <img
                                                    alt={item.emote}
                                                    className="emote"
                                                    src={Emote.getEmoteImage(emoteImage)}
                                                    title={item.emote}
                                                />
                                                <Typography variant='caption'>{item.emote}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.cost} pts
                                                </Typography>
                                                <Typography variant='caption'>
                                                    {item.owned} share{item.owned === 1 ? '' : 's'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <TradeStonk
                    closeDialog={this._handleClose}
                    emotes={this.state.emotes}
                    isOpen={Boolean(this.state.selectedStonk)}
                    onClose={this._handleClose}
                    stonk={this.state.selectedStonk}
                />
            </div>
        )
    }

    _handleClose() {
        this.setState({
            selectedStonk: null
        });
    }

    _selectRow(stonk) {
        this.setState({
            selectedStonk: stonk
        });
    }
}