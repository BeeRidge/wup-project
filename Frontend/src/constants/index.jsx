import {
    ChartColumn,
    Home,
    NotepadText,
    Package,
    PackagePlus,
    Settings,
    ShoppingBag,
    UserCheck,
    UserPlus,
    Users,
    CheckCircle,
    AlertTriangle,
    XCircle,
} from "lucide-react";

import ProfileImage from "@/assets/no-profile.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/Dashboard",
            },

            {
                label: "Reports",
                icon: NotepadText,
                path: "/reports",
            },
        ],
    },
    {
        title: "Membership",
        links: [
            {
                label: "Membership",
                icon: Users,
                path: "/Membership",
            },
            /* {
                label: "First Tranches",
                icon: UserPlus,
                path: "/First-Tranches",
            },
            {
                label: "Second Tranches",
                icon: UserCheck,
                path: "/Second-Tranches",
            }, */
        ],
    },

    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/settings",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const latestMember = [
    {
        id: 1,
        Pin: 101,
        LastName: "Delacruz",
        FirstName: "Juan",
        MiddleName: "Santos",
        Suffix: "Jr.",
        Sex: "Male",
        MemberType: "Regular",
        ContactNo: "09123456789",
        RegistrationDate: "2024-01-15",
        EffectivePeriod: "2024-01-15 to 2025-01-15",
    },

    {
        id: 11,
        Pin: 110,
        LastName: "Lopez",
        FirstName: "Isabella",
        MiddleName: "Martinez",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09912345678",
        RegistrationDate: "2024-10-20",
        EffectivePeriod: "2024-10-20 to 2025-10-20",
    },

    {
        id: 2,
        Pin: 102,
        LastName: "Reyes",
        FirstName: "Maria",
        MiddleName: "Lopez",
        Suffix: "",
        Sex: "Female",
        MemberType: "Premium",
        ContactNo: "09234567890",
        RegistrationDate: "2024-02-10",
        EffectivePeriod: "2024-02-10 to 2025-02-10",
    },
    {
        id: 3,
        Pin: 103,
        LastName: "Cruz",
        FirstName: "Carlos",
        MiddleName: "Torres",
        Suffix: "Sr.",
        Sex: "Male",
        MemberType: "Regular",
        ContactNo: "09345678901",
        RegistrationDate: "2024-03-05",
        EffectivePeriod: "2024-03-05 to 2025-03-05",
    },
    {
        id: 4,
        Pin: 104,
        LastName: "Fernandez",
        FirstName: "Ana",
        MiddleName: "Garcia",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09456789012",
        RegistrationDate: "2024-04-20",
        EffectivePeriod: "2024-04-20 to 2025-04-20",
    },
    {
        id: 5,
        Pin: 105,
        LastName: "Gonzales",
        FirstName: "Pedro",
        MiddleName: "Ramos",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09567890123",
        RegistrationDate: "2024-05-15",
        EffectivePeriod: "2024-05-15 to 2025-05-15",
    },
    {
        id: 6,
        Pin: 106,
        LastName: "Santos",
        FirstName: "Julia",
        MiddleName: "Mendoza",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09678901234",
        RegistrationDate: "2024-06-10",
        EffectivePeriod: "2024-06-10 to 2025-06-10",
    },
    {
        id: 7,
        Pin: 107,
        LastName: "Torres",
        FirstName: "Miguel",
        MiddleName: "Dela Rosa",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09789012345",
        RegistrationDate: "2024-07-01",
        EffectivePeriod: "2024-07-01 to 2025-07-01",
    },
    {
        id: 8,
        Pin: 108,
        LastName: "Villanueva",
        FirstName: "Sophia",
        MiddleName: "Aquino",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09890123456",
        RegistrationDate: "2024-08-05",
        EffectivePeriod: "2024-08-05 to 2025-08-05",
    },
    {
        id: 9,
        Pin: 109,
        LastName: "Tan",
        FirstName: "Gabriel",
        MiddleName: "Castillo",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09901234567",
        RegistrationDate: "2024-09-12",
        EffectivePeriod: "2024-09-12 to 2025-09-12",
    },
    {
        id: 10,
        Pin: 110,
        LastName: "Lopez",
        FirstName: "Isabella",
        MiddleName: "Martinez",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09912345678",
        RegistrationDate: "2024-10-20",
        EffectivePeriod: "2024-10-20 to 2025-10-20",
    },
];

export const membershipData = [
    {
        id: 1,
        Pin: 101,
        LastName: "Delacruz",
        FirstName: "Juan",
        MiddleName: "Santos",
        Suffix: "Jr.",
        Sex: "Male",
        MemberType: "Regular",
        ContactNo: "09123456789",
        RegistrationDate: "2024-01-15",
        EffectivePeriod: "2024-01-15 to 2025-01-15",
        batch: "First Tranche"
    },
    {
        id: 2,
        Pin: 102,
        LastName: "Reyes",
        FirstName: "Maria",
        MiddleName: "Lopez",
        Suffix: "",
        Sex: "Female",
        MemberType: "Premium",
        ContactNo: "09234567890",
        RegistrationDate: "2024-02-10",
        EffectivePeriod: "2024-02-10 to 2025-02-10",
        batch: "First Tranche"
    },
    {
        id: 3,
        Pin: 103,
        LastName: "Cruz",
        FirstName: "Carlos",
        MiddleName: "Torres",
        Suffix: "Sr.",
        Sex: "Male",
        MemberType: "Regular",
        ContactNo: "09345678901",
        RegistrationDate: "2024-03-05",
        EffectivePeriod: "2024-03-05 to 2025-03-05",
        batch: "First Tranche"
    },
    {
        id: 4,
        Pin: 104,
        LastName: "Fernandez",
        FirstName: "Ana",
        MiddleName: "Garcia",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09456789012",
        RegistrationDate: "2024-04-20",
        EffectivePeriod: "2024-04-20 to 2025-04-20",
        batch: "Second Tranche"
    },
    {
        id: 5,
        Pin: 105,
        LastName: "Gonzales",
        FirstName: "Pedro",
        MiddleName: "Ramos",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09567890123",
        RegistrationDate: "2024-05-15",
        EffectivePeriod: "2024-05-15 to 2025-05-15",
        batch: "Second Tranche"
    },
    {
        id: 6,
        Pin: 106,
        LastName: "Santos",
        FirstName: "Julia",
        MiddleName: "Mendoza",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09678901234",
        RegistrationDate: "2024-06-10",
        EffectivePeriod: "2024-06-10 to 2025-06-10",
        batch: "Second Tranche"
    },
    {
        id: 7,
        Pin: 107,
        LastName: "Torres",
        FirstName: "Miguel",
        MiddleName: "Dela Rosa",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09789012345",
        RegistrationDate: "2024-07-01",
        EffectivePeriod: "2024-07-01 to 2025-07-01",
        batch: "First Tranche"
    },
    {
        id: 8,
        Pin: 108,
        LastName: "Villanueva",
        FirstName: "Sophia",
        MiddleName: "Aquino",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09890123456",
        RegistrationDate: "2024-08-05",
        EffectivePeriod: "2024-08-05 to 2025-08-05",
        batch: "Latest Member"
    },
    {
        id: 9,
        Pin: 109,
        LastName: "Tan",
        FirstName: "Gabriel",
        MiddleName: "Castillo",
        Suffix: "",
        Sex: "Male",
        MemberType: "Premium",
        ContactNo: "09901234567",
        RegistrationDate: "2024-09-12",
        EffectivePeriod: "2024-09-12 to 2025-09-12",
        batch: "Latest Member"
    },
    {
        id: 10,
        Pin: 110,
        LastName: "Lopez",
        FirstName: "Isabella",
        MiddleName: "Martinez",
        Suffix: "",
        Sex: "Female",
        MemberType: "Regular",
        ContactNo: "09912345678",
        RegistrationDate: "2024-10-20",
        EffectivePeriod: "2024-10-20 to 2025-10-20",
        batch: "Latest Member"

    },
];

export const eKonsultaData = {
    totalMembers: 1050,
    firstTranche: 320,
    secondTranche: 280,
    consultationMembers: 450,
    patientSatisfaction: 88,
};

export const staticChartData = [
    { name: "Jan", consultations: 40 },
    { name: "Feb", consultations: 55 },
    { name: "Mar", consultations: 35 },
    { name: "Apr", consultations: 70 },
    { name: "May", consultations: 65 },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        price: 99.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 2,
        name: "Smartphone",
        image: ProductImage,
        description: "Latest 5G smartphone with excellent camera features.",
        price: 799.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 3,
        name: "Gaming Laptop",
        image: ProductImage,
        description: "Powerful gaming laptop with high-end graphics.",
        price: 1299.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 4,
        name: "Smartwatch",
        image: ProductImage,
        description: "Stylish smartwatch with fitness tracking features.",
        price: 199.99,
        status: "Out of Stock",
        rating: 4.4,
    },
    {
        number: 5,
        name: "Bluetooth Speaker",
        image: ProductImage,
        description: "Portable Bluetooth speaker with deep bass sound.",
        price: 59.99,
        status: "In Stock",
        rating: 4.3,
    },
    {
        number: 6,
        name: "4K Monitor",
        image: ProductImage,
        description: "Ultra HD 4K monitor with stunning color accuracy.",
        price: 399.99,
        status: "In Stock",
        rating: 4.6,
    },
    {
        number: 7,
        name: "Mechanical Keyboard",
        image: ProductImage,
        description: "Mechanical keyboard with customizable RGB lighting.",
        price: 89.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 8,
        name: "Wireless Mouse",
        image: ProductImage,
        description: "Ergonomic wireless mouse with precision tracking.",
        price: 49.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 9,
        name: "Action Camera",
        image: ProductImage,
        description: "Waterproof action camera with 4K video recording.",
        price: 249.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 10,
        name: "External Hard Drive",
        image: ProductImage,
        description: "Portable 2TB external hard drive for data storage.",
        price: 79.99,
        status: "Out of Stock",
        rating: 4.5,
    },
];

export const consultationTrends = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 98 },
    { month: "Mar", count: 150 },
    { month: "Apr", count: 130 },
    { month: "May", count: 170 },
    { month: "Jun", count: 140 },
    { month: "Jul", count: 180 },
    { month: "Aug", count: 160 },
    { month: "Sep", count: 190 },
    { month: "Oct", count: 210 },
    { month: "Nov", count: 175 },
    { month: "Dec", count: 200 },
];

export const diagnosedConditions = [
    { name: "Hypertension", count: 120 },
    { name: "Diabetes", count: 90 },
    { name: "Respiratory Infections", count: 75 },
    { name: "Heart Disease", count: 60 },
    { name: "Gastrointestinal Disorders", count: 50 },
];

export const satisfactionData = [
    { name: "Satisfied", value: eKonsultaData.patientSatisfaction },
    { name: "Remaining", value: 100 - eKonsultaData.patientSatisfaction },
];

export const COLORS = ["#9333ea", "#e5e7eb"];

export const activeConsultationsData = [
    { id: 1, count: 18 },
    { id: 2, count: 25 },
    { id: 3, count: 12 },
];

export const DashboardDropdown = [
    { id: 1, name: "TimeFrame", options: ["Last 7 days", "This Month", "This Year", "Custom"] },
    { id: 2, name: "Hospital", options: ["Option A", "Option B", "Option C"] },
    { id: 3, name: "None", options: ["Option X", "Option Y", "Option Z"] }

]

export const checkupHistoryData = {
    "10001": [
        { date: "2024-03-05", findings: "Abdominal Pain", doctor: "Dr. Smith", status: "Completed" },
        { date: "2024-02-15", findings: "Mild Fever", doctor: "Dr. Johnson", status: "Pending" },
    ],
    "10002": [
        { date: "2024-03-10", findings: "Migraine", doctor: "Dr. Brown", status: "Completed" },
        { date: "2024-02-20", findings: "Blurred Vision", doctor: "Dr. Davis", status: "Pending" },
    ],
    "10003": [
        { date: "2024-03-07", findings: "Chest Pain", doctor: "Dr. Adams", status: "Completed" },
        { date: "2024-02-28", findings: "Shortness of Breath", doctor: "Dr. Taylor", status: "Completed" },
    ],
    "10004": [
        { date: "2024-02-25", findings: "Cough & Cold", doctor: "Dr. Lee", status: "Pending" },
        { date: "2024-01-30", findings: "Sore Throat", doctor: "Dr. White", status: "Completed" },
    ],
    "10005": [
        { date: "2024-03-01", findings: "Back Pain", doctor: "Dr. Wilson", status: "Completed" },
        { date: "2024-02-10", findings: "Muscle Strain", doctor: "Dr. Harris", status: "Pending" },
    ],
    "10006": [
        { date: "2024-03-08", findings: "Sprained Ankle", doctor: "Dr. Thomas", status: "Completed" },
        { date: "2024-02-14", findings: "Swelling in Knee", doctor: "Dr. Martinez", status: "Pending" },
    ],
    "10007": [
        { date: "2024-03-03", findings: "Skin Rash", doctor: "Dr. Robinson", status: "Completed" },
        { date: "2024-02-22", findings: "Allergic Reaction", doctor: "Dr. Clark", status: "Completed" },
    ],
    "10008": [
        { date: "2024-02-28", findings: "High Blood Pressure", doctor: "Dr. Rodriguez", status: "Pending" },
        { date: "2024-01-25", findings: "Dizziness", doctor: "Dr. Lewis", status: "Completed" },
    ],
    "10009": [
        { date: "2024-03-04", findings: "Ear Infection", doctor: "Dr. Walker", status: "Completed" },
        { date: "2024-02-19", findings: "Hearing Loss", doctor: "Dr. Allen", status: "Pending" },
    ],
    "10010": [
        { date: "2024-02-27", findings: "Toothache", doctor: "Dr. Young", status: "Completed" },
        { date: "2024-01-20", findings: "Gum Inflammation", doctor: "Dr. King", status: "Completed" },
    ],
};

export const selectedPatient = [
    { pin: "10001", name: "John Doe" },
    { pin: "10002", name: "Jane Smith" },
    { pin: "10003", name: "Michael Johnson" },
    { pin: "10004", name: "Emily Davis" },
    { pin: "10005", name: "Daniel Brown" },
    { pin: "10006", name: "Olivia Wilson" },
    { pin: "10007", name: "Matthew Taylor" },
    { pin: "10008", name: "Sophia Martinez" },
    { pin: "10009", name: "James Anderson" },
    { pin: "10010", name: "Isabella Thomas" },
];
