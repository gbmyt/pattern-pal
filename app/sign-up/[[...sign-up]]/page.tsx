import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignUpUrl="/editor" // if changing these does not work, refer to local env and update redirect routes there
            redirectUrl="/editor"
        />
    )
}

export default SignUpPage
