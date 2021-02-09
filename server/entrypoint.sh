#!/usr/bin/env bash
# placeholder entrypoint for pre-start setup
set -x

# run migrations
printf "%s\n" "Running migrations..."
if [[ -z $WAIT_FOR ]]; then
    npm run migrate up
else
    # defined in docker-compose environment block
    wait-for-it.sh $WAIT_FOR -t 10 -s -- npm run migrate up
fi

# exec Dockerfile CMD
exec "$@"
