const actions = require('../../client/src/actions');

const config = {
    sql : {
        db:'seq',
        user:'root',
        pass:''
    },
    mongo: {
        dbUrl:  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db'
    },
    useMongo:true,
    useSql: false,
    JWT_SECRET:"OFIRISTHEBEST",
	server:{
      port: process.env.PORT || 8080
    },
	websocket:{
		port: process.env.WS_PORT || 3030
	},

    allowedActions: [
        actions.FETCH_POSTS,
        actions.RECEIVE_MESSAGE
    ]


};

module.exports = config;