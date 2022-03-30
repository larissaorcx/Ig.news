import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'
import {getPrismicClient} from  '../../services/prismic'

const posts = [{
    slug: 'my-new-post',
    title: 'My New Post',
    excerpt: 'post excerpt',
    updateAt: '30 de Março',
}]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
  })
  
  it('loads initial data', async () => { //página carregando os dados inicias
   const getPrismicClientMocked = mocked(getPrismicClient)

   getPrismicClientMocked.mockReturnValueOnce({
       query: jest.fn().mockResolvedValueOnce({
           results:[
               {
                   uid:'my-new-post',
                   data: {
                       
                        title: [
                            {type:'heading', text: 'My New Post'}
                        ],
                        content: [
                            {type:'paragraph', text: 'post excerpt'}
                        ]
                    },
                    last_publication_date: '2020-03-30',
                }
            ]
       })
   } as any)

    const response = await getStaticProps({
        previewData: undefined,
    })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My New Post',
            excerpt: 'post excerpt',
            updateAt: '30 de Março de 2021',
            }]
        }
      }) 
    )
  })
})