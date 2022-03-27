import { ethers } from "ethers";

function getEth(){
    // @ts-ignore
    const eth =  window.ethereum;
    if (!eth){
        throw new Error("Get Metamask")
    }
    return eth
}

async function hasAccounts() {
    const eth = getEth(); 
    const accounts = await eth.request({method: "eth_accounts"}) as string[];

    return accounts && accounts.length;
}

async function requestAccounts() {
    const eth = getEth(); 
    const requestAccounts = await eth.request({method: "eth_requestAccounts"}) as string[];

    return requestAccounts && requestAccounts.length;
}

async function run() {
    if (!await hasAccounts() && !await requestAccounts()){
        throw new Error("I've made a huge mistake...");
    }
    
    const hello = new ethers.Contract(
        "",
        [
            "function hello() public pure returns (string memory)",
        ],
        new ethers.providers.Web3Provider(getEth()),
    )
    document.body.innerHTML = await hello.hello();
}

run();