# Git PR conventions:

PR structure: ```<type>(<scope>): <description>```
ie. ```git commit -am 'feat(BE): Add Basic structure for Backend.'```

## Valid types:

1. feat: Introduces a new feature to the codebase.
2. fix: Fixes a bug in your codebase.
3. chore: updating grunt tasks etc; no production code change.
4. refactor: A code change that neither fixes a bug or adds a feature.

# docker-compose for code dockerization.

This application run over dockerization.
1. docker-compose up --build : In case there's any chage applied to the docker-compose file.
2. docker-compose build --no-cache: run docker compose to clear cache.
3. docker-compose down -v: remove existing volumes.

# Code Structure: (MVC)

# Backend:
## src/
- database : knex configuration file, migrations and seeds.
- controllers: main logic to make request to the services sending the information that its expected by the service.
- services: additional functionality that process the data sent by the controller and process it so it can be used by the models.
- models: functionality that interact directly with the DB.
- routes: react-router routes (private / public)
- types: typescript interfaces/ types.
- utils: other utility functions.

# Frontend:
## src/
- components: Reusable components of the UI, further divided into:
  - atoms: Smallest possible components or elements on the page.
  - layouts: Components that deal with the layout of the page.
  - molecules: Groups of atoms bonded together and are the smallest fundamental units of a compound.
  - organisms: Groups of molecules joined together to form a relatively complex, distinct section of an interface.
- contexts: React contexts for managing state globally across components.
- helpers: Utility functions to support various tasks across the application.
- hooks: Custom React hooks that encapsulate common logic for reuse in functional components.
- interfaces: TypeScript interfaces/types for strong typing of props, state, and other objects.
- routes: Definition of react-router routes, likely differentiating between private and public routes.
- services: Services for handling external communication, like API calls.
- views: The actual rendered pages or screens of the application.

# Arquitecture

- Frontend -> React on the frontend following an atomic design pattern, 
- Backend -> Model View Controller pattern with connection to psql with Knex.
- Dockerization -> The application follows dockerization patterns to have a more scalable application, and to repare for a posible deployment to production.
