import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignInUrl="/dashboard" // if changing these does not work, refer to local env and update redirect routes there
            redirectUrl="/dashboard"
        />
    )
}

export default SignInPage
