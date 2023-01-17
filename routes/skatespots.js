import { Router } from "express";
import * as skatespotsCtrl from '../controllers/skatespots.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

router.get('/', skatespotsCtrl.index)
router.get('/:id', skatespotsCtrl.show)
router.get('/:id/edit', isLoggedIn, skatespotsCtrl.edit)
router.post('/', isLoggedIn, skatespotsCtrl.create)
router.patch('/:id/flip-bust', isLoggedIn, skatespotsCtrl.flipBust)

export {
  router
}