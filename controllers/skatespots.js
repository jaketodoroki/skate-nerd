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

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.bust = !!req.body.bust
  Skatespot.create(req.body)
  .then(skatespot => {
    res.render('/skatespots')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  create
}