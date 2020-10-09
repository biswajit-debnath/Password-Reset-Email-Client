const app = require('express')();
// const Sequelize = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const sequelize = new Sequelize("db1", "root", "root", config);

// const User = require('./models/user')(sequelize, Sequelize.DataTypes);
// const Role = require('./models/role')(sequelize, Sequelize.DataTypes);
const { User,Role } = require('./models/index');

app.get('/api/getdata',async (req,res)=> {
    // console.log(Test3.sequelize.options.database);
    // console.log(Test3.sequelize.config.database);

    const data = await User.findAll({
        include: [ { 
            model: Role
        } ]
    })
    res.json({ 'data': data });
});


app.listen(5000,()=> {
    console.log('Server is lstening at port 5000');
})

