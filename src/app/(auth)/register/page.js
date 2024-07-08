import Signup from '@/app/ui/signup';
// import {useState} from 'react'

//   const [vote, setVote] = useState("")
//   const [votes, setVotes] =useState([])
export default function RootLayout({ children }) {
    

    return (
        
        <section className="text-black">
            <Signup />
        </section>
    );
}
