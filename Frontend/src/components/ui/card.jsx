export function Card({ children, className }) {
    return <div className={`rounded-lg bg-white p-4 shadow ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
    return <div className="mb-2 text-lg font-semibold">{children}</div>;
}

export function CardTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
}

export function CardContent({ children, className }) {
    return <div className={`mt-2 ${className}`}>{children}</div>;
}
