//https://mockaroo.com/mock_apis
// const makeRequest = function (params = {}, cb) {
//     const data = null;
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             cb(JSON.parse(this.responseText));
//         }
//     });
//     xhr.open(
//         params.method || "GET",
//         params.url
//     );
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(data);
// };
const makeRequest = function (url) {
    // console.log(`in make request`, url);
    return fetch(url);
        // .then( data => data.json() )
        // .then ( json => cb(json) )
};

