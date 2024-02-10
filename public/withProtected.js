// import { useRouter } from 'next/router'
// import { useUser } from '../../public/user'

// const withProtected = (Pages) => {
//     return (props) => {
//         const router = useRouter()
//         const user = useUser()
//         const { uid } = user

//         console.log({ uid })

//         if (!uid) {
//             router.push('/login')
//             return <></>
//         }

//         return <Pages {...props} />
//     }
// }
// export default withProtected