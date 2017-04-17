import dotenv from 'dotenv'
dotenv.config()

import dev from './dev'
import production from './production'
import test from './test'

const config = {
  port: 8080,
  bodyLimit: "100kb",
  corsHeaders: ["Link"]
}


export const setupConfig = () => {
  let exportCfg

  if(process.env.NODE_ENV === 'test') {
    exportCfg = {
      ...config,
      ...test()
    }
  }
  else if(process.env.NODE_ENV === 'prod') {
    exportCfg = {
      ...config,
      ...production()
    }
  }
  else {
    exportCfg = {
      ...config,
      ...dev()
    }
  }

  return exportCfg
}

export default setupConfig()
