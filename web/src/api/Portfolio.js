export default class Portfolio {
    static async getPoints(channelId, userId) {
        const response = await fetch(`http://localhost:8000/getpoints?streamer=${channelId}&user=${userId}`);
        if (response.ok) {
            return await response.json();
        }
        else {
            return null;
        }
    }

    static async getPortfolio(channelId, userId) {
        const response = await fetch(`http://localhost:8000/getportfolio?streamer=${channelId}&user=${userId}`);
        if (response.ok) {
            return await response.json();
        }
        else {
            return null;
        }
    }

    static async getStocks(channelId) {
        const response = await fetch(`http://localhost:8000/getstockprices?streamer=${channelId}`)
        if (response.ok) {
            return await response.json();
        }
        else {
            return null;
        }
    }
}