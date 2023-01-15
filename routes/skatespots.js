import { Router } from "express";
import * as skatespotsCtrl from '../controllers/skatespots.js'

const router = Router()

router.get('/', skatespotsCtrl.index)

export {
  router
}