import AuthButton from "./AuthButton";

export default function WelcomeMessage() {
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 bg-green-500">
            <div className="max-w-xl w-full text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                    Chihuahueños
                    <span className="text-green-800"> S.A. de C.V. </span>
                </h1>
                <p className="text-md md:text-lg">
                    Compra boletos para viajes entre multiples estados, todo lo que necesitas esta aquí!
                </p>

                <div className="mt-6">
                    <AuthButton />
                </div>
            </div>
        </div>
    );
}