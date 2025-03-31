import { createNewUser } from "@/lib/actions"

// this is called to create a new db user on our end after the Clerk user is created via the SignUpButton.
// the redirect endpoint is set in the env file with NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
const NewUser = async () => {
    await createNewUser()
    return <></>
}

export default NewUser
