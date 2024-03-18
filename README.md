# Description du mini-projet
Ce répertoire contient une API REST de gestion de workers et un exemple de client.
C'est la même API que vous avez pu voir dans les premiers TP. Elle conserve les défauts relevés en TP (passage de pramètres aux workers, ...) à améliorer. 
Vous allez donc en faire une nouvelle version (v2).

On a ajouté aux workers la possibilité d'envoyer au client leur résultats dans un flux utilisant les websockets. 
Cette nouvelle fonctionalité amène à gérer une nouvelle ressource (partagée) qui est le port sur lequel s'établi la websocket. En effet, celui-ci doit être propre à chaque webworker en activité.

Votre projet (should you chose to accept it) sera 
1) d'apporter les modifications nécessaires à l'existant pour contrôler l'exécution des workers (les créer, les lancer, les arrêter, ...)  tout en conservant les recommandations REST et 
2) de proposer un nouveau service de gestion des ports websocket attribuables au workers. 
3) Vous proposerez également un mécanisme pour qu'un administrateur vérifie le bon usage du service (et facture éventuellement le client en fonction des ressources utilisées).

## Le nouveau worker (cf worker2.js)
Le nouveau worker simule un travail long (possiblement gourmant en calcul). Ce travail génère des données qu'il faut remonter au client en temps réel. Pour ce faire, on a donné la possibilité au worker d'établir une websocket directement avec le client. 

Pour le moment, le port sur lequel s'établit la socket est unique et fixe. Si vous voulez lancer deux instances de ce worker, il existera donc une concurrence d'accès à cette nouvelle ressource : le port de la websocket.

_ce qu'il faut faire_ 
1) Il faut donc trouver un mécanisme pour que le worker, à son lancement, récupère un port disponible. Dans le cas où aucun port ne serait disponible, il ne peut pas se lancer. Il faudra en avertir le client qui a sollicité son lancement... 
2) Pour qu'un administrateur puisse vérifier le bon usage du service, il faut que chaque worker ait son propre fichier de log. Ce log est une propriété du worker et pourra donc être récupéré par le client. 


## La gestion des ports (à implémenter)
C'est donc un nouveau service. Il doit être accessible à travers une interface REST. 
Le service gère une collection de ports (un _pool_ en bon anglais).
Notez que la partie modèle doit être accessible aux workers pour qu'ils connaissent les ports disponibles.

## Bonus 
### Droits d'accès
Il serait bon que seuls des personnes habilitées aient le droit d'accès au service de gestion des ports.
De même, dans l'idéal, le propriétaire d'un worker devrait être le seul habilité à le gérer (à l'exception des administrateurs).

_Indice_ 
Pour la gestion des droits, on pourra utiliser le service de JWT proposé en TP. Les deux services aurront des Secrets différents. Le nom du propriétaire du worker serait chiffré dans le JWT.

### Facturation
Enfin, les logs d'exécution des jobs pourraient contenir des informations pertinentes pour la facturation (durée d'exécution, ressources système utilisé, ...). On pourrait même imaginer qu'un client ne puisse pas lancé de jobs si son quota est excédé. 

_Indice_
Pour la facturation, on pourra regarder la variable *process*. 

### Client 
La lecture des flux proposé dans le client actuel n'est pas très pratique (console). On pourra proposer un client sous la forme d'un _dashboard_ avec une mise à jour de l'affichage à chaque nouvelle donnée du worker. On pourra aussi proposer un système d'onglets si un client suit plusieurs jobs.

## Points d'attention
- Le projet cherche à évaluer votre capacité à mettre en oeuvre des API REST. Réfléchissez donc en terme de ressources et sous ressources.
- N'oubliez pas qu'une explication de vos choix d'implémentation vous sera demandé lors de l'évaluation qui suivra. Vous pouvez faire le projet à deux mais vous serez seuls devant votre feuille...
- La priorité est à la version v2 de la gestion des workers (cycle de vie, attribution des ports et système de log individuel). L'API de  gestion des ports est secondaire car assez simple. 
- Les bonus ne feront pas l'objet d'une évaluation.
- Les versions v1 et v2 des API de gestion des workers doivent co-exister pour assurer la continuité auprès des clients.