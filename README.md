# Garderie DevOps

Application web de gestion de garderie, déployée avec Docker Compose dans une machine virtuelle Ubuntu provisionnée avec Vagrant et Ansible. Le projet intègre une chaîne CI/CD basée sur Jenkins pour automatiser les tests, la construction et la publication des images Docker.

## 1. Présentation de l'application

Le projet Garderie DevOps comprend deux composants principaux :

- **Frontend :** application web développée avec Next.js.
- **Backend :** API REST développée avec Node.js et Express, qui fournit les données de l'application.

Le déploiement utilise des images Docker publiées sur Docker Hub. Docker Compose orchestre les conteneurs et configure leur communication sur un réseau dédié.

### Technologies utilisées

| Technologie | Rôle |
|---|---|
| Next.js | Interface web |
| Node.js et Express | API REST |
| Git et GitHub | Gestion du code source et des branches |
| Jenkins | Automatisation du pipeline CI/CD |
| Docker | Conteneurisation |
| Docker Hub | Publication et distribution des images |
| Docker Compose | Déploiement multi-conteneurs |
| Vagrant | Création et gestion de la VM |
| Ubuntu | Système d'exploitation de la VM |
| Ansible | Provisioning et configuration du serveur |

## 2. Architecture du projet

### Structure des fichiers

```text
garderie-devops/
├── ansible/
│   ├── ansible.cfg
│   ├── inventory/
│   │   └── hosts.ini
│   ├── roles/
│   │   └── docker/
│   │       ├── tasks/
│   │       │   └── main.yml
│   │       └── handlers/
│   │           └── main.yml
│   └── site.yml
├── backend/
├── frontend/
├── docker-compose.yml
├── Jenkinsfile
├── Vagrantfile
└── README.md
```

### Architecture de la chaîne CI/CD

1. Le développeur modifie le code et pousse les changements vers GitHub.
2. Jenkins récupère le dépôt et exécute les étapes définies dans le `Jenkinsfile`.
3. Les tests automatisés vérifient le fonctionnement du code.
4. Les images Docker du frontend et du backend sont construites et publiées sur Docker Hub, selon la configuration du pipeline.
5. Docker Compose récupère les images publiées et démarre les conteneurs dans la VM Ubuntu.

```text
Développeur
    |
    v
GitHub (code source)
    |
    v
Jenkins (pipeline CI/CD)
    |
    +--> Tests automatisés
    |
    +--> Construction des images Docker
    |
    v
Docker Hub
    |
    v
Vagrant + VM Ubuntu
    |
    v
Docker Compose
    |
    +--> Frontend : port 3000
    |
    +--> Backend  : port 4000
```

## 3. Création et provisioning de la machine virtuelle

### Prérequis

Installer et configurer les outils suivants sur la machine hôte :

- Git
- Vagrant
- Le fournisseur de virtualisation utilisé par le projet, ici libvirt
- Une connexion Internet pour télécharger les images et les paquets nécessaires

### Création de la VM

Depuis la racine du projet :

```bash
vagrant up
```

Le fichier `Vagrantfile` définit la box Ubuntu, les ressources de la VM, le réseau et le provisioning Ansible.

### Provisioning avec Ansible

Le playbook principal est `ansible/site.yml`. Il appelle le rôle Docker afin de préparer la machine au déploiement.

Pour relancer le provisioning :

```bash
vagrant provision
```

Pour ouvrir une session dans la VM :

```bash
vagrant ssh
```

Pour vérifier l'adresse IP et l'état de Docker :

```bash
hostname -I
docker --version
docker compose version
```

> Si le provisioning échoue à cause du DNS ou de l'accès aux dépôts Ubuntu, vérifier la connectivité réseau de la VM avant de relancer Ansible.

## 4. Exécution du pipeline Jenkins

### Configuration requise

1. Configurer Jenkins et installer les plugins nécessaires au pipeline.
2. Ajouter les identifiants Docker Hub dans Jenkins, avec l'identifiant de credentials `dockerhub-credentials` si celui-ci est utilisé dans le `Jenkinsfile`.
3. Vérifier que l'environnement Jenkins dispose de Git, Node.js/npm si les tests les utilisent, et Docker si le pipeline construit les images.
4. Créer un job **Pipeline** pointant vers le dépôt GitHub et le fichier `Jenkinsfile`.

### Lancer le pipeline

Dans Jenkins :

1. Ouvrir le job du projet Garderie DevOps.
2. Cliquer sur **Build Now**.
3. Consulter **Console Output** pour vérifier chaque étape.
4. Confirmer que les tests passent et que les images sont publiées sur Docker Hub.

Le pipeline doit utiliser les credentials Jenkins pour l'authentification Docker Hub. Ne jamais enregistrer de mot de passe ou de token directement dans le dépôt Git.

## 5. Images Docker Hub

Les images utilisées pour le déploiement sont :

- **Backend :** [sen5e1/garderie-backend](https://hub.docker.com/r/sen5e1/garderie-backend)
- **Frontend :** [sen5e1/garderie-frontend](https://hub.docker.com/r/sen5e1/garderie-frontend)

Télécharger les images manuellement si nécessaire :

```bash
docker pull sen5e1/garderie-backend:latest
docker pull sen5e1/garderie-frontend:latest
```

## 6. Déploiement avec Docker Compose

Le fichier `docker-compose.yml` orchestre les deux services :

| Service | Port hôte | Port conteneur |
|---|---:|---:|
| Frontend | 3000 | 3000 |
| Backend | 4000 | 4000 |

Les conteneurs sont connectés au réseau Docker `garderie-net`. Le frontend utilise `API_URL=http://backend:4000` pour joindre le backend depuis le réseau interne Docker. Le backend dispose d'un healthcheck, et le démarrage du frontend dépend de l'état sain du backend.

### Démarrer le déploiement

Depuis le répertoire du projet dans la VM :

```bash
cd /vagrant
docker compose config
docker compose pull
docker compose up -d --no-build
```

L'option `--no-build` garantit que Docker Compose utilise les images disponibles au lieu de construire les images localement.

### Vérifier les conteneurs

```bash
docker compose ps
docker ps
docker compose logs --tail=100 backend frontend
```

### Arrêter les services

```bash
docker compose down
```

Pour télécharger les dernières images avant un nouveau déploiement :

```bash
docker compose pull
docker compose up -d --no-build
```

## 7. Vérification des API REST

Le backend expose les routes suivantes :

- `/api/garderie`
- `/api/services`
- `/api/activites`

Depuis la machine où les ports de la VM sont accessibles, exécuter :

```bash
curl -i http://192.168.122.105:4000/api/garderie
curl -i http://192.168.122.105:4000/api/services
curl -i http://192.168.122.105:4000/api/activites
```

Remplacer `192.168.122.105` par l'adresse réellement accessible depuis le poste client si nécessaire.

Chaque route doit retourner une réponse HTTP valide. En cas d'erreur, vérifier les logs du backend :

```bash
docker compose logs --tail=100 backend
```

## 8. Accès à l'application déployée

Lorsque les conteneurs sont démarrés et que le réseau est correctement configuré :

- **Frontend :** [http://192.168.122.105:3000](http://192.168.122.105:3000)
- **API backend :** `http://192.168.122.105:4000`

L'adresse `192.168.122.105` correspond à l'adresse de la machine Ubuntu hôte indiquée pendant les tests. L'accès depuis un autre ordinateur dépend de la configuration du réseau et des règles de pare-feu.

## 9. Dépannage

### Aucun conteneur en cours d'exécution

```bash
docker compose ps -a
docker compose up -d --no-build
```

### Image Docker introuvable

```bash
docker compose pull
docker images
```

Vérifier les noms des images dans `docker-compose.yml`.

### Frontend inaccessible

```bash
docker compose logs --tail=100 frontend
docker compose ps
```

Vérifier que le port 3000 est publié et accessible depuis la machine cliente.

### API inaccessible

```bash
docker compose logs --tail=100 backend
curl -i http://localhost:4000/api/garderie
```

Vérifier le port 4000, l'état du backend et les règles réseau entre les machines virtuelles.

---

**Projet :** Garderie DevOps  
**Dépôt GitHub :** [Sen-Se1/garderie-devops](https://github.com/Sen-Se1/garderie-devops)
