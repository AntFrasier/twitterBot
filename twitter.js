// https://github.com/plhery/node-twitter-api-v2/blob/master/doc/v2.md#Replytoatweet

const {TwitterApi} = require('twitter-api-v2');
const cron = require('node-cron');
require ('dotenv/config');

var client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET ,
});

const sendTweet = async () => {
  console.log ('send');
  try {
   const liked = await client.v2.like('1529460352844451843', results.data[i].id);
   const retweet = await client.v2.retweet('1529460352844451843', results.data[i].id);
   const reply = await client.v2.reply('Oo Hey @Theda32516554, @BolandDrummer, @Oleta50707472, @Emiko74547042, @Nelda29443713 have a look ! ', results.data[i].id )
   const following = await client.v2.follow('1529460352844451843', results.data[i].author_id);
  } catch (e) {console.log (e)}
}

const rwClient = client.readWrite;
const myId = process.env.MY_ID
const search = async() => {
  const results = await client.v2.get('tweets/search/recent', { query: 'Follow RT #giveaway -is:retweet', max_results: 10, 'tweet.fields': ['referenced_tweets'], expansions : ['author_id'] });
  const length = results.data.length;
  console.log(length)
  for(i=0 ; i<length ; i++) {
  // end_time :'2022-05-25T00:00:00Z',
    const users = await client.v2.tweetLikedBy(results.data[i].id)
    console.log('********************************',users)
    if (users.errors ) continue;
    if (users.meta.result_count === 0) {
      sendTweet();
      continue;
    }
    const usersLikedLength =  users.data.length;
    var isLiked = false;
    for (j=0 ; j<usersLikedLength ; j++) {
      if (users.data[j].id === '1529460352844451843'){
        isLiked = true;
        console.log('-------------------allready liked -------------------');
        }
      }
      if (isLiked === false) {
        console.log( 'data that will be liked ', results.data[i]);
        sendTweet();
      } 
    }
}

cron.schedule('* */15 * * * *', () => {
  console.log('running');
  search();
})

