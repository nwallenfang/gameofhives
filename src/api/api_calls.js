const body_parser = require("body-parser");

const login = require("../db/user_management")["login"];
const logout = require("../db/user_management")["logout"];
const register = require("../db/user_management")["register"];
const { decorateApp } = require('@awaitjs/express');

const cookie_session = require("cookie-session");
const app = decorateApp(require("../networking/server")["app"]);

app.use(cookie_session({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


app.postAsync("/login", async function (req, res, next) {
    let user = req.body["username"];
    let password = req.body["password"];
    let client_id = req.body["client_id"];

    // Cookie login
    if (req.session.user !== undefined && client_id !== undefined) {
        res.send({
            success: true,
            user: user
        })
    }

    if (typeof user !== "string" || typeof password !== "string" || typeof client_id !== "string") {
        res.send({
            success: false
        });
        return;
    }

    try {
        let success = await login(user, password, client_id);
        let to_send = {
            success: success
        };
        if (success) {
            res.session.user = user;
            to_send.user = user;
        }
        res.send(to_send);
    }
    catch (err) {
        res.send({
            error: err,
            success: false
        });
    }
});

app.postAsync("/register", async function (req, res, next) {
    let user = req.body["username"];
    let password = req.body["password"];

    if (typeof user !== "string" || typeof password !== "string") {
        res.send({
            success: false
        });
        return;
    }

    try {
        res.send({
            success: await register(user, password)
        })
    }
    catch (err) {
        res.send({
            error: err,
            success: false
        });
    }
});

app.post("/logout", function (req, res) {
    let client_id = req.body["client_id"];
    if (typeof client_id !== "string") {
        res.send({
            success: false
        });
        return;
    }

    try {
        res.send({
            success: logout(client_id)
        });

    }
    catch (err) {
        res.send({
            error: err,
            success: false
        });
    }
});