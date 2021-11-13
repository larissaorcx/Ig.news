import { useSession, signIn } from 'next-auth/client'
import style from './style.module.scss'

interface SubscribeButtonProps{
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
    const [session] = useSession()

    function handleSubscribe(){
        if(!session){
            signIn('github')
            return;
        }
    }

    return(
        <button type="button" className={style.SingInButtom} onClick={handleSubscribe}>
            Subscribe Now
        </button>
        
    )
}