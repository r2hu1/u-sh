import { currentUser } from "@clerk/nextjs/server"

export default async function IfLoggedInElse({ ifUser, ifNot }) {
    const user = await currentUser();
    return (
        <>
            {user ? (ifUser) : (ifNot)}
        </>
    )
}