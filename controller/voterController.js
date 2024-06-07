const voter = require("../models/voter");


exports.createVoter = async (req, res) => {
    try {

        const data = new voter(req.body);
        await data.save();
        res.status(201).send({
            success: true,
            msg: "Cast Vote Successfuly"
        })

    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.getVoterDetails = async (req, res) => {
    try {

        let {
            voterAddress,
            candidateAddress
        } = req.query

        const data = await voter.findOne({
            voterAddress: voterAddress, candidateAddress: candidateAddress
        })

        // console.log("data", data);
        if (data !== null) {
            res.status(201).send({
                data: data,
                success: true,
            })
        } else {
            res.status(200).send({
                data: [],
                success: false,

            })
        }

    } catch (error) {
        console.error("error while get user", error);
    }
}

exports.getVoterDetail = async (req, res) => {
    try {
      let { candidateAddress } = req.query;
  
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
  
      res.status(200).send({
        forCount: forCount,
        againstCount: againstCount,
        success: true,
      });
    } catch (error) {
      console.error('Error while getting voter details', error);
      res.status(500).send({
        message: 'Error while getting voter details',
        success: false,
      });
    }
  };