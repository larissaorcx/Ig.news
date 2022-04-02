import { render, screen, fireEvent } from '@testing-library/react'
import {mocked} from 'jest-mock'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import { SubscribeButton } from './index'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component', () => {
    it('renders correctly when user is not authentication', () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])
        render(
            <SubscribeButton />
        )
    
        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()

    })

    it('redirects user sign in when not authentication', () =>{
        const signInMocked = mocked(signIn)
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription ', () => {
        const useRouterMocked = jest.mocked(useRouter)
        const useSessionMocked = jest.mocked(useSession)
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce([
        { 
            user: { 
                name: 'John Doe', 
                email: 'john.doe@example.com'
            },
            activeSubscription: 'fake-active-subscription', 
            expires: 'fake-expires'
        }, 
        false
        ])

        useRouterMocked.mockReturnValueOnce({
        push: pushMock
        } as any)
        
        render(<SubscribeButton />)
    
        const subscribeButton = screen.getByText('Subscribe Now')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalledWith('/posts')
        })

})