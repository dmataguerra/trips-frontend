import Header from "./_components/Header";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col bg-gradient-to-r from-white to-gradient_max">
            <Header />
            <div className="flex justify-center items-center w-full h-full">
                {children}
            </div>
        </div>
    )
}

// className="bg-gradient-to-r from-white to-gradient_max min-h-screen flex items-center"