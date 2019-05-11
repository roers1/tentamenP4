module.exports = {
    logger: require('tracer').dailyfile({
      root: './logs',
      maxLogFiles: 10,
      allLogsFileName: 'films_en_gebruikers'
    }),

    dbConfig: {
      server: 'localhost\\MSSQLSERVER',
      database: 'Prog4-Eindopdracht1',
      user: 'sa',
      password: 'WwvSQL123',
      port: 1433,
      driver: 'msnodesql',
      connectionTimeout: 1500,
      options: {
        // 'true' if you're on Windows Azure
        encrypt: false
      }
    }
}