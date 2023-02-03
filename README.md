digital ocean:
1) download doctl CLI from github (wget https://github.com/digitalocean/doctl/releases/download/v1.92.0/doctl-1.92.0-linux-amd64.tar.gz)
2) unpack `tar xf ./doctl-*.tar.gz`
3) move CLI to /usr/local/bin
4) create an auth token in digital ocean web interface and authenticate with doctl
5) connect with auth context
6) create a new namespace for a serverless function and connect to it
7) initialise a serverless function with `doctl serverless init --language js example-project`

serverless
1) .env .gitignore project.yml must be on top level
2) package.json must be in the function folder