// const axios = require('axios')

// module.exports = async (symbol) => {
//     let res1 = [];
//     const results = await axios({
//         method: 'get',
//         url: `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_187d0f71ac59455cae69bac7e3e081e0`,
//         params: {
//             format: 'json'
//         },
//     })
//     results.then(res => {
//         console.log(res)
//         res1 = res
//     })

//     return res;
// }