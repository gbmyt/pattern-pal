import { createNewUser } from "@/lib/actions"

const NewUser = async () => {
    await createNewUser()
    return <></>
}

export default NewUser
