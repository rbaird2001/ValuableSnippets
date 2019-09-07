 //Node file
 //Requires npm install mathjs
 
 fs = require("fs");
 math = require("mathjs");

let txType = process.argv[2];
let txAmount = process.argv[3];

let balance = fBalance()
function fBalance(){
    fs.readFile("balance.txt","utf8",function(error,data){
        if(error){
            console.log(error);
            console.log("Using bank file instead");
            fs.readFile("bank.txt","utf8",function(error2,data2){
                if(error2){
                    console.log(error2);
                    return false;
                }
                else{
                    let txHistory = data2.split(",");
                    for(i=0;i<txHistory.length;i++){
                        makeFloat = parseFloat(txHistory[i]);
                        txHistory.splice(i,1,makeFloat);
                    }
                    console.log(math.sum(txHistory)); 
                    return math.sum(txHistory); 
                }
            });
        }
        else{
            console.log(parseFloat(data));
            return(parseFloat(data))
        }
    });
};

let objTransx = {
    deposit: balance + txAmount,
    withdrawal: balance - txAmount,
    total: balance,
}