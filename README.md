<h1 align="center">Serving a react app with a flask server</h1>

## Project overview

This project shows how to serve a simple react application created by `create-react-app` with a flask server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the following tools available on your machine;

- [Git](https://git-scm.com/) A distributed version control system
- [Python](https://www.python.org/) A general purpose programming language
- [node](https://nodejs.org/en/) A JavaScript runtime
- A tool to create isolated Python environments preferably [Virtualenv](https://virtualenv.pypa.io/en/stable/)
- [Pip](https://pypi.org/project/pip/) A tool for installing python packages
- [create-react-app](https://create-react-app.dev/) A supported way of creating single-page React applications
- [yarn](https://www.npmjs.com/package/yarn) A package manager for javascript

### Installing

While in your preferred terminal;

Start by cloning the repository to your local machine

```bash
git clone https://github.com/googleinterns/step82-2020.git

cd step82-2020
```

Make and activate a python virtual environment using `virtualenv`

```bash
virtualenv venv (alternatively: pyhton3 -m venv venv)

source venv/bin/activate
```

With the virtual environment activated, install the project dependencies for the flask server

```bash
pip3 install -r requirements.txt
```

```bash
cd react-app/
```

```bash
yarn install
```

## Serving the application

You can start a local server by opening two terminals and running

```bash
cd react-app
npm run start
```

```bash
cd flask-server
python3 main.py
```

visit http://127.0.0.1:3000/ to view your application.

## Build the application for production
You can start a local server by opening two terminals and running

```bash
cd react-app
npm run build
cd ../flask-server
python3 main.py
```
visit http://127.0.0.1:5000/ to view your application.

## Built With

- [Flask](http://flask.palletsprojects.com/en/1.1.x/) - A python web framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Authors

See also the list of [contributors](https://github.com/learningdollars/sushan-reactapp-flask/graphs/contributors) who participated in this project.
