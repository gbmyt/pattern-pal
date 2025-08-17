import Redirect from "@/components/Redirect";
import { createNewUser } from "@/lib/actions";

export default async function NewUser() {
    await createNewUser()
    return <Redirect />
}