import React from 'react'
import { Paper, Table, TableRow, TableCell, TableHead, TableBody, Dialog, DialogTitle, Typography } from '@material-ui/core'
import TradeStonk from './TradeStonk'

export default class StonksBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStonk: null
        }

        this._handleClose = this._handleClose.bind(this)
        this._selectRow = this._selectRow.bind(this)
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
                                        emote: "POGCHAMP",
                                        owned: 3,
                                        cost: 156
                                    },
                                    {
                                        emote: "OMEGALUL",
                                        owned: 2,
                                        cost: 442
                                    },
                                    {
                                        emote: "4HEAD",
                                        owned: 4,
                                        cost: 444
                                    },
                                    {
                                        emote: "KAPPA",
                                        owned: 6,
                                        cost: 341
                                    },
                                    {
                                        emote: "PEPEHANDS",
                                        owned: 1,
                                        cost: 2
                                    }
                                ].map((item, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        onClick={() => this._selectRow(item)}
                                    >
                                        <TableCell>
                                            <Typography>{item.emote}</Typography>
                                            <Typography variant='caption'>{item.owned} share{item.owned === 1 ? '' : 's'}</Typography>
                                        </TableCell>
                                        <TableCell>{item.cost}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <TradeStonk
                    closeDialog={this._handleClose}
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