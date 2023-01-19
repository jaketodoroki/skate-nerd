import { Router } from "express";
import * as skatespotsCtrl from '../controllers/skatespots.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

router.get('/', skatespotsCtrl.index)
router.get('/:id', skatespotsCtrl.show)
router.get('/:id/edit', isLoggedIn, skatespotsCtrl.edit)
router.get('/:skatespotId/reviews/:reviewId/edit', isLoggedIn, skatespotsCtrl.editReview)
router.post('/', isLoggedIn, skatespotsCtrl.create)
router.post('/:id/reviews', isLoggedIn, skatespotsCtrl.addReview)
router.patch('/:id/flip-bust', isLoggedIn, skatespotsCtrl.flipBust)
router.put('/:id', isLoggedIn, skatespotsCtrl.update)
router.put('/:skatespotId/reviews/:reviewId', isLoggedIn, skatespotsCtrl.updateReview)
router.delete('/:id', isLoggedIn, skatespotsCtrl.delete)
router.delete('/:skatespotId/reviews/:reviewId', isLoggedIn, skatespotsCtrl.deleteReview)

export {
  router
}