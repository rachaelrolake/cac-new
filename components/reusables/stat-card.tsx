import { Card, CardContent } from "../ui/card";

export function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color?: string }) {
    const colorClass = color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : color === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-black';
    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold mt-5">{value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}