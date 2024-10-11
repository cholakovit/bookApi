import app from './app'

app.listen({ port: 8080 }, (err, address) => {
    if(err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Server listening at ${address}`)
})