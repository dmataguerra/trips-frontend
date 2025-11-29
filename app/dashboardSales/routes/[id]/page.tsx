import Header from "../../_components/Header";
import FormUpdateRoute from "./_components/FormUpdateRoute";

export default function RoutePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <div className="flex flex-1 p-6 gap-6">
                <div className="flex-1">
                    <FormUpdateRoute />
                </div>
            </div>
        </div>
    );
}