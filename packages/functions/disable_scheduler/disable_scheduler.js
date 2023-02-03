export async function main() {
    const url = `https://api.digitalocean.com/v2/functions/namespaces/${process.env.FUNCTION_NAMESPACE}/triggers/trigger_magic_card`
    let header = new Headers();
    header.append("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
    header.append("Content-Type", "application/json");

    const response = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify({
            "is_enabled": false,
        }),
        redirect: "follow"
    })
    const json = await response.json()

    return {
        "body": {
            "is_enabled": json.trigger.is_enabled
        }
    }
}