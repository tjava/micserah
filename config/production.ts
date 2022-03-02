export default {
    port: process.env.port || 1333,
    dbUri: "mongodb+srv://E-C_api:Password4E-C_api@cluster0.zdylb.mongodb.net/micserah?retryWrites=true&w=majority",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
};