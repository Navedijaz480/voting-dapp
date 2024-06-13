const mongoose = require("mongoose");

const schema = mongoose.Schema({
    useraddress: {
        type: String,
    },
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    name1: {
        type: String,
    },
    company_name: {
        type: String,
    },
    company_name1: {
        type: String,
    },
    endTime: {
        type: String,
    },
    email: {
        type: String,
    },
    email1: {
        type: String,
    },
    phone: {
        type: String,
    },
    phone1: {
        type: String,
    },
    web_link: {
        type: String,
    },
    web_link1: {
        type: String,
    },
    postal_address: {
        type: String,
    },
    postal_address1: {
        type: String,
    },
    description: {
        type: String,
    },
    description1: {
        type: String,
    },
    job: {
        type: String,
    },
    job1: {
        type: String,
    },
    sponsord: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    profile_image1: {
        type: String,
    },
    date: {
        type: String,
    },
    type: {
        type: String,
        default:""
    },
    status:{
        type: String,
        default:'Active'
    },
    score:{
        type: String,
    },
    SponsorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Art_Sponsor',
      },
})
const candidates = mongoose.model("candidates", schema);
module.exports = candidates;