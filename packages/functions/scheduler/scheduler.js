import * as cheerio from "cheerio";
import Twilio from "twilio"

const sites = [
    {
        url: "https://www.fantasywelt.de/Magic-the-Gathering-Kamigawa-Neon-Dynasty-Set-Booster-Display-30-DE",
        site: "https://www.fantasywelt.de/",
        check: "Der Artikel ist beim Hersteller nachbestellti",
        path: "div.product-info-inner > div.product-offer > div.product_availability_wrapper > span.availability-label"
    },
    {
        url: "https://games-island.eu/Magic-The-Gathering_352",
        site: "https://games-island.eu/",
        check: "Momentan nicht verfügbar",
        path: "div.delivery-status > ul.list-unstyled > li > span.status"
    },
    {
        url: "https://taschengelddieb.de/Kamigawa-Neon-Dynasty-Set-Booster-Display",
        site: "https://taschengelddieb.de/",
        check: "derzeit nicht verfügbar",
        path: "div.stock-information > div.col > div.delivery-status > span.status"
    }
]

export async function main(args) {
    const messageIds = []

    for (let i = 0; i < sites.length; i++) {
        const res = await fetch(sites[i].url)
        const text = await res.text();
        const data = cheerio.load(text)
        const result = data('body').find(sites[i].path).text().trim()

        if(result !== sites[i].check && result !== "") {
            const accountSid = process.env.TWILIO_ACCOUNT_SID; 
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const twilio = new Twilio(accountSid, authToken)

            let message = await twilio.messages.create({
                to: process.env.PERSONAL_PHONE_NUMBER,
                from: process.env.TWILIO_PHONE_NUMBER,
                body: `Kamigawa: Neon Dynasty Display Set Booster is available on ${sites[i].site}. Please disable this function if you dont need it anymore: "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/${FUNCTION_NAMESPACE}/functions/disable_scheduler"`,
            })
            messageIds.push(message.sid)
        }
    }

    return {"body": {
        messageIds: messageIds,
    }}
}