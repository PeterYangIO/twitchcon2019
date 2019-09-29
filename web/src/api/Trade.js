export default class Trade {
    static async buyStocks(channelId, userId, amount, emote) {
        const response = await fetch(`http://localhost:8000/buystocks?streamer=${channelId}&user=${userId}&amount=${amount}&emote=${emote}`, {
            method: "POST"
        });
        return response.ok;
    }

    static async sellStocks(channelId, userId, amount, emote) {
        const response = await fetch(`http://localhost:8000/sellstocks?streamer=${channelId}&user=${userId}&amount=${amount}&emote=${emote}`, {
            method: "POST"
        });
        return response.ok;
    }
}