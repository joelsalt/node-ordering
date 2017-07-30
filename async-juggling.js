var http = require("http");

// urls are provided via command line; any number of them can be input.
var urls = [];
var dataList = [];
var completed = 0;

// Main block
let i = 2;
for (i; i < process.argv.length; i++) {
    urls.push(process.argv[i]);
};

console.log(urls);

for (i = 0; i < urls.length; i++){
    dataCount(urls[i], i);
};
// end

// this function uses input values of i to describe unique ordering 
// intergers for each call
function dataCount(url, count) {
    http.get(url, (response) => {
        const { statusCode } = response;

        if (statusCode !== 200) throw new Error("Invalid code: " + statusCode);

        response.on("error", console.error);
        
        response.setEncoding("utf8");

        var dataCollection = [];
        response.on("data", (data) => {
            dataCollection.push(data);
        });

        response.on("end", () => {
            dataList[count] = dataCollection.join("");

            completed++;
            if (completed === urls.length) {
                printData();
            };
        });
    }).on("error", console.error);
};

function printData(){
    dataList.forEach((item) => {
        console.log(item);
    });
};