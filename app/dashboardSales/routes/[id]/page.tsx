import Header from "../../_components/Header";
import FormUpdateRoute from "./_components/FormUpdateRoute";
import TripsListR from "./_components/TripsListR";

export default function RoutePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <div className="flex flex-1 p-6 gap-6">
                <div className="w-1/3 min-w-[300px]">
                    <FormUpdateRoute />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <TripsListR />
                </div>
            </div>
        </div>
    );
}