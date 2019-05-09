module.exports = {
    logger: require('tracer').dailyfile({
      root: './logs',
      maxLogFiles: 10,
      allLogsFileName: 'films_en_gebruikers'
    })
}