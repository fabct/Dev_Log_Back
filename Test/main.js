/*

// GET

fetch("/users", {
    method: "get"
}).then(res => res.json())

// POST

// Valide

fetch("/users", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        first: "Jean",
        last: "Bombheur",
        country: "France",
        company: "Cochonou",
        email: "jean.bombheur@cochonou.fr"
    })
})

// Invalide

fetch("/users", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        last: "Bombheur",
        country: "France",
        company: "Cochonou",
        email: "jean.bombheur@cochonou.fr"
    })
})

// PUT

// Valide

fetch("/users", {
    method: "put",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 1,
        to_edit: {
            last: "Bombeur",
            email: "jean.bombeur@cochonou.fr"
        }
    })
})

// Invalide

fetch("/users", {
    method: "put",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 1,
        to_edit: {
            sex_appeal: 42069
        }
    })
})

//DELETE

fetch("/users", {
    method: "delete",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 1
    })
})

fetch("/users", {
    method: "delete",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 69
    })
})
*/


require("../Presentation/api").start(8080);


