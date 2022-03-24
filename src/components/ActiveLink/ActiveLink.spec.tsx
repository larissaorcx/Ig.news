import { render, screen } from '@testing-library/react'
import { ActiveLink } from './index'

jest.mock('next/router', () => {
    return{
        useRouter() {
            return{
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {
    it('renders correctly', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('add active class if the link currently active', () => { 
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(getByText('Home')).toHaveClass('active')
    })
})