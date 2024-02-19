import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignUpUrl="/editor"
            redirectUrl="/editor"
        />
    )
}

export default SignUpPage
