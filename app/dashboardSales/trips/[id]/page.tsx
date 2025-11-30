import Footer from "../../_components/Footer";
import Header from "../../_components/Header";
import FormUpdateTrip from "./_components/FormUpdateTrip";

export default function TripPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <div className="flex flex-1 p-6 gap-6">
                <div className="flex-1">
                    <FormUpdateTrip />
                </div>
            </div>
            <Footer/>
        </div>
    );
}