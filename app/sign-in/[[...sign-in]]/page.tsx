import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignInUrl="/editor"
            redirectUrl="/editor"
        />
    )
}

export default SignInPage
