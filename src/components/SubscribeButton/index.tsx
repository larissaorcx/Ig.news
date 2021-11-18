import { useSession, signIn } from 'next-auth/client'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import style from './style.module.scss'

interface SubscribeButtonProps{
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
    const [session] = useSession()

    async function handleSubscribe(){
        console.log("entrou no handle subscribe")
        if(!session){
            console.log("não tem sessão")
            signIn('github')
            return;
        }
        try{ 
            console.log("dentro do try")
            const response = await api.post('/subscribe')
            console.log("passou?")

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        }catch(err){
            alert(err.message);
        }
        
    } 

    return(
        <button type="button" className={style.SingInButtom} onClick={handleSubscribe}>
            Subscribe Now
        </button>
        
    )
}