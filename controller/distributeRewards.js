const cron = require('node-cron');
const voter = require("../models/voter");

const Web3 = require("web3");
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

const contractAddress = "0x21Ccaee79fb0dB5c82c73E9e72845812974Dde84"; // Deployed manually
const abi =[{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AirdropDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"member","type":"address"}],"name":"NewMember","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"member","type":"address"}],"name":"ProfileCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"candidate","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ProposalSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isLongTerm","type":"bool"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"bool","name":"support","type":"bool"}],"name":"VoteCasted","type":"event"},{"inputs":[],"name":"Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isLongTerm","type":"bool"}],"name":"UnStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newMember","type":"address"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasuryWallet","type":"address"}],"name":"addTreasuryWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"airdropCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"member","type":"address"},{"internalType":"address","name":"_sponser","type":"address"}],"name":"asignSponser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"blacklist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"companyName","type":"string"},{"internalType":"string","name":"jobList","type":"string"},{"internalType":"string","name":"postalAddress","type":"string"},{"internalType":"string","name":"telephoneNumber","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"webLink","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"profilePicture","type":"string"},{"internalType":"address","name":"_sponser1","type":"address"},{"internalType":"address","name":"_sponser2","type":"address"}],"name":"completeProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"members","outputs":[{"internalType":"bool","name":"isWhitelisted","type":"bool"},{"internalType":"bool","name":"isBlacklisted","type":"bool"},{"internalType":"bool","name":"rewardDistributed","type":"bool"},{"internalType":"uint256","name":"score","type":"uint256"},{"internalType":"uint256","name":"fors","type":"uint256"},{"internalType":"uint256","name":"againt","type":"uint256"},{"internalType":"bool","name":"rewardStatus","type":"bool"},{"components":[{"internalType":"string","name":"companyName","type":"string"},{"internalType":"string","name":"jobList","type":"string"},{"internalType":"string","name":"postalAddress","type":"string"},{"internalType":"string","name":"telephoneNumber","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"webLink","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"profilePicture","type":"string"}],"internalType":"struct DAO.Profile","name":"profile","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setStakeTimeLong","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setStakeTimesLongTerm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setVoteTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setVoteTimeShort","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isLongTerm","type":"bool"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeAmountLongTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeLong","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTimesLongTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"staketimeLong","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"staketimeShot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"times","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"memberAddress","type":"address"},{"internalType":"string","name":"newCompanyName","type":"string"},{"internalType":"string","name":"newJobList","type":"string"},{"internalType":"string","name":"newPostalAddress","type":"string"},{"internalType":"string","name":"newTelephoneNumber","type":"string"},{"internalType":"string","name":"newEmail","type":"string"},{"internalType":"string","name":"newWebLink","type":"string"},{"internalType":"string","name":"newDescription","type":"string"},{"internalType":"string","name":"newProfilePicture","type":"string"}],"name":"updateProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"memberAddress","type":"address"},{"internalType":"bool","name":"support","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"voteTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"whitelist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]


exports.getReward = async (candidateAddress) => {
    const web3 = new Web3('https://rpc-amoy.polygon.technology');
    let fromAddress = '0xcb06C621e1DCf9D5BB67Af79BEa90Ac626e4Ff38';
    let privateKey = '2817782db86070d764c41b898d0564c791747c8e35961b3bcb655565a804907b';
    // cron.schedule('*/1 * * * *', async () => {
    try {
        // let { userAddress } = req.body
        console.log("userAddress",candidateAddress);
        if (!privateKey.startsWith("0x")) {
            privateKey = "0x" + privateKey;
        }
        let bufferedKey = ethUtil.toBuffer(privateKey);

        if (
            ethereum_address.isAddress(fromAddress) &&
            ethereum_address.isAddress(fromAddress) &&
            ethUtil.isValidPrivate(bufferedKey)
        ) {
            const contract = await new web3.eth.Contract(abi, contractAddress);
            let count;
            // web3.eth.defaultAccount = fromAddress;

            const tx_builder = await contract.methods.distributeRewards(candidateAddress.toString());
            let encoded_tx = tx_builder.encodeABI();

            let gasPrice = await web3.eth.getGasPrice();
            let transactionObject = {
                nonce: web3.utils.toHex(count),
                from: fromAddress,
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(4520276),
                to: contractAddress,
                data: encoded_tx,
                chainId: 80002,
            };

            web3.eth.accounts
                .signTransaction(transactionObject, privateKey)
                .then(async (signedTx) => {
                    web3.eth.sendSignedTransaction(
                        signedTx.rawTransaction,
                        async function (err, hash) {
                            if (!err) {
                                console.log("hash is : ", hash);
                                setTimeout(async () => {
                                    let receipt = await web3.eth.getTransactionReceipt(hash)
                                    console.log("receipt", receipt);
                                    if (receipt?.status == true) {
                                        console.log("Transaction is in mining state", hash);
                                        res.status(200).json({ data: `"Transaction is in mining state", ${hash}` });


                                    } else {
                                        res.status(200).json({ error: "Transaction is Fail" });

                                        // console.log("Transaction is Fail");

                                    }
                                }, 10000);

                            } else {
                                console.log(`Bad Request ${err}`);
                                res.status(200).json({ error: `Bad Request ${err}` });



                            }
                        }
                    );
                })
                .catch((err) => {
                    console.log(`Your private or public address is not correct`);
                    res.status(200).json({ error: `Your private or public address is not correct` });


                });
        } else {
            console.log(`Your private or public address is not correct`);

        }
    } catch (e) {
        console.log('invalid transaction signing', e);

    }


    // });

}
// module.exports = getReward;
async function checkVotesAndCallReward(candidateAddress) {
    try {
      const data = await voter.aggregate([
        {
          $match: { candidateAddress: candidateAddress },
        },
        {
          $group: {
            _id: '$vote',
            count: { $sum: 1 },
          },
        },
      ]);
  
      let forCount = 0;
      let againstCount = 0;
  
      data.forEach((item) => {
        if (item._id === 'For') {
          forCount = item.count;
        } else if (item._id === 'Against') {
          againstCount = item.count;
        }
      });
  
      if (forCount > againstCount) {
        await exports.getReward(candidateAddress);
      } else {
        console.log('Votes did not meet the condition.');
      }
    } catch (error) {
      console.error('Error while checking votes and calling getReward:', error);
    }
  }
  
  // Your function to be called manually
  exports.getVoterInformation = async (req, res) => {
    try {
      let { candidateAddress } = req.query;
  
      // Schedule the checkVotesAndCallReward function to run after one hour
      setTimeout(() => {
        checkVotesAndCallReward(candidateAddress);
      }, 60 * 1000); // 1 hour in milliseconds
  
      // Respond immediately to the request
      res.status(200).send({
        message: 'Task scheduled to check votes in one hour.',
        success: true,
      });
    } catch (error) {
      console.error('Error while scheduling the task', error);
      res.status(500).send({
        message: 'Error while scheduling the task',
        success: false,
      });
    }
  };
  
  // Route to manually start the vote checking and scheduling
//   app.get('/start-task', exports.getVoterDetails);
  
