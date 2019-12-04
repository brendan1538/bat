Bundle object format example:

teamName: {
  category: "bundles",
  name: "MyDomain",
  image: "/mydomain.png",
  description: "MyDomain default bundle",
  actions: [
    {
      type: "docker",
      name: "Pull up docker container",
      command: "docker-compose up",
      args: "mydomain",
      directory: "/Users/blaughlin/capvm/coldstone",
    },
    {
      type: "git",
      name: "Checkout git branch",
      command: "git",
      args: "mydomain",
      directory: "/Users/blaughlin/capvm/coldstone",
    }
  ]
}