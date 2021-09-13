import axios from "axios"

const getReport = async(query) => {
    let redditJson = await axios.get(`https://www.reddit.com/r/${query}/hot.json`)
                    .then(json => {
                        return json.data.data.children
                    })
   
    const promises = redditJson.slice(0).map(async json => {
            const { title, url } = json.data
            let transTitle = await translate(title)
            return { transTitle, url }
            //return { title, url }
        })
    return Promise.all(promises)
}

const getData = async (query) => {
    return await getReport(query)
}
/*
const translate = async (query) => {
    var body = await axios.get("https://www.google.com/search?q=hoge")
    return body
}
*/
const translate = async (query) => {
    var client_id = process.env.CLIENT_ID;
    var client_secret = process.env.CLIENT_SECRET;

    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
     let body = await axios.post(api_url, options.form, {
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    })
    return body.data.message.result.translatedText

}
export default getData