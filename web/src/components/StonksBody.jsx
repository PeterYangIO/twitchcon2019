import React from 'react'
import { Paper, Table, TableRow, TableCell, TableHead, TableBody, Dialog, DialogTitle, Typography } from '@material-ui/core'
import TradeStonk from './TradeStonk'
import Emote from '../util/Emote';

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
                                this.props.portfolio && this.props.portfolio.map((item, index) => {
                                    const emoteImage = this.props.emotes[item.emote] ? this.props.emotes[item.emote].id : "";

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
                                                    {item.numberofstocks} share{item.numberofstocks === 1 ? '' : 's'}
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
                    emotes={this.props.emotes}
                    isOpen={Boolean(this.state.selectedStonk)}
                    onClose={this._handleClose}
                    points={this.props.points}
                    refreshData={this.props.refreshData}
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