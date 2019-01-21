connection = require("./connection");
sanitize_html = require("sanitize-html");

const bcrypt = require("bcrypt");

const login_callbacks = [];

function observer_login_logout(object_to_call)
{
    login_callbacks.push(object_to_call);
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
    catch (err) {
        console.log(err);
        return false;
    }
}

function logout(client_id)
{
    try {
        let all_true = true;
        login_callbacks.forEach(function(e) {
            if (!e.updateElement(false, client_id))
            {
                all_true = false;
            }
        });
        return all_true;
    }
    catch (err) {
        console.log(err);
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
        if (result_list.length === 0)
        {
            //User does not exist
            return false;
        }
        let result = await bcrypt.compare(password, result_list[0]["password"]);
        if (result)
        {
            console.log(typeof login_callbacks);
            login_callbacks.forEach(function(e) {
                if (!e.updateElement(true, client_id, username))
                {
                    result = false;
                }
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
    "logout": logout,
    "observe_login_logout": observer_login_logout,
};
