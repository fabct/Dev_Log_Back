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

//-------------- Importation des modules ----------//
const fs = require("fs");
const { markAsUntransferable } = require("worker_threads");

//--------------- Initialisation des constantes de la base de donnée -----------------//
const DATABASE = __dirname + "/bdd.json";

//--------------- fonction utiles -------------//

/**
 * Récupération du dernier index donné
 * @param {User[]} users Tableau de tout les utilisateurs
 * @returns {number} Le dernier utilisateur 
 */
const get_last_index = users => Math.max(...users.map(user => user.id),0);

/**
 * Récupération de tout les utilisateurs de la base de donnée
 * @returns {User[]} Tableau de tout les Utilisateur
 */
const read_database_file = () => JSON.parse(fs.readFileSync(DATABASE,"utf-8"));

/**
 * Ecrit un utilisateur dans la base de donnée 
 * @param {User[]} users Tableau de tout les utilisateur
 */
const write_database_file = users => fs.writeFileSync(DATABASE, JSON.stringify(users), "utf-8");

//--------------- Fonctions Publiques --------------//

const data_public = {
     /**
      * Récupère tout les utilisateur de la base de donnée 
      * @returns {User[]} Tableau de tout les utilisateurs
      */
     get_all_users: () => read_database_file(),
     /**
      * Ajout d'un utilisateur a la base de donnée
      * @param {User} user L'utilisateur a ajouter (vérifié)
      * @return {boolean} A-t-il était ajouté ?
      */
     add_user: user => {
          let users;

          // On lis les utilisateur et renvoie faux si erreur
          try{
               users = read_database_file();
          } catch{
               console.error("Ne peut pas lire depuis la base de donnée");
               console.log("Ne peut pas lire depuis la base de donnée");
               return false;
          }

          //Ajout des infos utilisateur
          user.id = get_last_index(users) + 1;
          user.created_at = new Date().toUTCString();
          
          //Ajout d'un utilisateur dans le tableau 
          users.push(user);

          //Ecrit l'utilisateur et retourne une érreur si jamais 
          try {
               write_database_file(users);
           } catch {
               console.error("Ne peut pas écrire dans la base de donnée");
               console.log("Ne peut pas écrire dans la base de donnée");
               return false;
           }
           
           return true;
     },
     /**
 * Editer un utilisateur de la database
 * @param {{id: number, to_edit: User}} user utilisateur a editer
 * @returns {boolean} 
 */


edit_user: user => {
     let users;
     
     // lis un utilisateur et retourn faux su erreur 
     try {
      users = read_database_file();
  
     } catch {
       console.error("n'as pas pu lire dans la base de donnée");
       return false;
     }
  
     // Get l'index
     let user_index = -1;
     for(let i=0; i < users.length; i++){
          if(users[i].id == user.id){
              user_index = i;
          }
     }
  
     // User not found
     if(user_index == -1){
          return false;
     }
  
     //Edit user
     for(let key in user.to_edit){
          users[user_index][key] = user.to_edit[key];
     }

     //Ecrit l'utilisateur et retourne une érreur si jamais 
     try {
          write_database_file(users);
      } catch {
          console.error("Ne peut pas écrire dans la base de donnée");
          return false;
      }
      
      return true;
     
  },
  /**
   * suprime un utilisateur depuis la base de donnée
   * @param {number} id l'id de l'utilisateur a supprimer
   * @returns {boolean} Est-il suprimé ?
   */
  delete_user: id => {
     let users;

     // Lis les utilisateurs et retourne faux si impossible
     try{
          users = read_database_file();
     } catch{
          console.error("Ne peut pas lire depuis la base de donnée");
          return false;
     }

     //Regarde si l'id est dans users
     if(users.map(user => user.id).indexOf(id) == -1){
          return false;
     }

     //Supprime l'utilisateur
     users = users.filter(user => user.id != id);

     //Ecrit l'utilisateur et retourne une érreur si jamais 
     try {
          write_database_file(users);
      } catch {
          console.error("Ne peut pas écrire dans la base de donnée");
          return false;
      }
      
      return true;
  }
}

module.exports = data_public;
