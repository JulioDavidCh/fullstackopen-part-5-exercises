let blogs = [
  {
    title: 'mamas qk?',
    author: 'nanone',
    url: 'www.mamaqk.com',
    likes: 10,
    user: {
      username: 'gafo1',
      name: 'nanone',
      id: '5e04e15c151b631f5c813977'
    },
    id: '5e07b542206b691f249f1068'
  },
  {
    title: 'soy frances',
    author: 'miranda',
    url: 'www.larping.com',
    likes: 5,
    user: {
      username: 'gafo2',
      name: 'miranda',
      id: '5e04e15c151b631f5c813978'
    },
    id: '5e07b542206b691f249f1069'
  },
  {
    title: 'pizza es mejor que hallaca',
    author: 'shauna',
    url: 'www.shauna.com',
    likes: 0,
    user: {
      username: 'gafo3',
      name: 'shauna',
      id: '5e04e15c151b631f5c813979'
    },
    id: '5e07b542206b691f249f1070'
  }
]

const getAll = () => Promise.resolve(blogs)

export default { getAll }