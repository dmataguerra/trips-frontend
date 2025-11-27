export interface User {
    userId: string,
    userName: string,
    userEmail: string,
    userPassword: string,
    userDocument?: string,
    userVerified: boolean,
    bookings?: string[];
    // bookings?: Booking[];
}

export interface Route {
	routeId: string,
	routeOrigin: string,
	routeDestination: string,
	image?: string,
	trips: string[];
	// trips: Trip[];
}

export interface Bus {
	busId: string,
	busName: string,
	seats: string[],
	trips: string[];
	// seats: Busseat[],
	// trips: Trip[];
}

export interface Busseat {
	busSeatId: string,
	busId: string,
	seatNumber: string,
	bus: string,
	tripSeats: string[];
	// bus: Bus,
	// tripSeats: Tripseat[];
}

export interface Trip {
	tripId: string,
	routeId: string,
	busId: string,
	tripDate: Date,
	tripTime: string,
	tripPrice: number,
	route: string,
	bus: string,
	tripSeats: string[];
	// route: Route,
	// bus: Bus,
	// tripSeats: Tripseat[];
}

export interface Tripseat {
	tripSeatId: string,
	tripId: string,
	busSeatId: string,
	status: string,
	// status: TripSeatStatus,
	reservedAt?: Date,
	reservedBy?: string,
	trip: string,
	busSeat: string,
	bookings: string[];
	// reservedBy?: User,
	// trip: Trip,
	// busSeat: Busseat,
	// bookings: Booking[];
}

export interface Booking {
	bookingId: string,
	tripSeatId: string,
	userId: string,
	tripSeat: string,
	user: string;
	// tripSeat: Tripseat,
	// user: User;
}
