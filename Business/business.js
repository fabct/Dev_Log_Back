/**
 * Vue d'un user sur le base de donnée 
 * @typedef {Object} User
 * @property {string} first Le prenom
 * @property {string} last le nom de famille 
 * @property {string} email
 * @property {string} compagny
 * @property {string} country
 * @property {number?} id
 * @property {string?} created_at date de creation de la donnée 
 */

//-------------- Importation des modules ------------//

const data = require("../Data/data");
const user_checker = {
    first: /^[A-Za-z-]+$/,
    last: /^[A-Za-z-]+$/,
    email: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,3}$/,
    compagny: /^[A-Za-z-]+$/,
    country: /^[A-Za-z-]+$/
};

//---------- Fonctions utiles --------//

/**
 * Structure d'un utilisateur donnée
 * @param {User} user l'utilisateur a vérifier
 * @param {boolean} check_all_keys devons nous checker toutes les clées
 * @returns {boolean} C'est dans le bon format ?
 */

const is_valid_user = (user,check_all_keys)=>{
    let user_keys = Object.keys(user).sort();
    let checker_keys = Object.keys(user_checker).sort();

    // Check toutes les clées des users 
    if(check_all_keys && !are_array_equal(user_keys,checker_keys)){
        return false;
    }

    // Check subarray of users 
    if(!check_all_keys && !is_subarray_of(user_keys,checker_keys)){
        return false;
    }

    //verification si l'utilisateur est valide
    let is_valid_user = user_keys.reduce(
        (acc, key) => (user[key].match(user_checker[key]) != null) && acc,
        true
    );

    return is_valid_user;
}

/**
 * On va checker si nos 2 réseaux sont égaux 
 * @param {Array} a le premier réseau
 * @param {Array} b le second réseau
 * @return {Boolean} Le réseau est-il égal ?
 */

const are_array_equal = (a,b) => JSON.stringify(a) == JSON.stringify(b);

/**
 * On va checker si un réseau et un sous réseau d'un autre 
 * @param {Array} a Le sous réseau
 * @param {Array} b Le réseau
 * @returns {boolean} a est un sous réseau de b ?
 */

const is_subarray_of = (a,b) => {
    for (let elem of a){
        // l'element n'est pas dans b
        if (b.indexOf(elem) == -1){
            return false;
        }
    }

    return true;
};

//-------- Fonction D'export --------//

const business_public = {
    /**
     * Get tout les utilisateur de la base de donnée 
     * @return {User[]} tout les utilisateur de la base de donnée
     */
    get_all_users: () => data.get_all_users(),
    /**
     * Essaye d'ajouter un utilisateur a la base de donnée et retourne un booleen
     * indique si l'operation a bien été faites 
     * @param {User} user l'utilisateur a ajouter
     * @returns {boolean} A-t-il bien été ajouté a la base de donnée ?
     */
    add_user: user => {
        // on va verifier si la structure est correcte
        if (!is_valid_user(user,true)){
            return false;
        }

        return data.add_user(user);
    },
    /**
     * On essaye d'editer un utilisateur présent dans la base de donnée et on retourne un boolean
     * en indicant si l'opération a bien été faites
     * @param {{id: number, to_edit: User}} user l'utilisateur à editer
     * @returns {boolean} A-t-il était édité dans la base de donnée ?
     */
    edit_user: user => {
        // on verifie si l'id et dans l'utilisateur
        if(!("id" in user && "to_edit" in user)){
            return false;
        }

        //on verifie si lid utilisateur est un nombre
        if(typeof user.id != "number"){
            return false;
        }

        // on verifie si la structure est correcte 
        if(!is_valid_user(user.to_edit, false)){
            return false;
        }

        return data.edit_user(user);
    },
    /**
     * On essaye de supprimer un utilisateur de bdd et on retourne un boolean
     * en indicant si l'opération a bien été faites
     * @param {{id: number}} user L'utilisateur a supprimer
     * @returns {boolean} L'utilisateur a-t-il était supprimé ?
     */
    delete_user: user => {
        // On verifie si l'id est dans l'utilisateur
        if(!("id" in user)){
            return false;
        }

        // Verifie si l'id est bien un nombre
        if(typeof user.id != "number"){
            return false;
        }

        return data.delete_user(user.id);
    }
};

//----------- Exportation comme module --------------//

module.exports = business_public;