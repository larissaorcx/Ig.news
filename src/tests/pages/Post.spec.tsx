import { render, screen } from '@testing-library/react'
import { getSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import {getPrismicClient} from  '../../services/prismic'

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post content<p>',
    excerpt: 'post excerpt',
    updateAt: '01 de Abril',
}

jest.mock('../../services/prismic')
jest.mock('next-auth/client')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  
  })
  
  it('redirects user if no subscription is found', async () => { //página carregando os dados inicias
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)
    
  });
  it('loads initial data', async () =>{
    const getSessionMocked = mocked(getSession)

    const getPrimiscClientMocked = mocked(getPrismicClient)
    getPrimiscClientMocked.mockResolvedValueOnce({
        getByUID: jest.fn().mockResolvedValueOnce({
            data: {
                title: [
                    {type:'heading', text: 'My New Post'}
                ],
                content: [
                    {type:'paragraph', text: 'post excerpt'}
                ]
            },
            last_publication_date: '04-01-2021'
        })
    }as any)

    getSessionMocked.mockResolvedValueOnce({
        activeSubscription: 'fake-active-subscription'
    } as any)

    const response = await getServerSideProps({ params: {slug: 'my-new-post'}} as any)

    expect(response).toEqual(
        expect.objectContaining({
            props: {
                posts: {
                    slug: 'my-new-post',
                    title: 'My New Post',
                    content: '<p>Post content<p>',
                    excerpt: 'post excerpt',
                    updateAt: '01 de Abril',
                  }
              }
        }) 
      )
  })
})