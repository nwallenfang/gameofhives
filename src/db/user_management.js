connection = require("./connection");
sanitize_html = require("sanitize-html");

const bcrypt = require("bcrypt");

const login_callbacks = [];

function observe_login(callback)
{
    login_callbacks.push(callback);
}

async function register(username, password)
{
    username = sanitize_html(username, {
        allowedTags: [],
        allowedAttributes: {}
    });
    if (username.length < 1)
    {
        return false;
    }
    let hash = await bcrypt.hash(password, 10);
    try {
        await connection.query("INSERT INTO player (name, password, gamecount, wincount) VALUES (?, ?, ?, ?)",
            {
                replacements: [username, hash, 0, 0]
            });
        return true;
    }
    catch {
        return false;
    }
}

async function login(username, password, client_id)
{
    try {
        let db_result = await connection.query("SELECT password FROM player WHERE name = ?",
            {
                replacements: [username]
            });
        let result_list = db_result[0];
        if (result_list === [])
        {
            //User does not exist
            return false;
        }
        let result = await bcrypt.compare(password, result_list[0]["password"]);
        console.log(result);
        if (result)
        {
            console.log(typeof login_callbacks);
            login_callbacks.forEach(function(e) {
                e(client_id, username);
            });
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    "register": register,
    "login": login,
    "observe_login": observe_login
};
