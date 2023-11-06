import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
            afterSignUpUrl="/pattern"
            redirectUrl="/pattern"
        />
    )
}

export default SignUpPage
