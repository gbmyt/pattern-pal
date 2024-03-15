import { UserProfile } from "@clerk/nextjs"

const UserProfilePage = () => <UserProfile path="/account" routing="path" />

export default UserProfilePage
