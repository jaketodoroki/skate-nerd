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
  .populate('reviews.reviewer')
  .populate('owner')
  .then(skatespot => {
    // const review = skatespot.reviews.id(req.body.reviewerId)
    console.log(req.body)
    console.log(skatespot)
    res.render('skatespots/show', {
      skatespot: skatespot,
      title: 'show',
      // owner,
      // review,
      // reviewer
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
  Skatespot.findByIdAndDelete(req.params.id)
  .then(skatespot => {
    // if (skatespot.owner.equals(req.user.profile._id)) {
    //   skatespot.delete()
      // .then(() => {
        res.redirect('/skatespots')
      })
    // } else {
      // throw new error ('Not Authorized')
    // }
  // })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
   })
}

function addReview(req, res) {
  Skatespot.findById(req.params.id)
  .then(skatespot => {
    req.body.reviewer = req.user.profile._id
    skatespot.reviews.push(req.body)
    skatespot.save()
    .then(()=> {
      res.redirect(`/skatespots/${skatespot._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/skatespots')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function editReview(req, res) {
  Skatespot.findById(req.params.skatespotId)
  .then(skatespot => {
    const review = skatespot.reviews.id(req.params.reviewId)
    if (review.reviewer.equals(req.user.profile._id)){
      res.render('skatespots/editReview', {
        skatespot,
        review,
        title: 'Update Review'
      })
    } else {
      throw new Error('not authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
}

function updateReview(req, res) {
  Skatespot.findById(req.params.skatespotId)
  .then(skatespot => {
    const review = skatespot.reviews.id(req.params.reviewId)
    if (review.reviewer.equals(req.user.profile._id)){
      review.set(req.body)
      console.log(req.body)
      skatespot.save()
      .then(()=> {
        res.redirect(`/skatespots/${skatespot._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/skatespots')
      })
    } else {
      throw new Error('not authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/skatespots')
  })
} 

function deleteReview(req, res) {
  Skatespot.findById(req.params.skatespotId)
  .then(skatespot => {
    const review = skatespot.reviews.id(req.params.reviewId)
    if (review.reviewer.equals(req.user.profile._id)) {
      skatespot.reviews.remove(review)
      skatespot.save()
      .then(() => {
        res.redirect(`/skatespots/${skatespot._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/skatespots')
      })
    } else {
      throw new Error('not authorized')
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
  deleteSpot as delete,
  addReview,
  editReview,
  updateReview,
  deleteReview
}