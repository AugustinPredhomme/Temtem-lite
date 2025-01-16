# Temtem-lite

**Temtem-lite** est un projet personnel visant à offrir une alternative au jeu-vidéo originel Temtem. Cette version proposera une version simplifiée du jeu, se concentrant sur les aspects compétitifs de celui-ci. Il sera donc possible de combattre d'autres utilisateurs et d'échanger avec ceux-ci.

## Installation
1. Clonez le projet :
```bash
git clone https://github.com/AugustinPredhomme/Temtem-lite.git
```
2. Installez les dépendances
```bash
lerna bootstrap
```
3. Configurez les variables d'environnement
- A mettre à la racine de l'application React (packages/client/) :
```bash
REACT_APP_USER_ID_SECRET_KEY = ''
QUERY_URI = '';
QUERY_PORT = '';
REACT_ENV = '';
```
- A mettre à la racine de l'application NodeJS (packages/server/) :
```bash
PORT=''
FRONTEND_URL=""
DB_HOST=''
DB_USER=''
DB_PASSWORD='' 
DB_NAME=''
DB_PORT=''
JWT_SECRET= ''
REFRESH_TOKEN_SECRET = ''
```
4. Lancez l'application : À la racine du projet, utilisez les commandes suivante :
```bash
npm install
lerna run build --parallel
lerna run start --parallel
```

En ce qui concerne des **bugs**, il y en a un majeur, si vous restez déconnecté trop longtemps, il faudra vider le local storage du site afin de se reconnecter. Pour cela, rien de plus simple, il vous suffit de faire `CTRL + MAJ + I` puis d'aller dans applications et faire `clic droit -> effacer` sur le local storage.

Je vous ai également mis à disposition plusieurs ressources :
- **Cahier des charges** : *afin de connaitre les objectifs, limites et conditions de développement de ce projet*
- **Modèle Conceptuel de données** : *pour voir l'idée initial de la structuration des données*
- **Wireframes** : *pour voir l'idée initial de design du site et ce pour les 3 formats proposés (mobile, tablette, ordinateur)*
- **Collection Postman** : * qui permettra aux administrateurs d'effectuer différentes requêtes leur étant réservées*
- **Dump base de données** : *afin que vous puissiez connecter votre base de données à l'application*
- **Support de présentation** : *qui me servira lors de la soutenance du 19/11/2024*