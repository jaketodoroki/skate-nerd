import { Skatespot } from "../models/skatespot.js"

function index(req, res) {
  Skatespot.find({})
  .then(skatespots => {
    res.render('skatespots/index', {
      title: 'Skatespots',
      skatespots
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index
}