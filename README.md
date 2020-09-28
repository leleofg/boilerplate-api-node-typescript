## Boilerplate API with Node.js, Typescript, Typeorm, Postgres and tests running on Docker

**What need to do**
---

- [ ] ElasticSearch
- [ ] Kibana
- [x] ~~Docker~~
- [x] ~~Sentry~~ 
- [x] ~~Actions~~

**Configuration**
---

* Create .env file based on .env.example

**Installation**
---
`Opening in VSCODE Editor and click in reopen in Container`

> for use it requires the [devcontainer](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) plugin and [Docker](https://docker.com/) to be installed.

**Running app in dev**
---
`$ npm run dev`

**Running tests**
---
`$ npm test`

**Check lint**
---
`$ npm run lint`

**Check Prettier**
---
`$ npm run prettier`

**Creating migration**
---
`$ npm run migration:generate nameMigration`

**Running migrations**
---
`$ npm run migration:run`
