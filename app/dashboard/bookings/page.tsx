import Header from "../_components/Header";
import BookingsList from "./_components/BookingsList";

export default function BookingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <div className="flex-1 p-6">
                <BookingsList />
            </div>
        </div>
    );
}