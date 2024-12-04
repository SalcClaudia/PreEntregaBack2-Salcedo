const users = [
    {
        username: 'Pedro',
        password: 1234,
        admin: false
    },
    {
        username: 'Martin',
        password: 12345678,
        admin: true
    }
];


export const login = (req, res) => {
    const { username, password } = req.body;
    const index = users.findIndex((user) => user.username === username && user.password === password);
    if (index < 0) res.status(401).json({ msg: "You're not authorized" });
    else {
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            count: 1,
            admin: user.admin
        }
        res.json({ msg: "Welcome!" });
    }  
};

export const secretEndpoint = (req, res) => {
    req.session.info.count++
    req.json({
        msg: 'secret endpoint',
        counter: req.session.info.count,
        session: req.session
    })
}

//if (!req.session.info) {
   // req.session.info = { count: 0 };
//} else if (!req.session.info.count) {
 //   req.session.info.count = 0;
//}
//req.session.info.count++;


export const isAdmin = (req, res) => {
    req.session.info.count++
    req.json({
        msg: 'secret endpoint ADMIN',
        counter: req.session.info.count,
        session: req.session
    })
    }

    export const logout = (req, res) =>{
        req.session.destroy()
        req.json({msg: 'loged out'})
    }