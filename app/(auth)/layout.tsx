import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-white to-gradient_max">
                <Header />
                <div className="flex justify-center items-center w-full flex-1 py-40">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}
