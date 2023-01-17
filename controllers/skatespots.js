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
    res.redirect('/skatespots')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function show(req, res) {
  Skatespot.findById(req.params.id)
  .populate("owner")
  .then(skatespot => {
    res.render('skatespots/show', {
      skatespot: skatespot,
      title: 'show'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function flipBust(req, res) {
  Skatespot.findById(req.params.id)
  .then(skatespot => {
    skatespot.bust = !skatespot.bust
    skatespot.save()
    .then(()=> {
      res.redirect(`/skatespots/${skatespot._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function edit(req, res) {
  Skatespot.findById(req.params.id)
  .then(skatespot => {
    res.render('skatespots/edit', {
      title: 'Edit spot',
      skatespot
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function update(req, res) {
  Skatespot.findById(req.params.id)
  .then(skatespot => {
    if (skatespot.owner.equals(req.user.profile._id)) {
      req.body.bust= !!req.body.bust
      skatespot.updateOne(req.body)
      .then(()=> {
        res.redirect(`/skatespots/${skatespot._id}`)
      })
    } else {
      throw new Error('Not authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function deleteSpot(req, res){
  Skatespot.findById(req.params.id)
  .then(skatespot => {
    if (skatespot.owner.equals(req.user.profile._id)) {
      skatespot.delete()
      .then(() => {
        res.redirect('/skatespots')
      })
    } else {
      throw new error ('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

export {
  index,
  create,
  show,
  flipBust,
  edit,
  update,
  deleteSpot as delete
}