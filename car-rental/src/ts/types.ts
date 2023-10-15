import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum Pages {
    AllCars = "AllCars",
    Home = "Home",
    License = "License",
    PaymentFirst = "PaymentFirst",
    PaymentSecond = "PaymentSecond",
    Profile = "Profile",
    Scan = "Scan",
    Splash = "Splash",
}

/**
 * Describes what each component, representing a page, requires as props.
 */
export type StackParamList = {
    //TS magic, dw about it
    [Pages.AllCars]: {cars: CarData[], setPopUp: (popUp: JSX.Element) => void};
    [Pages.Home]: {cars: CarData[], setPopUp: (popUp: JSX.Element) => void};
    [Pages.License]: {setPopUp: (popUp: JSX.Element) => void};
    [Pages.PaymentFirst]: {setPopUp: (popUp: JSX.Element) => void};
    [Pages.PaymentSecond]: {setPopUp: (popUp: JSX.Element) => void};
    [Pages.Profile]: {setPopUp: (popUp: JSX.Element) => void};
    [Pages.Scan]: {setPopUp: (popUp: JSX.Element) => void};
    [Pages.Splash]: {};
}

export type NavigationHook = StackNavigationProp<StackParamList, any, any>;
export type StackProps<T extends Pages> = StackScreenProps<StackParamList, T>;

export type CarData = {
    model: string;
    manufacturer: string;
    year: number;
    weightKg: number;
    dkkPrKm: number;
    dimensions: number[];
    lat: number;
    lon: number; 
    available: boolean;
    id: number;
}
export type LicenseLocal = {
    expirationDate: Date;
    creationDate: Date;
    surname: string;
    name: string;
    nationality: string;
    socialSecurityNumber: string;
    licenseId: string;
    userId: number;
    pictureUrl: string;
}

export type User = {
    id: number;
    licenseId: number;
    username: string;
    passwordHash: string;
    consentsToToS: boolean;
    recievesNewsletter: boolean;
    homeAddr: string;
}

export type Invoice = {
    orderNr: number;
    carId: number;
    userId: number;
    kmTraveled: number;
    destinationAddr: string;
    originAddr: string;
    date: Date;
    total: number;
    paymentMethod: "paypal" | "creditcard" | "mobilepay";
    /** 
     * For paypal: The mail connected to the paypal account.
     * For creditcard: The last 4 digits of the credit card number.
     * For mobilepay: The phone number connected to the mobilepay account.
     */
    methodIdentifier: string;
}