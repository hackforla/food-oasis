# How to deploy docker container to Heroku

references:

- [Container Registry & Runtime (Docker Deploys)](https://devcenter.heroku.com/articles/container-registry-and-runtime)

Pre-requisite: [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

```
heroku login
```

This will open a browser window for you to login to heroku. Then you return to the terminal.

```
heroku container:login
```

Note: I have already run `heroku create` to create a new Heroku application and
named this application 'foodoasisnet', so the url will be foodoasisnet.herokuapp.com

Now build the docker image on your local machine, naming it `fola`.

```

docker build -t fola -f Dockerfile-fullstack .
```

Wait for image to build

```
docker tag fola registry.heroku.com/foodoasisnet/web

docker push registry.heroku.com/foodoasisnet/web

heroku container:release web --app foodoasisnet
```

Note that the container requires environment variables to be set up for the application. This is easiest to do from the Heroku UI under the Settings tab.
