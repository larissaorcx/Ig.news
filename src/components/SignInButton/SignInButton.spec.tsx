import { render, screen } from '@testing-library/react'
import {mocked} from 'jest-mock'
import {useSession} from 'next-auth/client'
import { SingInButton } from './index'

jest.mock('next-auth/client')

describe('SingInButton component', () => {
    it('renders correctly when user is not authentication', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])
        render(
            <SingInButton />
        )
    
        expect(screen.getByText('Sign In With Github')).toBeInTheDocument()

    })

    it('renders correctly when user is authentication', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            {user: {
                name: 'John Doe',
                email: 'John.doe@example.com',
            }, expires: 'fake-expires'},
            false]
            )
        render(
            <SingInButton />
        )
    
        expect(screen.getByText('John Doe')).toBeInTheDocument()

    })
})