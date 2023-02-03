import * as cheerio from "cheerio";
import request from "request";
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

export function main(args) {
    sites.forEach(async site => {
        
        request(site.url, (err, t, body) => {
            const data = cheerio.load(body)
            const result = data('body').find(site.path).text().trim()

            if(result !== site.check && result !== "") {
                const accountSid = process.env.TWILIO_ACCOUNT_SID; 
                const authToken = process.env.TWILIO_AUTH_TOKEN;
                const twilio = new Twilio(accountSid, authToken)

                twilio.messages.create({
                    to: process.env.PERSONAL_PHONE_NUMBER,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    body: `Kamigawa: Neon Dynasty Display Set Booster is available on ${site.site}`,
                })
                .done();        
            }
        })
    })

    return {"body": "ok"}
}