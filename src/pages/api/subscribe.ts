import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from '../../services/stripe';
import {query as q} from 'faunadb'
import { fauna } from "../../services/fauna";

type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_customer_id: string
    }
}

export default async function stripeConfig(req: NextApiRequest, res: NextApiResponse){
    console.log('hi')
    if(req.method == 'POST'){
        const session = await getSession({ req }) //metodo para retornar a sessão
        
        const user = await fauna.query<User>(
            q.Get(
                q.Match( //procura os indices que correspondem 
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        if(!customerId){
            
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email
                //metadata
            });
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id), // referencia do documento
                    { 
                        data:{
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )
            customerId = stripeCustomer.id
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId, 
            payment_method_types: ['card'], //métodos de pagamento aceitos
            billing_address_collection: 'required', //preenchimento do endereço obrigatório
            line_items: [ //item que terá dentro do carrinho
                { price: 'price_1Jq7oHDLqu4ndxXFQic3cfXJ', quantity: 1}
            ],
            mode: 'subscription', //pagamento recorrente
            allow_promotion_codes: true, //codigo promocional permitido
            success_url: process.env.STRIPE_SUCESS_URL, // redicionamento do usuário em caso de sucesso
            cancel_url: process.env.STRIPE_CANCEL_URL, //redicionamento do usuário ao cancelar a requisição
        })

        return res.status(200).json({sessionId: stripeCheckoutSession.id})
    } else{
        res.setHeader('Allow', 'POST') //metodo que a rota aceita será POST
        res.status(405).end('Method not allowed')
    }
}