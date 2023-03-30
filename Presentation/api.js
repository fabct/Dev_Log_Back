/**
 * Importation des modules
 */

const express = require("express");
const business = require("../business/business");

// ----- Initialisation de l'application -----

let app = express();
const REQUESTS_URL = "/users";

// ----- API Backend -----

const api = {
    /**
     * Start the API on given port.
     * @param {number} port The port identifier
     */
    start: port => {
        // Enables JSON requests
        app.use(express.json());

        // GET request - See users
        // Return a JSON containing the users
        app.get(REQUESTS_URL, (req, res) => {
            res.json(business.get_all_users());
        });

        // POST request - Add user
        // Takes the req body and send response
        // according to business
        app.post(REQUESTS_URL, (req, res) => {
            let is_added = business.add_user(req.body);

            // Send adequate responses
            if (is_added) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });

        // PUT request - Edit user
        // Takes the req body and send response
        // according to business
        app.put(REQUESTS_URL, (req, res) => {
            let is_edited = business.edit_user(req.body);

            // Send adequate responses
            if (is_edited) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });

        // DELETE request - Delete user
        // Takes the req body and send response
        // according to business
        app.delete(REQUESTS_URL, (req, res) => {
            let is_deleted = business.delete_user(req.body);

            // Send adequate responses
            if (is_deleted) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });

        // Start listening to given port
        app.listen(port, () => {
            console.log(`App listening to port ${port}`);
        });

        // --------------- DEBUG ------------------
        app.use(express.static("../Test/public"));
        // --------------- DEBUG ------------------
    }
};

// ----- Exportation comme module -----

module.exports = api;