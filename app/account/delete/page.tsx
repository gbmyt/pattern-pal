import { deleteUser } from "@/lib/actions"

const DeleteUser = async () => {
    await deleteUser()

    return <>Deleted your account</>
}

export default DeleteUser
