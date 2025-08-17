import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "m-auto",
                },
            }}
        />
    )
}

export default SignUpPage
