const dev = () => {
  return {
    env: 'dev',
    db: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 8080,
  }
}

export default dev
