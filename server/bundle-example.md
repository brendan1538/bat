Bundle object format example:

bundleName: {
  image: {URL},
  description: {STRING},
  actions: [
    {
      command: 'docker-compose up -d',
      args: 'netfirms',
      directory: '/Users/__USER__/capvm/coldstone'
    },
    {
      command: 'open',
      args: 'http://127.0.0.1:10045/',
      directory: '/Users/__USER__/capvm/coldstone'
    },
    ...
  ],
},