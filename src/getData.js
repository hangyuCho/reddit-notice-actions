import axios from "axios"
import cheerio from "cheerio"
//import Reddit from "reddit"

var RedditApi = require('reddit-oauth');



const url_search = `https://www.reddit.com/search/?q=apple`;
const url_community = `https://www.reddit.com/r/apple/new`

const selector1 = "#t3_p8uqj4 > div._1poyrkZ7g36PawDueRza-J > div > div._1Y6dfr4zLlrygH-FLmr8x- > div._2FCtq-QzlfuN-SwVMUZMM3.t3_p8uqj4 > div.y8HYJ-y_lTUHkQIc1mdCq._2INHSNB8V5eaWp4P0rY_mE > a > div > h3 > span"
// const getReport = async(query) => {
//     return await axios.get(`https://www.reddit.com/r/${query}/new`)
//     .then(html => {
//         const $ = cheerio.load(html.data)
//         let result = translate($(selector1).text())
//         return result
//     })
// }
const getReport = async(query) => {
    let redditJson = await axios.get(`https://www.reddit.com/r/${query}/new.json`)
                    .then(json => {
                        return json.data.data.children
                    })
    // var i = -1
    // let titlesForTranslate = redditJson.map(json => {
    //     return json.data.title
    // }).join(SPLIT_SYMBOL)
    //let resultOfTrans = await translate(titlesForTranslate)

    //var transTitleArr = resultOfTrans.split(SPLIT_SYMBOL)
    //return redditJson.slice(0).map( json => {
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