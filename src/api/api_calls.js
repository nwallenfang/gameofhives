const express = require("express");
const body_parser = require("body-parser");

const login = require("../db/user_management")["login"];
const register = require("../db/user_management")["register"];
const { decorateApp } = require('@awaitjs/express');

const app = decorateApp(express());

app.use(body_parser.json());



app.postAsync("/login", async function(req, res, next){
    let user = req.body["user"];
    let password = req.body["password"];
    let client_id = req.body["client_id"];
    if (typeof user !== "string" || typeof password !== "string" || typeof client_id !== "string")
    {
        res.send({
            success: false
        });
        return;
    }

    try {
        res.send({
            success: await login(user, password, client_id)
        });
    }
    catch (err) {
        res.send({
            error: err,
            success: false
        });
    }
});

app.postAsync("/register", async function(req, res, next){
    let user = req.body["user"];
    let password = req.body["password"];
    if (typeof user !== "string" || typeof password !== "string")
    {
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

app.listen(8001);