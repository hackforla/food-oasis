# Running a Fullstack Docker Container

You may build and run a fullstack docker container to your local docker engine on
your development machine. This allows you to test the application in an environment that most closely mimcs the deployment environment prior to committing
code to the GitHub repo and deploying to a live production environment. In particular, you can resolve issues with client-server interaction, routing, etc.,
and be sure that you are exercising the exact npm modules that will run in
the deployment environment.

## Build a Full-Stack Container

To build a fullstack container:

```
docker build -t fola .
```

This will use the contents of Dockerfile to build a docker image that includes both the web api express server, as well as the compiled static pages that comprise
the react client code.

You can see that the image has been built by running

```
docker image ls
```

There should be an image named `fola`.

## Run the Full-Stack Container

You can run this this container using the environment variables from the server/.env file.
First make sure the correct database connection information is uncommented in the server/.env file.  
If you are using the connection information for a remote database (not localhost),
the command to run is:

```
docker run -p 5001:5000 --env-file server/.env  fola
```

If you want to use a Postgres database on your own machine, the docker container
running the web app requires you to overwrite the POSTGRES_HOST setting with
a special syntax that allows the container to reference the localhost server:

```
docker run -p 5001:5000 \
 --env-file server/.env -e "POSTGRES_HOST=host.docker.internal" fola
```

When the container is run with either of the above commands, the terminal will show
any output from the server in the terminal window, and the docker container will stop if you close the terminal or stop it by typing Ctrl-C. You may alternatively
run the container in a detached mode by adding the `-d` option after `run`. Then the application will run silently in the detached mode, and you will need to manipulate it with standard docker commands to stop, remove, start or view logs
from the container.
