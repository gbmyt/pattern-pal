import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignInUrl="/pattern"
            redirectUrl="/pattern"
        />
    )
}

export default SignInPage
