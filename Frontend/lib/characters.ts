// lib/characters.ts

export interface SubCharacter {
  name: string
  slug: string
  image: string // path from /public
}

export interface CharacterCategory {
  name: string
  slug: string
  category: string
  image: string           // cover image for homepage card
  size: 'large' | 'small'
  characters: SubCharacter[]
}

export const CHARACTERS: CharacterCategory[] = [
  {
    name: 'Marvel',
    slug: 'marvel',
    category: 'Marvel Universe',
    image: '/marvel/marvel-heroes.png',
    size: 'large',
    characters: [
      { name: 'Deadpool',   slug: 'deadpool',   image: '/marvel/deadpool.png'   },
      { name: 'Dr. Doom',   slug: 'drdoom',     image: '/marvel/drdoom.png'     },
      { name: 'Dr. Strange',slug: 'drstrange',  image: '/marvel/drstrange.png'  },
      { name: 'Hulk',       slug: 'hulk',       image: '/marvel/hulk.png'       },
      { name: 'Spider-Man', slug: 'spiderman',  image: '/marvel/spiderman.png'  },
    ],
  },
  {
    name: 'DC',
    slug: 'dc',
    category: 'DC Universe',
    image: '/dc/batman.png',
    size: 'small',
    characters: [
      { name: 'Batman',   slug: 'batman',   image: '/dc/batman.png'   },
      { name: 'Joker',    slug: 'joker',    image: '/dc/joker.png'    },
      { name: 'Superman', slug: 'superman', image: '/dc/superman.png' },
    ],
  },
  {
    name: 'Anime',
    slug: 'anime',
    category: 'Anime World',
    image: '/anime/naruto.png',
    size: 'large',
    characters: [
      { name: 'Dragon Ball', slug: 'dragon-ball', image: '/anime/dragon-ball.png' },
      { name: 'Goku',        slug: 'goku',        image: '/anime/goku.png'        },
      { name: 'Naruto',      slug: 'naruto',      image: '/anime/naruto.png'      },
    ],
  },
]