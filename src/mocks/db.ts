import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'
import { IBook } from '../models/IBook'

const Books: IBook[] = [
  {
    name: '1984',
    id: '451524934',
    price: '328',
    category: 'Fantastic',
    description:
      'Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thought crimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...\n\nA startling and haunting vision of the world, 1984 is so powerful that it is completely convincing from start to finish. No one can deny the influence of this novel, its hold on the imaginations of multiple generations of readers, or the resiliency of its admonitions—a legacy that seems only to grow with the passage of time.',
  },
  {
    name: 'A Bear Called Paddington',
    id: '62312189',
    price: '176',
    category: 'Fantastic',
    description:
      'Paddington Bear had just traveled all the way from Peru when the Brown family first met him in Paddington Station. Since then, their lives have never been quite the same . . . for ordinary things become extraordinary when Paddington is involved.',
  },
  {
    name: 'A Brief History of Time',
    id: '553380168',
    price: '212',
    category: 'History',
    description:
      'Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and “arrows of time,” of the big bang and a bigger God—where the possibilities are wondrous and unexpected. With exciting images and profound imagination, Stephen Hawking brings us closer to the ultimate secrets at the very heart of creation.',
  },
  {
    name: 'Animal Farm',
    id: '451526341',
    price: '140',
    category: 'Nature',
    description:
      'A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned—a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible.',
  },
  {
    name: 'Anna Karenina',
    id: '1853262714',
    price: '848',
    category: 'History',
    description:
      'A famous legend surrounding the creation of Anna Karenina tells us that Tolstoy began writing a cautionary tale about adultery and ended up by falling in love with his magnificent heroine. It is rare to find a reader of the book who doesn\'t experience the same kind of emotional upheaval: Anna Karenina is filled with major and minor characters who exist in their own right and fully embody their mid-nineteenth-century Russian milieu, but it still belongs entirely to the woman whose name it bears, whose portrait is one of the truest ever made by a writer.',
  },
  {
    name: 'Don Quixote',
    id: '142437239',
    price: '1072',
    category: 'Classics',
    description:
      'Don Quixote has become so entranced reading tales of chivalry that he decides to turn knight errant himself. In the company of his faithful squire, Sancho Panza, these exploits blossom in all sorts of wonderful ways. While Quixote\'s fancy often leads him astray—he tilts at windmills, imagining them to be giants—Sancho acquires cunning and a certain sagacity. Sane madman and wise fool, they roam the world together-and together they have haunted readers\' imaginations for nearly four hundred years.',
  },
]

const db = factory({
  book: {
    id: primaryKey(String),
    name: String,
    price: String,
    category: String,
    description: String,
  },
})

Books.map(({ name, price, category, description }) => {
  db.book.create({ id: nanoid(), name, price, category, description })
})

export const handlers = [
  rest.post('/books', async (req, res, ctx) => {
    const { name, price, category, description } = req.body as Partial<IBook>

    const book = db.book.create({
      id: nanoid(),
      name,
      price,
      category,
      description,
    })

    return res(ctx.json(book), ctx.delay(300))
  }),
  rest.put('/books/:id', (req, res, ctx) => {
    const { name, price, category, description } = req.body as Partial<IBook>

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const book = db.book.update({
      where: {
        id: {
          equals: id,
        },
      },
      data: { name, price, category, description },
    })

    return res(ctx.json(book), ctx.delay(300))
  }),
  ...db.book.toHandlers('rest'),
] as const
