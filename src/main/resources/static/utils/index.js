import * as storage from './storage.js'
import { loginCheck } from './app.js'
import * as utils from './utils.js'


loginCheck()

window.$util = {
  ...storage,
  ...utils
}
